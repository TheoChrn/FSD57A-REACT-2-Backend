import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  passion: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", UserSchema);
