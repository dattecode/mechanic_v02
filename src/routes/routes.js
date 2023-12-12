import express from "express";
import { router as userRoutes } from "../modules/users/users.routes.js";
import { router as repairRoutes } from "../modules/repairs/repairs.router.js";
export const router = express.Router()

router.use("/users", userRoutes)
router.use("/repairs", repairRoutes)