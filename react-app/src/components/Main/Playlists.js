import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetAllPlaylists } from '../../store/playlists'
import PlaylistCard from '../PlaylistCard'
export default function Playlists() {

  const dispatch = useDispatch()
  const playlists = Object.values(useSelector(state => state.playlists))

  useEffect(() => {
          dispatch(thunkGetAllPlaylists())
  }
  , [dispatch,])

  if (!playlists || playlists.length === 0) return null

  return (
    <div>
      <div className='PlayListContainerMain'>
            {playlists.map((playlist)=> (
            <div key={playlist.id}>
              <PlaylistCard format="main" playlist={playlist}/>
            </div>))}
           </div>
    </div>
  )
}
