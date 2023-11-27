import React, {useRef} from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkDeletePlaylist, thunkGetPlaylist} from "../../store/playlists";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { selectSongsByIds, thunkGetAllSongs } from "../../store/songs";
import { useContentLoaded } from "../../context/ContentLoaded";
import RemoveSongFromPlaylist from "./RemoveSongFromPlaylist";
import PlayButton from "../PlayButton";
import PlaylistButton from "../PlaylistButton";

export default function PlayListDetails() {
  const {sidebarLoaded} = useContentLoaded()
  const dispatch = useDispatch();
  const { playlistId } = useParams();
  const playlist = useSelector(state => state.playlists[playlistId])
  const playlistSongIds = useSelector(state => state.playlists[playlistId]?.songs)
  const sessionUser = useSelector((state) => state.session.user);
  const playlistSongs = useSelector(selectSongsByIds(playlist?.songs))

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isLoaded, setIsLoaded] = useState(false)
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const history = useHistory();

  const openModal = () => {
    console.log(playlistSongs)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const onClickAdd = () => {
  //   return history.push(`/playlists/${playlistId}/change-songs`)
  // };

  const onClickDelete = () => {
    openModal();
  };

  const onClickEdit = () => {
    return history.push(`/playlists/${playlistId}/edit`)
  };

  const onClickSong = (songId) => {
    history.push(`/songs/${songId}`)
  }

  const handleDeleteKeep = async () => {
    const response = await dispatch((thunkDeletePlaylist(playlistId)));
    if (response) {
      history.push("/playlists");
    }
  };

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

  useEffect(() => {
    if (sidebarLoaded) {
      dispatch(thunkGetAllSongs()).then(()=>dispatch(thunkGetPlaylist(playlistId)))
      // .then(()=>setIsLoaded(true))
    }
  }, [dispatch, sidebarLoaded, playlistId]);

  if (!playlist) return null;
  if (!playlistSongs) return null;
  if (!playlistSongIds) return null;

  const playlistDuration = playlistSongs.reduce((sum,song) => song?sum+song.playtimeLength:sum, 0)
  const playlistHr = Math.floor(playlistDuration/3600);
  const playlistMin = Math.floor((playlistDuration%3600)/60);
  const playlistSec = playlistDuration%60;

  const dropDown = showMenu ? "user-options-dropdown dropdown" : "hidden user-options-dropdown dropdown"

  return (

    <div className="details-container">
        {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this playlist?</p>
            <div className="modalButtons">
              <button className="deleteButton" onClick={handleDeleteKeep}>
                Yes (Delete Playlist)
              </button>
              <button className="keepButton" onClick={closeModal}>
                No (Keep Playlist)
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="details-section-top">
          <img
          className="playlistCover"
            src={
              playlist.playlistCover
                ? playlist.playlistCover
                : "https://static.thenounproject.com/png/4974686-200.png"
            }
            alt={playlist.name}
          />
          <div className="details-section-summary">
            <h3 className="details-section-type">Playlist</h3>
            <h2>{playlist.name}</h2>
            <div className="background-text">{playlist.description}</div>
            <h3>
              <span className="details-section-artist">{playlist.owner}</span> • {playlist.songs.length} {playlist.songs.length==1 ? "song":"songs"}, {playlistHr} hr {playlistMin} min {playlistSec} sec
            </h3>
          </div>
      </div>
      <div className="details-section-user-options">
        <PlaylistButton tracks={playlistSongIds} />
        <i className={`fa-solid fa-ellipsis`} onClick={openDropdown}></i>
        <div />
        <ul className={dropDown} ref={ulRef}>
          {sessionUser
          ? sessionUser.id === playlist.userId ? (
              <>
              <li>
                <button
                  onClick={(e) => onClickDelete()}
                  className="groupOwnerButtons"
                >
                  Delete Playlist
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => onClickEdit()}
                  className="groupOwnerButtons"
                >
                  Edit a playlist
                </button>
              </li>
              </>
            ) : <li className="inactive">No actions available</li>
          : <li className="inactive">Log in to view options!</li>}
        </ul>
      </div>
      {/* {sessionUser
                ? sessionUser.id === playlist.userId && (
                    <div className="groupOwnerButtonsContainer">
                      <button
                        onClick={(e) => onClickDelete()}
                        className="groupOwnerButtons"
                      >
                        Delete Playlist
                      </button>
                      <button
                        onClick={(e) => onClickEdit()}
                        className="groupOwnerButtons"
                      >
                        Edit a playlist
                      </button>
                    </div>
                  )
                : null} */}
      <div>   {!playlistSongs.includes(undefined) && playlistSongs.map((song, songIndex) => (
            <div className="SongListContainer" onClick={()=> onClickSong(song.id) } key={song.id}>
                        <PlayButton tracks={playlistSongIds} trackIndex={songIndex} />
<div>{song.name}</div>
            <div>{song.artist}</div>

            {sessionUser && sessionUser.id === playlist.userId &&
              <>
              {/* <LikeSong songId={song.id} liked={sessionUser.songsLiked}/> */}
              <RemoveSongFromPlaylist songId={song.id}playlistId={playlistId}/>
              </>
            }
            <div>{song.albumName}</div>
            <div>{song.userLikes}</div>
            <div>{Math.floor(song.playtimeLength/60)}:{song.playtimeLength%60}</div>
            </div>

        ))}</div>
    </div>
  );
}
