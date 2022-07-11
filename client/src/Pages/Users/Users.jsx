import React from 'react'
import './Users.css'
import { useLocation } from 'react-router-dom'
import LeftSidebar from '../../components/Leftsidebar/Leftsidebar'
import UsersList from './UsersList'
import './Users.css'

const Users = () => {

  const location = useLocation();

  return (
    <div className='home-container-1'>
      <LeftSidebar />
      <div className="home-container-2" style={{marginTop: "30px"}}>
        <h1 style={{fontWeight: "400"}}>Users</h1>
        <UsersList />
      </div>
    </div>
  )
}

export default Users