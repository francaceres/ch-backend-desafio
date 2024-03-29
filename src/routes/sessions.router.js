import { Router } from "express";
import UserManager from "../dao/mongo/manager/users.js";
import passport from "passport";
import UserDTO from "../dao/DTOs/User.dto.js";

const router = Router();

const usersManager = new UserManager();

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    res.status(201).json({ status: "ok" });
  }
);
router.get("/failregister", async (req, res) => {
  res.status(400).json({ status: "Error", message: "Failed strategy" });
});

router.post("/login", passport.authenticate("login"), async (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ status: "Error", message: "Invalid credentials" });
  }
  req.session.user = {
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  };
  res.status(200).json({ status: "ok" });
});
router.get("/faillogin", (req, res) => {
  res.status(400).json({ status: "Error", message: "Failed login" });
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);
router.get(
  "/githubcallback",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

router.get("/current", async (req, res) => {
  if (req.session.user) {
    const user = new UserDTO(req.session.user);
    res.status(200).json({ status: "ok", user });
  } else {
    res.json({ status: "not found", message: "No user authenticated" });
  }
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
