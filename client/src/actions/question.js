import React from 'react'
import { applyMiddleware } from 'redux'
import * as api from '../api'

export const askQuestion = (questionData, navigate) => async (dispatch) => {
  try {
      const { data } = await api.postQuestion(questionData);
      dispatch({ type: "POST_QUESTION", payload: data})
      dispatch(fetchAllQuestions());
      navigate('/')
  }
  catch(err) {
      console.log(err);
  }
}

export const fetchAllQuestions = () => async (dispatch) => {
  try {
    const { data } = await api.getAllQuestions();
    dispatch({ type: "FETCH_ALL_QUESTIONS", payload: data});
  }
  catch(err){
    console.log(err);
  }
}

export const postAnswer = (answerData) => async (dispatch) => {
  try {
      const { id, noOfAnswers, answerBody, userAnswered, userId, dob } = answerData;
      // const { id, noOfAnswers, answerBody, userAnswered } = answerData;
      const { data } = await api.postAnswer( id, noOfAnswers, answerBody, userAnswered, userId, dob )
      // const { data } = await api.postAnswer( id, noOfAnswers, answerBody, userAnswered )
      dispatch({ type: 'POST_ANSWERS', payload: data})
      dispatch(fetchAllQuestions())
  } catch (error) {
      console.log(error)
  }
}

export const postComment = (commentData) => async (dispatch) => {
  try {
      const { id, noOfComments, commentBody, userCommented, userId, commentedOn, answeredId } = commentData;
      // const { data } = await api.postComment( id, noOfComments, commentBody, userCommented )
      const { data } = await api.postComment( id, noOfComments, commentBody, userCommented, userId, commentedOn, answeredId )
      dispatch({ type: 'POST_COMMENTS', payload: data})
      dispatch(fetchAllQuestions())
  } catch (error) {
      console.log(error)
  }
}

export const postQComment = (commentData) => async (dispatch) => {
  try {
      const { id, noOfComment, commentBody, userCommented, userId, commentedOn } = commentData;
      // const { data } = await api.postComment( id, noOfComments, commentBody, userCommented )
      const { data } = await api.postQComment( id, noOfComment, commentBody, userCommented, userId, commentedOn )
      dispatch({ type: 'POST_COMMENTS', payload: data})
      dispatch(fetchAllQuestions())
  } catch (error) {
      console.log(error)
  }
}

export const deleteQuestion = (id, navigate) => async(dispatch) => {
  try{
    const { data } = api.deleteQuestion(id);
    dispatch(fetchAllQuestions());
    navigate('/');
  }catch(err){

  }
}


export const deleteAnswer = (id, answerId, noOfAnswers) => async(dispatch) => {
  try {
    const { data } = await api.deleteAnswer(id, answerId, noOfAnswers);
    // dispatch(fetchAllQuestions());
    dispatch(fetchAllQuestions());
  } catch (error) {
    
  }
}

export const deleteComment = (id, commentId, noOfComments, questionId, answerId) => async(dispatch) => {
  try {
    const { data } = await api.deleteComment(id, commentId, noOfComments, questionId, answerId);
    dispatch(fetchAllQuestions());
  } catch (error) {

  }
}

export const editComment = (id, ansId, commentId, commentBody) => async(dispatch) => {
  try {
    const { data } = await api.editComment(id, ansId, commentId, commentBody);
    dispatch({ type: 'EDIT_COMMENTS', payload: data})
    dispatch(fetchAllQuestions())
  } catch (error) {
    
  }
}

export const deleteQComment = (id, commentId, noOfComments) => async(dispatch) => {
  try {
    const { data } = await api.deleteQComment(id, commentId, noOfComments);
    dispatch(fetchAllQuestions());
  } catch (error) {

  }
}

export const editQComment = (id, commentId, commentBody) => async(dispatch) => {
  try {
    const { data } = await api.editQComment(id, commentId, commentBody);
    dispatch({ type: 'EDIT_COMMENTS', payload: data})
    dispatch(fetchAllQuestions())
  } catch (error) {
    
  }
}

export const voteQuestion = (id, value, userId) => async (dispatch) => {
  try {
    const { data } = api.voteQuestion(id, value, userId)
    dispatch(fetchAllQuestions())
  } catch (error) {
    console.log(error);
  }
}
