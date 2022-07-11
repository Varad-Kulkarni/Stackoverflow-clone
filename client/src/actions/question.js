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
      const { id, noOfAnswers, answerBody, userAnswered } = answerData;
      const { data } = await api.postAnswer( id, noOfAnswers, answerBody, userAnswered )
      dispatch({ type: 'POST_ANSWERS', payload: data})
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

export const voteQuestion = (id, value, userId) => async (dispatch) => {
  try {
    const { data } = api.voteQuestion(id, value, userId)
    dispatch(fetchAllQuestions())
  } catch (error) {
    console.log(error);
  }
}
