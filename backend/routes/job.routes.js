import express from 'express';
import {
    createJob,
    getAllJobs,
    getJob,
    updateJob,
    deleteJob,
    getCompanyJobs
} from '../controllers/job.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllJobs);
router.get('/:id', getJob);

// Protected routes
router.post('/', verifyJWT, createJob);
router.patch('/:id', verifyJWT, updateJob);
router.delete('/:id', verifyJWT, deleteJob);
router.get('/company/my-jobs', verifyJWT, getCompanyJobs);

export default router;
