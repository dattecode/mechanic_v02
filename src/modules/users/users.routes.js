import express from "express";
import {
  allRepairs,
  getAll,
  getId,
  login,
  register,
  updateUser,
  userDelete,
} from "./users.controller.js";
import {
  chekedId,
  loginCheck,
  protect,
  unChekedEmail,
} from "./users.middlewares.js";

export const router = express.Router();

router.post("/login", loginCheck, login);
router.post("/register", unChekedEmail, register);

router.use(protect)

router.get("/", getAll);
router.get("/:id", chekedId, getId);
router.patch("/:id", chekedId, updateUser )
router.delete("/delete", userDelete);
router.get("/:id/allRepairs", allRepairs)
