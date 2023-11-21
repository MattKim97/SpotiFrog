import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { thunkGetAlbum } from '../../store/albums'
import { thunkGetAllSongs } from '../../store/songs'
import { fetchData } from '../../store/csrf'

export default function AddRemoveSongForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const {albumId} = useParams()

    const sessionUser = useSelector(state => state.session.user)
    // const album = useSelector(state => state.albums[albumId])
    const allSongs = useSelector(state => state.songs)

    // const [isLoaded, setIsLoaded] = useState(false)

    // list of songs in album / playlist
    const [albumSongs, setAlbumSongs] = useState([])
    const [removedSongs, setRemovedSongs] = useState(new Set())

    // list of songs user has that is not in album / playlist
    const [userSingles, setUserSingles] = useState([])
    const [addedSongs, setAddedSongs] = useState(new Set())

    const [errors, setErrors] = useState({})

    // useEffect(() => {
    //     // if there is an album, but no songs in album: the case where all albums were got but not the single album's details
    //     if (!album) {
    //         dispatch(thunkGetAlbum(albumId))
    //     }

    // }, [album])

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
                const res = await fetchData(
                    `/api/albums/${albumId}/songs/${songId}`,
                    { method: 'PATCH' })

                // if no errors, refresh store (songs, albums)
                if (!res.errors) {
                    console.log("success remove")
                    // dispatch()
                } else {
                    console.log("error remove")
                    for (let [error, msg] of Object.entries(res.errors)) {
                        errors[error] = msg
                    }
                    console.log("ERRORS", errors)
                }
            }
        }
        if (addedSongs.size) {
            console.log("ADDING SONGS", addedSongs)
            for (let songId of [...addedSongs]) {
                const res = await fetchData(
                    `/api/albums/${albumId}/songs/${songId}`,
                    { method: 'PUT' })

                // if no errors, refresh store (songs, albums)
                if (!res.errors) {
                    console.log("success add")
                    // dispatch()
                } else {
                    console.log("error add")
                    for (let [error, msg] of Object.entries(res.errors)) {
                        errors[error] = msg
                    }
                }
            }
        }

        if (!Object.values(errors).length) {
            return history.push(`/albums/${albumId}`)
        } else setErrors(errors)
    }

    // update button + functionality
    // put, patch methods

    if (!allSongs) return <>Loading update page</>

    return (
        <form action="" onSubmit={handleSubmit}>
            <div>
                <h3>Select songs to remove from album</h3>
                {albumSongs.map(song => {
                    return (
                    <label htmlFor={song.id}>
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
                    <label htmlFor={song.id}>
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
