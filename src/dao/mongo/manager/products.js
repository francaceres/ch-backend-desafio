import productModel from "../models/product.js";

export default class ProductMongoManager {
  constructor() {}

  getProducts = () => {
    return productModel.find().lean();
  };

  paginateProducts = (limit, page, filter, sort) => {
    return productModel.paginate(filter, { limit, page, sort, lean: true });
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
