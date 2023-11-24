import React from 'react'
import { useHistory } from 'react-router-dom';

export default function Logo() {
  const history = useHistory()
  function home () {
   history.push('/')
  }
  return (
    <div className='LogoContainer'>
      <h1 onClick={home}>SpotiFrog</h1>
    </div>
  )
}
