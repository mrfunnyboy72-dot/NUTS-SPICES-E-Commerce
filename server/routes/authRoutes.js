import express from 'express';
import { registerCustomer, loginUser, getCurrentUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerCustomer);
router.post('/login', loginUser);
router.get('/me', getCurrentUser);

export default router;
