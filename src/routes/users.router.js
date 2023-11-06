import { Router } from "express";
import usersController from "../controllers/users.controller.js";

const router = Router();

router
  .route("/")
  .get(usersController.getUsers)
  .delete(usersController.deleteUsers);

router
  .route("/:uid")
  .get(usersController.getUser)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser);

export default router;
