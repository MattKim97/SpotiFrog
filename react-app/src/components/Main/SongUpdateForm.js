import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkUpdateSong, thunkGetSong } from "../../store/songs";
import { thunkGetAllAlbums } from "../../store/albums";

export default function UpdateSongForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { songId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState({});

  const albums = Object.values(useSelector((state) => state.albums));
  let userAlbums = [];
  if (sessionUser) {
    userAlbums = albums.filter((album) => album.userId === sessionUser.id);
  }

  const [formData, setFormData] = useState({
    name: "",
    albumId: 0,
    lyrics: "",
  });
  console.log("🚀 ~ file: SongUpdateForm.js:25 ~ UpdateSongForm ~ formData:", formData)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (formData.albumId === "0" || formData.albumId === 0) {
        delete formData.albumId;
        }


    const response = await dispatch(thunkUpdateSong(formData,songId));

    if (!response.errors) {
      history.push(`/songs/${songId}`);
    } else {
      setErrors(response.errors);
    }
  };

  useEffect(() => {
    if (sessionUser) {
      dispatch(thunkGetAllAlbums());
    }
  }, [dispatch, sessionUser]);

  useEffect(() => {
    const fetchSongData = async () => {
      const songData = await dispatch(thunkGetSong(songId));
      setFormData(songData);
    }
    fetchSongData();
  }, [dispatch, songId]);

  if (!albums || albums.length === 0) return null;

  return (
        <form onSubmit={handleSubmit}>
        <label>
            Name:
            <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            />
            {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
        </label>

        <br />

        <label>
            Album (optional):
            <select
            name="albumId"
            value={formData.albumId}
            onChange={handleInputChange}
            >
            <option value={0}>Select an album</option>
            {userAlbums.map((album) => (
                <option key={album.id} value={album.id}>
                {album.name}
                </option>
            ))}
            <option value={0}>None</option>
            </select>
        </label>

        <br />

        <label>
            Lyrics:
            <textarea
            name="lyrics"
            value={formData.lyrics}
            onChange={handleInputChange}
            />
        </label>

        <br />

        <button type="submit">Submit</button>
        </form>
  );
}
