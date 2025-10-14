import { body } from "express-validator";

export const updateCarRules = [
  body("manufacturer").optional().notEmpty(),
  body("model").optional().notEmpty(),
  body("year").optional().isInt({ min: 1990 }),
  body("price").optional().isNumeric(),
  body("fuel").optional().notEmpty(),
];
