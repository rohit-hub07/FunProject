import Post from "../models/Post.model.js";

const authenticateUser = async(req, res, next) => {
  if(req.isAuthenticated()){
    // res.locals.currUser = req.session.user;
    next()
    
  }else{
    req.flash('error', "You must login first! ")
    res.redirect('/artistans/v2/login');
  }
}

// const isAdmin = async(req, res, next) => {
  
//   if(role === "admin"){
//     next()
//   }
// }

const isOwner = async(req, res, next) => {
  const { id } = req.params;
  try{
    const post = await Post.findById({_id: id});
  if(!post){
    return req.flash("error", "Post is not accessible")
  }
  const role = res.locals.currUser.role;
  // console.log(res.locals.currUser)
  // console.log(req.user);
  // console.log(req.user._id)
  // console.log("Post owner: ",post.owner)
  if(!post.owner.equals(res.locals.currUser._id)){
    if(role ==="admin"){
      next();
    }else{
      req.flash("error", "You are not the owner of this post!");
      return res.redirect('/artistans/v2/home')
    }
    
  }
  // next();
  } catch(err){
    req.flash("error", "Something went wrong!");
    res.redirect('/artistans/v2/home')
  }
}

export  { authenticateUser, isOwner };