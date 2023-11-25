import React from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';


export default function About() {

  // const [clicked,setClicked] = useState(false)

  // if(clicked === true) return <Redirect to="/about" />
  // if(clicked === false) return <Redirect to="/" />

  return (
    <div className='about-link'>
      <NavLink to="/about">About</NavLink>
    </div>
  )
}
