import productService from "./products.service.js";
import ProductMongoManager from "../dao/mongo/manager/products.js";
import cartService from "./carts.service.js";
import CartMongoManager from "../dao/mongo/manager/carts.js";

export const productsService = new productService(new ProductMongoManager());
export const cartsService = new cartService(new CartMongoManager());
