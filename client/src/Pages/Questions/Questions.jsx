// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import '../../components/HomeMainbar/HomeMainbar.css'

// const Questions = () => {

//   console.log(questionsList)
//   var questionsList = [{
//     id: 1,
//     upVotes: 3,
//     downVotes: 2,
//     noOfAnswers: 2,
//     questionTitle: "What is a function?",
//     questionBody: "It meant to be",
//     questionTags: ["java", "node js", "react js", "mongo db", "express js"],
//     userPosted: "mano",
//     userId: 1,
//     askedOn: "jan 1",
//     answer: [{
//       answerBody: "Answer",
//       userAnswered: 'kumar',
//       answeredOn: "jan 2",
//       userId: 2,
//     }]
//   }, {
//     id: 2,
//     upVotes: 3,
//     downVotes: 2,
//     noOfAnswers: 0,
//     questionTitle: "What is a function?",
//     questionBody: "It meant to be",
//     questionTags: ["javascript", "R", "python"],
//     userPosted: "mano",
//     askedOn: "jan 1",
//     userId: 1,
//     answer: [{
//       answerBody: "Answer",
//       userAnswered: 'kumar',
//       answeredOn: "jan 2",
//       userId: 2,
//     }]
//   }, {
//     id: 3,
//     upVotes: 3,
//     downVotes: 2,
//     noOfAnswers: 0,
//     questionTitle: "What is a function?",
//     questionBody: "It meant to be",
//     questionTags: ["javascript", "R", "python"],
//     userPosted: "mano",
//     askedOn: "jan 1",
//     userId: 1,
//     answer: [{
//       answerBody: "Answer",
//       userAnswered: 'kumar',
//       answeredOn: "jan 2",
//       userId: 2,
//     }]
//   }]

//   const location = useLocation();

//   return (
//     <div className='main-bar'>
//       <div className='main-bar-header'>
//         {
//           location.pathname === '/' ? <h1>Top Question</h1> : <h1>All Questions</h1>
//         }
//       </div>
//     </div>
//   )
// }

// export default Questions



  
import React from 'react'

import '../../App.css'
import LeftSidebar from '../../components/Leftsidebar/Leftsidebar'
import RightSidebar from '../../components/Rightsidebar/Rightsidebar'
import HomeMainbar from '../../components/HomeMainbar/HomeMainBar'

const Questions = () => {
    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className='home-container-2'>
                <HomeMainbar />
                <RightSidebar />
            </div>
        </div>
    )
}

export default Questions