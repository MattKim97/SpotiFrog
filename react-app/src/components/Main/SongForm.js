import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { thunkCreateSong } from "../../store/songs";
import { thunkGetAllAlbums } from "../../store/albums";

export default function SongForm() {
  const dispatch = useDispatch();
  const history = useHistory();
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
    mp3: null,
    lyrics: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      // Handle file input separately
      if (type === "file") {
        updatedFormData[name] = files[0];
      } else {
        updatedFormData[name] = value;
      }

      console.log("Updated Form Data:", updatedFormData); // Log the updated form data

      return updatedFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("albumId", formData.albumId);
    formDataToSend.append("mp3", formData.mp3);
    formDataToSend.append("lyrics", formData.lyrics);

    if (!formData.mp3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mp3: "Please select an mp3 file",
      }));
    }
    // if (!formData.name) {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     name: "Please enter a name",
    //   }));
    // }
    const response = await dispatch(thunkCreateSong(formDataToSend));

    if (!response.errors) {
      history.push(`/songs/${response.id}`);
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, ...response.errors }));
    }
  };

  useEffect(() => {
    if (sessionUser) {
      dispatch(thunkGetAllAlbums());
    }
  }, [dispatch, sessionUser]);

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
        {errors.name && <div style={{color:"red"}}>{errors.name}</div>}
      </label>

      <br />

      <label>
        Album (optional):
        <select
          name="albumId"
          value={formData.albumId}
          onChange={handleInputChange}
        >
          <option value={null}>Select an album</option>
          {userAlbums.map((album) => (
            <option key={album.id} value={album.id}>
              {album.name}
            </option>
          ))}
        </select>
      </label>

      <br />

      <label>
        MP3 File:
        <input
          type="file"
          name="mp3"
          accept=".mp3"
          onChange={handleInputChange}
        />
        {errors.mp3 && <div style={{color:"red"}} >{errors.mp3}</div>}
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
