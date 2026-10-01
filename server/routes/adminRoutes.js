import express from 'express';
import { getDashboardStats, syncGitCatalog, syncAdminState, getAdminState } from '../controllers/adminController.js';

const router = express.Router();

router.get('/dashboard/stats', getDashboardStats);
router.post('/sync-git', syncGitCatalog);
router.post('/state', syncAdminState);
router.get('/state', getAdminState);

export default router;
