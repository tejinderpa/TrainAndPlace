import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  FileText, 
  Bell, 
  TrendingUp,
  Menu,
  X,
  Home,
  LogOut,
  Plus,
  Eye,
  CheckCircle,
  Clock
} from 'lucide-react';
import '../../App.css';

const CompanyDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const companyName = "TechCorp Solutions"; // This would come from context/state in a real app

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // In a real app, you would clear user session here
    console.log("Logout initiated");
  };

  // Quick stats data
  const stats = [
    { title: "Jobs Posted", value: 24, icon: <Briefcase size={24} /> },
    { title: "Applications", value: 342, icon: <FileText size={24} /> },
    { title: "Students Shortlisted", value: 87, icon: <Users size={24} /> },
    { title: "Events Conducted", value: 12, icon: <Calendar size={24} /> }
  ];

  // Recent applications data
  const recentApplications = [
    { id: 1, student: "Alex Johnson", position: "Software Engineer", college: "NIT Trichy", status: "Pending", date: "2025-10-12" },
    { id: 2, student: "Sarah Williams", position: "Product Manager", college: "IIT Delhi", status: "Shortlisted", date: "2025-10-11" },
    { id: 3, student: "Michael Chen", position: "Data Scientist", college: "IIIT Hyderabad", status: "Rejected", date: "2025-10-10" },
    { id: 4, student: "Priya Sharma", position: "UI/UX Designer", college: "NID Ahmedabad", status: "Pending", date: "2025-10-09" }
  ];

  // Upcoming events
  const upcomingEvents = [
    { id: 1, title: "Campus Drive - IIT Bombay", date: "2025-10-18", time: "10:00 AM - 4:00 PM", location: "Main Auditorium" },
    { id: 2, title: "Internship Test - NIT Surathkal", date: "2025-10-22", time: "2:00 PM - 5:00 PM", location: "Online" },
    { id: 3, title: "Workshop - IIIT Bangalore", date: "2025-10-25", time: "11:00 AM - 1:00 PM", location: "Seminar Hall" }
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Company Portal</h2>
          <button className="menu-toggle mobile-only" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/company/dashboard" className="nav-item active">
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/company/profile" className="nav-item">
            <Users size={20} />
            <span>Company Profile</span>
          </Link>
          <Link to="/company/students" className="nav-item">
            <Users size={20} />
            <span>Student Database</span>
          </Link>
          <Link to="/company/post" className="nav-item">
            <Plus size={20} />
            <span>Post Job/Event</span>
          </Link>
          <Link to="/company/manage" className="nav-item">
            <Briefcase size={20} />
            <span>Manage Jobs/Events</span>
          </Link>
          <Link to="/company/applications" className="nav-item">
            <FileText size={20} />
            <span>Applications</span>
          </Link>
          <Link to="/company/analytics" className="nav-item">
            <TrendingUp size={20} />
            <span>Analytics</span>
          </Link>
          <Link to="/company/interviews" className="nav-item">
            <Calendar size={20} />
            <span>Interview Scheduler</span>
          </Link>
          <Link to="/company/colleges" className="nav-item">
            <Home size={20} />
            <span>College Directory</span>
          </Link>
          <Link to="/company/notifications" className="nav-item">
            <Bell size={20} />
            <span>Notifications</span>
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
              <h1>Company Dashboard</h1>
              <p>Welcome back, {companyName}!</p>
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
          {/* Quick Stats */}
          <section className="stats-section">
            <h2>Statistics Overview</h2>
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
            {/* Recent Applications */}
            <section className="upcoming-events">
              <div className="section-header">
                <h2>Recent Applications</h2>
                <Link to="/company/applications" className="view-all">View All</Link>
              </div>
              <div className="events-list">
                {recentApplications.map(application => (
                  <div key={application.id} className="event-item">
                    <div className="event-details">
                      <h3>{application.student}</h3>
                      <p>{application.position} - {application.college}</p>
                      <p className="date">{application.date}</p>
                    </div>
                    <div className={`priority-badge ${application.status.toLowerCase()}`}>
                      {application.status}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming Events */}
            <section className="notifications-section">
              <div className="section-header">
                <h2>Upcoming Events</h2>
                <Link to="/company/manage" className="view-all">View All</Link>
              </div>
              <div className="notifications-list">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="notification-item">
                    <div className="notification-content">
                      <h3>{event.title}</h3>
                      <p>{event.date} at {event.time}</p>
                      <p>{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Access */}
            <section className="quick-access">
              <h2>Quick Actions</h2>
              <div className="quick-access-grid">
                <Link to="/company/post" className="quick-access-item">
                  <div className="quick-access-icon"><Plus size={24} /></div>
                  <span>Post Job</span>
                </Link>
                <Link to="/company/students" className="quick-access-item">
                  <div className="quick-access-icon"><Users size={24} /></div>
                  <span>Student Database</span>
                </Link>
                <Link to="/company/applications" className="quick-access-item">
                  <div className="quick-access-icon"><FileText size={24} /></div>
                  <span>Applications</span>
                </Link>
                <Link to="/company/interviews" className="quick-access-item">
                  <div className="quick-access-icon"><Calendar size={24} /></div>
                  <span>Schedule Interviews</span>
                </Link>
              </div>
            </section>

            {/* Recent Stats */}
            <section className="recommended-jobs">
              <div className="section-header">
                <h2>Performance Metrics</h2>
                <Link to="/company/analytics" className="view-all">View Reports</Link>
              </div>
              <div className="jobs-list">
                <div className="job-card">
                  <div className="job-header">
                    <div className="company-info">
                      <div className="company-logo">
                        <TrendingUp size={24} />
                      </div>
                      <div className="job-details">
                        <h3>Placement Success Rate</h3>
                        <p>Last 6 months</p>
                      </div>
                    </div>
                  </div>
                  <div className="job-info">
                    <p><strong>Selected:</strong> 72%</p>
                    <p><strong>Average Package:</strong> 14.5 LPA</p>
                    <p><strong>Highest Package:</strong> 32 LPA</p>
                  </div>
                  <button className="apply-button">View Detailed Report</button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;