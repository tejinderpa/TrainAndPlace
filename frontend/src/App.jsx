import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/authStore';
import { USER_ROLES } from './utils/constants';

// Layout
import { DashboardLayout } from './components/layout';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Dashboard Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentAnnouncements from './pages/student/Announcements';
import StudentCompanies from './pages/student/Companies';
import StudentProfile from './pages/student/Profile';
import StudentApplications from './pages/student/Applications';

import TPODashboard from './pages/tpo/Dashboard';
import TPOStudents from './pages/tpo/Students';
import TPOAnnouncements from './pages/tpo/AnnouncementsManagement';
import CompanyManagement from './pages/tpo/CompanyManagement';
import TPOJobs from './pages/tpo/Jobs';
import TPOApplications from './pages/tpo/Applications';

import CompanyDashboard from './pages/company/Dashboard';
import PostJob from './pages/company/PostJob';
import MyJobs from './pages/company/MyJobs';
import StudentProfiles from './pages/company/StudentProfiles';
import JobApplications from './pages/company/JobApplications';
import CompanyProfile from './pages/company/Profile';

import AlumniDashboard from './pages/alumni/Dashboard';
import AlumniProfile from './pages/alumni/Profile';
import StudentDirectory from './pages/alumni/StudentDirectory';
import MentorshipRequests from './pages/alumni/MentorshipRequests';
import AlumniEvents from './pages/alumni/Events';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import { Spinner } from './components/common';

function App() {
  const { checkAuth, isLoading, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner size="lg" />
      </div>
    );
  }

  // Redirect to appropriate dashboard based on role
  const getDashboardPath = () => {
    if (!user) return '/login';
    
    const roleRoutes = {
      [USER_ROLES.STUDENT]: '/dashboard/student',
      [USER_ROLES.TPO]: '/dashboard/tpo',
      [USER_ROLES.COMPANY]: '/dashboard/company',
      [USER_ROLES.ALUMNI]: '/dashboard/alumni',
    };

    return roleRoutes[user.role] || '/dashboard';
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to={getDashboardPath()} replace /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to={getDashboardPath()} replace /> : <Register />}
          />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Default dashboard redirect */}
            <Route index element={<Navigate to={getDashboardPath()} replace />} />

            {/* Student Routes */}
            <Route
              path="student"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="announcements"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT, USER_ROLES.ALUMNI]}>
                  <StudentAnnouncements />
                </ProtectedRoute>
              }
            />
            <Route
              path="companies"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
                  <StudentCompanies />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <StudentProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="applications"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT]}>
                  <StudentApplications />
                </ProtectedRoute>
              }
            />

            {/* TPO Routes */}
            <Route
              path="tpo"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.TPO, USER_ROLES.ADMIN]}>
                  <TPODashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="tpo/students"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.TPO, USER_ROLES.ADMIN]}>
                  <TPOStudents />
                </ProtectedRoute>
              }
            />
            <Route
              path="tpo/announcements"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.TPO, USER_ROLES.ADMIN]}>
                  <TPOAnnouncements />
                </ProtectedRoute>
              }
            />
            <Route
              path="tpo/companies"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.TPO, USER_ROLES.ADMIN]}>
                  <CompanyManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="tpo/jobs"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.TPO, USER_ROLES.ADMIN]}>
                  <TPOJobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="tpo/applications"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.TPO, USER_ROLES.ADMIN]}>
                  <TPOApplications />
                </ProtectedRoute>
              }
            />

            {/* Company Routes */}
            <Route
              path="company"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.COMPANY]}>
                  <CompanyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="post-job"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.COMPANY]}>
                  <PostJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="my-jobs"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.COMPANY]}>
                  <MyJobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="students"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.COMPANY]}>
                  <StudentProfiles />
                </ProtectedRoute>
              }
            />
            <Route
              path="job/:id"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.COMPANY]}>
                  <JobApplications />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.COMPANY]}>
                  <CompanyProfile />
                </ProtectedRoute>
              }
            />

            {/* Alumni Routes */}
            <Route
              path="alumni"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.ALUMNI]}>
                  <AlumniDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="alumni/profile"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.ALUMNI]}>
                  <AlumniProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="alumni/students"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.ALUMNI]}>
                  <StudentDirectory />
                </ProtectedRoute>
              }
            />
            <Route
              path="alumni/mentorship"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.ALUMNI]}>
                  <MentorshipRequests />
                </ProtectedRoute>
              }
            />
            <Route
              path="alumni/events"
              element={
                <ProtectedRoute allowedRoles={[USER_ROLES.ALUMNI]}>
                  <AlumniEvents />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Unauthorized Page */}
          <Route
            path="/unauthorized"
            element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">403</h1>
                  <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
                  <button
                    onClick={() => window.history.back()}
                    className="btn-primary"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            }
          />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600 mb-4">Page not found.</p>
                  <a href="/" className="btn-primary">
                    Go Home
                  </a>
                </div>
              </div>
            }
          />

          {/* Root redirect */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to={getDashboardPath()} replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </BrowserRouter>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#363636',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;
