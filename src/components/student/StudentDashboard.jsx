import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Briefcase, 
  Calendar, 
  Bell, 
  BookOpen, 
  Award, 
  TrendingUp,
  LogOut,
  Menu,
  X,
  Home
} from 'lucide-react';
import '../../App.css';

const StudentDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const studentName = "Alex Johnson"; // This would come from context/state in a real app

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // In a real app, you would clear user session here
    navigate('/');
  };

  // Quick stats data
  const stats = [
    { title: "Applications Submitted", value: 12, icon: <Briefcase size={24} /> },
    { title: "Interviews Scheduled", value: 5, icon: <Calendar size={24} /> },
    { title: "Offers Received", value: 2, icon: <Award size={24} /> },
    { title: "Courses in Progress", value: 3, icon: <BookOpen size={24} /> }
  ];

  // Upcoming events data
  const upcomingEvents = [
    { id: 1, title: "Tech Interview Workshop", date: "Oct 15, 2025", time: "2:00 PM" },
    { id: 2, title: "Google Campus Drive", date: "Oct 18, 2025", time: "10:00 AM" },
    { id: 3, title: "Hackathon Registration", date: "Oct 22, 2025", time: "Deadline" }
  ];

  // Recent notifications
  const notifications = [
    { id: 1, message: "Your application for Software Engineer at Microsoft has been received", time: "2 hours ago", unread: true },
    { id: 2, message: "Reminder: Interview with Amazon scheduled for tomorrow", time: "1 day ago", unread: false },
    { id: 3, message: "New internship opportunity at Google - Apply now", time: "2 days ago", unread: true }
  ];

  // Quick access buttons
  const quickAccess = [
    { title: "Profile", icon: <User size={24} />, path: "/student/profile" },
    { title: "Jobs", icon: <Briefcase size={24} />, path: "/student/jobs" },
    { title: "Events", icon: <Calendar size={24} />, path: "/student/events" },
    { title: "Applications", icon: <TrendingUp size={24} />, path: "/student/applications" }
  ];

  // Recommended jobs
  const recommendedJobs = [
    { id: 1, company: "Microsoft", role: "Software Engineer", package: "15 LPA", deadline: "Oct 20, 2025" },
    { id: 2, company: "Google", role: "Data Analyst", package: "18 LPA", deadline: "Oct 25, 2025" },
    { id: 3, company: "Amazon", role: "Product Manager", package: "22 LPA", deadline: "Nov 1, 2025" }
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Student Portal</h2>
          <button className="menu-toggle mobile-only" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/student/dashboard" className="nav-item active">
            <User size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/student/profile" className="nav-item">
            <User size={20} />
            <span>Profile</span>
          </Link>
          <Link to="/student/jobs" className="nav-item">
            <Briefcase size={20} />
            <span>Jobs</span>
          </Link>
          <Link to="/student/events" className="nav-item">
            <Calendar size={20} />
            <span>Events</span>
          </Link>
          <Link to="/student/applications" className="nav-item">
            <TrendingUp size={20} />
            <span>Applications</span>
          </Link>
          <Link to="/student/reviews" className="nav-item">
            <Award size={20} />
            <span>Reviews</span>
          </Link>
          <Link to="/student/learning" className="nav-item">
            <BookOpen size={20} />
            <span>Learning</span>
          </Link>
          <Link to="/student/mentorship" className="nav-item">
            <User size={20} />
            <span>Mentorship</span>
          </Link>
          <Link to="/student/community" className="nav-item">
            <User size={20} />
            <span>Community</span>
          </Link>
          <Link to="/student/portfolio" className="nav-item">
            <Award size={20} />
            <span>Portfolio</span>
          </Link>
          <Link to="/student/analytics" className="nav-item">
            <TrendingUp size={20} />
            <span>Analytics</span>
          </Link>
          <Link to="/student/notifications" className="nav-item">
            <Bell size={20} />
            <span>Notifications</span>
          </Link>
          <Link to="/student/settings" className="nav-item">
            <User size={20} />
            <span>Settings</span>
          </Link>
          <Link to="/" className="nav-item">
            <Home size={20} />
            <span>Home</span>
          </Link>
          <button onClick={handleLogout} className="nav-item">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <button className="menu-toggle desktop-only" onClick={toggleMenu}>
              <Menu size={24} />
            </button>
            <div className="header-info">
              <h1>Student Dashboard</h1>
              <p>Welcome back, {studentName}!</p>
            </div>
            <div className="header-actions">
              <button className="icon-button">
                <Bell size={24} />
              </button>
              <button className="icon-button">
                <User size={24} />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Quick Stats */}
          <section className="stats-section">
            <h2>Quick Stats</h2>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-info">
                    <h3>{stat.value}</h3>
                    <p>{stat.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Main Content Grid */}
          <div className="dashboard-grid">
            {/* Upcoming Events */}
            <section className="upcoming-events">
              <div className="section-header">
                <h2>Upcoming Events</h2>
                <Link to="/student/events" className="view-all">View All</Link>
              </div>
              <div className="events-list">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="event-item">
                    <div className="event-date">
                      <p className="date">{event.date.split(' ')[1]}</p>
                      <p className="month">{event.date.split(' ')[0]}</p>
                    </div>
                    <div className="event-details">
                      <h3>{event.title}</h3>
                      <p>{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Notifications */}
            <section className="notifications-section">
              <div className="section-header">
                <h2>Recent Notifications</h2>
                <Link to="/student/notifications" className="view-all">View All</Link>
              </div>
              <div className="notifications-list">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${notification.unread ? 'unread' : ''}`}
                  >
                    <p>{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Access */}
            <section className="quick-access">
              <h2>Quick Access</h2>
              <div className="quick-access-grid">
                {quickAccess.map((item, index) => (
                  <Link key={index} to={item.path} className="quick-access-item">
                    <div className="quick-access-icon">{item.icon}</div>
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Recommended Jobs */}
            <section className="recommended-jobs">
              <div className="section-header">
                <h2>Recommended for You</h2>
                <Link to="/student/jobs" className="view-all">View All</Link>
              </div>
              <div className="jobs-list">
                {recommendedJobs.map(job => (
                  <div key={job.id} className="job-card">
                    <div className="job-header">
                      <div className="company-logo">
                        <Briefcase size={24} />
                      </div>
                      <div className="job-details">
                        <h3>{job.role}</h3>
                        <p>{job.company}</p>
                      </div>
                    </div>
                    <div className="job-info">
                      <p><strong>Package:</strong> {job.package}</p>
                      <p><strong>Deadline:</strong> {job.deadline}</p>
                    </div>
                    <button className="apply-button">Apply Now</button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;