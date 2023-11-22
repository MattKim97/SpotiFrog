import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkDeleteSong, thunkGetSong } from "../../store/songs";
import LikeSong from "../SongCard/LikeSong";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function SongDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [liked, setLiked] = useState(null);
  const [coverImg, setCoverImg] = useState(
    "https://static.thenounproject.com/png/4974686-200.png"
  );
  const { songId } = useParams();
  const song = useSelector((state) => state.songs[songId]);
  const sessionUser = useSelector((state) => state.session.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteKeep = async () => {
    const response = await dispatch(thunkDeleteSong(songId));
    if (response) {
      history.push(`/songs`);
    }
  };

  const onClickDelete = () => {
    openModal();
  };

  const onClickUpdate = () => {
    history.push(`/songs/${songId}/edit`);
  };

  useEffect(() => {
    dispatch(thunkGetSong(songId));
  }, [dispatch]);

  useEffect(() => {
    if (sessionUser && song) {
      setLiked(song.liked);
    }
  }, [sessionUser, song]);

  useEffect(() => {
    if (song && song.album && song.album.albumCover) {
      setCoverImg(song.album.albumCover);
    }
  }, [song]);

  if (!song) return null;

  const {
    albumName,
    name,
    mp3,
    uploadedAt,
    playtimeLength,
    albumTrackNumber,
    lyrics,
    userLikes,
    artist,
  } = song;

  const year = new Date(uploadedAt).getFullYear();

  const sec = playtimeLength % 60;
  const min = Math.floor(playtimeLength / 60);

  return (
    <div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this song?</p>
            <div className="modalButtons">
              <button className="deleteButton" onClick={handleDeleteKeep}>
                Yes (Delete Song)
              </button>
              <button className="keepButton" onClick={closeModal}>
                No (Keep Song)
              </button>
            </div>
          </div>
        </div>
      )}
      <img className="albumCover" src={coverImg} />
      <h2>{name}</h2>
      <h3>{artist}</h3>
      <h3>
        {albumName} • {year} • {min}:{sec} • {userLikes} Likes
      </h3>

      <LikeSong liked={liked} songId={songId} />
      <h2>Lyrics:</h2>
      {sessionUser
        ? sessionUser.id === song.userId && (
            <div>
              <button
                onClick={(e) => onClickUpdate()}
                className="groupOwnerButtons"
              >
                Update Song
              </button>
              <button
                onClick={(e) => onClickDelete()}
                className="groupOwnerButtons"
              >
                Delete Song
              </button>
            </div>
          )
        : null}
      <p>{lyrics ? lyrics : "no lyrics available"}</p>
    </div>
  );
}
