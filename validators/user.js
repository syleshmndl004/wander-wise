import { body } from "express-validator";
import User from "../models/user.js";
import { ValidationError } from "../errors/validation.js";
import { validate } from "./validate.js";
/*This creates a validation middleware for creating a user. It checks that the name, 
email, and password fields are present and meet certain criteria. If any of the validations 
fail, it throws a ValidationError with an appropriate message.
*/
export const createUserValidator = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isAlpha("en-US", { ignore: " " })
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
                throw new ValidationError("This email has already been taken.Please choose a different email.");
            }
            return true;
        }),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    validate,
]
 /** This creates a validation middleware for updating a user. It checks that the name,
  *  email, and password fields, if present, meet certain criteria. 
  * If any of the validations fail, it throws a ValidationError with an appropriate message. 
  * The email validation also checks that the email is not already taken by another user (excluding the user being updated).
  */
export const updateUserValidator = [
    body("name")
        .optional()
        .isAlpha("en-US", { ignore: " " })
        .withMessage("Name must contain only letters")
        .isLength({ min: 3 })
        .withMessage("Name must be at least 3 characters long")
        .trim()
        .escape(),
    body("email")
        .optional()
        .isEmail()
        .withMessage("Invalid email format")
        .trim()
        .escape()
        .custom(async (value, { req }) => {
            const user = await User.findOne({ email: value, _id: { $ne: req.params.id } });
            if (user) {
                throw new ValidationError("This email has already been taken.");
            }
            return true;
        }),
    body("password")
        .optional()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    validate,
];