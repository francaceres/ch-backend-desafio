import cartModel from "../models/cart.js";

export default class CartManager {
  getCarts = () => {
    return cartModel.find().lean();
  };

  getCartById = (id) => {
    return cartModel.findById(id);
  };

  createCart = (products) => {
    return cartModel.create(products);
  };

  addProductToCart = (id, cart) => {
    return cartModel.findByIdAndUpdate(id, cart);
  };
}
