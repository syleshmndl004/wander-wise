import {body} from 'express-validator';
import {validate} from './validate.js';

export const createBaggageValidator = [
    body("name")
    .notEmpty()
    .withMessage("Name should not be empty")
    .trim()
    .escape(),
    validate,

];

export const updateBaggageValidator = [
    body("name")
    .optional()
    .notEmpty()
    .withMessage("Name should not be empty")
    .trim()
    .escape(),
    body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean(either true or false)"),
    validate,
];



