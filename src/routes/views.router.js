import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();

const products = new ProductManager("./data/products.json");

router.get("/", async (req, res) => {
  const data = await products.getProducts();
  res.render("home", { products: data, style: "styles.css" });
});

router.get("/realtimeproducts", async (req, res) => {
  const data = await products.getProducts();
  res.render("realTimeProducts", { products: data, style: "styles.css" });
});

export default router;
