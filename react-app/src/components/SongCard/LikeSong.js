import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkLikeSong, thunkUnlikeSong } from '../../store/songs'

export default function LikeSong({liked, songId}) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    const handleLike = async () => {
        liked ? dispatch(thunkUnlikeSong(songId))
            : dispatch(thunkLikeSong(songId))
    }

    if (!sessionUser) return null

    return (
        <i className={`fa-heart fa-${liked ? "solid": "regular"}`} onClick={handleLike}></i>
    )
}
