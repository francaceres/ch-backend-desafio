import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router();
const carts = new CartManager("./data/carts.json");

router.post("/", async (req, res) => {
  const { products } = req.body;
  res.status(201).json(await carts.createCart(JSON.parse(products)));
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  res.send(await carts.getCartById(cid));
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  res.send(await carts.addProductToCart(cid, JSON.parse(pid)));
});

export default router;
