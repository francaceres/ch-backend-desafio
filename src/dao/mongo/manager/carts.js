import cartModel from "../models/cart.js";

export default class CartMongoManager {
  constructor() {}

  getCarts = () => {
    return cartModel.find().lean();
  };

  getCartById = (id) => {
    return cartModel.findById(id).lean();
  };

  createCart = (products) => {
    return cartModel.create(products);
  };

  updateCart = (id, cart) => {
    return cartModel.findByIdAndUpdate(id, cart);
  };
}
