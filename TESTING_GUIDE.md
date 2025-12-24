# Testing Guide - Campus Placement Portal

## Quick Start Testing

### 1. Start the Application

**Backend:**
```bash
cd backend
npm install
npm run dev
```
Backend runs on: `http://localhost:5000`

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## Test User Accounts

Create test users for each role using the register endpoint or seed data.

### Student Test User
```json
{
  "email": "student@test.com",
  "password": "password123",
  "role": "student",
  "name": "Test Student",
  "phone": "1234567890",
  "studentDetails": {
    "enrollmentNumber": "2021CSE001",
    "branch": "Computer Science",
    "batch": "2025",
    "cgpa": 8.5,
    "skills": ["React", "Node.js", "Python"]
  }
}
```

### TPO Test User
```json
{
  "email": "tpo@test.com",
  "password": "password123",
  "role": "tpo",
  "name": "Test TPO",
  "phone": "1234567890",
  "tpoDetails": {
    "employeeId": "TPO001",
    "department": "Placement Cell"
  }
}
```

### Company Test User
```json
{
  "email": "company@test.com",
  "password": "password123",
  "role": "company",
  "name": "Tech Corp",
  "phone": "1234567890",
  "companyDetails": {
    "companyName": "Tech Corp",
    "website": "https://techcorp.com",
    "industry": "IT Services",
    "size": "1000-5000",
    "description": "Leading IT services company"
  }
}
```

### Alumni Test User
```json
{
  "email": "alumni@test.com",
  "password": "password123",
  "role": "alumni",
  "name": "Test Alumni",
  "phone": "1234567890",
  "alumniDetails": {
    "graduationYear": "2020",
    "branch": "Computer Science",
    "currentCompany": "Google",
    "designation": "Software Engineer",
    "experience": 3
  }
}
```

---

## Feature Testing Checklist

### ✅ Student Features (All Complete)

#### 1. Announcements Page
**Path**: `/dashboard/announcements`

Test Cases:
- [ ] View all announcements
- [ ] Filter by type (Academic, Placement, Event, etc.)
- [ ] Filter by priority (Low, Medium, High, Urgent)
- [ ] Search announcements
- [ ] Click announcement to view details in modal
- [ ] Verify view count increments
- [ ] Check relative time display (e.g., "2 hours ago")

#### 2. Companies List
**Path**: `/dashboard/companies`

Test Cases:
- [ ] View all registered companies
- [ ] Search company by name
- [ ] Filter by job type (Internship/Placement)
- [ ] Click company card to open modal
- [ ] View company details in modal
- [ ] See active jobs for each company
- [ ] Verify "Verified" badge appears

#### 3. Profile Management
**Path**: `/dashboard/profile`

Test Cases:
- [ ] View profile in read-only mode
- [ ] Click "Edit Profile" button
- [ ] Update personal information
- [ ] Update academic details (CGPA, enrollment, etc.)
- [ ] Add new skills
- [ ] Remove existing skills
- [ ] Update professional links (GitHub, LinkedIn, Portfolio)
- [ ] Save changes successfully
- [ ] Cancel editing

#### 4. Application Tracker
**Path**: `/dashboard/applications`

Test Cases:
- [ ] View statistics (Total, Pending, Shortlisted, Accepted, Rejected)
- [ ] Filter applications by status
- [ ] Search by job title or company
- [ ] View application details
- [ ] Check status badge colors
- [ ] Verify applied date display

---

### ✅ TPO Features (Partial)

#### 1. Student Management
**Path**: `/dashboard/tpo/students`

Test Cases:
- [ ] View all students
- [ ] Check statistics cards (Total, High CGPA, Final Year, Active)
- [ ] Search by name/email/enrollment
- [ ] Filter by branch
- [ ] Filter by batch
- [ ] Filter by minimum CGPA
- [ ] Click student to view detail modal
- [ ] View student skills and profile in modal
- [ ] Export student data

#### 2. Announcements Management
**Path**: `/dashboard/tpo/announcements`

Test Cases:
- [ ] Create new announcement
  - [ ] Fill in title
  - [ ] Add description
  - [ ] Select type
  - [ ] Select priority
  - [ ] Set target audience
- [ ] Edit existing announcement
- [ ] Delete announcement (with confirmation)
- [ ] View all announcements list
- [ ] Check view counts
- [ ] Verify success/error notifications

---

### ✅ Company Features (Partial)

#### 1. Post Job
**Path**: `/dashboard/post-job`

Test Cases:
- [ ] Fill job title
- [ ] Add job description
- [ ] Select job type (Full-time, Part-time, Internship, Contract)
- [ ] Enter location
- [ ] Set number of positions
- [ ] Set salary range (min-max)
- [ ] Set application deadline
- [ ] Select eligible branches (multiple)
- [ ] Set minimum CGPA
- [ ] Add required skills
- [ ] Submit job posting
- [ ] Verify redirect to "My Jobs"

