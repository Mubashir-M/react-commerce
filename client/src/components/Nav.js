import React from 'react'
import { Link } from 'react-router-dom'


const Nav = () => {

  const navStyle = {
    color: 'white',
    
  }

  return (
    <nav>
      <h3>Nav Page</h3>
      <ul className = 'nav-links'>
        <Link style = {navStyle} to = '/'>
        <li className = 'home'>Home</li>
        </Link>
        <Link style = {navStyle} to ='/Login'>
        <li>Login</li>
        </Link>
        <Link style = {navStyle} to ='/Register'>
        <li>Sign in</li>
        </Link>

      </ul>
    </nav>
  )
}



export default Nav