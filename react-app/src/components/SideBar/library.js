import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetUserAlbums } from '../../store/albums'
// import { thunkGetUserPlaylist } from '../../store/session'
import AlbumCard from '../AlbumCard'
import PlaylistCard from '../PlaylistCard'
import { thunkGetUserPlaylist } from '../../store/playlists'
import { useContentLoaded } from '../../context/ContentLoaded'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { thunkGetAllSongs } from '../../store/songs'
import SongCard from '../SongCard'
import OpenModalButton from '../OpenModalButton'
import LoginFormModal from '../LoginFormModal'



export default function Library() {
  const {userLoaded, setSidebarLoaded} = useContentLoaded()
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const albums = Object.values(useSelector(state => state.albums))
  const playlists = Object.values(useSelector(state => state.playlists))
  const songs = Object.values(useSelector(state => state.songs))

  const onClickSong = () => {
    history.push('/songs/new')
  }

  const onClickAlbum = () => {
    history.push('/albums')
  }

  const onClickPlaylist = () => {
    history.push('/playlists')
  }

  const onClickAlbumCreate = () =>{
    history.push('/albums/new')
  }

  const onClickPlaylistCreate = () =>{
    history.push('/playlists/new')
  }

  const seeSongs = () => {
    history.push('/songs')
  }

  let userAlbums = []
  let userPlaylists = []
  let userSongs = []


  if (sessionUser){
    userAlbums = albums.filter(album => album.userId === sessionUser.id)
    userPlaylists = playlists.filter(playlist => playlist.userId === sessionUser.id)
    userSongs = songs.filter(song => song.userId == sessionUser.id)
  }

  const [activeTab, setActiveTab] = useState('albums')
  const handleTabClick = (tab) => {
      setActiveTab(tab)
  }

  useEffect(() => {
      if (sessionUser) {
        dispatch(thunkGetUserAlbums(sessionUser.id))
        .then(()=>dispatch(thunkGetUserPlaylist(sessionUser.id)))
        .then(() => setSidebarLoaded(true))
        dispatch(thunkGetAllSongs())
      }
      else if (userLoaded) {
        // if there is no user logged in
        setSidebarLoaded(true);
      }
  }, [dispatch, sessionUser, userLoaded, setSidebarLoaded])

  if (sessionUser && ([albums.length, playlists.length, songs.length].includes(0))) return null;

  // if (!albums || albums.length === 0) return null
  // if (!playlists || playlists.length === 0) return null
  // if (!songs || songs.length === 0) return null

  return (
    <div className='sidebar-library'>
      <div className='library-text'><i className="fa-solid fa-book"></i>Your Library</div>
      {sessionUser ?
        <div className='SideBarLinksContainer'>
          <div className={activeTab === "albums" ? "Active SideBarLinks": "SideBarLinks"} onClick={()=> handleTabClick("albums")}><i className="fa-solid fa-radio"></i> Albums</div>
          <div className={activeTab === "playlists" ? "Active SideBarLinks": "SideBarLinks" } onClick={()=> handleTabClick("playlists")}><i className="fa-solid fa-headphones"></i> Playlists</div>
          <div className={activeTab === "songs" ? "Active SideBarLinks": "SideBarLinks"} onClick={()=> handleTabClick("songs")}><i className="fa-solid fa-music"></i> Songs</div>

        </div>
       :  <OpenModalButton
       buttonText="Log In to view your Library"
       modalComponent={<LoginFormModal />}
       customClassName="custom-modal-button"
       className="custom-modal-button"
     />}

{sessionUser ?
  <div className='sideBarContainer'>
    {activeTab === 'albums' ?
      <div className='sidebar-card-container'>
        {userAlbums.length > 0 ? userAlbums.map((album) => (
          <div key={album.id}>
            <AlbumCard format="side" album={album} />
          </div>
        )) : null}
          <button onClick={onClickAlbumCreate}>Create a Album</button>
        <button type='button' onClick={onClickAlbum}>See All Albums</button>
      </div>
      : activeTab === 'playlists' ?
        <div className='sidebar-card-container'>
          {userPlaylists.length > 0 ? userPlaylists.map((playlist) => (
            <div key={playlist.id}>
              <PlaylistCard format="side" playlist={playlist} />
            </div>
          )) : null}
          <button onClick={onClickPlaylistCreate}>Create a Playlist</button>
          <button type='button' onClick={onClickPlaylist}>See All Playlists</button>
        </div>
        : activeTab === 'songs' ?
          <div className='sidebar-card-container'>
            {userSongs.length > 0 ? userSongs.map((song) => (
              <div key={song.id}>
                <SongCard format={"side"} song={song}/>
              </div>
            )) : null}
            <button type='button' onClick={onClickSong}>Create a song</button>
            <button type='button' onClick={seeSongs}>See All Songs</button>
          </div>
          : "No active tab set"
    }
  </div>
  : null}
    </div>
  )
}
