import express from "express";
import multer from "multer";
import { isOwner, authenticateUser } from "../utils/auth.user.js";
import storage from "../cloudinary.config.js";
import dotenv from "dotenv";
import {
  showPostController,
  editPostController,
  postController,
  postUploadController,
  userController,
  updatePostController,
  deletePostController,
  orderPostController,
  privatePostController,
  changePostVisibility
} from "../controllers/post.controller.js";

dotenv.config();

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/home", userController);

router.get("/privateposts",authenticateUser, privatePostController);

router.get("/post", authenticateUser, postController);

router.post(
  "/post",
  authenticateUser,
  upload.single("imageUrl"),
  postUploadController
);

router.get("/edit/:id", authenticateUser, isOwner, editPostController);

router.patch("/post/:id", authenticateUser, isOwner, upload.single("imageUrl"), updatePostController);

router.delete("/delete/:id", authenticateUser, isOwner, deletePostController);

router.patch("/changepostvisibility/:id", authenticateUser, isOwner, changePostVisibility);

router.get("/show/:id", showPostController);

router.get("/order/:id", authenticateUser, orderPostController);

export default router;
