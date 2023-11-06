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
  last_connection: String,
});

const userModel = mongoose.model(usersCollection, userSchema);
export default userModel;
