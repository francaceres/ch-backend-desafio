import cartModel from "../models/cart.js";

export default class CartManager {
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
