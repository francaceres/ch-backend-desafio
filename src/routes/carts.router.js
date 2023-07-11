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

router
  .route("/:cid")
  .get(async (req, res) => {
    const { cid } = req.params;
    const cart = await cartsManager
      .getCartById(cid)
      .populate("products.product");
    res.status(200).json({ status: "ok", data: cart });
  })

  .put(async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    if (!products) {
      return res.status(400).json({ status: "error", message: "Missing data" });
    }
    const cart = await cartsManager.getCartById(cid);
    cart.products = products;
    await cartsManager.updateCart(cid, cart);
    res.status(200).json({ status: "ok", data: cart });
  })

  .delete(async (req, res) => {
    const { cid } = req.params;
    const cart = await cartsManager.getCartById(cid);
    cart.products = [];
    await cartsManager.updateCart(cid, cart);
    res.sendStatus(204);
  });

router
  .route("/:cid/product/:pid")
  .post(async (req, res) => {
    const { cid, pid } = req.params;
    const cart = await cartsManager.getCartById(cid);
    const product = cart.products.find((prod) => prod.product == pid);
    if (product) {
      const indexProduct = cart.products.indexOf(product);
      cart.products[indexProduct].quantity++;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }
    await cartsManager.updateCart(cid, cart);
    res.status(200).json({ status: "ok", data: cart });
  })

  .delete(async (req, res) => {
    const { cid, pid } = req.params;
    const cart = await cartsManager.getCartById(cid);
    const product = cart.products.find((prod) => prod.product == pid);
    if (!product) {
      return res
        .status(400)
        .json({ status: "error", message: "Product not found" });
    }
    const index = cart.products.indexOf(product);
    cart.products.splice(index, 1);
    await cartsManager.updateCart(cid, cart);
    res.status(200).json({ status: "ok", data: cart });
  })

  .put(async (req, res) => {
    const { cid, pid } = req.params;
    const cart = await cartsManager.getCartById(cid);
    const product = cart.products.find((prod) => prod.product == pid);
    if (!product) {
      return res
        .status(400)
        .json({ status: "error", message: "Product not found" });
    }
    const index = cart.products.indexOf(product);
    const { quantity } = req.body;
    cart.products[index].quantity = quantity;
    await cartsManager.updateCart(cid, cart);
    res.status(200).json({ status: "ok", data: cart });
  });

export default router;
