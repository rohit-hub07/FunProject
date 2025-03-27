import express from 'express'
import passport from 'passport';
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {isOwner, authenticateUser} from '../utils/auth.user.js';
import dotenv from 'dotenv'
import {showPostController,editPostController, postController, postUploadController, userController,updatePostController, deletePostController, orderPostController } from '../controllers/post.controller.js';

dotenv.config()

// import { signupUser, registerUser, loginUser,loginUserController, logOutUser } from '../controllers/user.controller.js';

// const multer = require(“multer”);
// const cloudinary = require(“cloudinary”).v2;
// const { CloudinaryStorage } = require(“multer-storage-cloudinary”);
// const app = express();

cloudinary.config({
 cloud_name: process.env.CLOUD_NAME,
 api_key: process.env.CLOUDINARY_API,
 api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
 cloudinary: cloudinary,
 params: {
 folder: "ArtistansProjectCollege",
 allowed_formats: ["png", "jpg", "jpeg"],
 },
});

const upload = multer({ storage: storage });



const router = express.Router()


router.get('/home', userController)

router.get('/post',authenticateUser, postController)

router.post('/post',authenticateUser,upload.single("imgUrl"), postUploadController)

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