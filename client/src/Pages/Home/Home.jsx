import React from 'react'
import Leftsidebar from '../../components/Leftsidebar/Leftsidebar';
import Rightsidebar from '../../components/Rightsidebar/Rightsidebar';
import HomeMainbar from '../../components/HomeMainbar/HomeMainBar';
import '../../App.css';

const Home = () => {
  return (
    <div className='home-container-1'>
      <Leftsidebar />
      <div className='home-container-2'>
        <HomeMainbar />
        <Rightsidebar />
      </div>
    </div>
  )
}

export default Home