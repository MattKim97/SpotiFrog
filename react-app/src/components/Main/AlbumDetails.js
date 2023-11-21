import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { thunkGetAllAlbums } from '../../store/albums'
import { thunkGetAllSongs } from '../../store/songs'
import LikeSong from '../SongCard/LikeSong'

export default function AlbumDetails() {
  const { albumId } = useParams()
  const dispatch = useDispatch()
  const albums = Object.values(useSelector(state => state.albums))

  const allSongs = Object.values(useSelector(state => state.songs))


  useEffect(() => {
    dispatch(thunkGetAllAlbums())
    dispatch(thunkGetAllSongs())
  }, [dispatch])

  if (!albums) return null
  if (!allSongs) return null

  const album = albums[albumId - 1]
  const albumSongs = allSongs.filter(song => song.albumId === Number(albumId))
  console.log("🚀 ~ file: AlbumDetails.js:18 ~ AlbumDetails ~ album:", album)

  if(!album) return null
  if(!albumSongs) return null

  return (
    <div>
    <div>
      <div>
        <img src={album.albumCover ? album.albumCover : "https://static.thenounproject.com/png/4974686-200.png" } alt={album.name}/>
      </div>
      <div>{album.name}</div>
      <div>{album.artist}</div>
      <div>{album.releaseDate}</div>
    </div>
    <div>

    </div>
        {albumSongs.map((song) => (
            <div>
              <div>{song.name}</div>
              <div>{song.artist}</div>
              <div>{album.name}</div>
              <LikeSong songId={song.id} liked={song.liked}/>
              <div>{song.userLikes}</div>
              <div>{Math.floor(song.playtimeLength/60)}:{song.playtimeLength%60}</div>
            </div>

        ))}
    </div>
  )
}
