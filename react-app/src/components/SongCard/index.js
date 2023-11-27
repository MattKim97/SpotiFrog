import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./SongCard.css"
import { useSelector , useDispatch } from 'react-redux';
import { thunkGetAllAlbums } from '../../store/albums';
// import LikeSong from './LikeSong'

export default function SongCard({format, song}) {
    const dispatch = useDispatch();

    const year = new Date(song.uploadedAt).getFullYear();
    const month = new Date(song.uploadedAt).getMonth();
    const day = new Date(song.uploadedAt).getDay();
    const album = useSelector(state => state.albums[song.albumId])
    console.log("🚀 ~ file: index.js:13 ~ SongCard ~ album:", album)

    
    useEffect(() => {
        dispatch(thunkGetAllAlbums())
    }
    , [])
    
    if (!album) return null;
    
    return (
        <div className={`songs${format}container`}>
        <Link to={`/songs/${song.id}`}>
            <div className={`song${format}`}>
                <div className={`songs${format}style`}>
                    <img  className="songalbumcoverimg" src={album.albumCover} alt="album cover" />
                    <h3>{song.name}</h3>
                    <h4>{year}-{month}-{day}</h4>
                    <h4>{song.albumName}</h4>
                    {/* <LikeSong liked={song.liked} songId={song.id} /> */}
                </div>
            </div>
        </Link>
        </div>
    )}
