import express from "express";
const app = express();
import products from "./routes/products.router.js";
import carts from "./routes/carts.router.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", products);
app.use("/api/carts", carts);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
