import mongoose from 'mongoose'
import User from './User.model.js';
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    validate : {
      validator : Number.isInteger,
      message   : '{VALUE} is not an integer value'
    }
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})

const Post = mongoose.model('Post', postSchema);

export default Post;