import React from 'react'
import { Link } from 'react-router-dom'
import "./SongCard.css"
import { useSelector } from 'react-redux';

export default function SongCard({format, song}) {

    const year = new Date(song.uploadedAt).getFullYear();
    const month = new Date(song.uploadedAt).getMonth() + 1;
    const day = new Date(song.uploadedAt).getDate() + 1;

    const album = useSelector((state) => state.albums[song.albumId]);

    const imageUrl = album?.albumCover || 'https://static.thenounproject.com/png/4974686-200.png';

    return (
        <div className={`songs${format}container`}>
        <Link to={`/songs/${song.id}`}>
            <div className={`song${format}`}>
                <div className={`songs${format}style`}>
                    <img  className="songalbumcoverimg" src={imageUrl} alt="album cover" />
                    <h3>{song.name}</h3>
                    <h4>{year}-{month}-{day}</h4>
                    <h4>{song.albumName}</h4>
                    {/* <LikeSong liked={song.liked} songId={song.id} /> */}
                </div>
            </div>
        </Link>
        </div>
    )}
