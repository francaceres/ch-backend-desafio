import { Router } from "express";
import CartManager from "../dao/mongo/manager/carts.js";

const router = Router();

const cartsManager = new CartManager();

router.post("/", async (req, res) => {
  const { products } = req.body;
  if (!products) {
    return res.status(400).json({ status: "error", message: "Missing data" });
  }
  const addedCart = await cartsManager.createCart(req.body);
  res.status(201).json({ status: "ok", data: addedCart });
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsManager.getCartById(cid);
  res.status(200).json({ status: "ok", data: cart });
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartsManager.getCartById(cid);
  const product = cart.products.find((prod) => prod._id == pid);
  if (product) {
    const indexProduct = cart.products.indexOf(product);
    cart.products[indexProduct].quantity++;
  } else {
    cart.products.push({ _id: pid, quantity: 1 });
  }
  await cartsManager.addProductToCart(cid, cart);
  res.status(200).json({ status: "ok", data: cart });
});

export default router;
