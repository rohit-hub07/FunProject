import {showPostController,editPostController, postController, postUploadController, userController,updatePostController, deletePostController } from '../controllers/user.controller.js';

import express from 'express'



const router = express.Router()


router.get('/home', userController)

router.get('/post', postController)

router.post('/post', postUploadController)

router.get('/edit/:id', editPostController)

router.patch('/post/:id', updatePostController)

router.delete('/delete/:id', deletePostController)

router.get('/show/:id', showPostController)

export default router