import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import { checkRole } from "../middlewares/index.js";

const router = Router();

const productsRouter = () => {
  router
    .route("/")
    .get(productsController.getProducts)
    .post(productsController.addProduct);

  router.get("/mockingproducts", productsController.getMockedProducts);

  router
    .route("/:pid")
    .get(productsController.getProductById)
    .put(productsController.updateProduct)
    .delete(productsController.deleteProduct);

  return router;
};

export default productsRouter;
