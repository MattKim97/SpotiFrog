import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetAllPlaylists } from "../../store/playlists";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

export default function PlayListDetails() {
    const dispatch = useDispatch()
    const allPlaylists = Object.values(useSelector(state => state.playlists))
    const { playlistId } = useParams()

    useEffect(() => {
        dispatch(thunkGetAllPlaylists());
    }
    , [dispatch])

    if (!allPlaylists) return null

    const playlist = allPlaylists[playlistId - 1]
    console.log("🚀 ~ file: PlayListDetails.js:20 ~ PlayListDetails ~ allPlaylists:", allPlaylists)

    if (!playlist) return null

    
  return (
    <div>
      <div>
        <img src={playlist.playlistCover ? playlist.playlistCover : "https://static.thenounproject.com/png/4974686-200.png" } alt={playlist.name}/>
      </div>
      <div>{playlist.name}</div>
      <div>{playlist.description}</div>
      <div>{playlist.createdAt}</div>
      <div>Owned by: {playlist.owner} </div>
    </div>
  )
}
