// Central router that mounts all handler sub-routers
import { Router } from 'express';
// User-related routes (see handlers/user.js)
import USER_ROUTER from './user.js';

const router = Router();

// GET / - simple health/welcome endpoint
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Wander Wise API' });
});

// Mount user routes under /users
router.use('/users', USER_ROUTER);

export default router;