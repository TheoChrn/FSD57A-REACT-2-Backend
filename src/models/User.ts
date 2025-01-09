import Post from "../models/Post";
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
});

UserSchema.pre(
  "deleteMany",
  { document: false, query: true },
  async function (next) {
    const filter = this.getFilter();

    const users = filter._id || [];

    if (users.length > 0) {
      const posts = await Post.find({ userId: { $in: users } });

      if (posts.length > 0) {
        await Post.deleteMany({ user: { $in: users } });
      }
    }

    next();
  }
);

export default mongoose.model("User", UserSchema);
