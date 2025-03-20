const authenticateUser = async(req, resizeBy, next) => {
  if(req.isAuthenticated()){
    next()
  }else{
    req.flash('error', "You must login first! ")
    resizeBy.redirect('/artistans/v2/login');
  }
}

export default authenticateUser;