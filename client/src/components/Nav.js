import React from 'react'
import { NavLink } from 'react-router-dom'


const Nav = () => {


  return (
   
    <nav className ='nav'>
      
        <h2 className = 'nav-h2'>Mirai Commerce</h2>
        <NavLink className='nav-link' to = '/'>
          HOME
        </NavLink>
        <NavLink className='nav-link' to ='/Login'>
          LOGIN
        </NavLink>
        <NavLink className='nav-link' to ='/Register'>
          SIGN IN
        </NavLink>

 
    </nav>
  )
}



export default Nav