#### 2. My Jobs
**Path**: `/dashboard/my-jobs`

Test Cases:
- [ ] View all posted jobs
- [ ] Check statistics (Total, Active, Expired, Applications)
- [ ] Filter by status (All, Active, Expired, Inactive)
- [ ] View job details
- [ ] Edit job posting
- [ ] Delete job (with confirmation)
- [ ] See status badges (Active/Expired/Inactive)
- [ ] Check applications count per job

#### 3. Student Profiles
**Path**: `/dashboard/students`

Test Cases:
- [ ] Browse all students
- [ ] Search by name or skills
- [ ] Filter by branch
- [ ] Filter by batch
- [ ] Filter by minimum CGPA
- [ ] View student cards
- [ ] Click "View Profile" to open modal
- [ ] See full student details in modal
- [ ] View all skills
- [ ] Download resume (if available)
- [ ] Export student data

---

### ❌ Alumni Features (Not Implemented)

#### Pending:
- Alumni Profile
- Student Directory
- Mentorship Requests

---

## API Endpoints to Test

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/logout` - Logout
- `POST /api/v1/auth/refresh-token` - Refresh access token
- `GET /api/v1/auth/profile` - Get current user

### Announcements
- `GET /api/v1/announcements` - Get all announcements
- `GET /api/v1/announcements/:id` - Get single announcement
- `POST /api/v1/announcements` - Create announcement (TPO only)
- `PUT /api/v1/announcements/:id` - Update announcement
- `DELETE /api/v1/announcements/:id` - Delete announcement

### Jobs
- `GET /api/v1/jobs` - Get all jobs
- `GET /api/v1/jobs/:id` - Get single job
- `POST /api/v1/jobs` - Create job (Company only)
- `PUT /api/v1/jobs/:id` - Update job
- `DELETE /api/v1/jobs/:id` - Delete job

### Applications
- `GET /api/v1/applications` - Get applications
- `POST /api/v1/applications` - Apply to job
- `PUT /api/v1/applications/:id` - Update application status

---

## Common Issues & Solutions

### 1. CORS Error
**Problem**: Frontend can't connect to backend
**Solution**: Check backend CORS configuration in `index.js`

### 2. Token Expiry
**Problem**: Getting 401 errors
**Solution**: Token auto-refresh is implemented. Check localStorage for tokens.

### 3. Database Connection
**Problem**: Backend crashes on start
**Solution**: 
- Check MongoDB is running
- Verify `.env` has correct `MONGODB_URI`

### 4. Port Already in Use
**Problem**: Cannot start server
**Solution**:
- Backend: Change port in `.env` or kill process on port 5000
- Frontend: Vite will prompt to use different port

### 5. Module Not Found
**Problem**: Import errors in frontend
**Solution**: Run `npm install` in frontend directory

---

## Performance Testing

### Load Testing Scenarios

1. **Multiple Users Login**
   - Create 10+ test users
   - Login simultaneously
   - Check response times

2. **Large Data Sets**
   - Add 100+ announcements
   - Create 50+ jobs
   - Check pagination and filtering

3. **File Operations**
   - Upload large resumes (when implemented)
   - Download multiple files

---

## Security Testing

### Test Cases

1. **Authentication**
   - [ ] Cannot access protected routes without login
   - [ ] Token expires after set time
   - [ ] Refresh token works correctly

2. **Authorization**
   - [ ] Student cannot access TPO routes
   - [ ] Company cannot access Student-only routes
   - [ ] Alumni cannot modify announcements

3. **Data Validation**
   - [ ] Required fields are enforced
   - [ ] Email format validation
   - [ ] CGPA range validation (0-10)

4. **SQL Injection Prevention**
   - [ ] Test with malicious inputs
   - [ ] Special characters in forms

---

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## Mobile Responsiveness

Test all pages on:
- [ ] iPhone (iOS Safari)
- [ ] Android (Chrome)
- [ ] Tablet (iPad)

Use browser DevTools to test responsive breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## Automated Testing (Future)

### Unit Tests
```bash
npm run test:unit
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e
```

---

## Bug Reporting Template

When reporting bugs, include:

```
**Title**: Brief description

**Environment**:
- OS: Windows/Mac/Linux
- Browser: Chrome/Firefox/Safari
- Version: X.X.X

**Steps to Reproduce**:
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**:
What should happen

**Actual Behavior**:
What actually happens

**Screenshots**:
If applicable

**Console Errors**:
Any errors in browser console
```

---

## Test Data Cleanup

After testing, clean up test data:

```bash
# In MongoDB shell or Compass
use placement_portal
db.users.deleteMany({ email: /test\.com/ })
db.announcements.deleteMany({ createdBy: ObjectId('test_user_id') })
db.jobs.deleteMany({ postedBy: ObjectId('test_company_id') })
```

---

*Last Updated: Phase 2 Implementation - January 2025*
