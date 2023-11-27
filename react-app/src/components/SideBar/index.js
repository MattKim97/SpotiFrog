import React from 'react'
import Home from './home'
import Library from './library'
import "./SideBar.css"
export default function SideBar() {
  return (
    <div className="sidebar-container">
      <Home/>
      <Library/>
    </div>
  )
}
