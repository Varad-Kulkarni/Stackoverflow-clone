import React, { useState } from 'react'
import moment from 'moment';
import Avatar from '../../components/Avatar/Avatar'
import { Link, useParams, useNavigate } from 'react-router-dom'
import './Questions.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAnswer } from '../../actions/question';
import DisplayComment from './DisplayComment'
import { postComment } from '../../actions/question'

const DisplayAnswer = ({ question, handleShare }) => {

    const User = useSelector((state) => (state.currentUserReducer));

    const [Comment, setComment] = useState('')
    const Navigate = useNavigate();

    const { id } = useParams();
    const dispatch = useDispatch();

    const handleDelete = (answerId, noOfAnswers) => {
        dispatch(deleteAnswer(id, answerId, noOfAnswers - 1))
    }

    const getAge = (date) => {
        var birthday = +new Date(date);
        return ~~((Date.now() - birthday) / (31557600000));
    }

    const handlePostComment = (e, commentLength, userIda) => {
        e.preventDefault();
        if(User === null) {
            alert("login or signup to comment");
            Navigate('/Auth');
        }
        else {
            if(Comment === '') {
                alert('Enter a comment before submitting');
            }
            else {
                // console.log(id+ " " +(commentLength+1)+ " " +Comment + " " + User.result.name)
                dispatch(postComment({ id, noOfComments: commentLength+1, commentBody: Comment, userCommented: User.result.name, userId: User?.result?._id, commentedOn: Date.now(), answeredId: userIda }))
            }
        }
    } 

    const questionId = id;

    return (
        <div>
            {
                question.answer.map((ans) => (
                    <div className="display-ans" key={ans._id}>
                        <p>{ans.answerBody}</p>
                        <div className="question-actions-user">
                            <div>
                                <button type="button" onClick={handleShare}>Share</button>
                                {
                                    User?.result?._id === ans.userId && (
                                        <button type='button' onClick={() => handleDelete(ans._id, question.noOfAnswers)}>Delete</button>
                                    )
                                }
                                {/* <button type="button">Delete</button> */}
                            </div>
                            <div>
                                <p>answer {moment(ans.answeredOn).fromNow()}</p>
                                <Link to={`/Users/${ans.userId}`} className='user-link' style={{ color: '#0086d8' }}>
                                    <Avatar backgroundColor="green" px='8px' py='5px'>
                                        {/* {ans.userAnswered.charAt(0).toUpperCase()} */}
                                        {ans.userAnswered.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <div>
                                        {/* {question.userPosted} */}
                                        {ans.userAnswered}
                                        {/* {console.log(ans.dob)} */}
                                    </div>

                                    {/* <div className="age-user"> , 39 yrs old</div> */}
                                </Link>
                                <div className="age-user">{getAge(ans.dob)} years old</div>
                            </div>
                        </div>

                        {
                            ans.noOfComments !== 0 && (
                                <section>
                                    <h4 className="comment-h4">
                                        {/* {ans.noOfComments} comments */}
                                        {ans.noOfComments} comments
                                    </h4>
                                    <DisplayComment key={ans._id} ans={ans} questionId={id} />

                                </section>
                            )
                        }

                        <section className='post-comment-container'>
                            <h5 className="comment-h5">Add Comment</h5>
                            <form onSubmit={(e) => { handlePostComment(e, ans.comment.length, ans._id) }}>
                                <textarea name="" id="" cols="30" rows="2" onChange = {e => setComment(e.target.value)}></textarea>
                                <input type="submit" className='post-ans-btn' value='Post Your Comment' />
                            </form>
                        </section>

                    </div>
                ))
            }
        </div>
    )
}

export default DisplayAnswer