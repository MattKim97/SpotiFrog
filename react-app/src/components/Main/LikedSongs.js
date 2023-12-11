import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { thunkGetAllSongs } from "../../store/songs";
import { thunkGetAllAlbums } from "../../store/albums";
import SongCard from "../SongCard";

export default function LikedSongs() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const songs = Object.values(useSelector((state) => state.songs));
  const albums = Object.values(useSelector((state) => state.albums));

  useEffect(() => {
    dispatch(thunkGetAllSongs());
    dispatch(thunkGetAllAlbums());
  }, [dispatch]);

  if (!songs || !albums) return null;

  if (!sessionUser) return <Redirect to="/"/>

  const likedSongs = songs.filter(song => sessionUser.songsLiked.includes(song.id))

  return (
    <div className='ContainerMainStyle'>
      <h2 className='liked-songs-header'>Your Liked Songs</h2>
      {sessionUser.songsLiked.length ?
      <div className="SongsContainerMain">
      <div className="songContainerTitles">
        <div />
        <h2>Song Name</h2>
        <h2>Uploaded At</h2>
        <h2>Album Name</h2>
      </div>
      {likedSongs.map(song => (
        <div  className="SongCardMainContainer" key={song.id}>
          <SongCard format="main" song={song} />
        </div>
      ))}
      </div>
      : "You have not liked any songs"}
    </div>
  )
}
