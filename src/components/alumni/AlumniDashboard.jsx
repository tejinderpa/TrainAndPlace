import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Award, 
  Calendar, 
  MessageCircle, 
  TrendingUp,
  Menu,
  X,
  Home,
  LogOut,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import '../../App.css';

const AlumniDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const alumniName = "Rahul Sharma";
  const currentCompany = "Google";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // In a real app, you would clear user session here
    console.log("Logout initiated");
  };

  // Stats data
  const stats = [
    { title: "Students Mentored", value: 24, icon: <Users size={24} /> },
    { title: "Referrals Made", value: 18, icon: <Award size={24} /> },
    { title: "Reward Points", value: 420, icon: <Star size={24} /> },
    { title: "Contribution Rank", value: "#12", icon: <TrendingUp size={24} /> }
  ];

  // Pending mentorship requests
  const pendingRequests = [
    { id: 1, student: "Alex Johnson", branch: "Computer Science", batch: "2026", reason: "Career guidance in software engineering" },
    { id: 2, student: "Priya Sharma", branch: "Design", batch: "2025", reason: "UI/UX career advice" }
  ];

  // Upcoming mentoring sessions
  const upcomingSessions = [
    { id: 1, student: "Sarah Williams", date: "2025-10-18", time: "2:00 PM", duration: "1 hour" },
    { id: 2, student: "Michael Chen", date: "2025-10-20", time: "11:00 AM", duration: "45 mins" }
  ];

  // Recent activity
  const recentActivity = [
    { id: 1, action: "Accepted mentorship request from Alex Johnson", time: "2 hours ago" },
    { id: 2, action: "Submitted referral for TechCorp Solutions", time: "1 day ago" },
    { id: 3, action: "Participated in alumni webinar", time: "2 days ago" },
    { id: 4, action: "Earned 50 points for mentoring session", time: "3 days ago" }
  ];

  // Leaderboard
  const leaderboard = [
    { id: 1, name: "Rahul Sharma", points: 420, company: "Google" },
    { id: 2, name: "Priya Patel", points: 380, company: "Microsoft" },
    { id: 3, name: "Amit Kumar", points: 350, company: "Amazon" },
    { id: 4, name: "Sneha Gupta", points: 320, company: "Meta" },
    { id: 5, name: "Vikram Singh", points: 300, company: "Apple" }
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Alumni Portal</h2>
          <button className="menu-toggle mobile-only" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/alumni/dashboard" className="nav-item active">
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/alumni/profile" className="nav-item">
            <Users size={20} />
            <span>My Profile</span>
          </Link>
          <Link to="/alumni/connections" className="nav-item">
            <Users size={20} />
            <span>Student Connections</span>
          </Link>
          <Link to="/alumni/mentees" className="nav-item">
            <MessageCircle size={20} />
            <span>My Mentees</span>
          </Link>
          <Link to="/alumni/analytics" className="nav-item">
            <TrendingUp size={20} />
            <span>Mentorship Analytics</span>
          </Link>
          <Link to="/alumni/tpo" className="nav-item">
            <Award size={20} />
            <span>TPO Assistance</span>
          </Link>
          <Link to="/alumni/referrals" className="nav-item">
            <Award size={20} />
            <span>Company Referrals</span>
          </Link>
          <Link to="/alumni/community" className="nav-item">
            <Users size={20} />
            <span>Community</span>
          </Link>
          <Link to="/alumni/career" className="nav-item">
            <TrendingUp size={20} />
            <span>Career Tools</span>
          </Link>
          <Link to="/alumni/rewards" className="nav-item">
            <Star size={20} />
            <span>Rewards & Recognition</span>
          </Link>
          <Link to="/alumni/events" className="nav-item">
            <Calendar size={20} />
            <span>Events Calendar</span>
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
              <h1>Alumni Dashboard</h1>
              <p>Welcome back, {alumniName} from {currentCompany}!</p>
            </div>
            <div className="header-actions">
              <button className="icon-button">
                <MessageCircle size={24} />
              </button>
              <button className="icon-button">
                <Star size={24} />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Stats */}
          <section className="stats-section">
            <h2>Your Contributions</h2>
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
            {/* Pending Requests */}
            <section className="upcoming-events">
              <div className="section-header">
                <h2>Pending Mentorship Requests</h2>
                <Link to="/alumni/connections" className="view-all">View All</Link>
              </div>
              <div className="events-list">
                {pendingRequests.map(request => (
                  <div key={request.id} className="event-item">
                    <div className="event-details">
                      <h3>{request.student}</h3>
                      <p>{request.branch} - {request.batch}</p>
                      <p className="reason">"{request.reason}"</p>
                    </div>
                    <div className="event-actions">
                      <button className="accept-button">Accept</button>
                      <button className="reject-button">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming Sessions */}
            <section className="notifications-section">
              <div className="section-header">
                <h2>Upcoming Mentoring Sessions</h2>
                <Link to="/alumni/mentees" className="view-all">View All</Link>
              </div>
              <div className="notifications-list">
                {upcomingSessions.map(session => (
                  <div key={session.id} className="notification-item">
                    <div className="notification-content">
                      <h3>{session.student}</h3>
                      <p>{session.date} at {session.time}</p>
                      <p>Duration: {session.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section className="quick-access">
              <h2>Recent Activity</h2>
              <div className="activity-feed">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      <CheckCircle size={16} />
                    </div>
                    <div className="activity-content">
                      <p>{activity.action}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Leaderboard */}
            <section className="recommended-jobs">
              <div className="section-header">
                <h2>Top Contributors</h2>
                <Link to="/alumni/rewards" className="view-all">View Leaderboard</Link>
              </div>
              <div className="leaderboard-list">
                {leaderboard.map((alumni, index) => (
                  <div key={alumni.id} className={`leaderboard-item ${index === 0 ? 'first' : ''}`}>
                    <div className="rank">#{index + 1}</div>
                    <div className="alumni-info">
                      <h3>{alumni.name}</h3>
                      <p>{alumni.company}</p>
                    </div>
                    <div className="points">{alumni.points} pts</div>
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

export default AlumniDashboard;