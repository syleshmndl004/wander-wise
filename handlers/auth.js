import {Router} from 'express';
import { register } from '../services/auth.js';
import { createUserValidator } from '../validators/user.js';

const router = Router();

router.post('/register', createUserValidator, async (req, res, next) => { // Handle user registration
    try {
        const token = await register(req.body);
        res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
});

export default router;