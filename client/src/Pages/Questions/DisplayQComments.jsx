import React, { useState } from 'react'
import './Questions.css'
import { deleteQComment, editQComment } from '../../actions/question';

import moment from 'moment';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const DisplayQComments = ({ question }) => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [Switch, setSwitch] = useState(false)
    const [Com, setCom] = useState('');
    const [Comment, setComment] = useState('')

    const handleDelete = (commentId, noOfComments) => {
        dispatch(deleteQComment(id, commentId, noOfComments - 1))
    }

    const handleEditComment = (e, commentId) => {
        e.preventDefault();
        const commentBody = Comment
        if(commentBody === '') {
            alert('Enter a comment before submitting');
        }
        dispatch(editQComment(id, commentId, commentBody))
        setSwitch(false); 
        setCom('');
    }

    const User = useSelector((state) => (state.currentUserReducer));
    return (<div>
        {question.comments.map((comment) => (
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
                                <button type='button' onClick={() => handleDelete(comment._id, question.noOfComment)}>Delete</button>
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
                            {/* <button type='button' className='user-cancel-btn' onClick={() => {setSwitch(false); setCom('');}}>Cancel llll</button> */}
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

export default DisplayQComments