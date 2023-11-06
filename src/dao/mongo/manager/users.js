import userModel from "../models/user.js";

export default class UserMongoManager {
  getUsers = () => {
    return userModel.find().lean();
  };
  registerUser = (user) => {
    return userModel.create(user);
  };
  getUser = (data) => {
    return userModel.findOne(data);
  };
  getUserById = (id) => {
    return userModel.findById(id).lean();
  };
  updateUser = (id, user) => {
    return userModel.findByIdAndUpdate(id, user);
  };
  deleteUser = (id) => {
    return userModel.findByIdAndDelete(id);
  };
}
