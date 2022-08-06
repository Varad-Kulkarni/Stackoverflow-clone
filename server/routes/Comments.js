import express from "express"

import { postComment, deleteComment, editComment, postQComment, deleteQComment, editQComment } from '../controllers/Comment.js'
import auth from '../middlewares/auth.js'

const router = express.Router();

router.patch('/post/:id', auth, postComment)
router.patch('/delete/:id', auth, deleteComment)
router.patch('/edit/:id', auth, editComment)
router.patch('/postq/:id', auth, postQComment)
router.patch('/deleteq/:id', auth, deleteQComment)
router.patch('/editq/:id', auth, editQComment)

export default router