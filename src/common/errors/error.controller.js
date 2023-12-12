export const globlalErrorHandler = (err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  return res.status(res.status).json({
    status: err.status,
    message: err.message,
  });
};
