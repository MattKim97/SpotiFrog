import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkDeleteAlbum, thunkGetAlbum } from "../../store/albums";
import { thunkGetAllSongs } from "../../store/songs";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Main.css";

export default function AlbumDetails() {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const albums = Object.values(useSelector((state) => state.albums));
  const sessionUser = useSelector((state) => state.session.user);
  const allSongs = Object.values(useSelector((state) => state.songs));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const history = useHistory()

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClickAdd = () => {
    return history.push(`/albums/${albumId}/change-songs`)
  };

  const onClickDelete = () => {
    openModal();
  };
  const onClickSong = (songId) => {
    history.push(`/songs/${songId}`)
  }

  const handleDeleteKeep = async () => {
    const response = await dispatch((thunkDeleteAlbum(albumId)));
    if (response) {
      history.push(`/albums`);
    }
  };
  useEffect(() => {
    dispatch(thunkGetAlbum(albumId));
    dispatch(thunkGetAllSongs());
  }, [dispatch, albumId]);

  if (!albums) return null;
  if (!allSongs) return null;

  const album = albums.find((album) => album.id === Number(albumId));
  const albumSongs = allSongs.filter(song => song.albumId === Number(albumId))
  console.log("🚀 ~ file: AlbumDetails.js:18 ~ AlbumDetails ~ album:", album)

  if(!album) return null
  if(!albumSongs) return null

  const releaseYear = new Date(album.releaseDate).getFullYear();
  const albumLength = albumSongs.length;
  const albumDuration = albumSongs.reduce((sum,song) => sum+song.playtimeLength, 0)
  const albumHr = Math.floor(albumDuration/3600);
  const albumMin = Math.floor((albumDuration%3600)/60);
  const albumSec = albumDuration%60;

  return (
    <div className="details-container">
       {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this album?</p>
            <div className="modalButtons">
              <button className="deleteButton" onClick={handleDeleteKeep}>
                Yes (Delete Album)
              </button>
              <button className="keepButton" onClick={closeModal}>
                No (Keep Album)
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="details-section-top">
        <img
          className="albumCover"
          src={
            album.albumCover
              ? album.albumCover
              : "https://static.thenounproject.com/png/4974686-200.png"
          }
          alt={album.name}
        />
        <div className="details-section-summary">
          <h3 className="details-section-type">{albumLength==1 ? "Single": "Album"}</h3>
          <h2>{album.name}</h2>
          <h3><span className="details-section-artist">{album.artist}</span> • {releaseYear} • {albumLength} {albumLength==1 ? "song": "songs"}, {albumHr} hr {albumMin} min {albumSec} sec</h3>
        </div>
      </div>
      <div className="details-section-user-options">
        <i className="fas fa-play-circle" onClick={()=>alert("feature to be implemented!")}></i>
        {sessionUser
        ? sessionUser.id === album.userId && (
            <div className="group-owner-buttons-container">
              <button
                onClick={(e) => onClickAdd()}
                className="groupOwnerButtons"
              >
                Add a song
              </button>
              <button
                onClick={(e) => onClickDelete()}
                className="groupOwnerButtons"
              >
                Delete Album
              </button>
            </div>
          )
        : null}
      {/* <div> */}
      </div>
      {albumSongs.map((song) => (
        <div key={song.id} className="SongListContainer" onClick={()=> onClickSong(song.id) }>
            <div>{song.name}</div>
            <div>{song.artist}</div>
            <div>{album.name}</div>
            {/* <LikeSong songId={song.id} liked={sessionUser.songsLiked}/> */}
            <div>{song.userLikes} likes</div>
            <div>
            {Math.floor(song.playtimeLength / 60)}:{song.playtimeLength % 60}
          </div>
        </div>
      ))}
      {/* </div> */}
    </div>
  );
}
