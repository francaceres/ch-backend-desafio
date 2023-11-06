import { Router } from "express";
import ProductManager from "../dao/mongo/manager/products.js";
import CartManager from "../dao/mongo/manager/carts.js";
import { ticketsService, usersService } from "../repositories/index.js";
import { checkRole } from "../middlewares/index.js";

const router = Router();

const productsManager = new ProductManager();
const cartsManager = new CartManager();

const authLoggedIn = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  return res.render("error");
};

const authNotLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  return res.render("error");
};

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
      user: req.session.user,
    });
  });

  router.get("/register", authNotLoggedIn, (req, res) => {
    res.render("register", { style: "styles.css" });
  });

  router.get("/login", authNotLoggedIn, (req, res) => {
    res.render("login", { style: "styles.css" });
  });

  router.get("/profile", authLoggedIn, (req, res) => {
    if (req.session.user) {
      res.render("profile", { user: req.session.user });
    } else {
      res.render("error");
    }
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
    let totalPrice = 0;
    data.products.forEach((prod) => {
      totalPrice += prod.product.price * prod.quantity;
    });
    res.render("cart", { cart: data, totalPrice, style: "styles.css" });
  });

  router.get("/user/:uid", checkRole(["Admin"]), async (req, res) => {
    const { uid } = req.params;
    const user = await usersService.getUserById(uid);
    res.render("userAdmin", { user: user, style: "styles.css" });
  });

  router.get("/ticket/:tcode", async (req, res) => {
    const { tcode } = req.params;
    const ticket = await ticketsService.getTicket(tcode);
    res.render("ticket", { ticket });
  });

  return router;
};

export default viewsRouter;
