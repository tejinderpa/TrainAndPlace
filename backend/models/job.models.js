import mongoose, { Schema } from "mongoose";
import { JOB_TYPES } from "../constants.js";

const jobSchema = new Schema(
    {
        companyId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        title: {
            type: String,
            required: [true, 'Job title is required'],
            trim: true,
            maxlength: [200, 'Job title cannot exceed 200 characters']
        },
        description: {
            type: String,
            required: [true, 'Job description is required'],
            maxlength: [5000, 'Description cannot exceed 5000 characters']
        },
        jobType: {
            type: String,
            enum: Object.values(JOB_TYPES),
            required: true,
            default: JOB_TYPES.FULL_TIME
        },
        location: {
            type: String,
            required: true,
            trim: true
        },
        salary: {
            min: Number,
            max: Number,
            currency: {
                type: String,
                default: 'INR'
            }
        },
        eligibility: {
            minCGPA: Number,
            degrees: [String],
            branches: [String],
            yearOfStudy: [Number],
            skills: [String]
        },
        requirements: {
            type: [String],
            default: []
        },
        benefits: {
            type: [String],
            default: []
        },
        applicationDeadline: {
            type: Date,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true
        },
        totalApplications: {
            type: Number,
            default: 0
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
jobSchema.index({ title: 'text', description: 'text' });

export const Job = mongoose.model("Job", jobSchema);
