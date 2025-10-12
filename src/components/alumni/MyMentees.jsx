import React, { useState } from 'react';
import { Search, Filter, User, Calendar, TrendingUp, Send, X } from 'lucide-react';
import '../../App.css';

const MyMentees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMentee, setActiveMentee] = useState(null);

  // Sample mentees data
  const mentees = [
    {
      id: 1,
      name: "Sarah Williams",
      branch: "Electronics",
      batch: "2025",
      avatar: "SW",
      email: "sarah.williams@student.edu",
      phone: "+91 98765 43210",
      skills: ["Java", "Spring", "MySQL", "AWS"],
      startDate: "2025-09-15",
      sessions: 4,
      nextSession: "2025-10-18",
      progress: 75,
      goals: [
        "Improve Java skills for backend development",
        "Learn cloud deployment with AWS",
        "Prepare for internships in software companies"
      ]
    },
    {
      id: 2,
      name: "Michael Chen",
      branch: "Data Science",
      batch: "2026",
      avatar: "MC",
      email: "michael.chen@student.edu",
      phone: "+91 87654 32109",
      skills: ["Python", "TensorFlow", "SQL", "Tableau"],
      startDate: "2025-10-01",
      sessions: 2,
      nextSession: "2025-10-20",
      progress: 60,
      goals: [
        "Build a strong portfolio of data science projects",
        "Learn advanced machine learning techniques",
        "Prepare for data scientist roles"
      ]
    }
  ];

  // Sample session history
  const sessionHistory = [
    { id: 1, date: "2025-10-05", duration: "1 hour", topics: "Java fundamentals and OOP concepts" },
    { id: 2, date: "2025-10-12", duration: "45 mins", topics: "Spring framework basics" },
    { id: 3, date: "2025-09-28", duration: "1 hour", topics: "Career guidance and resume review" },
    { id: 4, date: "2025-09-21", duration: "30 mins", topics: "Introduction to mentorship program" }
  ];

  const filteredMentees = mentees.filter(mentee => 
    mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentee.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleScheduleSession = (menteeId) => {
    console.log("Scheduling session for mentee:", menteeId);
  };

  const handleEndMentorship = (menteeId) => {
    console.log("Ending mentorship for mentee:", menteeId);
  };

  const handleSendMessage = (menteeId) => {
    console.log("Sending message to mentee:", menteeId);
  };

  const openChat = (mentee) => {
    setActiveMentee(mentee);
  };

  const closeChat = () => {
    setActiveMentee(null);
  };

  return (
    <div className="my-mentees">
      <div className="page-header">
        <h1>My Mentees</h1>
        <p>Manage your ongoing mentorship relationships</p>
      </div>

      {/* Controls */}
      <div className="mentees-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search mentees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Mentees List */}
      <div className="mentees-layout">
        <div className={`mentees-list ${activeMentee ? 'chat-open' : ''}`}>
          {filteredMentees.length > 0 ? (
            filteredMentees.map(mentee => (
              <div key={mentee.id} className="mentee-card">
                <div className="mentee-header">
                  <div className="mentee-avatar">
                    {mentee.avatar}
                  </div>
                  <div className="mentee-info">
                    <h3>{mentee.name}</h3>
                    <p>{mentee.branch} - {mentee.batch}</p>
                  </div>
                </div>

                <div className="mentee-details">
                  <div className="progress-section">
                    <div className="progress-label">
                      <span>Progress</span>
                      <span>{mentee.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${mentee.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mentee-stats">
                    <div className="stat-item">
                      <Calendar size={16} />
                      <span>Next: {mentee.nextSession}</span>
                    </div>
                    <div className="stat-item">
                      <TrendingUp size={16} />
                      <span>{mentee.sessions} sessions</span>
                    </div>
                  </div>
                </div>

                <div className="mentee-actions">
                  <button 
                    className="primary-button"
                    onClick={() => handleScheduleSession(mentee.id)}
                  >
                    <Calendar size={16} />
                    Schedule Session
                  </button>
                  <button 
                    className="secondary-button"
                    onClick={() => openChat(mentee)}
                  >
                    <Send size={16} />
                    Chat
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No mentees found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Chat Interface */}
        {activeMentee && (
          <div className="chat-interface">
            <div className="chat-header">
              <div className="mentee-info">
                <div className="mentee-avatar-large">
                  {activeMentee.avatar}
                </div>
                <div>
                  <h3>{activeMentee.name}</h3>
                  <p>{activeMentee.branch} - {activeMentee.batch}</p>
                </div>
              </div>
              <button className="close-chat" onClick={closeChat}>
                <X size={24} />
              </button>
            </div>

            <div className="chat-messages">
              <div className="message received">
                <div className="message-content">
                  Hello Sir, I wanted to ask about the project I'm working on. Could you review it?
                </div>
                <div className="message-time">10:30 AM</div>
              </div>
              <div className="message sent">
                <div className="message-content">
                  Of course! Please share the project details and I'll review it.
                </div>
                <div className="message-time">10:32 AM</div>
              </div>
              <div className="message received">
                <div className="message-content">
                  I've shared the GitHub link in the previous message. It's a basic e-commerce app.
                </div>
                <div className="message-time">10:35 AM</div>
              </div>
            </div>

            <div className="chat-input">
              <input type="text" placeholder="Type your message..." />
              <button className="send-button">
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Session History */}
      <div className="session-history">
        <h3>Session History</h3>
        <div className="history-list">
          {sessionHistory.map(session => (
            <div key={session.id} className="history-item">
              <div className="session-date">{session.date}</div>
              <div className="session-details">
                <p><strong>Duration:</strong> {session.duration}</p>
                <p><strong>Topics:</strong> {session.topics}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Tracking */}
      <div className="progress-tracking">
        <h3>Mentee Progress Tracking</h3>
        <div className="goals-list">
          <h4>Current Goals</h4>
          {mentees[0]?.goals.map((goal, index) => (
            <div key={index} className="goal-item">
              <input type="checkbox" id={`goal-${index}`} />
              <label htmlFor={`goal-${index}`}>{goal}</label>
            </div>
          ))}
        </div>
      </div>

      {/* End Mentorship */}
      <div className="end-mentorship">
        <button 
          className="secondary-button"
          onClick={() => handleEndMentorship(mentees[0]?.id)}
        >
          <X size={16} />
          End Mentorship
        </button>
      </div>
    </div>
  );
};

export default MyMentees;