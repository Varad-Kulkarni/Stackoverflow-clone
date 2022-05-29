import Questions from '../models/Questions.js'
import mongoose from 'mongoose'


export const AskQuestion = async (req, res) => {
    const postQuestionData = req.body;
    const userId = req.userId;
    const post = req.body;
    // const postQuestion = new Questions({ ...postQuestionData, userId: req.userId});
    const postQuestion = new Questions(postQuestionData);

    try{
        await postQuestion.save();
        res.status(200).json("posted a question successfully");
    }
    catch(err){
        console.log(err);
        res.status(409).json("could not post a new question")
    }
}

export const getAllQuestions = async (req, res) => {
    try {
        const questionList = await Questions.find();
        res.status(200).json(questionList);
    }
    catch(err){
        res.status(400).json({ message: err.message});
    }
}

export const deleteQuestion = async(req, res) => {
    const { id:_id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Question unavailable...');
    }
    try {
        await Questions.findByIdAndRemove(_id);
        res.status(200).json({ message: "successfully deleted..." });
    }
    catch(err) {
        res.status(404).json({ message: "err.message"});
    }
}