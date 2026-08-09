import { Router } from 'express';
import {
    create,
    index,
    find,
    update,
    remove,
    invite, accept
} from '../services/trip.js';
import {
    createTripValidator,
    updateTripValidator
} from '../validators/trip.js';


const router = Router();
router.post('/', createTripValidator, async (req, res, next) => { // '/' is the root route of the application, and createTripValidator is the middleware that will be executed before the callback function
    try {
        const trip = await create({ ...req.body, user: req.user });
        res.status(201).json(trip);
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const trips = await index(req.user);
        res.status(200).json(trips);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const trip = await find(req.params.id, req.user);
        res.status(200).json(trip);
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', updateTripValidator, async (req, res, next) => {
    try {
        const trip = await update(req.params.id, req.body, req.user);
        res.status(200).json(trip);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const trip = await remove(req.params.id, req.user);
        res.status(200).json(trip);
    } catch (error) {
        next(error);
    }
});

router.post('/:id/invite', async (req, res, next) => {
    try {
        const result = await invite(
            req.params.id,
            req.user,
            req.body.collaboratorEmails);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});


router.get('/:id/invite/accept', async (req, res, next) => {
    try {
        const result = await accept
            (req.query.token,
                req.user,
            );

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});
export default router;