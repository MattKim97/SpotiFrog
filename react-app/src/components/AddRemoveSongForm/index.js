import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { thunkAddSongToAlbum, thunkRemoveSongFromAlbum } from '../../store/albums'
import { thunkGetAllSongs } from '../../store/songs'

export default function AddRemoveSongForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const {albumId} = useParams()

    const sessionUser = useSelector(state => state.session.user)
    const allSongs = useSelector(state => state.songs)

    // list of songs in album / playlist
    const [albumSongs, setAlbumSongs] = useState([])
    const [removedSongs, setRemovedSongs] = useState(new Set())

    // list of songs user has that is not in album / playlist
    const [userSingles, setUserSingles] = useState([])
    const [addedSongs, setAddedSongs] = useState(new Set())

    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(thunkGetAllSongs())
    }, [dispatch])

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
            for (let songId of [...removedSongs]) {
                const res = await dispatch(thunkRemoveSongFromAlbum(albumId, songId))
                if (res.errors) {
                    for (let [type, msg] of Object.entries(res.errors)) {
                    errors[songId] = `${type}: ${msg}`
                    }
                }
            }
        }
        if (addedSongs.size) {
            for (let songId of [...addedSongs]) {
                const res = await dispatch(thunkAddSongToAlbum(albumId, songId))
                if (res.errors) {
                    for (let [type, msg] of Object.entries(res.errors)) {
                    errors[songId] = `${type}: ${msg}`
                    }
                }
            }
        }

        if (!Object.values(errors).length) {
            return history.push(`/albums/${albumId}`)
        }
        setErrors(errors)
    }

    if (!allSongs) return <>Loading update page</>

    return (
        <form action="" onSubmit={handleSubmit}>
            <div>
                <h3>Select songs to remove from album</h3>
                {albumSongs.map(song => {
                    return (
                    <div key={song.id}>
                    {errors[song.id] && <div>{errors[song.id]}</div>}
                    <label htmlFor={song.id}>
                        {song.name}
                        <input
                            id={song.id}
                            type="checkbox"
                            value={song.id}
                            onClick={removeSong}
                            defaultChecked
                        />
                    </label>
                    </div>
                    )
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

            <button>UPDATE ALBUM SONGS</button>
        </form>
    )
}
