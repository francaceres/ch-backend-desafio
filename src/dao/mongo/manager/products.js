import productModel from "../models/product.js";

export default class ProductManager {
  getProducts = () => {
    return productModel.find().lean();
  };

  getProductById = (id) => {
    return productModel.findById(id);
  };

  addProduct = (product) => {
    return productModel.create(product);
  };

  updateProduct = (id, product) => {
    return productModel.findByIdAndUpdate(id, product);
  };

  deleteProduct = (id) => {
    return productModel.findByIdAndDelete(id);
  };
}
