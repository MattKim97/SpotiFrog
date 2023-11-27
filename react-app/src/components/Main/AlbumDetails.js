import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { thunkDeleteAlbum, thunkGetAlbum } from "../../store/albums";
import { thunkGetAllSongs, selectSongsByIds } from "../../store/songs";
import { useContentLoaded } from "../../context/ContentLoaded";
import PlayButton from "../PlayButton";
import PlaylistButton from "../PlaylistButton";

export default function AlbumDetails() {
  const dispatch = useDispatch();
  const {sidebarLoaded} = useContentLoaded()
  const { albumId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const albumSongIds = useSelector(state => state.albums[albumId]?.songs);
  const album = useSelector((state) => state.albums[albumId]);
  // const allSongs = Object.values(useSelector((state) => state.songs));
  const albumSongs = useSelector(selectSongsByIds(album?.songs))

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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

  const openDropdown = () => {
    if (!showMenu) {
        setShowMenu(true)
    }
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      try {
        if (!ulRef.current.contains(e.target)) {
            setShowMenu(false)
        }
      } catch (e) {
        setShowMenu(false)
      }
    }

    document.addEventListener("click", closeMenu)

    return () => document.removeEventListener("click", closeMenu)
  }, [showMenu])

  const handleDeleteKeep = async () => {
    const response = await dispatch((thunkDeleteAlbum(albumId, album?.songs)));
    if (response) {
      history.push(`/albums`);
    }
  };

  useEffect(() => {
    if (sidebarLoaded) {
      dispatch(thunkGetAllSongs()).then(() => dispatch(thunkGetAlbum(albumId)));
    }
  }, [dispatch, albumId, sidebarLoaded]);

  // if (!album) return null;
  // if (!allSongs) return null;

  // const album = albums.find((album) => album.id === Number(albumId));
  // const albumSongs = allSongs.filter(song => song.albumId === Number(albumId))

  if(!album) return null
  if(!albumSongs) return null
  if(!albumSongIds) return null

  const releaseYear = new Date(album.releaseDate).getFullYear();
  const albumLength = albumSongs.length;
  const albumDuration = albumSongs.reduce((sum,song) => sum+(song?.playtimeLength||0), 0)
  const albumHr = Math.floor(albumDuration/3600);
  const albumMin = Math.floor((albumDuration%3600)/60);
  const albumSec = albumDuration%60;

  const dropDown = showMenu ? "user-options-dropdown dropdown" : "hidden user-options-dropdown dropdown"

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
          <h3><span className="details-section-artist">{album.artist}</span> • <span className="albumYearToolTip" title={new Date(album.releaseDate).toLocaleDateString(undefined, {weekday: 'long',year: 'numeric',month: 'long',day: 'numeric'})}>{releaseYear}</span> • {albumLength} {albumLength==1 ? "song": "songs"}, {albumHr} hr {albumMin} min {albumSec} sec</h3>
        </div>
      </div>
      <div className="details-section-user-options">
        <PlaylistButton tracks={albumSongIds} />

        <i className={`fa-solid fa-ellipsis`} onClick={openDropdown}></i>
        <div />
        <ul className={dropDown} ref={ulRef}>
          {sessionUser
          ? sessionUser.id === album.userId ? (
              <>
              <li>
                <button
                  onClick={(e) => onClickAdd()}
                  className="groupOwnerButtons"
                >
                  Add a song
                </button>
              </li>
              <div className="small-top-line" />
              <li>
                <button
                  onClick={(e) => onClickDelete()}
                  className="groupOwnerButtons"
                >
                  Delete Album
                </button>
              </li>
              </>
            ) : <li className="inactive">No actions available</li>
          : <li className="inactive">Log in to view options!</li>}
        </ul>
      </div>
      <div className="details-section-body album-details">
        <div className="album-details-song-list-titles">
          <h3>#</h3>
          <h3>Title</h3>
          <h3>Artist</h3>
          <h3>Album</h3>
          <h3>Likes</h3>
          <h3><i style={{color:"var(--spotifyGreen)"}} className="fa-regular fa-clock"></i></h3>
        </div>
        {albumSongs.length && albumDuration ? albumSongs.map((song, songIndex) => (
          <div key={song.id} className="SongListContainer" onClick={()=> onClickSong(song.id) }>
            <PlayButton tracks={albumSongIds} trackIndex={songIndex} />
              <div>{song.name}</div>
              <div>{song.artist}</div>
              <div>{album.name}</div>
              {/* <LikeSong songId={song.id} liked={sessionUser.songsLiked}/> */}
              <div>{song.userLikes}</div>
              <div>
              {Math.floor(song.playtimeLength / 60)}:{song.playtimeLength % 60}
            </div>
          </div>
        )) : <p> No songs in album yet!</p>
        }
      </div>
    </div>
  );
}
