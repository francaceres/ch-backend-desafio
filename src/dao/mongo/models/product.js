import mongoose from "mongoose";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  status: Boolean,
  thumbnails: Array,
  code: {
    type: String,
    unique: true,
  },
  stock: Number,
});

const productModel = mongoose.model(productsCollection, productSchema);
export default productModel;
