import { body } from "express-validator";

export const createCarRules = [
  body("manufacturer").notEmpty().withMessage("Manufacturer is required"),
  body("model").notEmpty().withMessage("Model is required"),
  body("year")
    .isInt({ min: 1990 })
    .withMessage("Year must be a valid integer"),
  body("price").isNumeric().withMessage("Price must be numeric"),
  body("fuel").notEmpty().withMessage("Fuel type is required"),
];
