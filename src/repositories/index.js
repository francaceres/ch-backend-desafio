import productRepository from "./products.repository.js";
import ProductMongoManager from "../dao/mongo/manager/products.js";
import cartRepository from "./carts.repository.js";
import CartMongoManager from "../dao/mongo/manager/carts.js";
import TicketMongoManager from "../dao/mongo/manager/tickets.js";
import ticketRepository from "./tickets.repository.js";

export const productsService = new productRepository(new ProductMongoManager());
export const cartsService = new cartRepository(new CartMongoManager());
export const ticketsService = new ticketRepository(new TicketMongoManager());
