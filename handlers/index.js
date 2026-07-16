// Central router that mounts all handler sub-routers
import { Router } from 'express';
// User-related routes (see handlers/user.js)
import USER_ROUTER from './user.js';
import AUTH_ROUTER from './auth.js';
import TRIP_ROUTER from './trip.js';

const router = Router();

// GET / - simple health/welcome endpoint
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Wander Wise API' });
});

// Mount user routes under /users
router.use('/users', USER_ROUTER);
router.use('/auth', AUTH_ROUTER);
router.use('/trips', TRIP_ROUTER);
export default router;