import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetAllSongs } from '../../store/songs'
import SongCard from '../SongCard'

export default function Songs() {
  const dispatch = useDispatch()
  const songs = Object.values(useSelector(state => state.songs))

  useEffect(() => {
    dispatch(thunkGetAllSongs())
  }
  , [dispatch])

  if (!songs || songs.length === 0) return null

  return (
    <div>
      <div className='SongsContainerMain'>
      {songs.map((song) => (
        <div key={song.id}><SongCard format="main" song={song}/></div>
          ))}
      </div>
    </div>
  )
}
