// import mongoose from 'mongoose';
// import Questions from '../models/Questions.js'

// export const postAnswer = async(req, res) => {
//     const { id: _id} = req.params;

//     const { noOfAnswers, answerBody, userPosted } = req.body;

//     if(!mongoose.Types.ObjectId.isValid(_id)) {
//         return res.status(404).send('question unavailable...');
//     }

//     try {
//         const updateQuestion = await Questions.findByIdAndUpdate( _id, { $addToSet: {'answer': [{ answerBody, userPosted, userId: req.userId }]} });
//         req.status(200).json(updateQuestion);
//     }
//     catch(err) {
//         // console.log(err);
//         res.status(400).json(err);
//     }
// }

// const updateNoOfQuestions = async (_id, noOfAnswers) => {
//     try {
//         await Questions.findByIdAndUpdate( _id, { $set: {'noOfAnswers' : noOfAnswers}})
//     }
//     catch(err) {
//         console.log(err);
//     }
// }


// ========================================================================================================


// import mongoose from 'mongoose'
// import Questions from '../models/Questions.js'

// export const postAnswer = async(req, res) => {
//     const { id: _id } = req.params;
//     const { noOfAnswers, answerBody, userAnswered } = req.body;
//     // const userId = req.userId;
//     if(!mongoose.Types.ObjectId.isValid(_id)){
//         return res.status(404).send('question unavailable...');
//     }
    
//     updateNoOfQuestions(_id, noOfAnswers)
//     try {
//         const updatedQuestion = await Questions.findByIdAndUpdate( _id, { $addToSet: {'answer': [{ answerBody, userAnswered, userId: req.userId }]}})
//         res.status(200).json(updatedQuestion)
//     } catch (error) {
//         res.status(400).json('error in updating')
//     }
// }

// const updateNoOfQuestions = async (_id, noOfAnswers ) => {
//     try {
//         await Questions.findByIdAndUpdate( _id, { $set: { 'noOfAnswers' : noOfAnswers}})
//     } catch (error) {
//         console.log(error)
//     }
// }






import mongoose from 'mongoose'
import Questions from '../models/Questions.js'

export const postAnswer = async(req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswers, answerBody, userAnswered, userId } = req.body;
    // const userId = req.userId;


    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }
    
    updateNoOfQuestions(_id, noOfAnswers)
    try {
        // const updatedQuestion = await Questions.findByIdAndUpdate( _id, { $addToSet: {'answer': [{ answerBody, userAnswered, userId: req.userId }]}})
        const updatedQuestion = await Questions.findByIdAndUpdate( _id, { $addToSet: {'answer': [{ answerBody, userAnswered, userId}]}})
        res.status(200).json(updatedQuestion)
    } catch (error) {
        res.status(400).json('error in updating')
    }
}

const updateNoOfQuestions = async (_id, noOfAnswers) => {
    try {
        await Questions.findByIdAndUpdate( _id, { $set: { 'noOfAnswers' : noOfAnswers}})
    } catch (error) {
        console.log(error)
    }
}

export const deleteAnswer = async (req, res) => {
    const { id:_id } = req.params;
    const { answerId, noOfAnswers } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("Question invalid...");
    }

    if(!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send("Answer invalid...");
    }

    updateNoOfQuestions(_id, noOfAnswers);

    try {
        await Questions.updateOne(
            { _id },
            { $pull: {'answer': { _id: answerId }}}
        );
        res.status(200).json({ message: "Successfully deleted"});
    }
    catch(err) {
        res.status(405).json(err);
    }
}