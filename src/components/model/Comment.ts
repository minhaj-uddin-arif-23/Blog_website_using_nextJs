import mongoose, { Schema, models } from "mongoose";

const commentSchema = new Schema({
  postId: { type: String, required: true },
  name: String,
  email: String,
  image: String,
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
