import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import { checkRole } from "../middlewares/index.js";

const router = Router();

router.post("/", checkRole(["User", "Premium"]), cartsController.createCart);

router
  .route("/:cid")
  .get(cartsController.getCartById)
  .put(cartsController.updateCart)
  .delete(cartsController.deleteCart);

router.post("/:cid/purchase", cartsController.purchaseCart);

router
  .route("/:cid/product/:pid")
  .post(checkRole(["User", "Premium"]), cartsController.addProductToCart)
  .delete(cartsController.deleteProductFromCart)
  .put(cartsController.updateQuantityOfProduct);

export default router;
