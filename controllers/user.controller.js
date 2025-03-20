import User from "../models/User.model.js";
import { v4 as uuidv4 } from 'uuid';
import { setUser } from "../utils/auth.middleware.js";

const signupUser = async (req, res) => {
  try {
    res.render("./user/signup");
  } catch (err) {
    res.status(401).json({
      message: "Can't find singup page!",
    });
  }
};

const registerUser = async (req, res) => {
  const userCredentials = req.body;
  // console.log(userCredentials);
  try {
    const user = await User.create({
      name: userCredentials.name,
      email: userCredentials.email,
      password: userCredentials.password,
    });

    if (!user) {
      return res.status(400).json({
        message: "Something went wrong!",
      });
    }

    await user.save();
    res.redirect("/artistans/v2/home");
  } catch (err) {
    res.status(401).json({
      message: "User not registered!",
      err,
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  res.render("./user/login");
};

const checkLoginDetails = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter all the details!",
    });
  }
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.render('./user/login',{
        error: "Invalid email or password",
      })
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uuid', sessionId);
    res.redirect('/artistans/v2/home')
  } catch (err) {
    res.status(401).json({
      message: "Sonething went wrong!",
      err,
      success: false,
    })
  }
};

export { signupUser, registerUser, loginUser, checkLoginDetails };
