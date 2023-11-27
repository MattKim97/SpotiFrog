import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { thunkDeleteSong, thunkGetSong } from "../../store/songs";
import LikeSong from "../SongCard/LikeSong";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AddToPlaylist from '../SongCard/AddToPlaylist'
import { useContentLoaded } from "../../context/ContentLoaded";
import { consumeUserPlaylists } from "../../store/playlists";
// import PlayButton from "../PlayButton";
import PlaylistButton from "../PlaylistButton";

export default function SongDetails() {
  const {sidebarLoaded} = useContentLoaded()
  const dispatch = useDispatch();
  const history = useHistory();
  // const [liked, setLiked] = useState(null);
  const [coverImg, setCoverImg] = useState(
    "https://static.thenounproject.com/png/4974686-200.png"
  );
  const { songId } = useParams();
  const song = useSelector((state) => state.songs[songId]);
  const sessionUser = useSelector((state) => state.session.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const playlists = useSelector(consumeUserPlaylists(sessionUser?.playlists))
    // .filter(playlist => !playlist.songs.includes(songId))

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

  const openDropdown = () => {
    if (!showMenu) {
        setShowMenu(true)
    }
  }

    useEffect(() => {
      if (sidebarLoaded){
        dispatch(thunkGetSong(songId))
        // dispatch(thunkGetUserPlaylist(sessionUser.id))
      }
    }, [dispatch, sidebarLoaded, songId]);

  useEffect(() => {
    if (song && song.album && song.album.albumCover) {
      setCoverImg(song.album.albumCover);
    }
  }, [song]);

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

  if (!song || !sidebarLoaded) return null;

  const {
    albumName,
    name,
    // mp3,
    uploadedAt,
    playtimeLength,
    // albumTrackNumber,
    lyrics,
    userLikes,
    artist,
    albumId,
  } = song;

  const year = new Date(uploadedAt).getFullYear();

  const sec = playtimeLength % 60;
  const min = Math.floor(playtimeLength / 60);

  const userPlaylists = playlists ? playlists.filter(playlist => !playlist.songs.includes(parseInt(songId))) : [];

  const dropDown = showMenu ? "user-options-dropdown dropdown" : "hidden user-options-dropdown dropdown"

  return (
    <div className="details-container">
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
      <div className="details-section-top">
        <img className="albumCover" src={coverImg} alt="Album Cover"/>
        <div className="details-section-summary">
          <h3 className="details-section-type">Song</h3>
          <h2>{name}</h2>
          <h3>
          <span className="details-section-artist">{artist}</span> • <Link to={`/albums/${albumId}`}>{albumName}</Link> • <span className="details-section-artist">{artist}</span> • <span className="albumYearToolTip" title={new Date(uploadedAt).toLocaleDateString(undefined, {weekday: 'long',year: 'numeric',month: 'long',day: 'numeric'})}>{year}</span> • {min}:{sec} • {userLikes} Likes
          </h3>
        </div>
      </div>

      <div className="details-section-user-options">
        <PlaylistButton tracks={[]} /> {/* TODO */}
        {sessionUser && (
          <LikeSong liked={sessionUser.songsLiked} songId={songId} />
        )}
        <i className={`fa-solid fa-ellipsis`} onClick={openDropdown}></i>
        <ul className={dropDown} ref={ulRef}>
          {sessionUser ?
          <li><AddToPlaylist userPlaylists={userPlaylists} songId={songId}/></li>
          : <li className="inactive">Log in to view options!</li>
          }
          {sessionUser
          ? sessionUser.id === song.userId && (
            <>
              <div className="small-top-line" />
              <li>
              <button
                onClick={(e) => onClickUpdate()}
                className="groupOwnerButtons"
              >
                Update Song
              </button>
              </li>
              <div className="small-top-line" />
              <li>
              <button
                onClick={(e) => onClickDelete()}
                className="groupOwnerButtons"
              >
                Delete Song
              </button>
              </li>
            </>
            )
          : null}
        </ul>
      </div>

      <div className="details-section-body">
        <h3>Lyrics:</h3>
        <p>{lyrics ? lyrics : "no lyrics available"}</p>
      </div>
    </div>
  );
}
