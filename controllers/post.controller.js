import { log } from "console";
import Post from "../models/Post.model.js";
import { isOwner } from "../utils/auth.user.js";
import User from "../models/User.model.js";

const userController = async (req, res) => {
  let allPosts = await Post.find({}).populate("owner");
  const visiblePosts = allPosts.filter(p => !p.hidePost);
  res.render("./posts/home", { allPosts:visiblePosts, isOwner });
};

const postController = (req, res) => {
  res.render("./posts/post");
};

const postUploadController = async (req, res) => {
  try {
    const post = req.body;
    let url = req.file.path;
    if (!url) {
      return res.status(400).json({
        message: "Please provide image!",
      });
    }
    const user = req.user._id;
    const owner = await User.findById(user);
    if (!owner) {
      return req.flash("error", "Post owner is not defined!");
    }
    // console.log(owner);
    // console.log(post);
    if (!user) {
      return req.flash("error", "User not found!");
    }

    if (!post.title || !post.description) {
      return req.flash("error", "Please fill all the details!");
    }

    const newPost = await new Post({
      imageUrl: url,
      title: post.title,
      description: post.description,
      owner: user,
      ownername: owner.username,
    });
    // console.log(newPost);
    if (!newPost) {
      return req.flash("error", "Some error occured!");
    }
    await newPost.save();
    req.flash("success", "New post created!");
    res.redirect("/moments/v1/home");
  } catch (error) {
    return req.flash("error", "Something went wrong while uploading post!");
  }
};

const editPostController = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const post = await Post.findById({ _id: id });
    // console.log(post);
    if (!post) {
      return req.flash("error", "Post doesn't exist!");
    }
    res.render("./posts/edit", { post });
  } catch (err) {
    return req.flash("error", "Something went wrong!");
  }
};

const updatePostController = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    // console.log(req.body);
    const post = await Post.findById(id);
    if (!post) {
      req.flash("error", "Post doesn't exist");
      return res.redirect("/moments/v1/home");
    }

    // Update the text fields
    post.title = title;
    post.description = description;

    // Update the image if available.
    if (req.file) {
      post.imageUrl = req.file.path;
    }

    await post.save();
    req.flash("success", "Post updated successfully!");
    res.redirect("/moments/v1/home");
  } catch (err) {
    return req.flash("error", "Something went wrong while updating the post!");
  }
};

const deletePostController = async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  if (!id) {
    return req.flash("error", "Post doesn't exist with the given Id!");
  }
  const post = await Post.findByIdAndDelete({ _id: id });
  if (!post) {
    return req.flash("error", "Post doesn't exist!");
  }
  req.flash("success", "Post deleted successfully!");
  res.redirect("/moments/v1/home");
};

const showPostController = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return req.flash("error", "Invalid Id!");
    }
    const post = await Post.findById({ _id: id });
    // console.log(post)
    if (!post) {
      return req.flash("error", "Post doesn't exist!");
    }
    res.render("./posts/show", { post });
    // console.log("Inside show route currUser",currUser)
  } catch (err) {
    return req.flash("error", "Something went wrong while showing the post!");
  }
};

const orderPostController = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return req.flash("error", "Invalid Id!");
    }

    const post = await Post.findById({ _id: id });
    if (!post) {
      return res.status(400).json({
        message: "Picture is not available",
        success: false,
      });
    }

    res.render("./posts/order", { post });
  } catch (err) {
    res.status(401).json({
      message: "Something went wrong!",
      err,
      success: false,
    });
  }
};

const hidePostController = async(req, res) => {
  const { id} = req.params;
  try {
    const post = await Post.findById({_id: id});
    if(!post){
      return req.flas("error", "Post doesn't exist");
    }

    post.hidePost = true;
    console.log("Hidden post: ",post)
    req.flash("success", "Post hidden Successfully!");
    await post.save();
    res.redirect("/moments/v1/home");
  } catch (error) {
    return req.flas("error", "Post doesn't exist"); 
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
  orderPostController,
  hidePostController
};
