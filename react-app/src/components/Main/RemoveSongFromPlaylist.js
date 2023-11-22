import React from 'react'
import { useDispatch } from 'react-redux'
import { thunkRemoveFromPlaylist } from '../../store/playlists'

export default function RemoveSongFromPlaylist({songId, playlistId}) {
    const dispatch = useDispatch()

    async function removeSong(e) {
        e.preventDefault()
        await dispatch(thunkRemoveFromPlaylist(playlistId, songId))
    }
    return (
        <button onClick={removeSong}>
            <i className="fa-solid fa-minus"/>
            <span>Remove Song</span>
        </button>
    )
}
