// Central router that mounts all handler sub-routers
import { Router } from 'express';
// User-related routes (see handlers/user.js)
import USER_ROUTER from './user.js';// bring all user related routes from user.js and mount them under /users
import AUTH_ROUTER from './auth.js';//login, logout, register
import TRIP_ROUTER from './trip.js';//get all trips, get trip by id, create trip, update trip, delete trip

const router = Router(); //cretate a new router instance which is empty and will be used to mount all the sub-routers for different endpoints.

// GET / - simple health/welcome endpoint
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Wander Wise API' });
});

// Mount user routes under /users
router.use('/users', USER_ROUTER);
router.use('/auth', AUTH_ROUTER);
router.use('/trips', TRIP_ROUTER);
export default router;













//handlers/index.js doesn't log users in.
//Its only job is to send requests to the correct router.