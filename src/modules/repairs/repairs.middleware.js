import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/utils/catchAsync.js";
import { UserService } from "../users/users.services.js";
import { RepairsService } from "./repairs.service.js";

export const repairIsCheck = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await RepairsService.findById(id);

  if (!repair) {
    return next(new AppError("repairs not found", 404));
  }

  req.repair = repair;
  next();
});

export const repairdIsCompleted = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await RepairsService.findById(id);

  if (!repair) {
    return next(new AppError("repairs not found", 404));
  }

  if (repair.status === "completed" || repair.status === "cancelled") {
    return next(new AppError("repairs not found", 404));
  }

  req.repair = repair;
  next();
});

export const modelRepair = catchAsync(async (req, res, next) => {
  const repair = req.body;

  const user = await UserService.findOneId(repair.userId);
  if (!user) {
    return next(new AppError("this is operational error", 400));
  }

  const { accountId } = user;
  repair.userId = accountId;

  req.repair = repair;
  next();
});
