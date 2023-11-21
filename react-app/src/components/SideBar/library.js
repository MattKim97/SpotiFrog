import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetAllAlbums } from '../../store/albums'
import { thunkGetUserPlaylist } from '../../store/session'
import AlbumCard from '../AlbumCard'
import PlaylistCard from '../PlaylistCard'

export default function Library() {

    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const albums = Object.values(useSelector(state => state.albums))
    const playlists = Object.values(useSelector(state => state.playlists))

    let userAlbums = []
    if (sessionUser){
      userAlbums = albums.filter(album => album.userId === sessionUser.id)
    }

    const [activeTab, setActiveTab] = useState('albums')
    const handleTabClick = (tab) => {
        setActiveTab(tab)
    }

    useEffect(() => {
        if (sessionUser) {
          dispatch(thunkGetAllAlbums())
          dispatch(thunkGetUserPlaylist(sessionUser.id))
        }
    }, [dispatch, sessionUser])

    if (!albums || albums.length === 0) return null

  // useEffect(() => {
  //   if (sessionUser) {
  //       dispatch(thunkGetUserPlaylist())
  //   }
  // }, [dispatch, sessionUser])

  // if (!playlists || playlists.length === 0) return null

  return (
    <div >
      <div>Your Library</div>
      {sessionUser ? 
        <div className='SideBarLinksContainer'>
          <div className={activeTab === "albums" ? "Active SideBarLinks": "SideBarLinks"} onClick={()=> handleTabClick("albums")}>Albums</div>
          <div className={activeTab === "playlists" ? "Active SideBarLinks": "SideBarLinks" } onClick={()=> handleTabClick("playlists")}>Playlists</div>
        </div>
       : <a href='/login'>Log in to view your library</a>}

      {sessionUser ?
        <div>
          {activeTab === 'albums' ?
           <div>
            {userAlbums.length > 0 ? userAlbums.map((album)=> (
            <div key={album.id}>
              <AlbumCard format="side" album={album}/>
            </div>)): <a href='/albums/new'>Create an album</a>}
           </div>
           : activeTab === 'playlists' ?
           <div>
            {playlists.length > 0 ? playlists.map((playlist)=> (
            <div key={playlist.id}>
              <PlaylistCard format="side" playlist={playlist}/>
            </div>)): <a href='/playlists/new'>Create a playlist</a>}
           </div>
           : "No active tab set"
          }
        </div>
        : null}
    </div>
  )
}
