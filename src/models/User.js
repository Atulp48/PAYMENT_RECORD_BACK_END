import mongoose from "mongoose";

const modschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

const User = new mongoose.model("User", modschema);

export default User;




