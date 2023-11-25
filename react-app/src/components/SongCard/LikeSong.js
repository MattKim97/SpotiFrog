import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkLikeSong, thunkUnlikeSong } from '../../store/session'
import { likeSong, unlikeSong } from '../../store/songs'

export default function LikeSong({likedSongs, songId}) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    if (!sessionUser) return null
    console.log(sessionUser.songsLiked, "SESSION USER****")
    const liked = sessionUser.songsLiked.includes(parseInt(songId))

    const handleLike = async () => {
        if (liked) {
            const res = await dispatch(thunkUnlikeSong(songId))
            if (!res.errors) dispatch(unlikeSong(songId))
        } else {
            const res = await dispatch(thunkLikeSong(songId))
            if (!res.errors) dispatch(likeSong(songId))
        }
    }

    return (
        <i className={`fa-heart fa-${liked ? "solid": "regular"}`} onClick={handleLike}></i>
    )
}
