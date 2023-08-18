import { Router } from "express";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import sessionsRouter from "./sessions.router.js";

const router = Router();

router.use("/products", productsRouter());
router.use("/carts", cartsRouter);
router.use("/sessions", sessionsRouter);

export default router;
