// import express from 'express'
// import { postAnswer } from '../controllers/Answers.js'

// const router = express.Router();

// router.patch('/post/:id', postAnswer);

// export default router;



import express from "express"

import { postAnswer, deleteAnswer } from '../controllers/Answers.js'
// import auth from '../middleware/auth.js'

const router = express.Router();

router.patch('/post/:id', postAnswer)
router.patch('/delete/:id', deleteAnswer)

export default router