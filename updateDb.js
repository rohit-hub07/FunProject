const Post = require("./models/Post.model")

db.posts.updateMany(
  { isPrivate: { $exists: false } },
  { $set: { isPrivate: false } }
)