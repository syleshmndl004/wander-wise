// Express router for user-related endpoints
import { Router } from 'express';
// Service function that handles creating a user record
import { create } from '../services/user.js';

const router = Router();

// POST / - Create a new user
// Expects a JSON body with user details. Responds with the
// created user object and HTTP 201 on success, or a 400 with
// an error message on failure.
router.post('/', async (req, res) => {
    try {
        const user = await create(req.body);
        res.status(201).json(user);
    } catch (error) {
        // Return a client error with the service error message
        res.status(400).json({ error: error.message });
    }
});

export default router;