import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Building2, 
  Calendar, 
  FileText, 
  Bell, 
  TrendingUp,
  Menu,
  X,
  Home,
  LogOut,
  CheckCircle,
  Clock,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import '../../App.css';

const TpoDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tpoName = "Dr. Rajesh Kumar";
  const collegeName = "National Institute of Technology";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // In a real app, you would clear user session here
    console.log("Logout initiated");
  };

  // Key stats data
  const stats = [
    { title: "Total Students", value: 1250, icon: <Users size={24} /> },
    { title: "Companies Partnered", value: 85, icon: <Building2 size={24} /> },
    { title: "Placements This Year", value: 420, icon: <CheckCircle size={24} /> },
    { title: "Average Package", value: "12.5 LPA", icon: <TrendingUp size={24} /> }
  ];

  // Pending tasks data
  const pendingTasks = [
    { id: 1, title: "Review Microsoft Job Posting", status: "pending", dueDate: "Today" },
    { id: 2, title: "Approve Amazon Campus Drive", status: "in-progress", dueDate: "Tomorrow" },
    { id: 3, title: "Verify Student Documents", status: "pending", dueDate: "Oct 15" },
    { id: 4, title: "Send TCS Invitation", status: "completed", dueDate: "Oct 10" }
  ];

  // Recent company registrations
  const recentCompanies = [
    { id: 1, name: "Meta", date: "Oct 12, 2025", status: "New" },
    { id: 2, name: "Adobe", date: "Oct 11, 2025", status: "Verified" },
    { id: 3, name: "Salesforce", date: "Oct 10, 2025", status: "Pending" }
  ];

  // Upcoming placement drives
  const upcomingDrives = [
    { id: 1, company: "Google", date: "Oct 20, 2025", branches: "CSE, IT, ECE" },
    { id: 2, company: "Microsoft", date: "Oct 25, 2025", branches: "All Branches" },
    { id: 3, company: "Amazon", date: "Nov 2, 2025", branches: "CSE, IT" }
  ];

  // Quick actions
  const quickActions = [
    { title: "Add Student", icon: <Users size={20} />, path: "/tpo/student-management" },
    { title: "Invite Company", icon: <Building2 size={20} />, path: "/tpo/company-outreach" },
    { title: "Post Job", icon: <Briefcase size={20} />, path: "/company/post" },
    { title: "Generate Report", icon: <FileText size={20} />, path: "/tpo/automated-reports" }
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>TPO Portal</h2>
          <button className="menu-toggle mobile-only" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/tpo/dashboard" className="nav-item active">
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/tpo/profile" className="nav-item">
            <Users size={20} />
            <span>Profile & College Info</span>
          </Link>
          <Link to="/tpo/student-management" className="nav-item">
            <Users size={20} />
            <span>Student Management</span>
          </Link>
          <Link to="/tpo/company-management" className="nav-item">
            <Building2 size={20} />
            <span>Company Management</span>
          </Link>
          <Link to="/tpo/company-outreach" className="nav-item">
            <Mail size={20} />
            <span>Company Outreach</span>
          </Link>
          <Link to="/tpo/job-event-coordination" className="nav-item">
            <Briefcase size={20} />
            <span>Job/Event Coordination</span>
          </Link>
          <Link to="/tpo/benchmarking-analytics" className="nav-item">
            <TrendingUp size={20} />
            <span>Benchmarking & Analytics</span>
          </Link>
          <Link to="/tpo/placement-reports" className="nav-item">
            <FileText size={20} />
            <span>Placement Reports</span>
          </Link>
          <Link to="/tpo/event-pr-management" className="nav-item">
            <Calendar size={20} />
            <span>Event & PR Management</span>
          </Link>
          <Link to="/tpo/alumni-coordination" className="nav-item">
            <Users size={20} />
            <span>Alumni Coordination</span>
          </Link>
          <Link to="/tpo/student-skill-analytics" className="nav-item">
            <TrendingUp size={20} />
            <span>Student Skill Analytics</span>
          </Link>
          <Link to="/tpo/feedback-collection" className="nav-item">
            <FileText size={20} />
            <span>Feedback Collection</span>
          </Link>
          <Link to="/tpo/automated-reports" className="nav-item">
            <FileText size={20} />
            <span>Automated Reports</span>
          </Link>
          <Link to="/tpo/training-program-management" className="nav-item">
            <FileText size={20} />
            <span>Training Programs</span>
          </Link>
          <Link to="/tpo/success-stories" className="nav-item">
            <Star size={20} />
            <span>Success Stories</span>
          </Link>
          <Link to="/tpo/secure-data" className="nav-item">
            <Lock size={20} />
            <span>Secure Data</span>
          </Link>
          <Link to="/tpo/notifications-alerts" className="nav-item">
            <Bell size={20} />
            <span>Notifications & Alerts</span>
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
              <h1>TPO Dashboard</h1>
              <p>Welcome to {collegeName}, {tpoName}!</p>
            </div>
            <div className="header-actions">
              <button className="icon-button">
                <Bell size={24} />
              </button>
              <button className="icon-button">
                <Users size={24} />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Key Stats */}
          <section className="stats-section">
            <h2>Key Statistics</h2>
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
            {/* Pending Tasks */}
            <section className="upcoming-events">
              <div className="section-header">
                <h2>Pending Tasks</h2>
                <Link to="#" className="view-all">View All</Link>
              </div>
              <div className="events-list">
                {pendingTasks.map(task => (
                  <div key={task.id} className="event-item">
                    <div className="event-details">
                      <h3>{task.title}</h3>
                      <p>Due: {task.dueDate}</p>
                    </div>
                    <div className={`priority-badge ${
                      task.status === 'completed' ? 'low' : 
                      task.status === 'in-progress' ? 'medium' : 'high'
                    }`}>
                      {task.status}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Company Registrations */}
            <section className="notifications-section">
              <div className="section-header">
                <h2>Recent Company Registrations</h2>
                <Link to="/tpo/company-management" className="view-all">View All</Link>
              </div>
              <div className="notifications-list">
                {recentCompanies.map(company => (
                  <div key={company.id} className="notification-item">
                    <p><strong>{company.name}</strong> registered</p>
                    <p>{company.date} • <span className="badge">{company.status}</span></p>
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming Placement Drives */}
            <section className="recommended-jobs">
              <div className="section-header">
                <h2>Upcoming Placement Drives</h2>
                <Link to="/tpo/calendar" className="view-all">View Calendar</Link>
              </div>
              <div className="jobs-list">
                {upcomingDrives.map(drive => (
                  <div key={drive.id} className="job-card">
                    <div className="job-header">
                      <div className="company-info">
                        <div className="company-logo">
                          <Briefcase size={24} />
                        </div>
                        <div className="job-details">
                          <h3>{drive.company}</h3>
                          <p>{drive.date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="job-info">
                      <p><strong>Eligible Branches:</strong> {drive.branches}</p>
                    </div>
                    <button className="apply-button">View Details</button>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="quick-access">
              <h2>Quick Actions</h2>
              <div className="quick-access-grid">
                {quickActions.map((action, index) => (
                  <Link to={action.path} key={index} className="quick-access-item">
                    <div className="quick-access-icon">{action.icon}</div>
                    <span>{action.title}</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TpoDashboard;