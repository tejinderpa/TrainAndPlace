export const DB_NAME = 'national_tpo_portal'

// User Roles for National TPO Portal
export const USER_ROLES = {
    STUDENT: 'student',
    COMPANY: 'company',
    ALUMNI: 'alumni',
    TPO: 'tpo',
    ADMIN: 'admin'
}

// Audit Actions (required for auth controller)
export const AUDIT_ACTIONS = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    STATUS_CHANGE: 'STATUS_CHANGE',
    ASSIGN: 'ASSIGN',
    PROFILE_UPDATE: 'PROFILE_UPDATE',
    APPLICATION_SUBMIT: 'APPLICATION_SUBMIT',
    JOB_POST: 'JOB_POST',
    MENTORSHIP_REQUEST: 'MENTORSHIP_REQUEST'
}

// Application Status
export const APPLICATION_STATUS = {
    PENDING: 'pending',
    REVIEWED: 'reviewed',
    SHORTLISTED: 'shortlisted',
    REJECTED: 'rejected',
    ACCEPTED: 'accepted'
}

// Job Types
export const JOB_TYPES = {
    FULL_TIME: 'full_time',
    PART_TIME: 'part_time',
    INTERNSHIP: 'internship',
    CONTRACT: 'contract'
}

// Event Types
export const EVENT_TYPES = {
    HACKATHON: 'hackathon',
    WORKSHOP: 'workshop',
    WEBINAR: 'webinar',
    PLACEMENT_DRIVE: 'placement_drive',
    CAREER_FAIR: 'career_fair'
}
