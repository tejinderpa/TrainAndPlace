import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Event } from "../models/event.models.js";

// Create event (Company/TPO/Alumni)
export const createEvent = asyncHandler(async (req, res) => {
    if (!['company', 'tpo', 'alumni'].includes(req.user.role)) {
        throw new ApiError(403, "Only companies, TPOs, and alumni can create events");
    }

    const eventData = {
        ...req.body,
        organizerId: req.user._id
    };

    const event = await Event.create(eventData);

    res.status(201).json(
        new ApiResponse(201, event, "Event created successfully")
    );
});

// Get all events
export const getAllEvents = asyncHandler(async (req, res) => {
    const { 
        eventType, 
        location, 
        search,
        page = 1,
        limit = 10 
    } = req.query;

    const query = { isActive: true };

    if (eventType) query.eventType = eventType;
    if (location) query['location.city'] = new RegExp(location, 'i');
    if (search) {
        query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const events = await Event.find(query)
        .populate('organizerId', 'firstName lastName companyDetails.companyName')
        .sort({ startDate: 1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await Event.countDocuments(query);

    res.status(200).json(
        new ApiResponse(200, {
            events,
            pagination: {
                total,
                page: Number(page),
                pages: Math.ceil(total / limit)
            }
        }, "Events retrieved successfully")
    );
});

// Get single event
export const getEvent = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const event = await Event.findById(id)
        .populate('organizerId', 'firstName lastName companyDetails');

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    // Increment views
    event.views += 1;
    await event.save();

    res.status(200).json(
        new ApiResponse(200, event, "Event retrieved successfully")
    );
});

// Register for event (Student only)
export const registerForEvent = asyncHandler(async (req, res) => {
    if (req.user.role !== 'student') {
        throw new ApiError(403, "Only students can register for events");
    }

    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event || !event.isActive) {
        throw new ApiError(404, "Event not found or inactive");
    }

    // Check if registration deadline passed
    if (new Date() > event.registrationDeadline) {
        throw new ApiError(400, "Registration deadline has passed");
    }

    // Check if already registered
    const alreadyRegistered = event.registeredStudents.some(
        student => student.studentId.toString() === req.user._id.toString()
    );

    if (alreadyRegistered) {
        throw new ApiError(400, "You are already registered for this event");
    }

    // Check max participants
    if (event.maxParticipants && event.currentParticipants >= event.maxParticipants) {
        throw new ApiError(400, "Event has reached maximum capacity");
    }

    event.registeredStudents.push({
        studentId: req.user._id,
        registeredAt: new Date()
    });
    event.currentParticipants += 1;
    await event.save();

    res.status(200).json(
        new ApiResponse(200, event, "Registered for event successfully")
    );
});

// Update event (Organizer only)
export const updateEvent = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    if (event.organizerId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only update your own events");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
    );

    res.status(200).json(
        new ApiResponse(200, updatedEvent, "Event updated successfully")
    );
});

// Delete event (Organizer only)
export const deleteEvent = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    if (event.organizerId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only delete your own events");
    }

    await Event.findByIdAndDelete(id);

    res.status(200).json(
        new ApiResponse(200, null, "Event deleted successfully")
    );
});

// Get my events (created by user)
export const getMyEvents = asyncHandler(async (req, res) => {
    const events = await Event.find({ organizerId: req.user._id })
        .sort({ createdAt: -1 });

    res.status(200).json(
        new ApiResponse(200, events, "Events retrieved successfully")
    );
});

// Get registered events (for students)
export const getRegisteredEvents = asyncHandler(async (req, res) => {
    if (req.user.role !== 'student') {
        throw new ApiError(403, "Only students can access this");
    }

    const events = await Event.find({
        'registeredStudents.studentId': req.user._id
    }).populate('organizerId', 'firstName lastName companyDetails.companyName');

    res.status(200).json(
        new ApiResponse(200, events, "Registered events retrieved successfully")
    );
});
