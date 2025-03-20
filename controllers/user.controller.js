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
  const {username, email, password } = req.body;
  // console.log(userCredentials);
  try {
    const user = new User({
      username,
      email,
    });
    console.log(user)
    const registeredUser = await User.register(user,password);
    console.log(registeredUser)
    req.flash("success", "Registration successful! Please log in.");
    res.redirect("/artistans/v2/login");

  } catch (err) {
    req.flash("error", err.message);
    console.log(err)
    // res.redirect("/artistans/v2/signup");
    res.send("Something went wrong")
  }
};

const loginUser = async (req, res) => {
  res.render("./user/login");
};

const logOutUser = async(req, res, next) => {
  req.logout((err) =>{
    if(err){
      next(err);
    }
    req.flash("success", "Logout Successful")
    res.redirect('/artistans/v2/home')
  })
}

const loginUserController = async (req, res) => {

  req.flash("success","User loggedIn successful!");

  res.redirect("/artistans/v2/home");
};

export { signupUser, registerUser, loginUser,loginUserController, logOutUser };
