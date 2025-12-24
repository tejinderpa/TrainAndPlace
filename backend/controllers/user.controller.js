import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";

// Get all students (for companies and TPO)
export const getStudents = asyncHandler(async (req, res) => {
    const { 
        search, 
        branch, 
        minCgpa,
        yearOfStudy,
        page = 1,
        limit = 50 
    } = req.query;

    const query = { role: 'student', isActive: true, isEmailVerified: true };

    // Search by name or skills
    if (search) {
        query.$or = [
            { firstName: new RegExp(search, 'i') },
            { lastName: new RegExp(search, 'i') },
            { 'studentDetails.skills': new RegExp(search, 'i') }
        ];
    }

    // Filter by branch
    if (branch) {
        query['studentDetails.branch'] = branch;
    }

    // Filter by minimum CGPA
    if (minCgpa) {
        query['studentDetails.cgpa'] = { $gte: Number(minCgpa) };
    }

    // Filter by year of study
    if (yearOfStudy) {
        query['studentDetails.yearOfStudy'] = Number(yearOfStudy);
    }

    const skip = (page - 1) * limit;

    const students = await User.find(query)
        .select('-password -refreshToken -emailVerificationToken -passwordResetToken')
        .sort({ 'studentDetails.cgpa': -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await User.countDocuments(query);

    res.status(200).json(
        new ApiResponse(200, {
            students,
            pagination: {
                total,
                page: Number(page),
                pages: Math.ceil(total / limit)
            }
        }, "Students retrieved successfully")
    );
});

// Get all companies (for TPO)
export const getCompanies = asyncHandler(async (req, res) => {
    const { 
        search, 
        isVerified,
        page = 1,
        limit = 20 
    } = req.query;

    const query = { role: 'company', isActive: true };

    // Search by company name
    if (search) {
        query['companyDetails.companyName'] = new RegExp(search, 'i');
    }

    // Filter by verification status
    if (isVerified !== undefined) {
        query['companyDetails.isVerified'] = isVerified === 'true';
    }

    const skip = (page - 1) * limit;

    const companies = await User.find(query)
        .select('-password -refreshToken -emailVerificationToken -passwordResetToken')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await User.countDocuments(query);

    res.status(200).json(
        new ApiResponse(200, {
            companies,
            pagination: {
                total,
                page: Number(page),
                pages: Math.ceil(total / limit)
            }
        }, "Companies retrieved successfully")
    );
});

// Get all alumni (for students and TPO)
export const getAlumni = asyncHandler(async (req, res) => {
    const { 
        search, 
        mentorshipAvailable,
        page = 1,
        limit = 20 
    } = req.query;

    const query = { role: 'alumni', isActive: true, isEmailVerified: true };

    // Search by name or company
    if (search) {
        query.$or = [
            { firstName: new RegExp(search, 'i') },
            { lastName: new RegExp(search, 'i') },
            { 'alumniDetails.currentCompany': new RegExp(search, 'i') }
        ];
    }

    // Filter by mentorship availability
    if (mentorshipAvailable !== undefined) {
        query['alumniDetails.mentorshipAvailable'] = mentorshipAvailable === 'true';
    }

    const skip = (page - 1) * limit;

    const alumni = await User.find(query)
        .select('-password -refreshToken -emailVerificationToken -passwordResetToken')
        .sort({ 'alumniDetails.graduationYear': -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await User.countDocuments(query);

    res.status(200).json(
        new ApiResponse(200, {
            alumni,
            pagination: {
                total,
                page: Number(page),
                pages: Math.ceil(total / limit)
            }
        }, "Alumni retrieved successfully")
    );
});

// Update company verification status (TPO only)
export const updateCompanyStatus = asyncHandler(async (req, res) => {
    if (req.user.role !== 'tpo' && req.user.role !== 'admin') {
        throw new ApiError(403, "Only TPO can update company status");
    }

    const { id } = req.params;
    const { isVerified } = req.body;

    const company = await User.findOne({ _id: id, role: 'company' });

    if (!company) {
        throw new ApiError(404, "Company not found");
    }

    company.companyDetails.isVerified = isVerified;
    await company.save();

    res.status(200).json(
        new ApiResponse(200, company, "Company status updated successfully")
    );
});

// Update user profile
export const updateProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const updates = req.body;

    // Fields that cannot be updated via this endpoint
    const restrictedFields = ['password', 'email', 'role', 'refreshToken', 'emailVerificationToken', 'passwordResetToken'];
    
    // Remove restricted fields from updates
    restrictedFields.forEach(field => delete updates[field]);

    // Find and update the user
    const user = await User.findById(userId);
    
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Update allowed fields
    Object.keys(updates).forEach(key => {
        if (updates[key] !== undefined) {
            user[key] = updates[key];
        }
    });

    await user.save();

    const updatedUser = await User.findById(userId).select(
        '-password -refreshToken -emailVerificationToken -passwordResetToken'
    );

    res.status(200).json(
        new ApiResponse(200, { user: updatedUser }, "Profile updated successfully")
    );
});
