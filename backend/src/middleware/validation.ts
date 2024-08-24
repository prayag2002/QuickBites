import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req); // validationResult in express-validator will check if there are any validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // if there are errors, return a 400 status code with the errors
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("Address Line 1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"), //email is not required because it is already present in the JWT token
  handleValidationErrors,
];
