import { AppError } from "../utils/AppError.js";

export function validationMiddlewareFactory(validationSchema) {
  return function (req, res, next) {
    try {
      const body = req.body;
      if (!body) throw new AppError(400, "Bad Request! Body Required");
      const validation = validationSchema.validate(body);
      if (validation.error) {
        throw new AppError(400, validation.error?.message);
      }
      req.body = validation.value;
      next();
    } catch (err) {
      next(err);
    }
  };
}
