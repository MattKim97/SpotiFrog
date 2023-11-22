import React from 'react'
import { Link } from 'react-router-dom'
import LikeSong from './LikeSong'

export default function SongCard({format, song}) {
    return (
        <Link to={`/songs/${song.id}`}>
            <div className={`song ${format}`}>
                <div>
                    <h3>{song.name}</h3>
                    <h4>{song.uploadedAt} • {song.albumName}</h4>
                    {/* <LikeSong liked={song.liked} songId={song.id} /> */}
                </div>
            </div>
        </Link>
    )}
