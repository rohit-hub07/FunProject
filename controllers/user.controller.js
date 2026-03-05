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
  const secret = req.header("admin-secret") || "no-secret-provided";

  if (secret !== process.env.CREATE_ADMIN_SECRET) {
    return res.status(403).json({
      error: "Nice try!",
      success: false,
    });
  }

  const { username, email, role, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
      success: false,
    });
  }

  try {
    const user = new User({ username, email, role });
    await User.register(user, password);

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
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

const changePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({
      message: "Email and new password are required",
      success: false,
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    await user.setPassword(newPassword);
    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

export { signupUser, registerUser, loginUser, loginUserController, logOutUser, changePassword };
