import { Router } from 'express';
import { create, find, index, remove, update } from '../services/baggage.js';
import { createBaggageValidator, updateBaggageValidator } from '../validators/baggage.js';

const router = Router({ mergeParams: true });

router.post('/', createBaggageValidator, async (req, res, next) => {
    try {
        const baggage = await create({
            ...req.body,
            trip: req.params.tripId,
            user: req.user
        });
        res.status(201).json(baggage);
    } catch (error) {
        next(error);
    }
});

router.get('/', async(req, res, next) => {
    try {
        const baggages = await index(req.params.tripId, req.user);
        res.status(200).json(baggages);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async(req, res, next) => {
    try {
        const baggage = await find(req.params.id, req.params.tripId, req.user);
        res.status(200).json(baggage);
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', updateBaggageValidator, async(req, res, next) => {
    try {
        const baggage = await update(
            req.params.id,
            req.params.tripId,
            req.user,
            req.body,
        );
        res.status(200).json(baggage);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async(req, res, next) => {
    try {
        const baggage = await remove(req.params.id, req.params.tripId, req.user);
        res.status(200).json(baggage);
    } catch (error) {
        next(error);
    }
});

export default router;