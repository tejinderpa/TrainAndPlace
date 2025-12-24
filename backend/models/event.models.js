import mongoose, { Schema } from "mongoose";
import { EVENT_TYPES } from "../constants.js";

const eventSchema = new Schema(
    {
        organizerId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        title: {
            type: String,
            required: [true, 'Event title is required'],
            trim: true,
            maxlength: [200, 'Event title cannot exceed 200 characters']
        },
        description: {
            type: String,
            required: [true, 'Event description is required'],
            maxlength: [5000, 'Description cannot exceed 5000 characters']
        },
        eventType: {
            type: String,
            enum: Object.values(EVENT_TYPES),
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        location: {
            venue: String,
            city: String,
            isOnline: {
                type: Boolean,
                default: false
            },
            meetingLink: String
        },
        eligibility: {
            degrees: [String],
            branches: [String],
            yearOfStudy: [Number]
        },
        registrationDeadline: {
            type: Date,
            required: true
        },
        maxParticipants: {
            type: Number,
            default: null
        },
        currentParticipants: {
            type: Number,
            default: 0
        },
        registeredStudents: [{
            studentId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            registeredAt: {
                type: Date,
                default: Date.now
            },
            attended: {
                type: Boolean,
                default: false
            }
        }],
        banner: {
            type: String
        },
        tags: [String],
        isActive: {
            type: Boolean,
            default: true,
            index: true
        },
        views: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

// Index for searching
eventSchema.index({ title: 'text', description: 'text' });

export const Event = mongoose.model("Event", eventSchema);
