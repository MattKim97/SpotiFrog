import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { thunkGetAlbum } from '../../store/albums'

export default function AddRemoveSongForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const {albumId} = useParams()

    const sessionUser = useSelector(state => state.session.user)
    const album = useSelector(state => state.albums[albumId])

    // list of songs in album / playlist
    const [albumSongs, setAlbumSongs] = useState([])
    const [removedSongs, setRemovedSongs] = useState(new Set())

    // list of songs user has that is not in album / playlist
    const [userSongs, setUserSongs] = useState([])
    const [addedSongs, setAddedSongs] = useState(new Set())

    useEffect(() => {
        // if there is an album, but no songs in album: the case where all albums were got but not the single album's details
        if (album && !album.songs) {
            dispatch(thunkGetAlbum(albumId))
        }
        if (album?.songs) {
            setAlbumSongs(Object.values(album.songs))
        }
    }, [album])

    // current: can't directly access form by url, must be by button click
    if (!sessionUser || album?.userId !== sessionUser.id) {
        history.push('/')
    }

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
            addedSongs.delete(e.target.value)
            setRemovedSongs(addedSongs)
        } else {
            addedSongs.add(e.target.value)
            setRemovedSongs(addedSongs)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("REMOVING SONGS: ", removedSongs)
        console.log("ADDING SONGS", addedSongs)
    }

    // update button + functionality
    // put, patch methods

    // collect song ids for in / out of album

    if (!album) return <>Loading update page</>

    console.log(albumSongs)

    // return 'checking song stuff'

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
                {userSongs.map(song => {
                    return (
                    <label htmlFor={song.id}>
                        {song.name}
                        <input
                            id={song.id}
                            type="checkbox"
                            value={song.id}
                            onClick={addSong}
                            defaultChecked
                        />
                    </label>)
                })}
            </div>

            <button>UPDATE ALBUM SONGS</button>
        </form>
    )
}
