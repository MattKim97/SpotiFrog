import React from 'react'
import { Link } from 'react-router-dom'
import "./SongCard.css"
// import LikeSong from './LikeSong'

export default function SongCard({format, song}) {
    return (
        <div className={`songs${format}container`}>
        <Link to={`/songs/${song.id}`}>
            <div className={`song${format}`}>
                <div>
                    <h3>{song.name}</h3>
                    <h4>{song.uploadedAt} • {song.albumName}</h4>
                    {/* <LikeSong liked={song.liked} songId={song.id} /> */}
                </div>
            </div>
        </Link>
        </div>
    )}
