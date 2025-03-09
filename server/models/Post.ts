import mongoose, { Document, Schema, Model } from "mongoose";

// Define the Post interface
interface IPost extends Document {
  _id: string;
  title: string;
  content: string;
  authorId: {
    _id: string;
    email: string;
  };
  createdAt: Date;
}

// Define the Post schema
const PostSchema: Schema<IPost> = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create and export the Post model
const Post: Model<IPost> = mongoose.model<IPost>("Post", PostSchema);
export default Post;
