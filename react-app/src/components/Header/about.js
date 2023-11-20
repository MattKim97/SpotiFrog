import React from 'react'
import { useState } from 'react'

export default function About() {

  const [clicked,setClicked] = useState(false)

  return (
    <div>
      <button onClick={()=>setClicked(!clicked)}>About</button>
    </div>
  )
}
