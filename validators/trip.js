import {body} from 'express-validator';
import {validate} from './validate.js';

export const createTripValidator = [
    body("title")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Title is required"),

    body("startDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isDate()
    .withMessage("Start date must be a valid date"),

    body("endDate")
    .notEmpty()
    .withMessage("End date is required")
    .isDate()
    .withMessage("End date must be a valid date")
    .custom((value, { req }) => {
        if (new Date(value) < new Date(req.body.startDate)) {
            throw new Error("End date must be after start date");
        }
        return true;
    }),
    body("destinations")
    .notEmpty()
    .withMessage("Destinations are required")
    .isArray()
    .withMessage("Destinations must be an array")
    .custom((value) => {
        return value.every((destination) => typeof destination === "string");
    })
    .withMessage("Destinations must be an array of strings"),

    body("destinations.*")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Destination cannot be empty"),

    body("budget.total")
    .notEmpty()
    .withMessage("Total budget is required")
    .isFloat({ min: 0 })
    .withMessage("Total budget must be a number"),

    body("budget.expenses")
    .optional()
    .isArray()
    .withMessage("Expenses must be an array"),

    body("budget.expenses.*.name")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Expense name is required"),

    body("budget.expenses.*.amount")
    .optional()
    .isNumeric()
    .withMessage("Expense amount must be a number"),
validate,
];

export const updateTripValidator = [
    body("title")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Title cannot be empty"),

    body("description")
    .optional()
    .trim()
    .escape(),

    body("startDate")
    .optional()
    .isDate()
    .withMessage("Start date must be a valid date"),

    body("endDate")
    .optional()
    .isDate()
    .withMessage("End date must be a valid date")
    .custom((value, { req }) => {
        if (req.body.startDate && new Date(value) < new Date(req.body.startDate)) {
            throw new Error("End date must be after start date");
        }
        return true;
    }),

    body("destinations")
    .optional()
    .isArray()
    .withMessage("Destinations must be an array")
    .custom((value) => {
        return value.every((destination) => typeof destination === "string");
    })
    .withMessage("Destinations must be an array of strings"),

    body("destinations.*")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Destination cannot be empty"),

    body("budget.total")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Total budget must be a number"),

    body("budget.spent")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Spent budget must be a number"),

    body("budget.expenses")
    .optional()
    .isArray()
    .withMessage("Expenses must be an array"),

    body("budget.expenses.*.name")
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Expense name is required"),

    body("budget.expenses.*.amount")
    .optional()
    .isNumeric()
    .withMessage("Expense amount must be a number"),

    body("collaborators")
    .optional()
    .isArray()
    .withMessage("Collaborators must be an array"),

    validate,
];
