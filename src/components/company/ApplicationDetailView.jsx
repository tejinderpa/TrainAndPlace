import React, { useState } from 'react';
import { Download, Check, X, Send, FileText, Calendar, Mail, Phone, Star } from 'lucide-react';
import '../../App.css';

const ApplicationDetailView = () => {
  const [notes, setNotes] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [interviewData, setInterviewData] = useState({
    date: '',
    time: '',
    mode: 'online',
    link: ''
  });

  // Sample application data
  const application = {
    id: 1,
    student: {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@student.edu",
      phone: "+91 98765 43210",
      college: "NIT Trichy",
      branch: "Computer Science",
      batch: "2026",
      cgpa: 8.7,
      avatar: "AJ",
      resumeLink: "#",
      portfolioLinks: ["https://github.com/alexjohnson", "https://linkedin.com/in/alexjohnson"]
    },
    job: {
      id: 1,
      title: "Software Engineering Intern",
      type: "Internship",
      company: "TechCorp Solutions"
    },
    appliedDate: "2025-10-12",
    status: "Pending",
    skillsMatch: {
      percentage: 85,
      breakdown: [
        { skill: "JavaScript", matched: true },
        { skill: "React", matched: true },
        { skill: "Node.js", matched: true },
        { skill: "Python", matched: false },
        { skill: "SQL", matched: true }
      ]
    }
  };

  const handleStatusChange = (newStatus) => {
    console.log(`Changing status to: ${newStatus}`);
  };

  const handleScheduleInterview = () => {
    console.log("Scheduling interview:", interviewData);
    setShowScheduleModal(false);
  };

  const handleAddNotes = () => {
    console.log("Adding notes:", notes);
  };

  return (
    <div className="application-detail-view">
      <div className="page-header">
        <h1>Application Details</h1>
        <p>Review student application and take action</p>
      </div>

      {/* Application Header */}
      <div className="application-header-card">
        <div className="student-basic-info">
          <div className="student-avatar-large">
            {application.student.avatar}
          </div>
          <div className="student-details">
            <h2>{application.student.name}</h2>
            <p>{application.student.college}</p>
            <p>{application.student.branch} - {application.student.batch}</p>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <a href={`mailto:${application.student.email}`}>{application.student.email}</a>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <a href={`tel:${application.student.phone}`}>{application.student.phone}</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="application-info">
          <div className="job-info">
            <h3>{application.job.title}</h3>
            <p>{application.job.company} - {application.job.type}</p>
            <p className="applied-date">Applied on: {application.appliedDate}</p>
          </div>
          
          <div className="skills-match-summary">
            <h4>Skills Match: {application.skillsMatch.percentage}%</h4>
            <div className="match-bar">
              <div 
                className="match-fill" 
                style={{ width: `${application.skillsMatch.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="application-actions">
          <button className="primary-button" onClick={() => handleStatusChange('Accepted')}>
            <Check size={16} />
            Accept
          </button>
          <button className="secondary-button" onClick={() => handleStatusChange('Rejected')}>
            <X size={16} />
            Reject
          </button>
          <button className="action-button" onClick={() => handleStatusChange('Shortlisted')}>
            <Send size={16} />
            Shortlist
          </button>
          <button className="action-button" onClick={() => setShowScheduleModal(true)}>
            <Calendar size={16} />
            Schedule Interview
          </button>
          <a href={application.student.resumeLink} className="action-button">
            <Download size={16} />
            Download Resume
          </a>
        </div>
      </div>

      {/* Skills Match Breakdown */}
      <div className="skills-breakdown-section">
        <h3>Skills Match Breakdown</h3>
        <div className="skills-breakdown">
          {application.skillsMatch.breakdown.map((skill, index) => (
            <div key={index} className="skill-item">
              <span className="skill-name">{skill.skill}</span>
              {skill.matched ? (
                <Check size={16} className="matched-icon" />
              ) : (
                <X size={16} className="not-matched-icon" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Student Profile Preview */}
      <div className="profile-preview-section">
        <h3>Student Profile Preview</h3>
        <div className="profile-preview">
          <div className="academic-summary">
            <h4>Academic Details</h4>
            <div className="academic-grid">
              <div className="academic-item">
                <span className="label">CGPA</span>
                <span className="value">{application.student.cgpa}</span>
              </div>
              <div className="academic-item">
                <span className="label">10th %</span>
                <span className="value">92.5%</span>
              </div>
              <div className="academic-item">
                <span className="label">12th %</span>
                <span className="value">88.0%</span>
              </div>
            </div>
          </div>
          
          <div className="projects-summary">
            <h4>Key Projects</h4>
            <div className="projects-list">
              <div className="project-item">
                <h5>E-commerce Platform</h5>
                <p>Full-stack e-commerce solution with React and Node.js</p>
                <div className="tech-tags">
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">MongoDB</span>
                </div>
              </div>
              <div className="project-item">
                <h5>Task Management App</h5>
                <p>Mobile-responsive task manager with real-time updates</p>
                <div className="tech-tags">
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Firebase</span>
                  <span className="tech-tag">CSS3</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="portfolio-links">
            <h4>Portfolio</h4>
            {application.student.portfolioLinks.map((link, index) => (
              <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="portfolio-link">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="notes-section">
        <h3>Add Notes</h3>
        <div className="notes-form">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your notes about this application..."
            rows="4"
          />
          <button className="submit-button" onClick={handleAddNotes}>
            Add Notes
          </button>
        </div>
      </div>

      {/* Interview Scheduling Modal */}
      {showScheduleModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Schedule Interview</h2>
              <button 
                className="close-button"
                onClick={() => setShowScheduleModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={interviewData.date}
                  onChange={(e) => setInterviewData({...interviewData, date: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  value={interviewData.time}
                  onChange={(e) => setInterviewData({...interviewData, time: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Mode</label>
                <select
                  value={interviewData.mode}
                  onChange={(e) => setInterviewData({...interviewData, mode: e.target.value})}
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
              
              {interviewData.mode === 'online' && (
                <div className="form-group">
                  <label>Meeting Link</label>
                  <input
                    type="url"
                    placeholder="Enter meeting link"
                    value={interviewData.link}
                    onChange={(e) => setInterviewData({...interviewData, link: e.target.value})}
                  />
                </div>
              )}
              
              <div className="modal-actions">
                <button 
                  className="cancel-button"
                  onClick={() => setShowScheduleModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="submit-button"
                  onClick={handleScheduleInterview}
                >
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetailView;