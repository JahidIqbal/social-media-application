import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAd: {
    type: Date,
    default: new Date(),
  },
});

//to turn it into a model
const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
