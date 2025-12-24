import mongoose, { Schema } from "mongoose";
import { APPLICATION_STATUS } from "../constants.js";

const applicationSchema = new Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        jobId: {
            type: Schema.Types.ObjectId,
            ref: 'Job',
            required: true,
            index: true
        },
        companyId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        status: {
            type: String,
            enum: Object.values(APPLICATION_STATUS),
            default: APPLICATION_STATUS.PENDING,
            index: true
        },
        coverLetter: {
            type: String,
            maxlength: [2000, 'Cover letter cannot exceed 2000 characters']
        },
        resume: {
            type: String,
            required: true
        },
        additionalDocuments: [{
            name: String,
            url: String
        }],
        feedback: {
            type: String,
            maxlength: [1000, 'Feedback cannot exceed 1000 characters']
        },
        interviewSchedule: {
            date: Date,
            time: String,
            location: String,
            interviewType: {
                type: String,
                enum: ['online', 'offline', 'phone']
            },
            meetingLink: String
        },
        statusHistory: [{
            status: {
                type: String,
                enum: Object.values(APPLICATION_STATUS)
            },
            updatedAt: {
                type: Date,
                default: Date.now
            },
            updatedBy: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            notes: String
        }]
    },
    {
        timestamps: true
    }
);

// Compound index to prevent duplicate applications
applicationSchema.index({ studentId: 1, jobId: 1 }, { unique: true });

export const Application = mongoose.model("Application", applicationSchema);
