import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { consumeUserPlaylists, thunkAddToPlaylist } from '../../store/playlists'
import { useContentLoaded } from "../../context/ContentLoaded";
// import { thunkAddSongToPlaylist } from '../../store/songs'

export default function AddToPlaylist({userPlaylists, songId}) {
    // need to check if song in playlist
    const dispatch = useDispatch()
    const {sidebarLoaded} = useContentLoaded()
    const [showMenu, setShowMenu] = useState(false)
    const ulRef = useRef()
    // const playlists = Object.values(useSelector(state => state.playlists))
    //     .filter(playlist => userPlaylists.includes(playlist.id))
    // const playlists = useSelector(consumeUserPlaylists(userPlaylists))
    // const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        // setPlaylists =
    }, [])

    // select playlist dropdown
    const openMenu = () => {
        if (!showMenu) {
            setShowMenu(true)

            // check playlists & info when menu is opened
        }
    }

    const addSong = async playlistId => {
        // return console.log("adding song")
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
