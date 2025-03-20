import Post from "../models/Post.model.js";


const userController = async (req, res) => {
  let allPosts = await Post.find({});
  res.render("home", { allPosts });
};

const postController = (req, res) => {
  res.render("post");
};

const postUploadController = async (req, res) => {
  const post = req.body;
  // console.log(req.body)
  console.log(post);
  if (!post.imgUrl || !post.title || !post.description || !post.price) {
    return res.status(400).json({
      message: "Please fill all the details!",
    });
  }

  const newPost = await Post.create({
    imageUrl: post.imgUrl,
    title: post.title,
    price: post.price,
    description: post.description,
  });
  console.log(newPost);
  if (!newPost) {
    return res.status(400).json({
      message: "Some error occured while posting!",
    });
  }
  await newPost.save();
  res.redirect("/artistans/v2/home");
};

const editPostController = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const post = await Post.findById({ _id: id });
    console.log(post);
    if (!post) {
      return res.status(401).json({
        message: "Post doesn't exist!",
        success: false,
      });
    }
    res.render("edit", { post });
  } catch (err) {
    return res.status(401).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};

const updatePostController = async (req, res) => {
  const { id } = req.params;
  const { imageUrl, title, description, price } = req.body;
  try {
    console.log(req.body);
    if (!id) {
      return res.status(401).json({
        message: "Id is invalid",
        success: false,
      });
    }

    const post = await Post.findByIdAndUpdate(
      { _id: id },
      {
        imageUrl,
        title,
        price,
        description,
      }
    );
    if (!post) {
      return res.status(401).json({
        message: "Post doesn't exist",
        success: false,
      });
    }
    console.log(post);
    await post.save();
    res.redirect("/artistans/v2/home");
  } catch (err) {
    return res.status(401).json({
      message: "Something went wrong!",
      err,
      success: false,
    });
  }
};

const deletePostController = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  if (!id) {
    return res.status(401).json({
      message: "Id is invalid!",
      success: false,
    });
  }
  const post = await Post.findByIdAndDelete({ _id: id });
  if (!post) {
    return res.status(401).json({
      message: "Post doesn't exist!",
      success: false,
    });
  }

  res.redirect("/artistans/v2/home");
};

const showPostController = async(req,res) => {
  const { id } = req.params;
  try{
    if(!id){
      return res.status(401).json({
        message: "Invalid Id!",
      })
    }
    const post = await Post.findById({_id: id});
  
    if(!post){
      return res.status(401).json({
        message: "Post doesn't exist",
        success: false,
      })
    }
    res.render('show', {post})
  } catch(err){
    return res.status(401).json({
      message: "Something went wrong!",
      err,
      success: false,
    })
  }
}

const orderPostController = async(req, res) => {
  const { id } = req.params;
  try{
    if(!id){
      return res.status(401).json({
        message: "id is invalid!",
      })
    }
  
    const post = await Post.findById({ _id: id});
    if(!post){
      return res.status(400).json({
        message: "Picture is not available",
        success: false,
      })
    }

    res.render('order', {post})
  } catch(err){
    res.status(401).json({
      message: "Something went wrong!",
      err,
      success: false,
    })
  }
}



export {
  postController,
  userController,
  postUploadController,
  editPostController,
  updatePostController,
  deletePostController,
  showPostController,
  orderPostController
};
