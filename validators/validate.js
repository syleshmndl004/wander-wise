import {validationResult} from 'express-validator';
import {ValidationError} from '../errors/validation.js';
/**
 * Validate the request using express-validator and throw a ValidationError if there are validation errors.
 * This middleware checks the validation results after validation have run.
 */
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // If there are validation errors, throw a ValidationError
        return next(new ValidationError("Validation error", errors.array()));
    }
    next();
};