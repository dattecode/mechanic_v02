import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/utils/catchAsync.js";
import { generateJWT } from "../../pluggins/generate-jwt.plugin.js";
import { RepairsService } from "../repairs/repairs.service.js";
import { validateUpdate, validateUser } from "./users.schema.js";
import { UserService } from "./users.services.js";

export const login = catchAsync(async (req, res, next) => {
  const user = req.user;

  const token = await generateJWT(user.id);

  return res.status(200).json({
    message: "Connection successfull",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      userID: user.accountId
    },
  });
});

export const register = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, userData } = validateUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const newUser = await UserService.createUser(userData);

  return res.status(200).json({
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

export const getAll = catchAsync(async (req, res, next) => {
  const users = await UserService.findAllUsers();
  return res.status(200).json({
    message: "connecting",
    users,
  });
});

export const getId = catchAsync(async (req, res, next) => {
  const user = req.user;
  const sessionUser = req.sessionUser;
  return res.status(200).json({
    message: "connecting",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    sessionUser: {
      id: sessionUser.id,
      name: sessionUser.name,
      email: sessionUser.email,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { user } = req;

  if (user.id !== sessionUser.id) {
    return next(new AppError("this id is difirent to user", 400));
  }

  const { hasError, errorMessage, updateData } = validateUpdate(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  if (
    updateData.email === sessionUser.email ||
    updateData.name === sessionUser.name
  ) {
    return next(new AppError("The email cannot be equal", 400));
  }

  const updateUser = await UserService.updateUser(sessionUser, updateData);

  return res.status(200).json({
    message: "update completed",
    updateUser,
  });
});

export const userDelete = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const deleteUser = await UserService.delete(sessionUser);
  return res.status(200).json({
    message: "User Delete",
    deleteUser,
    
  });
});

export const allRepairs = catchAsync(async(req,res,next) => {
  const { sessionUser } = req;
  const allRepairs = await RepairsService.findRepairUserId(sessionUser.accountId)

  return res.status(200).json({
    allRepairs
  });
})
