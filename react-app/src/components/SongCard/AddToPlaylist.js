import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { thunkAddToPlaylist } from '../../store/playlists'
import { useContentLoaded } from "../../context/ContentLoaded";
import {useHistory} from 'react-router-dom'

export default function AddToPlaylist({userPlaylists, songId}) {
    // need to check if song in playlist
    const dispatch = useDispatch()
    const {sidebarLoaded} = useContentLoaded()
    const [showMenu, setShowMenu] = useState(false)
    const ulRef = useRef()
    const history = useHistory()

    // select playlist dropdown
    const openMenu = () => {
        if (!showMenu) {
            setShowMenu(true)
        }
    }

    const addSong = async playlistId => {
        await dispatch(thunkAddToPlaylist(playlistId, songId))
        history.push(`/playlists/${playlistId}`)
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false)
            }
        }

        document.addEventListener("click", closeMenu)

        return () => document.removeEventListener("click", closeMenu)
    }, [showMenu])

    const dropDown = showMenu ? "playlistSelect" : "hidden playlistSelect"
    const buttonClass = showMenu ? "add-to-playlist no-bottom-radius" : "add-to-playlist"

    return (
        <>
            <button onClick={openMenu} className={buttonClass}>
                <i className="fa-solid fa-plus"/>
                <span>Add to Playlist</span>
            </button>
            <ul id="playlist-dropdown" className={dropDown} ref={ulRef}>
                {sidebarLoaded ?
                userPlaylists.length ?
                userPlaylists.map(playlist => (
                    <li key={playlist.id} onClick={() => addSong(playlist.id)}>
                        Add to Playlist "{playlist.name}"
                    </li>
                ))
                : <li className="inactive">No Playlists Available</li>
                : <li className="inactive">Loading Playlists</li>
                }
            </ul>
        </>
    )
}
