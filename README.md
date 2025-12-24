# Campus Placement Portal 🎓

A comprehensive role-based campus placement management system built with **React**, **Node.js**, **Express**, and **MongoDB**.

## 🎯 Project Overview

This portal supports **4 user roles**:
- **Students**: Apply for jobs, track applications, view announcements
- **TPO (Training & Placement Officer)**: Manage students, companies, and placement activities
- **Companies**: Post jobs, review applications, recruit students
- **Alumni**: Mentor students, share experiences, provide guidance

## 🚀 Features

### ✅ Phase 1: Foundation & Authentication (COMPLETED)

- ✅ Role-based authentication system
- ✅ Clean, modern UI with Tailwind CSS
- ✅ Role-based dashboards for all 4 user types
- ✅ Protected routes with authorization
- ✅ Responsive navigation (Navbar & Sidebar)
- ✅ Reusable UI components (Cards, Badges, Alerts, etc.)

### 📋 Upcoming Features (Phase 2 & Beyond)

**For Students:**
- View TPO announcements
- Browse companies
- Submit applications
- Track application status
- Profile management

**For TPO:**
- Manage students (view, filter, search)
- Post announcements
- Manage companies
- Track placements

**For Companies:**
- Post jobs/internships
- Browse student profiles
- Manage applications
- Shortlist candidates

**For Alumni:**
- View student directory
- Accept mentorship requests
- Share experiences

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **Vite** - Build Tool
- **React Router v6** - Routing
- **Zustand** - State Management
- **Axios** - HTTP Client
- **Tailwind CSS** - Styling
- **React Icons** (Lucide) - Icons
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime
- **Express** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password Hashing

## 📁 Project Structure

```
PlaCen2/
├── backend/
│   ├── controllers/          # Request handlers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middlewares/         # Auth, validation, rate limiting
│   ├── utils/               # Helper functions
│   ├── constants.js         # Constants (roles, statuses)
│   ├── index.js             # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── common/      # Reusable UI components
    │   │   ├── layout/      # Navbar, Sidebar, Layout
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── student/     # Student pages
    │   │   ├── tpo/         # TPO pages
    │   │   ├── company/     # Company pages
    │   │   ├── alumni/      # Alumni pages
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── services/        # API calls
    │   ├── store/           # Zustand stores
    │   ├── utils/           # Helper functions & constants
    │   ├── App.jsx          # Main app with routing
    │   └── main.jsx         # Entry point
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (v6 or higher)
- **npm** or **yarn**

### Installation

#### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd PlaCen2
```

#### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the content below and update with your values
```

Create `backend/.env`:

```env
# Server
PORT=8000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/campus_placement_portal

# JWT Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret_key_here
REFRESH_TOKEN_SECRET=your_refresh_token_secret_key_here
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
EMAIL_VERIFICATION_SECRET=your_email_verification_secret_here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

```bash
# Start MongoDB (if not running)
# On Windows: Make sure MongoDB service is running
# Or start it manually: mongod

# Start backend server
npm run dev
```

Backend will run on `http://localhost:8000`

#### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create .env file
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

```bash
# Start frontend development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🧪 Testing the Application

### 1. Register Users

Visit `http://localhost:5173/register` and create accounts for different roles:

**Test Student Account:**
- First Name: John
- Last Name: Doe
- Email: student@test.com
- Password: student123
- Role: Student

**Test TPO Account:**
- First Name: Sarah
- Last Name: Admin
- Email: tpo@test.com
- Password: tpo123456
- Role: TPO

**Test Company Account:**
- First Name: Tech
- Last Name: Corp
- Email: company@test.com
- Password: company123
- Role: Company

**Test Alumni Account:**
- First Name: Alex
- Last Name: Graduate
- Email: alumni@test.com
- Password: alumni123
- Role: Alumni

### 2. Login & Explore

- Login with any test account
- You'll be automatically redirected to the role-specific dashboard
- Explore the navigation sidebar
- Check different UI components

## 📖 API Endpoints

### Authentication

```
POST   /api/v1/auth/register         - Register new user
POST   /api/v1/auth/login            - Login user
POST   /api/v1/auth/logout           - Logout user
POST   /api/v1/auth/refresh          - Refresh access token
GET    /api/v1/auth/me               - Get current user
POST   /api/v1/auth/change-password  - Change password
POST   /api/v1/auth/verify-email     - Verify email
```

### Jobs (Coming Soon)

```
GET    /api/v1/jobs                  - Get all jobs
POST   /api/v1/jobs                  - Create job (Company only)
GET    /api/v1/jobs/:id              - Get job by ID
PUT    /api/v1/jobs/:id              - Update job
DELETE /api/v1/jobs/:id              - Delete job
```

### Applications (Coming Soon)

```
GET    /api/v1/applications          - Get applications
POST   /api/v1/applications          - Submit application
GET    /api/v1/applications/:id      - Get application
PUT    /api/v1/applications/:id      - Update application status
```

### Events (Coming Soon)

```
GET    /api/v1/events                - Get all events
POST   /api/v1/events                - Create event (TPO only)
GET    /api/v1/events/:id            - Get event by ID
PUT    /api/v1/events/:id            - Update event
DELETE /api/v1/events/:id            - Delete event
```

## 🎨 UI Components

### Common Components

- **Spinner**: Loading indicators
- **Badge**: Status badges (success, warning, danger, info)
- **Card**: Container with optional title and actions
- **Avatar**: User profile images/initials
- **Alert**: Notification messages
- **EmptyState**: Empty state placeholders

### Layout Components

- **Navbar**: Top navigation with user menu
- **Sidebar**: Role-based navigation menu
- **DashboardLayout**: Wrapper for dashboard pages

## 🔐 User Roles & Permissions

| Feature | Student | TPO | Company | Alumni |
|---------|---------|-----|---------|--------|
| Dashboard | ✅ | ✅ | ✅ | ✅ |
| View Announcements | ✅ | ✅ | ❌ | ❌ |
| Post Announcements | ❌ | ✅ | ❌ | ❌ |
| View Companies | ✅ | ✅ | ❌ | ❌ |
| Post Jobs | ❌ | ❌ | ✅ | ❌ |
| Apply for Jobs | ✅ | ❌ | ❌ | ❌ |
| View Students | ❌ | ✅ | ✅ | ✅ |
| Manage Students | ❌ | ✅ | ❌ | ❌ |
| Mentorship | ✅ | ❌ | ❌ | ✅ |

## 📝 Development Roadmap

### ✅ Completed (Phase 1)
- [x] Project setup
- [x] Authentication system
- [x] Role-based routing
- [x] Dashboard layouts
- [x] UI component library

### 🔄 In Progress (Phase 2)
- [ ] Student features (announcements, companies, applications)
- [ ] TPO features (student management, announcements)
- [ ] Company features (job posting, applications)
- [ ] Alumni features (mentorship, student directory)

### 📅 Planned (Phase 3+)
- [ ] Real-time notifications
- [ ] File uploads (resume, documents)
- [ ] Email notifications
- [ ] Analytics & reports
- [ ] Chat/messaging system
- [ ] Calendar integration
- [ ] Search & filtering
- [ ] Export data (PDF, Excel)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - *Initial work*

## 🙏 Acknowledgments

- Icons by [Lucide React](https://lucide.dev/)
- UI inspired by modern dashboard designs
- Built with ❤️ for campus placement automation

---

**Happy Coding! 🚀**
