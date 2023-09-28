import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import { checkRole } from "../middlewares/index.js";

const router = Router();

const productsRouter = () => {
  router
    .route("/")
    .get(productsController.getProducts)
    .post(checkRole("admin"), productsController.addProduct);

  router.get("/mockingproducts", productsController.getMockedProducts);

  router
    .route("/:pid")
    .get(productsController.getProductById)
    .put(checkRole("admin"), productsController.updateProduct)
    .delete(checkRole("admin"), productsController.deleteProduct);

  return router;
};

export default productsRouter;
