import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/job.models.js";
import { Application } from "../models/application.models.js";

// Create a new job (Company only)
export const createJob = asyncHandler(async (req, res) => {
    if (req.user.role !== 'company') {
        throw new ApiError(403, "Only companies can post jobs");
    }

    const jobData = {
        ...req.body,
        companyId: req.user._id
    };

    const job = await Job.create(jobData);

    res.status(201).json(
        new ApiResponse(201, job, "Job posted successfully")
    );
});

// Get all jobs (with filters)
export const getAllJobs = asyncHandler(async (req, res) => {
    const { 
        jobType, 
        location, 
        minSalary, 
        search,
        page = 1,
        limit = 10 
    } = req.query;

    const query = { isActive: true };

    if (jobType) query.jobType = jobType;
    if (location) query.location = new RegExp(location, 'i');
    if (minSalary) query['salary.min'] = { $gte: Number(minSalary) };
    if (search) {
        query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const jobs = await Job.find(query)
        .populate('companyId', 'firstName lastName companyDetails.companyName companyDetails.logo')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await Job.countDocuments(query);

    res.status(200).json(
        new ApiResponse(200, {
            jobs,
            pagination: {
                total,
                page: Number(page),
                pages: Math.ceil(total / limit)
            }
        }, "Jobs retrieved successfully")
    );
});

// Get single job
export const getJob = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const job = await Job.findById(id)
        .populate('companyId', 'firstName lastName companyDetails');

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    // Increment views
    job.views += 1;
    await job.save();

    res.status(200).json(
        new ApiResponse(200, job, "Job retrieved successfully")
    );
});

// Update job (Company only - own jobs)
export const updateJob = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    if (job.companyId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only update your own jobs");
    }

    const updatedJob = await Job.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
    );

    res.status(200).json(
        new ApiResponse(200, updatedJob, "Job updated successfully")
    );
});

// Delete job (Company only - own jobs)
export const deleteJob = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    if (job.companyId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only delete your own jobs");
    }

    await Job.findByIdAndDelete(id);

    res.status(200).json(
        new ApiResponse(200, null, "Job deleted successfully")
    );
});

// Get company's own jobs
export const getCompanyJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find({ companyId: req.user._id })
        .sort({ createdAt: -1 });

    res.status(200).json(
        new ApiResponse(200, jobs, "Company jobs retrieved successfully")
    );
});
