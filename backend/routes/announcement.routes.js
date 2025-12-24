import { Router } from 'express';
import {
    getAnnouncements,
    getAnnouncementById,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
} from '../controllers/announcement.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// All routes require authentication
router.use(verifyJWT);

// Public routes (all authenticated users)
router.get('/', getAnnouncements);
router.get('/:id', getAnnouncementById);

// TPO/Admin only routes
router.post('/', createAnnouncement);
router.put('/:id', updateAnnouncement);
router.delete('/:id', deleteAnnouncement);

export default router;
