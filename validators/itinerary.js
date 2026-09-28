import { body } from "express-validator";
import { validate } from "./validate.js";

const activityValidation = [
  body("activities").optional().isArray().withMessage("Activities must be an array"),
  body("activities.*").isObject().withMessage("Each activity must be an object"),
  body("activities.*.name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Activity name is required"),
  body("activities.*.time")
    .notEmpty()
    .withMessage("Activity time is required")
    .isISO8601()
    .withMessage("Activity time must be a valid date")
    .toDate(),
  body("activities.*.notes")
    .optional()
    .isArray()
    .withMessage("Activity notes must be an array")
    .custom((notes) => notes.every((note) => typeof note === "string"))
    .withMessage("Activity notes must be an array of strings"),
];

export const createItineraryValidator = [
  body("title")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Title is required"),
  body("description").optional().trim().escape(),
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be a valid date")
    .toDate(),
  ...activityValidation,
  validate,
];

export const updateItineraryValidator = [
  body("title").optional().trim().escape().notEmpty().withMessage("Title is required"),
  body("description").optional().trim().escape(),
  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be a valid date")
    .toDate(),
  ...activityValidation,
  validate,
];
