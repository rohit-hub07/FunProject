import express from "express";
import passport from "passport";
import { authenticateUser } from "../utils/auth.user.js";

import {
  registerUser,
  loginUser,
  loginUserController,
  logOutUser,
} from "../controllers/user.controller.js";

const router = express.Router();


router.post("/signup", registerUser);

router.get("/login", loginUser);

router.get("/logout", authenticateUser, logOutUser);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/moments/v1/login",
    failureFlash: true,
  }),
  loginUserController
);

export default router;
