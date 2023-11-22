import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkDeletePlaylist, thunkGetPlaylist, thunkGetAllPlaylists } from "../../store/playlists";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import LikeSong from "../SongCard/LikeSong";
import { selectSongsByIds, thunkGetAllSongs } from "../../store/songs";

export default function PlayListDetails() {
  const dispatch = useDispatch();
  const { playlistId } = useParams();
  const playlist = useSelector(state => state.playlists[playlistId])


  const sessionUser = useSelector((state) => state.session.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false)
  const [songIds, setSongIds] = useState([])
  const playlistSongs = useSelector(selectSongsByIds(playlist?.songs))

  const history = useHistory();

  const openModal = () => {
    console.log(playlistSongs)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClickAdd = () => {
    return history.push(`/playlists/${playlistId}/change-songs`)
  };

  const onClickDelete = () => {
    openModal();
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

  useEffect(() => {
    dispatch(thunkGetAllSongs()).then(()=>dispatch(thunkGetPlaylist(playlistId))).then(()=>setIsLoaded(true))
  }, [dispatch]);

  if (!playlist || !isLoaded) return null;

  return (

    <div>
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
      <div>
        <div>
          <img
            src={
              playlist.playlistCover
                ? playlist.playlistCover
                : "https://static.thenounproject.com/png/4974686-200.png"
            }
            alt={playlist.name}
          />
        </div>
        <div>{playlist.name}</div>
        <div>{playlist.description}</div>
        <div>{playlist.createdAt}</div>
        <div>Owned by: {playlist.owner} </div>
      </div>
      {sessionUser
                ? sessionUser.id === playlist.userId && (
                    <div className="groupOwnerButtonsContainer">
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
                        Delete Playlist
                      </button>
                    </div>
                  )
                : null}
      <div>   {playlistSongs && playlistSongs.map((song) => (
            <div className="SongListContainer" onClick={()=> onClickSong(song.id) } key={song.id}>
            <div>{song.name}</div>
            <div>{song.artist}</div>
            <LikeSong songId={song.id} liked={song.liked}/>
            <div>{song.albumName}</div>
            <div>{song.userLikes}</div>
            <div>{Math.floor(song.playtimeLength/60)}:{song.playtimeLength%60}</div>
            </div>

        ))}</div>
    </div>
  );
}
