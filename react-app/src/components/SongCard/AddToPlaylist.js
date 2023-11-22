import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { thunkAddSongToPlaylist } from '../../store/songs'

export default function AddToPlaylist({userPlaylists, songId}) {
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false)
    const ulRef = useRef()
    const playlists = Object.values(useSelector(state => state.playlists)).filter(playlist => userPlaylists.includes(playlist.id))

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
        return console.log("adding song")
        // await dispatch(thunkAddSongToPlaylist(playlistId, songId))
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
                <i class="fa-solid fa-plus"/>
                <span>Add to Playlist</span>
            </button>
            <ul className={dropDown} ref={ulRef}>
                {playlists.length ?
                playlists.map(playlist => (
                    <li key={playlist.id} onClick={() => addSong(playlist.id)}>
                        Add to Playlist "{playlist.name}"
                    </li>
                )) : <li>Loading Playlists</li>
                }
            </ul>
        </>
    )
}
