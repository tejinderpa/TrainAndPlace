import express from 'express';
import {
    createEvent,
    getAllEvents,
    getEvent,
    registerForEvent,
    updateEvent,
    deleteEvent,
    getMyEvents,
    getRegisteredEvents
} from '../controllers/event.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEvent);

// Protected routes
router.post('/', verifyJWT, createEvent);
router.post('/:id/register', verifyJWT, registerForEvent);
router.patch('/:id', verifyJWT, updateEvent);
router.delete('/:id', verifyJWT, deleteEvent);
router.get('/my/events', verifyJWT, getMyEvents);
router.get('/my/registered', verifyJWT, getRegisteredEvents);

export default router;
