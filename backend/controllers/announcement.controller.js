import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Announcement } from "../models/announcement.models.js";
import { User } from "../models/user.models.js";

/**
 * @desc    Get all announcements
 * @route   GET /api/v1/announcements
 * @access  Private
 */
const getAnnouncements = asyncHandler(async (req, res) => {
    const { type, priority, page = 1, limit = 10 } = req.query;
    
    const filter = { isActive: true };
    
    // Filter by user role
    filter['targetAudience.roles'] = req.user.role;
    
    // Filter by type
    if (type) filter.type = type;
    
    // Filter by priority
    if (priority) filter.priority = priority;
    
    // Check expiry
    filter.$or = [
        { expiresAt: null },
        { expiresAt: { $gte: new Date() } }
    ];
    
    const skip = (page - 1) * limit;
    
    const announcements = await Announcement.find(filter)
        .populate('createdBy', 'firstName lastName email role')
        .sort({ priority: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));
    
    const total = await Announcement.countDocuments(filter);
    
    return res.status(200).json(
        new ApiResponse(200, {
            announcements,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        }, "Announcements retrieved successfully")
    );
});

/**
 * @desc    Get single announcement
 * @route   GET /api/v1/announcements/:id
 * @access  Private
 */
const getAnnouncementById = asyncHandler(async (req, res) => {
    const announcement = await Announcement.findById(req.params.id)
        .populate('createdBy', 'firstName lastName email role');
    
    if (!announcement) {
        throw new ApiError(404, "Announcement not found");
    }
    
    // Increment views
    announcement.views += 1;
    await announcement.save();
    
    return res.status(200).json(
        new ApiResponse(200, announcement, "Announcement retrieved successfully")
    );
});

/**
 * @desc    Create announcement
 * @route   POST /api/v1/announcements
 * @access  TPO/Admin only
 */
const createAnnouncement = asyncHandler(async (req, res) => {
    const { title, description, type, priority, targetAudience, attachments, expiresAt } = req.body;
    
    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }
    
    const announcement = await Announcement.create({
        title,
        description,
        type,
        priority,
        targetAudience,
        attachments,
        expiresAt,
        createdBy: req.user._id
    });
    
    const populatedAnnouncement = await Announcement.findById(announcement._id)
        .populate('createdBy', 'firstName lastName email role');
    
    return res.status(201).json(
        new ApiResponse(201, populatedAnnouncement, "Announcement created successfully")
    );
});

/**
 * @desc    Update announcement
 * @route   PUT /api/v1/announcements/:id
 * @access  TPO/Admin only
 */
const updateAnnouncement = asyncHandler(async (req, res) => {
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
        throw new ApiError(404, "Announcement not found");
    }
    
    // Check if user is the creator
    if (announcement.createdBy.toString() !== req.user._id.toString() && !req.user.isAdminOrTPO()) {
        throw new ApiError(403, "You can only update your own announcements");
    }
    
    const { title, description, type, priority, targetAudience, attachments, expiresAt, isActive } = req.body;
    
    if (title) announcement.title = title;
    if (description) announcement.description = description;
    if (type) announcement.type = type;
    if (priority) announcement.priority = priority;
    if (targetAudience) announcement.targetAudience = targetAudience;
    if (attachments) announcement.attachments = attachments;
    if (expiresAt !== undefined) announcement.expiresAt = expiresAt;
    if (isActive !== undefined) announcement.isActive = isActive;
    
    await announcement.save();
    
    const updatedAnnouncement = await Announcement.findById(announcement._id)
        .populate('createdBy', 'firstName lastName email role');
    
    return res.status(200).json(
        new ApiResponse(200, updatedAnnouncement, "Announcement updated successfully")
    );
});

/**
 * @desc    Delete announcement
 * @route   DELETE /api/v1/announcements/:id
 * @access  TPO/Admin only
 */
const deleteAnnouncement = asyncHandler(async (req, res) => {
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
        throw new ApiError(404, "Announcement not found");
    }
    
    // Check if user is the creator
    if (announcement.createdBy.toString() !== req.user._id.toString() && !req.user.isAdminOrTPO()) {
        throw new ApiError(403, "You can only delete your own announcements");
    }
    
    await announcement.deleteOne();
    
    return res.status(200).json(
        new ApiResponse(200, null, "Announcement deleted successfully")
    );
});

export {
    getAnnouncements,
    getAnnouncementById,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
};
