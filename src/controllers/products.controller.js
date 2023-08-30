import { productsService } from "../repositories/index.js";

const getProducts = async (req, res) => {
  let { limit = 10, page = 1, filter = null, sort = null } = req.query;
  if (filter) {
    filter = JSON.parse(filter);
  }
  const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } =
    await productsService.paginateProducts(limit, page, filter, sort);
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
};

const addProduct = async (req, res) => {
  const { title, description, price, code, stock } = req.body;
  if (!title || !description || !price || !code || !stock) {
    return res.status(400).json({ status: "error", message: "Missing data" });
  }
  const product = req.body;
  const addedProduct = await productsService.addProduct(product);
  res.status(201).json({ status: "ok", data: addedProduct });
  // io.emit("productUpdate", await productsManager.getProducts());
};

const getProductById = async (req, res) => {
  const { pid } = req.params;
  const product = await productsService.getProductById(pid);
  res.status(200).json({ status: "ok", data: product });
};

const updateProduct = async (req, res) => {
  const { title, description, price, code, stock } = req.body;
  if (!title || !description || !price || !code || !stock) {
    return res.status(400).json({ status: "error", message: "Missing data" });
  }
  const { pid } = req.params;
  const newProduct = req.body;
  await productsService.updateProduct(pid, newProduct);
  res.status(200).json({ status: "ok", data: newProduct });
  // io.emit("productUpdate", await productsManager.getProducts());
};

const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  await productsService.deleteProduct(pid);
  res.sendStatus(204);
  // io.emit("productUpdate", await productsManager.getProducts());
};

export default {
  getProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
