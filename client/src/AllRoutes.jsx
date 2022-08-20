import React from 'react'
import { Routes, Route } from 'react-router-dom'
import loadable from 'react-loadable';

// import Home from './Pages/Home/Home'
// import Auth from './Pages/Auth/Auth'
// import Questions from './Pages/Questions/Questions'
// import AskQuestion from './Pages/AskQuestion/AskQuestion'
// import DisplayQuestion from './Pages/Questions/DisplayQuestion'
// import Tags from './Pages/Tags/Tags'
// import Users from './Pages/Users/Users'
// import UserProfile from './Pages/UserProfile/UserProfile'

const UserProfile = loadable({
    loader: () => import("./Pages/UserProfile/UserProfile"),
    loading: () => <div>Lading...</div>
})

const Users = loadable({
    loader: () => import("./Pages/Users/Users"),
    loading: () => <div>Lading...</div>
})

const Tags = loadable({
    loader: () => import("./Pages/Tags/Tags"),
    loading: () => <div>Lading...</div>
})

const DisplayQuestion = loadable({
    loader: () => import("./Pages/Questions/DisplayQuestion"),
    loading: () => <div>Lading...</div>
})

const AskQuestion = loadable({
    loader: () => import("./Pages/AskQuestion/AskQuestion"),
    loading: () => <div>Lading...</div>
})

const Questions = loadable({
    loader: () => import("./Pages/Questions/Questions"),
    loading: () => <div>Lading...</div>
})

const Auth = loadable({
    loader: () => import("./Pages/Auth/Auth"),
    loading: () => <div>Lading...</div>
})

const Home = loadable({
    loader: () => import("./Pages/Home/Home"),
    loading: () => <div>Lading...</div>
})

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/Auth' element={<Auth />}/>
            <Route path='/AskQuestion' element={<AskQuestion />}/>
            <Route path='/Questions' element={<Questions />}/>
            <Route path='/Questions/:id' element={<DisplayQuestion />}/>
            <Route path='/Tags' element={<Tags />} />
            <Route path='/Users' element={<Users/>} />
            <Route path='/Users/:id' element={<UserProfile/>} />
        </Routes>
    )
}

export default AllRoutes