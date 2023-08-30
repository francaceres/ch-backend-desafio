import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";

const router = Router();

router.post("/", cartsController.createCart);

router
  .route("/:cid")
  .get(cartsController.getCartById)
  .put(cartsController.updateCart)
  .delete(cartsController.deleteCart);

router.post("/:cid/purchase", cartsController.purchaseCart);

router
  .route("/:cid/product/:pid")
  .post(cartsController.addProductToCart)
  .delete(cartsController.deleteProductFromCart)
  .put(cartsController.updateQuantityOfProduct);

export default router;
