import mongoose, { Schema } from "mongoose";

const auditLogSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        action: {
            type: String,
            required: true,
            index: true
        },
        resourceType: {
            type: String,
            required: true,
            index: true
        },
        resourceId: {
            type: Schema.Types.ObjectId,
            index: true
        },
        details: {
            type: Schema.Types.Mixed,
            default: {}
        },
        ipAddress: {
            type: String
        },
        userAgent: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

// Index for querying logs
auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ resourceType: 1, resourceId: 1 });

// Static method to create audit log
auditLogSchema.statics.createLog = async function(logData) {
    try {
        return await this.create(logData);
    } catch (error) {
        console.error('Error creating audit log:', error);
    }
};

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
