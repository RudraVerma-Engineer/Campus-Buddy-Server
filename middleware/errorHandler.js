export function errorHandler(err, req, res, next) {
  console.log(err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }
  const message = err instanceof Error ? err.message : String(err);
  return res.status(500).json({
    success: false,
    error: message,
  });
}
