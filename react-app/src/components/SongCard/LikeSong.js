import React from 'react'
import { useDispatch } from 'react-redux'
import { thunkLikeSong, thunkUnlikeSong } from '../../store/songs'

export default function LikeSong({liked, songId}) {
    const dispatch = useDispatch()

    const handleLike = async () => {
        liked ? dispatch(thunkUnlikeSong(songId))
            : dispatch(thunkLikeSong(songId))
    }

    return (
        <i className={`fa-heart fa-${liked ? "solid": "regular"}`} onClick={handleLike}></i>
    )
}
