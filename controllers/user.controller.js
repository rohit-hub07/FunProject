import User from "../models/User.model.js";

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
  const secret = req.header("admin-secret") || 'no-secret-provided';
  if (secret != process.env.CREATE_ADMIN_SECRET) {
    req.flash("error", "You don't have access to perform this action!");
    return res.redirect("/moments/v1/home");
  }
  const { username, email, role, password } = req.body;
  // console.log(userCredentials);
  //check for registered user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    req.flash("error", "A user already exists with the current credentials!");
    return res.redirect("/moments/v1/login");
  }
  try {
    const user = new User({
      username,
      email,
      role,
    });
    // console.log(user)
    await User.register(user, password);
    // console.log(registeredUser)
    req.flash("success", "Registration successful! Please log in.");
    res.redirect("/moments/v1/login");
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/moments/v1/signup");
  }
};

const loginUser = async (req, res) => {
  // console.log(req.user)
  res.render("./user/login");
};

const logOutUser = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "Logout Successful");
    res.redirect("/moments/v1/home");
  });
};

const loginUserController = async (req, res) => {
  // console.log(req.body)
  // console.log(req.user);
  // res.locals.currUser = req.user;
  req.flash("success", "User loggedIn successful!");
  res.redirect("/moments/v1/home");
};

export { signupUser, registerUser, loginUser, loginUserController, logOutUser };
