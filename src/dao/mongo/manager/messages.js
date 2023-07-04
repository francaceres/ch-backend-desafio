import messageModel from "../models/message.js";

export default class MessageManager {
  getMessages = () => {
    return messageModel.find().lean();
  };

  addMessage = (message) => {
    return messageModel.create(message);
  };
}
