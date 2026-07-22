import {Router} from 'express';
import {create} from '../services/trip.js';
import {createTripValidator} from '../validators/trip.js';

const router = Router();
router.post('/', createTripValidator, async (req, res ,next) => { // '/' is the root route of the application, and createTripValidator is the middleware that will be executed before the callback function
    try {   
        const trip = await create({...req.body, user: req.user});
        res.status(201).json(trip);
    } catch (error) {
        next(error);
    }
});
export default router;
