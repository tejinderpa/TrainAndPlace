import mongoose, { Schema } from "mongoose";

const announcementSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters']
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true
        },
        type: {
            type: String,
            enum: ['general', 'placement_drive', 'workshop', 'deadline', 'result', 'important'],
            default: 'general'
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high', 'urgent'],
            default: 'medium'
        },
        targetAudience: {
            branches: [String],
            batches: [String],
            roles: {
                type: [String],
                enum: ['student', 'alumni'],
                default: ['student']
            }
        },
        attachments: [{
            name: String,
            url: String,
            type: String
        }],
        expiresAt: {
            type: Date,
            default: null
        },
        isActive: {
            type: Boolean,
            default: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
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

// Index for efficient queries
announcementSchema.index({ isActive: 1, createdAt: -1 });
announcementSchema.index({ 'targetAudience.roles': 1 });

export const Announcement = mongoose.model("Announcement", announcementSchema);
