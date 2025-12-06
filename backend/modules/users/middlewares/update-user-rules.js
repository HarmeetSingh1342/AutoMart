
import { body } from "express-validator";

export const updateUserRules = [
  body("name").optional().notEmpty(),
  body("email").optional().isEmail(),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("role")
    .optional()
    .isIn(["admin", "customer"])
    .withMessage("Role must be admin or customer"),
];
