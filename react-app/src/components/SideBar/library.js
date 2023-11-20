import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function Library() {

    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const [activeTab, setActiveTab] = useState('albums')
    const handleTabClick = (tab) => {
        setActiveTab(tab)
    }
  return (
    <div >
      <div>Your Library</div>
      {sessionUser ? <div><div onClick={()=> handleTabClick("albums")}>Albums</div> <div onClick={()=> handleTabClick("playlists")}>Playlists</div></div>
       : <div>Log in to view your library</div>}
       {sessionUser ? <div>{activeTab === 'albums' ? <div>Albums</div> : <div>Playlists</div>}</div> : null}
    </div>
  )
}
