import express from 'express';
import {
    getStudents,
    getCompanies,
    getAlumni,
    updateCompanyStatus,
    updateProfile
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All routes are protected
router.use(verifyJWT);

// Update user profile
router.put('/profile', updateProfile);

// Get users by role
router.get('/students', getStudents);
router.get('/companies', getCompanies);
router.get('/alumni', getAlumni);

// Update company status (TPO only)
router.patch('/companies/:id/status', updateCompanyStatus);

export default router;
