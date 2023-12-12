import { catchAsync } from "../../common/utils/catchAsync.js";
import { validateRepair } from "./repairs.schema.js";
import { RepairsService } from "./repairs.service.js";

export const allPending = catchAsync(async (req, res, next) => {
  const allRepair = await RepairsService.finAllRepair();
  return res.status(200).json({
    repairs: allRepair,
  });
});

export const createRepairs = catchAsync(async (req, res, next) => {
  const repair = req.repair;
  const { hasError, errorMessage, userData } = validateRepair(repair);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const repairCreate = await RepairsService.createRepairs(userData);

  return res.status(200).json(repairCreate);
});

export const repairsById = catchAsync(async (req, res, next) => {
  const repair = req.repair;
  return res.status(200).json(repair);
});

export const repairsCompleted = catchAsync(async (req, res, next) => {
  const repair = req.repair;
  const repairComplete = await RepairsService.updateRepair(repair);
  return res.status(200).json(repairComplete);
});

export const repairsDelete = catchAsync(async (req, res, next) => {
  const repair = req.repair;
  const repairDelete = await RepairsService.deleteRepair(repair);
  return res.status(200).json({
    message: "repair cancelled",
    repairDelete,
  });
});
