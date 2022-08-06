import React, { useState } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import upvote from '../../assets/sort-up.svg';
import downvote from '../../assets/sort-down.svg';
import './Questions.css'
import Avatar from '../../components/Avatar/Avatar';
import DisplayAnswer from './DisplayAnswer';
import { useSelector, useDispatch } from 'react-redux';
import { postAnswer } from '../../actions/question';
import moment from 'moment';
import copy from 'copy-to-clipboard';
import { deleteQuestion, voteQuestion } from '../../actions/question';
import DisplayQComments from './DisplayQComments';
import { postQComment } from '../../actions/question';

const QuestionsDetails = () => {

    const { id } = useParams()

    const questionsList = useSelector(state => state.questionsReducer)

    // var questionsList = [{
    //     _id: '1',
    //     votes: 2,
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
    //         answerBody: "Answer",
    //         userAnswered: 'kumar',
    //         answeredOn: "jan 2",
    //         userId: 2,
    //     }]
    // }, {
    //     _id: '2',
    //     votes: 0,
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
    //         answerBody: "Answer",
    //         userAnswered: 'kumar',
    //         answeredOn: "jan 2",
    //         userId: 2,
    //     }]
    // }, {
    //     _id: '3',
    //     votes: 1,
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
    //         answerBody: "Answer",
    //         userAnswered: 'kumar',
    //         answeredOn: "jan 2",
    //         userId: 2,
    //     }]
    // }]

    const [Answer, setAnswer] = useState('')
    const [Comments, setComments] = useState('')
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const User = useSelector((state) => (state.currentUserReducer))
    const location = useLocation();
    // const url = 'https://stack-overflow-clone-varad.herokuapp.com';
    const url = 'https://stack-overflow-clone-varad.netlify.app';
    // const url = 'http://localhost:3000';

    const handlePostAns = (e, answerLength) => {
        e.preventDefault();
        if (User === null) {
            alert("login or signup to answer");
            Navigate('/Auth');
        }
        else {
            if (Answer === '') {
                alert('Enter an answer before submitting');
            }
            else {
                dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.result.name, userId: User?.result?._id, dob: User?.result?.dob }))
            }
        }
    }

    const handlePosComment = (e, commentLength) => {
        e.preventDefault();
        if(User === null) {
            alert("login or signup to comment");
            Navigate('/Auth');
        }
        else {
            if(Comments === '') {
                alert('Enter a comment before submitting');
            }
            else {
                // console.log(id+ " " +(commentLength+1)+ " " +Comment + " " + User.result.name)
                dispatch(postQComment({ id, noOfComment: commentLength+1, commentBody: Comments, userCommented: User.result.name, userId: User?.result?._id, commentedOn: Date.now() }))
            }
        }
    } 

    const handleShare = () => {
        copy(url + location.pathname);
        alert('Copied URL : ' + url + location.pathname);
    }

    const handleDelete = () => {
        dispatch(deleteQuestion(id, Navigate))
    }

    const handleUpVote = () => {
        dispatch(voteQuestion(id, 'upVote', User.result._id))
    }

    const handleDownVote = () => {
        dispatch(voteQuestion(id, 'downVote', User.result._id))
    }

    const getAge = (date) => {
        var birthday = +new Date(date);
        return ~~((Date.now() - birthday) / (31557600000));
    }


    return (
        <div className='question-details-page'>
            {
                questionsList.data === null ?
                    <h1>Loading...</h1> :
                    <>
                        {
                            questionsList.data.filter(question => question._id === id).map(question => (
                                <div key={question._id}>
                                    <section className="question-details-container">
                                        <h1>{question.questionTitle}</h1>
                                        <div className="question-details-container-2">
                                            <div className='question-votes'>
                                                <img src={upvote} alt="" className='votes-icon' onClick={handleUpVote} width='18' />
                                                <p>{question.upVote.length - question.downVote.length}</p>
                                                <img src={downvote} alt="" className='votes-icon' onClick={handleDownVote} width='18' />
                                            </div>

                                            <div style={{ width: "100%" }}>
                                                <p className='question-body'>{question.questionBody}</p>
                                                <div className="question-details-tags">
                                                    {
                                                        question.questionTags.map((tag) => (
                                                            <p key={tag}>{tag}</p>
                                                        ))
                                                    }
                                                </div>
                                                <div className="question-actions-user">
                                                    <div>
                                                        <button type='button' onClick={handleShare}>Share</button>

                                                        {
                                                            User?.result?._id === question?.userId && (
                                                                <button type='button' onClick={handleDelete}>Delete</button>
                                                            )
                                                        }

                                                        {/* <button type='button'>Delete</button> */}
                                                    </div>
                                                    <div>
                                                        <p>asked {moment(question.postedOn).fromNow()}</p>
                                                        <Link to={`/Users/${question.userId}`} className='user-link' style={{ color: '#0086d8' }}>
                                                            <Avatar backgroundColor="orange" px='8px' py='5px'>
                                                                {question.userPosted.charAt(0).toUpperCase()}
                                                            </Avatar>
                                                            <div>
                                                                {question.userPosted}
                                                            </div>
                                                        </Link>
                                                        <div className="age-user"> {getAge(question.dob)} years old</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            question.noOfComment !== 0 && (
                                                <section>
                                                    <h4 className="comment-h4">
                                                        {/* {ans.noOfComments} comments */}
                                                        {question.noOfComment} comments
                                                    </h4>
                                                    <DisplayQComments key={question._id} question={question} questionId={id} />

                                                </section>
                                            )
                                        }

                                        <section className='post-comment-container'>
                                            <h5 className="comment-h5">Add Comment</h5>
                                            <form onSubmit={(e) => { handlePosComment(e, question.comments.length) }}>
                                                <textarea name="" id="" cols="30" rows="2" onChange={e => setComments(e.target.value)}></textarea>
                                                <input type="submit" className='post-ans-btn' value='Post Your Comment' />
                                            </form>
                                        </section>

                                    </section>
                                    {
                                        question.noOfAnswers !== 0 && (
                                            <section>
                                                <h3>
                                                    {question.noOfAnswers} answers
                                                </h3>
                                                <DisplayAnswer key={question._id} question={question} handleShare={handleShare} />

                                            </section>
                                        )
                                    }
                                    <section className='post-ans-container'>
                                        <h3>Your Answer</h3>
                                        <form onSubmit={(e) => { handlePostAns(e, question.answer.length) }}>
                                            <textarea name="" id="" cols="30" rows="10" onChange={e => setAnswer(e.target.value)}></textarea>
                                            <input type="submit" className='post-ans-btn' value='Post Your Answer' />
                                        </form>
                                        <p>
                                            Browze other question tags
                                            {
                                                question.questionTags.map((tag) => (
                                                    <Link to='/Tags' key={tag} className='ans-tags'> {tag} </Link>
                                                ))
                                            } or
                                            <Link to='/AskQuestion' style={{ textDecoration: "none", color: "#009dff" }}> ask your own question </Link>
                                        </p>
                                    </section>
                                </div>))
                        }
                    </>
            }
        </div>
    )
}

export default QuestionsDetails