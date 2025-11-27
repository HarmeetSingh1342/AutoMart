import { body } from "express-validator";

export const updateUserRules = [
  body("name").optional().notEmpty(),
  body("email").optional().isEmail(),
];
