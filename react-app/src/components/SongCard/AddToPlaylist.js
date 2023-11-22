import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { thunkAddToPlaylist } from '../../store/playlists'
import { useContentLoaded } from "../../context/ContentLoaded";

export default function AddToPlaylist({userPlaylists, songId}) {
    // need to check if song in playlist
    const dispatch = useDispatch()
    const {sidebarLoaded} = useContentLoaded()
    const [showMenu, setShowMenu] = useState(false)
    const ulRef = useRef()

    // select playlist dropdown
    const openMenu = () => {
        if (!showMenu) {
            setShowMenu(true)
        }
    }

    const addSong = async playlistId => {
        const answer = await dispatch(thunkAddToPlaylist(playlistId, songId))
        alert(`Added to playlist, ${answer}`)
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

    return (
        <>
            <button onClick={openMenu}>
                <i className="fa-solid fa-plus"/>
                <span>Add to Playlist</span>
            </button>
            <ul className={dropDown} ref={ulRef}>
                {sidebarLoaded ?
                userPlaylists.length ?
                userPlaylists.map(playlist => (
                    <li key={playlist.id} onClick={() => addSong(playlist.id)}>
                        Add to Playlist "{playlist.name}"
                    </li>
                ))
                : <li>No Playlists Available</li>
                : <li>Loading Playlists</li>
                }
            </ul>
        </>
    )
}
