import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: String,
  date: Date,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Post", PostSchema);
