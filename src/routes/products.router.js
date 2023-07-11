import { Router } from "express";
import ProductManager from "../dao/mongo/manager/products.js";

const router = Router();

const productsManager = new ProductManager();

const productRouter = (io) => {
  router
    .route("/")

    .get(async (req, res) => {
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

      res.status(200).json({
        status: "ok",
        data: docs,
        page: rest.page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        prevLink,
        nextLink,
      });
    })

    .post(async (req, res) => {
      const { title, description, price, code, stock } = req.body;

      if (!title || !description || !price || !code || !stock) {
        return res
          .status(400)
          .json({ status: "error", message: "Missing data" });
      }
      const product = req.body;
      const addedProduct = await productsManager.addProduct(product);
      res.status(201).json({ status: "ok", data: addedProduct });
      io.emit("productUpdate", await productsManager.getProducts());
    });

  router
    .route("/:pid")

    .get(async (req, res) => {
      const { pid } = req.params;
      const product = await productsManager.getProductById(pid);
      res.status(200).json({ status: "ok", data: product });
    })

    .put(async (req, res) => {
      const { title, description, price, code, stock } = req.body;
      if (!title || !description || !price || !code || !stock) {
        return res
          .status(400)
          .json({ status: "error", message: "Missing data" });
      }
      const { pid } = req.params;
      const newProduct = req.body;
      await productsManager.updateProduct(pid, newProduct);
      res.status(200).json({ status: "ok", data: newProduct });
      io.emit("productUpdate", await productsManager.getProducts());
    })

    .delete(async (req, res) => {
      const { pid } = req.params;
      await productsManager.deleteProduct(pid);
      res.sendStatus(204);
      io.emit("productUpdate", await productsManager.getProducts());
    });

  return router;
};

export default productRouter;
