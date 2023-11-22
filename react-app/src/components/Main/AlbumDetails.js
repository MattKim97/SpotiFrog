import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkDeleteAlbum, thunkGetAllAlbums } from "../../store/albums";
import { thunkGetAllSongs } from "../../store/songs";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Main.css";import LikeSong from '../SongCard/LikeSong'

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

  const onClickUpdate = () => {
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
    dispatch(thunkGetAllAlbums());
    dispatch(thunkGetAllSongs());
  }, [dispatch]);

  if (!albums) return null;
  if (!allSongs) return null;

  const album = albums[albumId - 1]
  const albumSongs = allSongs.filter(song => song.albumId === Number(albumId))
  console.log("🚀 ~ file: AlbumDetails.js:18 ~ AlbumDetails ~ album:", album)

  if(!album) return null
  if(!albumSongs) return null

  return (
    <div>
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
      <div>
        <div>
          <img
            src={
              album.albumCover
                ? album.albumCover
                : "https://static.thenounproject.com/png/4974686-200.png"
            }
            alt={album.name}
          />
        </div>
        <div>{album.name}</div>
        <div>{album.artist}</div>
        <div>{album.releaseDate}</div>
      </div>
      {sessionUser
                ? sessionUser.id === album.userId && (
                    <div className="">
                      <button
                        onClick={(e) => onClickAdd()}
                        className="groupOwnerButtons"
                      >
                        Add a song
                      </button>
                      <button
                        onClick={(e) => onClickUpdate()}
                        className="groupOwnerButtons"
                      >
                        Update Album
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
      <div>
      {albumSongs.map((song) => (
        <div key={song.id} className="SongListContainer" onClick={()=> onClickSong(song.id) }>
            <div>{song.name}</div>
            <div>{song.artist}</div>
            <div>{album.name}</div>
            <LikeSong songId={song.id} liked={song.liked}/>
            <div>{song.userLikes}</div>
            <div>
            {Math.floor(song.playtimeLength / 60)}:{song.playtimeLength % 60}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
