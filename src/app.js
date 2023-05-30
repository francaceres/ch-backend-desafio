import express from "express";
const app = express();
import ProductManager from "./ProductManager.js";

const products = new ProductManager("./data/data.json");

app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  let data = await products.getProducts();
  const { limit } = req.query;
  if (limit) {
    data = data.slice(0, limit);
  }
  res.send(data);
});

app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const data = await products.getProductById(pid);
  res.send(data);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
