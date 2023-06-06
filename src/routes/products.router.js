import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();

const products = new ProductManager("./data/products.json");

router
  .route("/")
  .get(async (req, res) => {
    let data = await products.getProducts();
    const { limit } = req.query;
    if (limit) {
      data = data.slice(0, limit);
    }
    res.send(data);
  })
  .post(async (req, res) => {
    res.status(201).json(await products.addProduct(req.body));
  });

router
  .route("/:pid")
  .get(async (req, res) => {
    const { pid } = req.params;
    res.send(await products.getProductById(pid));
  })
  .put(async (req, res) => {
    const { pid } = req.params;
    res.json(await products.updateProduct(pid, req.body));
  })
  .delete(async (req, res) => {
    const { pid } = req.params;
    res.json(await products.deleteProduct(pid));
  });

export default router;
