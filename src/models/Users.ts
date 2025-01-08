import mongoose, { Schema } from "mongoose";

const UsersSchema = new Schema({
  first_name: String,
  last_name: String,
  passion: {
    type: String,
    unique: true,
    required: true,
  },
});

export default mongoose.model("Users", UsersSchema);
