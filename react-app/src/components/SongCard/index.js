import React from 'react'
import { Link } from 'react-router-dom'
import "./SongCard.css"
// import LikeSong from './LikeSong'

export default function SongCard({format, song}) {

    const year = new Date(song.uploadedAt).getFullYear();
    const month = new Date(song.uploadedAt).getMonth();
    const day = new Date(song.uploadedAt).getDay();

    return (
        <div className={`songs${format}container`}>
        <Link to={`/songs/${song.id}`}>
            <div className={`song${format}`}>
                <div className={`songs${format}style`}>
                    <h3>{song.name}</h3>
                    <h4>{year}-{month}-{day}</h4>
                    <h4>{song.albumName}</h4>
                    {/* <LikeSong liked={song.liked} songId={song.id} /> */}
                </div>
            </div>
        </Link>
        </div>
    )}
