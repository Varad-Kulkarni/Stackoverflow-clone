// import React from 'react'
// import { Routes, Route } from 'react-router-dom'
// import Auth from './pages/Auth/Auth';
// import Home from './pages/Home/Home';
// import Questions from './pages/Questions/Questions';
// import AskQuestion from './pages/AskQuestion/AskQuestion';
// import DisplayQuestion from './pages/Questions/DisplayQuestion';

// const AllRoutes = () => {
//   return (
//     <Routes>
//         <Route path='/' element={<Home />}/>
//         <Route path='/Auth' element={<Auth />}/>
//         <Route path='/Questions' element={<Questions />}/>
//         <Route path='/AskQuestion' element={<AskQuestion />}/>
//         <Route path='/Questions/:id' element={<DisplayQuestion/>} />
//     </Routes>
//   )
// }

// export default AllRoutes


import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './Pages/Home/Home'
import Auth from './Pages/Auth/Auth'
import Questions from './Pages/Questions/Questions'
import AskQuestion from './Pages/AskQuestion/AskQuestion'
import DisplayQuestion from './Pages/Questions/DisplayQuestion'
// import Tags from './Pages/Tags/Tags'
// import Users from './Pages/Users/Users'
// import UserProfile from './Pages/UserProfile/UserProfile'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/Auth' element={<Auth />}/>
            <Route path='/AskQuestion' element={<AskQuestion />}/>
            <Route path='/Questions' element={<Questions />}/>
            <Route path='/Questions/:id' element={<DisplayQuestion />}/>
            {/* <Route path='/Tags' element={<Tags />} />
            <Route path='/Users' element={<Users />} />
            <Route path='/Users/:id' element={<UserProfile />} /> */}
        </Routes>
    )
}

export default AllRoutes