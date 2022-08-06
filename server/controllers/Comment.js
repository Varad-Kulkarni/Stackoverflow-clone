import mongoose from 'mongoose'
import Questions from '../models/Questions.js'

export const postComment = async(req, res) => {
    const { id: _id } = req.params;
    const { noOfComments, commentBody, userCommented, userId, commentedOn, answeredId } = req.body;


    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }
    
    updateNoOfAnswer(_id, noOfComments, answeredId)
    try {
        var answeredI = mongoose.Types.ObjectId(answeredId);
        const updatedQuestion = await Questions.findByIdAndUpdate( _id, {$addToSet: {'answer.$[i].comment': [{ commentBody, userCommented, userId, commentedOn, answeredId}]}}, {arrayFilters: [{'i._id': answeredI}]});
        res.status(200).json(updatedQuestion)
    } catch (error) {
        res.status(400).json('error in updating')
    }
}

const updateNoOfAnswer = async (_id, noOfComments, answeredId) => {
    try {
        var answeredI = mongoose.Types.ObjectId(answeredId);
        await Questions.findByIdAndUpdate( _id, { $set: { 'answer.$[i].noOfComments' : noOfComments}}, {arrayFilters: [{'i._id': answeredI}]})
    } catch (error) {
        console.log(error)
    }
}

export const deleteComment = async (req, res) => {
    const { id:_id } = req.params;
    const { commentId, noOfComments, questionId, answerId } = req.body;

    if(!mongoose.Types.ObjectId.isValid(questionId)) {
        return res.status(404).send("Question invalid...");
    }

    if(!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send("Answer invalid...");
    }

    if(!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(404).send("Comment invalid...");
    }

    updateNoOfAnswer(_id, noOfComments, answerId);

    try {
        var answeredI = mongoose.Types.ObjectId(answerId);
        var questionI = mongoose.Types.ObjectId(questionId);
        await Questions.updateOne( {_id}, {$pull: {'answer.$[i].comment': { _id: commentId}}}, {arrayFilters: [{'i._id': answeredI}]});
        res.status(200).json({ message: "Successfully deleted"});
    }
    catch(err) {
        res.status(405).json(err);
    }
}

export const editComment = async(req, res) => {
    const {id:_id} = req.params;
    const {ansId, commentId, commentBody} = req.body;

    try {
        var ansI = mongoose.Types.ObjectId(ansId);
        var commentI = mongoose.Types.ObjectId(commentId);
        const EditCom = await Questions.findByIdAndUpdate( _id, { $set: { 'answer.$[i].comment.$[j].commentBody' : commentBody}}, {arrayFilters: [{'i._id': commentI}, {'j._id': ansI}]}); 
        res.status(200).json(EditCom);
    } catch (error) {
        res.status(405).json(error);
    }
}


// ==============================================================================================================


export const postQComment = async(req, res) => {
    const { id: _id } = req.params;
    const { noOfComment, commentBody, userCommented, userId, commentedOn } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }
    
    updateNoOfQ(_id, noOfComment)
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate( _id, {$addToSet: {'comments': [{ commentBody, userCommented, userId, commentedOn}]}});
        res.status(200).json(updatedQuestion)
    } catch (error) {
        res.status(400).json('error in updating')
    }
}

const updateNoOfQ = async (_id, noOfComment) => {
    try {
        await Questions.findByIdAndUpdate( _id, { $set: { 'noOfComment' : noOfComment}})
    } catch (error) {
        console.log(error)
    }
}

export const deleteQComment = async (req, res) => {
    const { id:_id } = req.params;
    const { commentId, noOfComment } = req.body;

    if(!mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(404).send("Comment invalid...");
    }

    updateNoOfAnswer(_id, noOfComment);

    try {
        await Questions.updateOne( {_id}, {$pull: {'comments': { _id: commentId}}});
        res.status(200).json({ message: "Successfully deleted"});
    }
    catch(err) {
        res.status(405).json(err);
    }
}

export const editQComment = async(req, res) => {
    const {id:_id} = req.params;
    const {commentId, commentBody} = req.body;

    try {
        var commentI = mongoose.Types.ObjectId(commentId);
        const EditCom = await Questions.findByIdAndUpdate( _id, { $set: { 'comments.$[i].commentBody' : commentBody}}, {arrayFilters: [{'i._id': commentI}]}); 
        res.status(200).json(EditCom);
    } catch (error) {
        res.status(405).json(error);
    }
}



