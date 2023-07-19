import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    default: "User",
  },
});

const userModel = mongoose.model(usersCollection, userSchema);
export default userModel;
