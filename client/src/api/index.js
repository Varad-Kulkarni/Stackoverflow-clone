import axios from 'axios'

// const API = axios.create({ baseURL: 'http://localhost:5000'})
const API = axios.create({ baseURL: 'https://stack-overflow-clone-varad.herokuapp.com'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('Profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req;
})

export const logIn = (authData) => API.post('/user/login', authData);
export const signUp = (authData) => API.post('/user/signup', authData);

export const postQuestion = (questionData) => API.post('/questions/Ask', questionData)
export const getAllQuestions = () => API.get('/questions/get');
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) => API.patch(`/questions/vote/${id}`, { value, userId })
// export const postAnswer = (id, noOfAnswers, answerBody, userAnswered ) => API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered })

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId, dob ) => API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered, userId, dob })
export const postComment = (id, noOfComments, commentBody, userCommented, userId, commentedOn, answeredId ) => API.patch(`/comment/post/${id}`, { noOfComments, commentBody, userCommented, userId, commentedOn, answeredId })
export const postQComment = (id, noOfComment, commentBody, userCommented, userId, commentedOn ) => API.patch(`/comment/postq/${id}`, { noOfComment, commentBody, userCommented, userId, commentedOn })

export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });
export const deleteComment = (id, commentId, noOfComments, questionId, answerId) => API.patch(`/comment/delete/${id}`, { commentId, noOfComments, questionId, answerId });
export const editComment = (id, ansId, commentId, commentBody) => API.patch(`/comment/edit/${id}`, { ansId, commentId, commentBody })
export const deleteQComment = (id, commentId, noOfComment) => API.patch(`/comment/deleteq/${id}`, { commentId, noOfComment });
export const editQComment = (id, commentId, commentBody) => API.patch(`/comment/editq/${id}`, { commentId, commentBody })

export const fetchAllUsers = () => API.get('/user/getAllUsers')
export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData)