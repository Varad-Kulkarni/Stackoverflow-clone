import React, { useState } from 'react'
import './Questions.css'
import { deleteComment, editComment } from '../../actions/question';

import moment from 'moment';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const DisplayComment = ({ ans, questionId }) => {

    // console.log(questionId);

    const { id } = useParams();
    const dispatch = useDispatch();
    const [Switch, setSwitch] = useState(false)
    const [Com, setCom] = useState('');
    const [Comment, setComment] = useState('')

    const handleDelete = (commentId, noOfComments, questionId) => {
        const questionI = questionId;
        const ansId = ans._id;
        dispatch(deleteComment(id, commentId, noOfComments - 1, questionI, ansId))
    }

    const handleEditComment = (e, commentId) => {
        e.preventDefault();
        const ansId = ans._id;
        // const questionId = question._id;
        const commentBody = Comment
        if(commentBody === '') {
            alert('Enter a comment before submitting');
        }
        dispatch(editComment(id, commentId, ansId, commentBody))
        setSwitch(false);
        setCom('');
    }

    const User = useSelector((state) => (state.currentUserReducer));
    return (<div>
        {ans.comment.map((comment) => (
            <div className="display-comment" key={comment._id}>
                <h5 className='comment-h5' style={{ color: "blue" }}>{comment.userCommented} <span style={{ color: "gray" }}>commented {moment(comment.commentedOn).fromNow()}</span></h5>
                <p className='comment-p'>{comment.commentBody}</p>
                <div className="question-actions-user">
                    <div className='comment-div'>
                        {/* <button type="button">Edit</button> */}
                        {
                            User?.result?._id === comment.userId && !Switch && (
                                // <button type='button' onClick={() => setSwitch(true)}>Edit</button>
                                <button type='button' onClick={() => {setSwitch(true); setCom(comment._id);}}>Edit</button>
                            )
                        }
                        {
                            User?.result?._id === comment.userId && !Switch && (
                                <button type='button' onClick={() => handleDelete(comment._id, ans.noOfComments, questionId)}>Delete</button>
                            )
                        }
                    </div>
                </div>
                <>
                  {
                      Switch && Com === comment._id ? (
                        <section className='post-comment-container'>
                        <h5 className="comment-h5">Edit Comment</h5>
                        <form onSubmit={(e) => { handleEditComment(e, comment._id) }}>
                            <textarea name="" id="" cols="30" rows="2" onChange = {e => setComment(e.target.value)}></textarea>
                            <input type="submit" className='post-ans-btn' value='Update comment' />
                            {/* <button type='button' className='user-cancel-btn' onClick={() => {setSwitch(false); setCom('');}}>Cancel</button> */}
                            <button type='button' className='flag-button-cancel' onClick={() => {setSwitch(false); setCom('');}}>Cancel</button>
                        </form>
                        </section>
                      ): (
                          <></>
                      )
                  }
                </>
                <hr className="comment-hr" />
            </div>
        ))}
    </div>
    )
}

export default DisplayComment