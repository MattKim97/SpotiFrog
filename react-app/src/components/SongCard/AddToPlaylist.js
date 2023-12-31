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
            try {
                if (!ulRef.current.contains(e.target)) {
                    setShowMenu(false)
                }
            } catch (e) {
                setShowMenu(false)
            }
        }

        document.addEventListener("click", closeMenu)

        return () => document.removeEventListener("click", closeMenu)
    }, [showMenu])

    const dropDown = showMenu ? "playlist-dropdown dropdown" : "hidden playlist-dropdown dropdown";
    // const buttonClass = showMenu ? "add-to-playlist no-bottom-radius" : "add-to-playlist"

    return (
        <div className='playlist-menu-button'>
            <button onClick={openMenu} className="add-to-playlist">
                <i className="fa-solid fa-plus"/>
                <span>Add to Playlist</span>
            </button>
            <ul className={dropDown} ref={ulRef}>
                {sidebarLoaded ?
                userPlaylists.length ?
                userPlaylists.map((playlist, index) => (
                    <>
                    {index ? <div className="small-top-line"/> : null}
                    <li key={playlist.id} onClick={() => addSong(playlist.id)}>
                        {playlist.name}
                    </li>
                    </>
                ))
                : <li className="inactive">No Playlists Available</li>
                : <li className="inactive">Loading Playlists</li>
                }
            </ul>
        </div>
    )
}
