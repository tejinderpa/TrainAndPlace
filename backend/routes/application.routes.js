import express from 'express';
import {
    applyForJob,
    getMyApplications,
    getCompanyApplications,
    updateApplicationStatus,
    getApplication
} from '../controllers/application.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All routes are protected
router.use(verifyJWT);

router.post('/', applyForJob);
router.get('/my-applications', getMyApplications);
router.get('/company/applications', getCompanyApplications);
router.get('/:id', getApplication);
router.patch('/:id/status', updateApplicationStatus);

export default router;
