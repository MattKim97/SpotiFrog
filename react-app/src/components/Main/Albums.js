import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkGetAllAlbums } from '../../store/albums'
import AlbumCard from '../AlbumCard'
export default function Albums() {

    const dispatch = useDispatch()
    const albums = Object.values(useSelector(state => state.albums))

    useEffect(() => {
            dispatch(thunkGetAllAlbums())
    }, [dispatch,])

    if (!albums || albums.length === 0) return null

  return (
    <div className='ContainerMainStyle'>
      <div className='AlbumsContainerMain'>
            {albums.map((album)=> (
            <div key={album.id}>
              <AlbumCard format="main" album={album}/>
            </div>))}
           </div>
        </div>
  )
}
