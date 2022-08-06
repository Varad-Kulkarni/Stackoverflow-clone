import mongoose from 'mongoose'

const QuestionSchema = mongoose.Schema({
    questionTitle: {type: String, required: "Questions must have title"},
    questionBody: {type: String, required: "Questions must have body"},
    questionTags: {type: [String], required: "Questions must have tags"},
    noOfAnswers: {type: Number, default: 0},
    upVote: {type: [String], default: []},
    downVote: {type: [String], default: []},
    userPosted: { type: String, required: "Questions must have an author"},
    userId: {type: String},
    postedOn: {type: Date, default: Date.now},
    dob: {type: String},
    answer: [{
        answerBody: String,
        userAnswered: String,
        userId: String,
        answeredOn: {type: Date, default: Date.now},
        dob: String,
        noOfComments: {type: Number, default: 0},
        comment: [{
            commentBody: String,
            userCommented: String,
            userId: String,
            commentedOn: {type: Date, default: Date.now},
            answeredId: String,
        }],
    }],
    noOfComment: {type: Number, default: 0},
    comments: [{
        commentBody: String,
        userCommented: String,
        userId: String,
        commentedOn: {type: Date, default: Date.now},
    }]
})

export default mongoose.model("Question", QuestionSchema)