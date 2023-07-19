import { Router } from "express";
import UserManager from "../dao/mongo/manager/users.js";

const router = Router();

const usersManager = new UserManager();

router.post("/register", async (req, res) => {
  const user = await usersManager.registerUser(req.body);
  res.status(201).json({ status: "ok", user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await usersManager.getUser({ email, password });
  if (!user)
    return res
      .status(404)
      .json({ status: "not found", message: "Email or password not valid" });
  req.session.user = user;
  res.status(200).json({ status: "ok" });
});

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).json({ status: "Logout error", message: err });
    }
    res.status(200).json({ status: "ok" });
  });
});

export default router;
