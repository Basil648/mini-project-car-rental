import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <div>Navbar</div>
      <Link to={"/search"}> search</Link>
    </>

  )
}

export default Navbar