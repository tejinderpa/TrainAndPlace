import React, { useState } from 'react';
import { Search, Filter, User, Mail, Phone, GraduationCap, Calendar, MessageCircle } from 'lucide-react';
import '../../App.css';

const MenteesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Mock data for mentees
  const mentees = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@university.edu",
      phone: "+1 (555) 123-4567",
      branch: "Computer Science",
      year: "3rd Year",
      status: "Active",
      lastSession: "2025-10-10",
      nextSession: "2025-10-17",
      sessions: 8,
      skills: ["JavaScript", "React", "Node.js"]
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah.w@university.edu",
      phone: "+1 (555) 234-5678",
      branch: "Electronics & Communication",
      year: "2nd Year",
      status: "Pending",
      lastSession: "2025-10-05",
      nextSession: null,
      sessions: 5,
      skills: ["C++", "Python", "Embedded Systems"]
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael.c@university.edu",
      phone: "+1 (555) 345-6789",
      branch: "Mechanical Engineering",
      year: "4th Year",
      status: "Completed",
      lastSession: "2025-10-12",
      nextSession: null,
      sessions: 12,
      skills: ["CAD", "SolidWorks", "Project Management"]
    }
  ];

  // Filter mentees based on search and filters
  const filteredMentees = mentees.filter(mentee => {
    const matchesSearch = mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          mentee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          mentee.branch.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || mentee.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Get unique statuses for filter
  const statuses = ['All', ...new Set(mentees.map(mentee => mentee.status))];

  return (
    <div className="mentees-list">
      <div className="page-header">
        <h1>My Mentees</h1>
        <p>Manage your mentoring relationships and track progress</p>
      </div>

      {/* Search and Filters */}
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
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mentees List */}
      <div className="mentees-grid">
        {filteredMentees.length > 0 ? (
          filteredMentees.map(mentee => (
            <div key={mentee.id} className="mentee-card">
              <div className="mentee-header">
                <div className="mentee-avatar">
                  <User size={32} />
                </div>
                <div className="mentee-info">
                  <h3>{mentee.name}</h3>
                  <p>{mentee.branch} • {mentee.year}</p>
                  <div className={`mentee-status ${mentee.status.toLowerCase()}`}>
                    {mentee.status}
                  </div>
                </div>
              </div>
              
              <div className="mentee-details">
                <div className="info-item">
                  <Mail size={16} />
                  <span>{mentee.email}</span>
                </div>
                <div className="info-item">
                  <Phone size={16} />
                  <span>{mentee.phone}</span>
                </div>
                <div className="info-item">
                  <GraduationCap size={16} />
                  <span>{mentee.sessions} sessions completed</span>
                </div>
                
                <div className="session-info">
                  {mentee.lastSession && (
                    <div className="info-item">
                      <Calendar size={16} />
                      <span>Last session: {mentee.lastSession}</span>
                    </div>
                  )}
                  {mentee.nextSession ? (
                    <div className="info-item">
                      <Calendar size={16} />
                      <span>Next session: {mentee.nextSession}</span>
                    </div>
                  ) : (
                    <div className="info-item">
                      <Calendar size={16} />
                      <span>No upcoming session</span>
                    </div>
                  )}
                </div>
                
                <div className="skills-list">
                  {mentee.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="mentee-actions">
                <button className="primary-button">
                  <MessageCircle size={16} />
                  Message
                </button>
                <button className="secondary-button">
                  View Progress
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-mentees">
            <p>No mentees found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenteesList;