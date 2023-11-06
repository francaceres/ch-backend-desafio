import { Router } from "express";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import sessionsRouter from "./sessions.router.js";
import usersRouter from "./users.router.js";

const router = Router();

router.use("/products", productsRouter());
router.use("/carts", cartsRouter);
router.use("/sessions", sessionsRouter);
router.use("/users", usersRouter);
router.get("/loggerTest", (req, res) => {
  req.logger.fatal("Fatal log test");
  req.logger.error("Error log test");
  req.logger.warning("Warning log test");
  req.logger.info("Info log test");
  req.logger.http("Http log test");
  req.logger.debug("Debug log test");
  res.sendStatus(200);
});

export default router;
