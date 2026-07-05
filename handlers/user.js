// Express router for user-related endpoints
import { Router } from 'express';
// Service function that handles creating a user record
import { create, index, find, update, remove } from '../services/user.js';


const router = Router();

// POST / - Create a new user
// Expects a JSON body with user details. Responds with the
// created user object and HTTP 201 on success, or a 400 with
// an error message on failure.

router.post('/', async (req, res, next) => {
    try {
        const user = await create(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const users = await index();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const users = await find({ _id: req.params.id }, { password: 0 });
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const user = await update(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const user = await remove(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

export default router;