import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import TestComponent from './components/TestComponent';
import HomePage from './components/HomePage';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import AboutUsPage from './components/AboutUsPage';
import ContactUsPage from './components/ContactUsPage';
// Common Pages
import AccountSettings from './components/AccountSettings';
import NotificationPreferences from './components/NotificationPreferences';
import HelpSupport from './components/HelpSupport';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
// Layout Components
import StudentLayout from './components/student/StudentLayout';
import CompanyLayout from './components/company/CompanyLayout';
import AlumniLayout from './components/alumni/AlumniLayout';
import TpoLayout from './components/tpo/TpoLayout';
// Student Components
import StudentDashboard from './components/student/StudentDashboard';
import StudentProfile from './components/student/StudentProfile';
import ApplicationTracker from './components/student/ApplicationTracker';
import LearningPage from './components/student/LearningPage';
import MentorshipPage from './components/student/MentorshipPage';
import CommunityPage from './components/student/CommunityPage';
import PortfolioPage from './components/student/PortfolioPage';
import AnalyticsPage from './components/student/AnalyticsPage';
import NotificationsPage from './components/student/NotificationsPage';
import SettingsPage from './components/student/SettingsPage';
// New Student Components
import TPOSection from './components/student/TPOSection';
import CompaniesJobs from './components/student/CompaniesJobs';
import CompaniesEvents from './components/student/CompaniesEvents';
import Achievements from './components/student/Achievements';
import LearningHub from './components/student/LearningHub';
import Mentorship from './components/student/Mentorship';
// TPO Components
import TpoDashboard from './components/tpo/TpoDashboard';
import TpoAnnouncements from './components/tpo/TpoAnnouncements';
import TpoCalendar from './components/tpo/TpoCalendar';
import TpoCompanies from './components/tpo/TpoCompanies';
import TpoForms from './components/tpo/TpoForms';
import TpoContact from './components/tpo/TpoContact';
import TpoProfile from './components/tpo/TpoProfile';
import StudentManagement from './components/tpo/StudentManagement';
import StudentDetail from './components/tpo/StudentDetail';
import CompanyManagement from './components/tpo/CompanyManagement';
import CompanyOutreach from './components/tpo/CompanyOutreach';
import JobEventCoordination from './components/tpo/JobEventCoordination';
import BenchmarkingAnalytics from './components/tpo/BenchmarkingAnalytics';
import PlacementReports from './components/tpo/PlacementReports';
import EventPrManagement from './components/tpo/EventPrManagement';
import AlumniCoordination from './components/tpo/AlumniCoordination';
import StudentSkillAnalytics from './components/tpo/StudentSkillAnalytics';
import FeedbackCollection from './components/tpo/FeedbackCollection';
import AutomatedReports from './components/tpo/AutomatedReports';
import TrainingProgramManagement from './components/tpo/TrainingProgramManagement';
import SuccessStories from './components/tpo/SuccessStories';
import SecureDataManagement from './components/tpo/SecureDataManagement';
import NotificationsAlerts from './components/tpo/NotificationsAlerts';
// Company Components
import CompanyDashboard from './components/company/CompanyDashboard';
import CompanyProfile from './components/company/CompanyProfile';
import StudentDatabase from './components/company/StudentDatabase';
import StudentDetailView from './components/company/StudentDetailView';
import PostJobEvent from './components/company/PostJobEvent';
import ManageJobsEvents from './components/company/ManageJobsEvents';
import ApplicationsManagement from './components/company/ApplicationsManagement';
import ApplicationDetailView from './components/company/ApplicationDetailView';
import CollegeTpoDirectory from './components/company/CollegeTpoDirectory';
import AnalyticsDashboard from './components/company/AnalyticsDashboard';
import InterviewScheduler from './components/company/InterviewScheduler';
import ResumeComparison from './components/company/ResumeComparison';
import FeedbackRatings from './components/company/FeedbackRatings';
import NotificationsMessages from './components/company/NotificationsMessages';
import JobsEvents from './components/company/JobsEvents';
// Alumni Components
import AlumniDashboard from './components/alumni/AlumniDashboard';
import AlumniProfile from './components/alumni/AlumniProfile';
import StudentConnections from './components/alumni/StudentConnections';
import MyMentees from './components/alumni/MyMentees';
import MentorshipAnalytics from './components/alumni/MentorshipAnalytics';
import TpoAssistance from './components/alumni/TpoAssistance';
import CompanyReferral from './components/alumni/CompanyReferral';
import NetworkingCommunity from './components/alumni/NetworkingCommunity';
import CareerTools from './components/alumni/CareerTools';
import RewardsRecognition from './components/alumni/RewardsRecognition';
import RedeemRewards from './components/alumni/RedeemRewards';
import AlumniRating from './components/alumni/AlumniRating';
import EventsCalendar from './components/alumni/EventsCalendar';
// New Alumni Components
import MenteesList from './components/alumni/MenteesList';
import TPOSupport from './components/alumni/TPOSupport';
import Rewards from './components/alumni/Rewards';
import Network from './components/alumni/Network';
// New Company Components
import CompaniesTPO from './components/company/CollegesTPO';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TestComponent />} />
        {/* Public routes (no sidebar) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        
        {/* Common Pages */}
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/notification-preferences" element={<NotificationPreferences />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        
        {/* Student Routes with Layout */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="tpo" element={<TPOSection />} />
          <Route path="companies/jobs" element={<CompaniesJobs />} />
          <Route path="companies/events" element={<CompaniesEvents />} />
          <Route path="applications" element={<ApplicationTracker />} />
          <Route path="learning" element={<LearningHub />} />
          <Route path="mentorship" element={<Mentorship />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        
        {/* Company Routes with Layout */}
        <Route path="/company" element={<CompanyLayout />}>
          <Route index element={<CompanyDashboard />} />
          <Route path="dashboard" element={<CompanyDashboard />} />
          <Route path="profile" element={<CompanyProfile />} />
          <Route path="students" element={<StudentDatabase />} />
          <Route path="students/:id" element={<StudentDetailView />} />
          <Route path="jobs" element={<JobsEvents />} />
          <Route path="post-job" element={<PostJobEvent />} />
          <Route path="applications" element={<ApplicationsManagement />} />
          <Route path="colleges" element={<CompaniesTPO />} />
          <Route path="analytics" element={<AnalyticsDashboard />} />
          <Route path="interviews" element={<InterviewScheduler />} />
          <Route path="comparison" element={<ResumeComparison />} />
          <Route path="feedback" element={<FeedbackRatings />} />
          <Route path="notifications" element={<NotificationsMessages />} />
        </Route>
        
        {/* Alumni Routes with Layout */}
        <Route path="/alumni" element={<AlumniLayout />}>
          <Route index element={<AlumniDashboard />} />
          <Route path="dashboard" element={<AlumniDashboard />} />
          <Route path="profile" element={<AlumniProfile />} />
          <Route path="mentorship" element={<MentorshipPage />} />
          <Route path="mentees" element={<MenteesList />} />
          <Route path="tpo-support" element={<TPOSupport />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="network" element={<Network />} />
          <Route path="connections" element={<StudentConnections />} />
          <Route path="analytics" element={<MentorshipAnalytics />} />
          <Route path="community" element={<NetworkingCommunity />} />
          <Route path="career" element={<CareerTools />} />
          <Route path="rating" element={<AlumniRating />} />
          <Route path="events" element={<EventsCalendar />} />
        </Route>
        
        {/* TPO Routes with Layout */}
        <Route path="/tpo" element={<TpoLayout />}>
          <Route index element={<TpoDashboard />} />
          <Route path="dashboard" element={<TpoDashboard />} />
          <Route path="profile" element={<TpoProfile />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="students/:id" element={<StudentDetail />} />
          <Route path="companies" element={<CompanyManagement />} />
          <Route path="outreach" element={<CompanyOutreach />} />
          <Route path="analytics" element={<BenchmarkingAnalytics />} />
          <Route path="reports" element={<PlacementReports />} />
          <Route path="settings" element={<TpoProfile />} />
          <Route path="announcements" element={<TpoAnnouncements />} />
          <Route path="calendar" element={<TpoCalendar />} />
          <Route path="contact" element={<TpoContact />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;