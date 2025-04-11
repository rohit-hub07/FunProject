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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, {timestamps: true})

const Post = mongoose.model('Post', postSchema);

export default Post;