// import { combineReducers } from "redux";
// import authReducer from './auth';


// export default combineReducers({
//     authReducer
// })


import { combineReducers } from "redux";
import authReducer from './auth'
import currentUserReducer from './currentUser'
import questionsReducer from './questions'
// import usersReducer from './users'

export default combineReducers({
    authReducer, currentUserReducer, questionsReducer
})