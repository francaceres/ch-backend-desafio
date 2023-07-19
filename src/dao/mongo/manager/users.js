import userModel from "../models/user.js";

export default class UserManager {
  registerUser = (user) => {
    return userModel.create(user);
  };
  getUser = (data) => {
    return userModel.findOne(data);
  };
}
