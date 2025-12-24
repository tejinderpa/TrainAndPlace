import mongoose, { Schema } from "mongoose";

const mentorshipSchema = new Schema(
    {
        mentorId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        menteeId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        status: {
            type: String,
            enum: ['pending', 'active', 'completed', 'cancelled'],
            default: 'pending',
            index: true
        },
        requestMessage: {
            type: String,
            maxlength: [1000, 'Request message cannot exceed 1000 characters']
        },
        goals: {
            type: String,
            maxlength: [2000, 'Goals cannot exceed 2000 characters']
        },
        startDate: Date,
        endDate: Date,
        sessions: [{
            date: Date,
            duration: Number, // in minutes
            topic: String,
            notes: String,
            feedback: {
                mentorFeedback: String,
                menteeFeedback: String
            }
        }],
        rating: {
            mentorRating: {
                type: Number,
                min: 1,
                max: 5
            },
            menteeRating: {
                type: Number,
                min: 1,
                max: 5
            },
            mentorReview: String,
            menteeReview: String
        },
        totalSessions: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

// Compound index
mentorshipSchema.index({ mentorId: 1, menteeId: 1 });

export const Mentorship = mongoose.model("Mentorship", mentorshipSchema);
