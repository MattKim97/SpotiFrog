import React from 'react'
import SideCard from './SideCard.js'
import MainTile from './MainTile.js'

export default function PlaylistCard({format, playlist}) {
    return (
    <>
    {format === "side" ?
        <SideCard playlist={playlist}/>
    : format === "main" ?
        <MainTile playlist={playlist}/>
    : <span>Something went wrong in the PlaylistCard</span>
    }
    </>
    )
}
