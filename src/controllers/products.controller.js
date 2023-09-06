import { productsService } from "../repositories/index.js";
import CustomErrors from "../utils/errors/Custom.errors.js";
import EnumErrors from "../utils/errors/Enum.errors.js";
import {
  createProductErrorInfo,
  getElementError,
} from "../utils/errors/Info.errors.js";
import { generateProduct } from "../utils/utils.js";

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
  const { title, category, description, price, code, stock } = req.body;
  if (!title || !category || !description || !price || !code || !stock) {
    CustomErrors.createError({
      name: "Product creation error",
      cause: createProductErrorInfo({
        title,
        category,
        description,
        price,
        code,
        stock,
      }),
      message: "Error trying to create product",
      code: EnumErrors.INVALID_TYPES_ERROR,
    });
  }
  const product = req.body;
  const addedProduct = await productsService.addProduct(product);
  res.status(201).json({ status: "ok", data: addedProduct });
  // io.emit("productUpdate", await productsManager.getProducts());
};

const getProductById = async (req, res) => {
  const { pid } = req.params;
  const product = await productsService.getProductById(pid);
  if (!product) {
    CustomErrors.createError({
      name: "Find product error",
      cause: getElementError("product", pid),
      message: "Error trying to find product",
      code: EnumErrors.ERROR_ROUTING,
    });
  }
  res.status(200).json({ status: "ok", data: product });
};

const updateProduct = async (req, res) => {
  const { title, category, description, price, code, stock } = req.body;
  if (!title || !category || !description || !price || !code || !stock) {
    CustomErrors.createError({
      name: "Product update error",
      cause: createProductErrorInfo({
        title,
        category,
        description,
        price,
        code,
        stock,
      }),
      message: "Error trying to update product",
      code: EnumErrors.INVALID_TYPES_ERROR,
    });
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

const getMockedProducts = async (req, res) => {
  let products = [];
  for (let i = 0; i < 100; i++) {
    products.push(generateProduct());
  }
  res.status(200).json({ status: "ok", products });
};

export default {
  getProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getMockedProducts,
};
