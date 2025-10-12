import React, { useState } from 'react';
import { User, Search, Filter, Send, MessageCircle, Calendar, CheckCircle } from 'lucide-react';
import '../../App.css';

const MentorshipPage = () => {
  const [activeTab, setActiveTab] = useState('find');
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingRequests, setPendingRequests] = useState(new Set([2])); // Pre-pending requests for demo

  // Sample mentors data
  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Williams",
      company: "Google",
      position: "Senior Product Manager",
      batch: "2010-2014",
      branch: "Computer Science",
      skills: ["Product Management", "UX Design", "Agile Methodologies"],
      experience: "12 years",
      availability: "Weekends",
      rating: 4.8,
      reviews: 42,
      about: "Product manager with experience in building scalable products. Passionate about mentoring the next generation of tech leaders.",
      image: "sarah"
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "Microsoft",
      position: "Principal Software Engineer",
      batch: "2008-2012",
      branch: "Electronics & Communication",
      skills: ["Cloud Architecture", "DevOps", "System Design"],
      experience: "15 years",
      availability: "Evenings",
      rating: 4.9,
      reviews: 38,
      about: "Senior engineer specializing in cloud solutions and distributed systems. Enjoys helping students navigate their tech careers.",
      image: "michael"
    },
    {
      id: 3,
      name: "Priya Sharma",
      company: "Amazon",
      position: "Data Science Lead",
      batch: "2012-2016",
      branch: "Mathematics",
      skills: ["Machine Learning", "Data Analytics", "Python"],
      experience: "10 years",
      availability: "Weekdays",
      rating: 4.7,
      reviews: 56,
      about: "Data science expert with a passion for teaching complex concepts in simple terms. Available for both technical and career guidance.",
      image: "priya"
    }
  ];

  // Sample my mentors data
  const myMentors = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      company: "IIT Delhi",
      position: "Professor",
      branch: "Computer Science",
      connectionDate: "2025-09-15",
      lastSession: "2025-10-05",
      nextSession: "2025-10-15",
      sessions: 8,
      status: "Active"
    }
  ];

  // Sample messages
  const messages = [
    {
      id: 1,
      sender: "Dr. Rajesh Kumar",
      content: "Thanks for sharing your project updates. Let's discuss the architecture improvements in our next session.",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      sender: "You",
      content: "I've completed the assignments you shared. Looking forward to your feedback.",
      time: "1 day ago",
      unread: false
    }
  ];

  // Sample scheduled sessions
  const scheduledSessions = [
    {
      id: 1,
      mentor: "Dr. Rajesh Kumar",
      date: "2025-10-15",
      time: "3:00 PM - 4:00 PM",
      topic: "Project Architecture Review",
      status: "Confirmed"
    },
    {
      id: 2,
      mentor: "Dr. Rajesh Kumar",
      date: "2025-10-22",
      time: "3:00 PM - 4:00 PM",
      topic: "Career Path Discussion",
      status: "Pending Confirmation"
    }
  ];

  // Filter mentors based on search term
  const filteredMentors = mentors.filter(mentor => 
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sendMentorRequest = (mentorId) => {
    const newPendingRequests = new Set(pendingRequests);
    newPendingRequests.add(mentorId);
    setPendingRequests(newPendingRequests);
  };

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={i <= Math.floor(rating) ? 'star-filled' : 'star-empty'}
        >
          ★
        </span>
      );
    }
    return <div className="stars">{stars}</div>;
  };

  return (
    <div className="mentorship-page">
      <div className="page-header">
        <h1>Mentorship Program</h1>
        <p>Connect with industry experts and alumni for guidance</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'find' ? 'active' : ''}`}
          onClick={() => setActiveTab('find')}
        >
          Find Mentors
        </button>
        <button 
          className={`tab ${activeTab === 'my-mentors' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-mentors')}
        >
          My Mentors
        </button>
        <button 
          className={`tab ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </button>
        <button 
          className={`tab ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          Scheduled Sessions
        </button>
      </div>

      {/* Search and Filters */}
      {(activeTab === 'find' || activeTab === 'my-mentors') && (
        <div className="mentorship-controls">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search by name, company, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="filter-button">
            <Filter size={20} />
            Filters
          </button>
        </div>
      )}

      {/* Content based on active tab */}
      <div className="mentorship-content">
        {/* Find Mentors Tab */}
        {activeTab === 'find' && (
          <div className="mentors-grid">
            {filteredMentors.map(mentor => (
              <div key={mentor.id} className="mentor-card">
                <div className="mentor-header">
                  <div className="mentor-avatar">
                    <User size={32} />
                  </div>
                  <div className="mentor-info">
                    <h3>{mentor.name}</h3>
                    <p className="position">{mentor.position} at {mentor.company}</p>
                    <p className="batch">{mentor.batch} • {mentor.branch}</p>
                  </div>
                </div>
                
                <div className="mentor-details">
                  <div className="mentor-rating">
                    {renderStars(mentor.rating)}
                    <span>{mentor.rating} ({mentor.reviews} reviews)</span>
                  </div>
                  
                  <p className="about">{mentor.about}</p>
                  
                  <div className="mentor-meta">
                    <span className="experience">{mentor.experience} experience</span>
                    <span className="availability">Available: {mentor.availability}</span>
                  </div>
                  
                  <div className="skills">
                    {mentor.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mentor-actions">
                  {pendingRequests.has(mentor.id) ? (
                    <button className="request-pending" disabled>
                      <CheckCircle size={16} />
                      Request Sent
                    </button>
                  ) : (
                    <button 
                      className="request-button"
                      onClick={() => sendMentorRequest(mentor.id)}
                    >
                      <Send size={16} />
                      Send Request
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {filteredMentors.length === 0 && (
              <div className="no-results">
                <p>No mentors found matching your criteria.</p>
              </div>
            )}
          </div>
        )}

        {/* My Mentors Tab */}
        {activeTab === 'my-mentors' && (
          <div className="my-mentors">
            {myMentors.length > 0 ? (
              myMentors.map(mentor => (
                <div key={mentor.id} className="my-mentor-card">
                  <div className="mentor-header">
                    <div className="mentor-avatar">
                      <User size={32} />
                    </div>
                    <div className="mentor-info">
                      <h3>{mentor.name}</h3>
                      <p className="position">{mentor.position} at {mentor.company}</p>
                      <p className="branch">{mentor.branch}</p>
                    </div>
                  </div>
                  
                  <div className="mentor-connection">
                    <div className="connection-info">
                      <p><strong>Connected on:</strong> {new Date(mentor.connectionDate).toLocaleDateString()}</p>
                      <p><strong>Last Session:</strong> {new Date(mentor.lastSession).toLocaleDateString()}</p>
                      <p><strong>Next Session:</strong> {new Date(mentor.nextSession).toLocaleDateString()}</p>
                      <p><strong>Total Sessions:</strong> {mentor.sessions}</p>
                    </div>
                    
                    <div className="mentor-status">
                      <span className={`status ${mentor.status.toLowerCase()}`}>
                        {mentor.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mentor-actions">
                    <button className="message-button">
                      <MessageCircle size={16} />
                      Message
                    </button>
                    <button className="schedule-button">
                      <Calendar size={16} />
                      Schedule Session
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-mentors">
                <p>You don't have any mentors yet. Start by sending requests to mentors.</p>
                <button 
                  className="browse-button"
                  onClick={() => setActiveTab('find')}
                >
                  Browse Mentors
                </button>
              </div>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="messages-section">
            <div className="messages-list">
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={`message-card ${message.unread ? 'unread' : ''}`}
                >
                  <div className="message-header">
                    <div className="sender-info">
                      <div className="sender-avatar">
                        <User size={24} />
                      </div>
                      <div>
                        <h4>{message.sender}</h4>
                        <p className="time">{message.time}</p>
                      </div>
                    </div>
                  </div>
                  <div className="message-content">
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="message-input">
              <input 
                type="text" 
                placeholder="Type your message..."
              />
              <button className="send-button">
                <Send size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Scheduled Sessions Tab */}
        {activeTab === 'schedule' && (
          <div className="schedule-section">
            <div className="sessions-list">
              {scheduledSessions.map(session => (
                <div key={session.id} className="session-card">
                  <div className="session-header">
                    <h3>{session.mentor}</h3>
                    <span className={`status ${session.status.toLowerCase().replace(' ', '-')}`}>
                      {session.status}
                    </span>
                  </div>
                  
                  <div className="session-details">
                    <p><strong>Date:</strong> {new Date(session.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {session.time}</p>
                    <p><strong>Topic:</strong> {session.topic}</p>
                  </div>
                  
                  <div className="session-actions">
                    <button className="reschedule-button">
                      Reschedule
                    </button>
                    <button className="cancel-button">
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {scheduledSessions.length === 0 && (
              <div className="no-sessions">
                <p>You don't have any scheduled sessions yet.</p>
                <button 
                  className="schedule-new-button"
                  onClick={() => setActiveTab('my-mentors')}
                >
                  Schedule a Session
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorshipPage;