import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/utils/catchAsync.js";
import envs from "../../config/enviorements/enviroments.js";
import { validateLogin } from "./users.schema.js";
import { UserService } from "./users.services.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { promisify } from "util";

export const chekedId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserService.findOneId(id);
  if (!user) {
    return next(new AppError("this is operational error", 400));
  }
  req.user = user;
  next();
});

export const chekedEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await UserService.findOneEmail(email);
  if (!user) {
    return next(new AppError("this is operational error", 400));
  }
  req.user = user;
  next();
});

export const unChekedEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await UserService.findOneEmail(email);

  if (user) {
    return next(new AppError("this is email or user error", 400));
  }

  next();
});

export const loginCheck = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, loginData } = validateLogin(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const user = await UserService.findOneEmail(loginData.email);
  if (!user) {
    return next(new AppError("this is operational error", 400));
  }
  const passwordCheck = await bcrypt.compare(loginData.password, user.password);
  if (!passwordCheck) {
    return next(new AppError("this is operational error", 400));
  }

  req.user = user;
  next();
});

export const protect = catchAsync(async (req, res, next) => {
  //get token
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //validate token
  if (!token) {
    return next(new AppError("Your are not login, please login to access ", 401));
  }

  //decode Token
  const decodedToken = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED);

  //search user by token
  const user = await UserService.findOneId(decodedToken.id);
  if (!user) {
    return next(new AppError("this is operational error", 400));
  }

  //add the user in session
  req.sessionUser = user
  next( )
});
