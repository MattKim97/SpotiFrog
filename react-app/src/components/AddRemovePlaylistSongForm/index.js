import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
// import thunks from playlist
import { thunkGetAllSongs } from '../../store/songs'

export default function AddRemovePlaylistSongForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const {playlistId} = useParams()

    const sessionUser = useSelector(state => state.session.user)
    const allSongs = useSelector(state => state.songs)

    // list of songs in playlist
    const [playlistSongs, setPlaylistSongs] = useState([])
    const [removedSongs, setRemovedSongs] = useState(new Set())

    // list of songs user has that is not in album / playlist
    const [notInPlaylist, setNotInPlaylist] = useState([])
    const [addedSongs, setAddedSongs] = useState(new Set())

    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(thunkGetAllSongs())
    }, [])

    useEffect(() => {
        if (sessionUser){
            const songs = Object.values(allSongs)

            setAlbumSongs(songs.filter(song => song.albumId==albumId))

            setUserSingles(songs.filter(song => song.userId==sessionUser.id && !song.albumId))
        }
    }, [allSongs, sessionUser, albumId])

    const removeSong = (e) => {
        if (e.target.checked) {
            removedSongs.delete(e.target.value)
            setRemovedSongs(removedSongs)
        } else {
            removedSongs.add(e.target.value)
            setRemovedSongs(removedSongs)
        }
    }

    const addSong = e => {
        if (e.target.checked) {
            addedSongs.add(e.target.value)
            setAddedSongs(addedSongs)
        } else {
            addedSongs.remove(e.target.value)
            setAddedSongs(addedSongs)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors = {}

        if (removedSongs.size) {
            console.log("REMOVING SONGS: ", removedSongs)
            for (let songId of [...removedSongs]) {
                dispatch(thunkRemoveSongFromAlbum(albumId, songId))
            }
        }
        if (addedSongs.size) {
            console.log("ADDING SONGS", addedSongs)
            for (let songId of [...addedSongs]) {
                dispatch(thunkAddSongToAlbum(albumId, songId))
            }
        }

        return history.push(`/albums/${albumId}`)
    }

    if (!allSongs) return <>Loading update page</>

    return (
        <form action="" onSubmit={handleSubmit}>
            <div>
                <h3>Select songs to remove from album</h3>
                {albumSongs.map(song => {
                    return (
                    <label key={song.id} htmlFor={song.id}>
                        {song.name}
                        <input
                            id={song.id}
                            type="checkbox"
                            value={song.id}
                            onClick={removeSong}
                            defaultChecked
                        />
                    </label>)
                })}
            </div>

            <div>
                <h3>Select songs to add to album</h3>
                {userSingles.map(song => {
                    return (
                    <label key={song.id} htmlFor={song.id}>
                        {song.name}
                        <input
                            id={song.id}
                            type="checkbox"
                            value={song.id}
                            onClick={addSong}
                        />
                    </label>)
                })}
            </div>

            <button>UPDATE PLAYLIST</button>
        </form>
    )
}
