import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from "./Components/NavBar/NavBar"
import SideBar from "./Components/sideBar/SideBar"   

function Layout() {
  return (
    <div >
      <NavBar />
      
      <div className='flex' >
        <SideBar />

       
          <Outlet />
       
      </div>

    </div>
  )
}

export default Layout
