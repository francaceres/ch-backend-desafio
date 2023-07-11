import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  price: Number,
  status: {
    type: Boolean,
    default: true,
  },
  thumbnails: {
    type: Array,
    default: [],
  },
  code: {
    type: String,
    unique: true,
  },
  stock: Number,
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productsCollection, productSchema);
export default productModel;
