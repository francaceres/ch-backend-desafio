import { Router } from "express";
import ProductManager from "../dao/mongo/manager/products.js";
import MessageManager from "../dao/mongo/manager/messages.js";

const router = Router();

const productsManager = new ProductManager();
const messagesManager = new MessageManager();

const viewsRouter = (io) => {
  router.get("/", async (req, res) => {
    const data = await productsManager.getProducts();
    res.render("home", { products: data, style: "styles.css" });
  });

  router.get("/realtimeproducts", async (req, res) => {
    const data = await productsManager.getProducts();
    res.render("realTimeProducts", { products: data, style: "styles.css" });
  });

  router.route("/chat").get(async (req, res) => {
    res.render("chat", { style: "styles.css" });
  });

  return router;
};

export default viewsRouter;
