import {Router} from 'express';
import {create} from '../services/trip.js';
import {createTripValidator} from '../validators/trip.js';

const router = Router();
router.post('/', createTripValidator, async (req, res ,next) => {
    try {   
        const trip = await create(req.body);
        res.status(201).json(trip);
    } catch (error) {
        next(error);
    }
});
export default router;
