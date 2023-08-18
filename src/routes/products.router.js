import { Router } from "express";
import productsController from "../controllers/products.controller.js";

const router = Router();

const productsRouter = () => {
  router
    .route("/")
    .get(productsController.getProducts)
    .post(productsController.addProduct);

  router
    .route("/:pid")
    .get(productsController.getProductById)
    .put(productsController.updateProduct)
    .delete(productsController.deleteProduct);

  return router;
};

export default productsRouter;
