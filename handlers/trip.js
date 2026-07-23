import {Router} from 'express';
import {create, index, find, update, remove} from '../services/trip.js';
import {createTripValidator, updateTripValidator} from '../validators/trip.js';

const router = Router();
router.post('/', createTripValidator, async (req, res ,next) => { // '/' is the root route of the application, and createTripValidator is the middleware that will be executed before the callback function
    try {   
        const trip = await create({...req.body, user: req.user});
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
        const trip = await find( req.params.id, req.user );
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
        const trip = await remove(req.params.id, req.user );
        res.status(200).json(trip);
    } catch (error) {
        next(error);
    }
});

export default router;
