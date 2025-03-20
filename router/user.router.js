import {showPostController,editPostController, postController, postUploadController, userController,updatePostController, deletePostController, orderPostController } from '../controllers/post.controller.js';


import { signupUser, registerUser, loginUser, checkLoginDetails } from '../controllers/user.controller.js';

import checkLoginUser from '../middlewares/authMiddleware.js';

import express from 'express'



const router = express.Router()


router.get('/home', userController)

router.get('/post',checkLoginUser, postController)

router.post('/post',checkLoginUser, postUploadController)

router.get('/edit/:id',checkLoginUser, editPostController)

router.patch('/post/:id',checkLoginUser, updatePostController)

router.delete('/delete/:id',checkLoginUser, deletePostController)

router.get('/show/:id',checkLoginUser, showPostController)

router.get('/order/:id',checkLoginUser, orderPostController)


//user signup and login routes
router.get('/signup', signupUser)

router.post('/signup', registerUser)

router.get('/login', loginUser)

router.post('/login', checkLoginDetails)

export default router