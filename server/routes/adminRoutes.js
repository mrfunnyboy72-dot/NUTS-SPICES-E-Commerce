import express from 'express';
import { getDashboardStats, syncGitCatalog } from '../controllers/adminController.js';

const router = express.Router();

router.get('/dashboard/stats', getDashboardStats);
router.post('/sync-git', syncGitCatalog);

export default router;
