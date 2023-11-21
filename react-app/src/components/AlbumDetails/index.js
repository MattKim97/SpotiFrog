import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { thunkGetAlbum } from '../../store/albums'

export default function AlbumDetails() {
  const { albumId } = useParams()
  const dispatch = useDispatch()
  const album = useSelector(state => state.albums[albumId])

//   useEffect(() => {
//     dispatch(thunkGetAlbum(albumId))
//   }, [albumId])

  if (!album) return null

  return (
    <div>
        <h1>AlbumDetails</h1>
        <h2>{album.name}</h2>
    </div>
  )
}
