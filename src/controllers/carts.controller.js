import TicketDTO from "../dao/DTOs/Ticket.dto.js";
import {
  cartsService,
  productsService,
  ticketsService,
} from "../repositories/index.js";
import { v4 as uuidv4 } from "uuid";

const createCart = async (req, res) => {
  const { products } = req.body;
  if (!products) {
    return res.status(400).json({ status: "error", message: "Missing data" });
  }
  const addedCart = await cartsService.createCart(req.body);
  res.status(201).json({ status: "ok", data: addedCart });
};

const getCartById = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsService.getCartById(cid).populate("products.product");
  res.status(200).json({ status: "ok", data: cart });
};

const updateCart = async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;
  if (!products) {
    return res.status(400).json({ status: "error", message: "Missing data" });
  }
  const cart = await cartsService.getCartById(cid);
  cart.products = products;
  await cartsService.updateCart(cid, cart);
  res.status(200).json({ status: "ok", data: cart });
};

const deleteCart = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsService.getCartById(cid);
  cart.products = [];
  await cartsService.updateCart(cid, cart);
  res.sendStatus(204);
};

const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartsService.getCartById(cid);
  const product = cart.products.find((prod) => prod.product == pid);
  if (product) {
    const indexProduct = cart.products.indexOf(product);
    cart.products[indexProduct].quantity++;
  } else {
    cart.products.push({ product: pid, quantity: 1 });
  }
  await cartsService.updateCart(cid, cart);
  res.status(200).json({ status: "ok", data: cart });
};

const deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartsService.getCartById(cid);
  const product = cart.products.find((prod) => prod.product == pid);
  if (!product) {
    return res
      .status(400)
      .json({ status: "error", message: "Product not found" });
  }
  const index = cart.products.indexOf(product);
  cart.products.splice(index, 1);
  await cartsService.updateCart(cid, cart);
  res.status(200).json({ status: "ok", data: cart });
};

const updateQuantityOfProduct = async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartsService.getCartById(cid);
  const product = cart.products.find((prod) => prod.product == pid);
  if (!product) {
    return res
      .status(400)
      .json({ status: "error", message: "Product not found" });
  }
  const index = cart.products.indexOf(product);
  const { quantity } = req.body;
  cart.products[index].quantity = quantity;
  await cartsService.updateCart(cid, cart);
  res.status(200).json({ status: "ok", data: cart });
};

const purchaseCart = async (req, res) => {
  const { cid } = req.params;
  const { purchaser } = req.body;
  const cart = await cartsService.getCartById(cid).populate("products.product");
  const notInStock = [];
  let amount = 0;
  const updatePromises = cart.products.map(async (e, index) => {
    const product = e.product;
    if (e.quantity <= product.stock) {
      product.stock -= e.quantity;
      await productsService.updateProduct(product._id, product);
      amount += product.price * e.quantity;
    } else {
      notInStock.push(product._id);
      cart.products.splice(index, 1);
    }
  });
  await Promise.all(updatePromises);
  const code = uuidv4();
  const datetime = new Date();
  const ticket = new TicketDTO({ code, datetime, amount, purchaser });
  await cartsService.updateCart(cid, cart);
  const result = await ticketsService.createTicket(ticket);
  res.status(201).json({ status: "ok", data: result, notInStock });
};

export default {
  createCart,
  getCartById,
  updateCart,
  deleteCart,
  addProductToCart,
  deleteProductFromCart,
  updateQuantityOfProduct,
  purchaseCart,
};
