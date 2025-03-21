import express from 'express'
import passport from 'passport';
import {isOwner, authenticateUser} from '../utils/auth.user.js';

import {showPostController,editPostController, postController, postUploadController, userController,updatePostController, deletePostController, orderPostController } from '../controllers/post.controller.js';


// import { signupUser, registerUser, loginUser,loginUserController, logOutUser } from '../controllers/user.controller.js';





const router = express.Router()


router.get('/home', userController)

router.get('/post',authenticateUser, postController)

router.post('/post',authenticateUser, postUploadController)

router.get('/edit/:id',authenticateUser,isOwner, editPostController)

router.patch('/post/:id',authenticateUser,isOwner, updatePostController)

router.delete('/delete/:id',authenticateUser, isOwner,deletePostController)

router.get('/show/:id', showPostController)

router.get('/order/:id',authenticateUser, orderPostController)


//user signup and login routes
// router.get('/signup', signupUser)

// router.post('/signup', registerUser)

// router.get('/login', loginUser)

// router.get('/logout',authenticateUser, logOutUser)

// router.post('/login',passport.authenticate("local", {
//   failureRedirect: "/artistans/v2/login",
//   failureFlash: true,
// }), loginUserController)



export default router