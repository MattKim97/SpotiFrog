import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { thunkGetSong } from '../../store/songs'
import LikeSong from '../SongCard/LikeSong'

export default function SongDetails() {
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(null)
    const [coverImg, setCoverImg] = useState("https://static.thenounproject.com/png/4974686-200.png")
    const { songId } = useParams()
    const song = useSelector(state => state.songs[songId])
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkGetSong(songId))
    }, [dispatch])

    useEffect(() => {
        if (sessionUser && song) {
            setLiked(song.liked)
        }
    }, [sessionUser, song])

    useEffect(() => {
        if (song && song.album && song.album.albumCover) {
            setCoverImg(song.album.albumCover)
        }
    }, [song])

    if ( !song ) return null

    const {albumName, name, mp3, uploadedAt, playtimeLength, albumTrackNumber, lyrics, userLikes, artist} = song

    const year = new Date(uploadedAt).getFullYear();

    const sec = playtimeLength % 60
    const min = Math.floor(playtimeLength/60)

    return (
        <div>
            <h3>Song</h3>
            <img src={coverImg} />
            <h2>{name}</h2>
            <h3>{artist}</h3>
            <h3>{albumName} • {year} • {min}:{sec} • {userLikes} Likes</h3>

            <LikeSong liked={liked} songId={songId} />
            <h2>Lyrics:</h2>
            <p>
                {lyrics ? lyrics : "no lyrics available"}
            </p>
        </div>
    )
}
