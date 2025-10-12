import React, { useState } from 'react';
import { Search, Filter, User, Mail, Check, X } from 'lucide-react';
import '../../App.css';

const StudentConnections = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample mentorship requests data
  const requests = {
    pending: [
      {
        id: 1,
        student: {
          name: "Alex Johnson",
          branch: "Computer Science",
          batch: "2026",
          skills: ["JavaScript", "React", "Node.js"],
          avatar: "AJ"
        },
        reason: "Seeking guidance on career paths in software engineering and advice on building a strong portfolio.",
        requestDate: "2025-10-12"
      },
      {
        id: 2,
        student: {
          name: "Priya Sharma",
          branch: "Design",
          batch: "2025",
          skills: ["Figma", "Adobe XD", "UI/UX"],
          avatar: "PS"
        },
        reason: "Need advice on transitioning from academic projects to professional design work and building a design portfolio.",
        requestDate: "2025-10-10"
      }
    ],
    accepted: [
      {
        id: 3,
        student: {
          name: "Sarah Williams",
          branch: "Electronics",
          batch: "2025",
          skills: ["Java", "Spring", "MySQL"],
          avatar: "SW"
        },
        startDate: "2025-09-15",
        sessions: 4,
        nextSession: "2025-10-18"
      },
      {
        id: 4,
        student: {
          name: "Michael Chen",
          branch: "Data Science",
          batch: "2026",
          skills: ["Python", "TensorFlow", "SQL"],
          avatar: "MC"
        },
        startDate: "2025-10-01",
        sessions: 2,
        nextSession: "2025-10-20"
      }
    ],
    rejected: [
      {
        id: 5,
        student: {
          name: "Raj Patel",
          branch: "Mechanical",
          batch: "2024",
          skills: ["AutoCAD", "SolidWorks", "Manufacturing"],
          avatar: "RP"
        },
        reason: "Not aligned with my expertise area",
        rejectDate: "2025-09-28"
      }
    ]
  };

  const handleAcceptRequest = (id) => {
    console.log("Accepting mentorship request:", id);
  };

  const handleRejectRequest = (id) => {
    console.log("Rejecting mentorship request:", id);
  };

  const handleViewProfile = (id) => {
    console.log("Viewing student profile:", id);
  };

  const handleMessage = (id) => {
    console.log("Messaging student:", id);
  };

  const filteredRequests = requests[activeTab].filter(request => {
    if (activeTab === 'pending') {
      return request.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.student.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.reason.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (activeTab === 'accepted') {
      return request.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.student.branch.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return request.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.student.branch.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <div className="student-connections">
      <div className="page-header">
        <h1>Student Connections</h1>
        <p>Manage your mentorship relationships with students</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending Requests ({requests.pending.length})
        </button>
        <button 
          className={`tab ${activeTab === 'accepted' ? 'active' : ''}`}
          onClick={() => setActiveTab('accepted')}
        >
          Accepted ({requests.accepted.length})
        </button>
        <button 
          className={`tab ${activeTab === 'rejected' ? 'active' : ''}`}
          onClick={() => setActiveTab('rejected')}
        >
          Rejected ({requests.rejected.length})
        </button>
      </div>

      {/* Controls */}
      <div className="connections-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Requests List */}
      <div className="requests-list">
        {filteredRequests.length > 0 ? (
          filteredRequests.map(request => (
            <div key={request.id} className="request-card">
              <div className="student-header">
                <div className="student-avatar-large">
                  {request.student.avatar}
                </div>
                <div className="student-info">
                  <h3>{request.student.name}</h3>
                  <p>{request.student.branch} - {request.student.batch}</p>
                  <div className="skills-tags">
                    {request.student.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>

              {activeTab === 'pending' && (
                <div className="request-details">
                  <h4>Reason for Mentorship</h4>
                  <p>"{request.reason}"</p>
                  <p className="request-date">Requested on: {request.requestDate}</p>
                </div>
              )}

              {activeTab === 'accepted' && (
                <div className="mentee-details">
                  <div className="mentee-stats">
                    <div className="stat-item">
                      <span className="label">Start Date:</span>
                      <span className="value">{request.startDate}</span>
                    </div>
                    <div className="stat-item">
                      <span className="label">Sessions:</span>
                      <span className="value">{request.sessions}</span>
                    </div>
                    <div className="stat-item">
                      <span className="label">Next Session:</span>
                      <span className="value">{request.nextSession}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'rejected' && (
                <div className="rejection-details">
                  <h4>Rejection Reason</h4>
                  <p>{request.reason}</p>
                  <p className="reject-date">Rejected on: {request.rejectDate}</p>
                </div>
              )}

              <div className="request-actions">
                {activeTab === 'pending' && (
                  <>
                    <button 
                      className="primary-button"
                      onClick={() => handleAcceptRequest(request.id)}
                    >
                      <Check size={16} />
                      Accept
                    </button>
                    <button 
                      className="secondary-button"
                      onClick={() => handleRejectRequest(request.id)}
                    >
                      <X size={16} />
                      Reject
                    </button>
                  </>
                )}
                
                <button 
                  className="action-button"
                  onClick={() => handleViewProfile(request.id)}
                >
                  <User size={16} />
                  View Profile
                </button>
                
                <button 
                  className="action-button"
                  onClick={() => handleMessage(request.id)}
                >
                  <Mail size={16} />
                  Send Message
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No requests found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentConnections;