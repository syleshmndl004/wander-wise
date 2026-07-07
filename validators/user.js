import { body } from "express-validator";
import User from "../models/user.js";

export const createUserValidator = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isAlpha()
        .withMessage("Name must contain only letters")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters long")
        .trim()
        .escape(),
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format")
        .trim()
        .escape()
        .custom(async (value) => {
            const user = await User.findOne({ email: value });
            if (user) {
                throw new Error("Email already in use");
            }
            return true;
        }),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];