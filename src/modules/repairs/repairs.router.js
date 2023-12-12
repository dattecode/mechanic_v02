import express from "express";
import {
  modelRepair,
  repairIsCheck,
  repairdIsCompleted,
} from "./repairs.middleware.js";
import {
  allPending,
  createRepairs,
  repairsById,
  repairsCompleted,
  repairsDelete,
} from "./repairs.controller.js";

export const router = express.Router();

router.route("/").get(allPending).post(modelRepair, createRepairs);

router
  .route("/:id")
  .get(repairIsCheck, repairsById)
  .patch(repairdIsCompleted, repairsCompleted)
  .delete(repairdIsCompleted, repairsDelete);
