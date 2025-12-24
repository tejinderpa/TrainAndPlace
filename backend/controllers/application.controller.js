import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Application } from "../models/application.models.js";
import { Job } from "../models/job.models.js";
import { APPLICATION_STATUS } from "../constants.js";

// Apply for a job (Student only)
export const applyForJob = asyncHandler(async (req, res) => {
    if (req.user.role !== 'student') {
        throw new ApiError(403, "Only students can apply for jobs");
    }

    const { jobId, coverLetter, resume, additionalDocuments } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job || !job.isActive) {
        throw new ApiError(404, "Job not found or inactive");
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
        studentId: req.user._id,
        jobId
    });

    if (existingApplication) {
        throw new ApiError(400, "You have already applied for this job");
    }

    const application = await Application.create({
        studentId: req.user._id,
        jobId,
        companyId: job.companyId,
        coverLetter,
        resume,
        additionalDocuments,
        statusHistory: [{
            status: APPLICATION_STATUS.PENDING,
            updatedAt: new Date()
        }]
    });

    // Update job application count
    job.totalApplications += 1;
    await job.save();

    res.status(201).json(
        new ApiResponse(201, application, "Application submitted successfully")
    );
});

// Get student's applications
export const getMyApplications = asyncHandler(async (req, res) => {
    const applications = await Application.find({ studentId: req.user._id })
        .populate('jobId', 'title location salary jobType applicationDeadline')
        .populate('companyId', 'companyDetails.companyName companyDetails.logo')
        .sort({ createdAt: -1 });

    res.status(200).json(
        new ApiResponse(200, applications, "Applications retrieved successfully")
    );
});

// Get applications for company's jobs
export const getCompanyApplications = asyncHandler(async (req, res) => {
    if (req.user.role !== 'company') {
        throw new ApiError(403, "Only companies can access this");
    }

    const { status, jobId } = req.query;
    const query = { companyId: req.user._id };

    if (status) query.status = status;
    if (jobId) query.jobId = jobId;

    const applications = await Application.find(query)
        .populate('studentId', 'firstName lastName email studentDetails')
        .populate('jobId', 'title location')
        .sort({ createdAt: -1 });

    res.status(200).json(
        new ApiResponse(200, applications, "Applications retrieved successfully")
    );
});

// Update application status (Company only)
export const updateApplicationStatus = asyncHandler(async (req, res) => {
    if (req.user.role !== 'company') {
        throw new ApiError(403, "Only companies can update application status");
    }

    const { id } = req.params;
    const { status, feedback, interviewSchedule } = req.body;

    const application = await Application.findById(id);

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    if (application.companyId.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only update applications for your jobs");
    }

    application.status = status;
    if (feedback) application.feedback = feedback;
    if (interviewSchedule) application.interviewSchedule = interviewSchedule;

    application.statusHistory.push({
        status,
        updatedAt: new Date(),
        updatedBy: req.user._id
    });

    await application.save();

    res.status(200).json(
        new ApiResponse(200, application, "Application status updated successfully")
    );
});

// Get single application details
export const getApplication = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const application = await Application.findById(id)
        .populate('studentId', 'firstName lastName email studentDetails')
        .populate('jobId')
        .populate('companyId', 'companyDetails');

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    // Check authorization
    if (
        req.user.role === 'student' && 
        application.studentId._id.toString() !== req.user._id.toString()
    ) {
        throw new ApiError(403, "You can only view your own applications");
    }

    if (
        req.user.role === 'company' && 
        application.companyId._id.toString() !== req.user._id.toString()
    ) {
        throw new ApiError(403, "You can only view applications for your jobs");
    }

    res.status(200).json(
        new ApiResponse(200, application, "Application retrieved successfully")
    );
});
