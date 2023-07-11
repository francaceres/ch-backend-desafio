import { Router } from "express";
import ProductManager from "../dao/mongo/manager/products.js";
import CartManager from "../dao/mongo/manager/carts.js";

const router = Router();

const productsManager = new ProductManager();
const cartsManager = new CartManager();

const viewsRouter = (io) => {
  router.get("/", async (req, res) => {
    let { limit = 10, page = 1, filter = null, sort = null } = req.query;
    if (filter) {
      filter = JSON.parse(filter);
    }

    const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } =
      await productsManager.paginateProducts(limit, page, filter, sort);

    let prevLink,
      nextLink = null;
    if (hasPrevPage) {
      prevLink = `/?page=${prevPage}`;
    }
    if (hasNextPage) {
      nextLink = `/?page=${nextPage}`;
    }

    res.render("home", {
      products: docs,
      page: rest.page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      prevLink,
      nextLink,
      style: "styles.css",
    });
  });

  router.get("/realtimeproducts", async (req, res) => {
    const data = await productsManager.getProducts();
    res.render("realTimeProducts", { products: data, style: "styles.css" });
  });

  router.route("/chat").get(async (req, res) => {
    res.render("chat", { style: "styles.css" });
  });

  router.get("/carts/:cid", async (req, res) => {
    const { cid } = req.params;
    const data = await cartsManager
      .getCartById(cid)
      .populate("products.product");
    res.render("cart", { cart: data, style: "styles.css" });
  });

  return router;
};

export default viewsRouter;
