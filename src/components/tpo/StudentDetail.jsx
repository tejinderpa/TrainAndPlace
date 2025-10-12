import React, { useState } from 'react';
import { Download, Edit3, Check, TrendingUp, FileText, Calendar, Users, Award } from 'lucide-react';
import '../../App.css';

const StudentDetail = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [studentData, setStudentData] = useState({
    name: "Alex Johnson",
    rollNumber: "CS2026001",
    branch: "Computer Science",
    batch: "2026",
    email: "alex.johnson@student.edu",
    phone: "+91 98765 43210",
    cgpa: 8.7,
    address: "Hostel Block A, Room 101",
    tenthPercentage: 92.5,
    twelfthPercentage: 88.0
  });

  // Sample placement status tracking
  const placementStatus = [
    { id: 1, status: "Applied", company: "Microsoft", date: "2025-10-01", details: "Software Engineer Intern" },
    { id: 2, status: "Interviewed", company: "Microsoft", date: "2025-10-10", details: "Technical Interview Round 1" },
    { id: 3, status: "Offered", company: "Microsoft", date: "2025-10-15", details: "Selected for Software Engineer Intern" },
    { id: 4, status: "Joined", company: "Microsoft", date: "2025-11-01", details: "Internship started" }
  ];

  // Sample applications
  const applications = [
    { id: 1, company: "Microsoft", position: "Software Engineer Intern", date: "2025-10-01", status: "Selected" },
    { id: 2, company: "Google", position: "SWE Intern", date: "2025-09-15", status: "Rejected" },
    { id: 3, company: "Amazon", position: "SDE Intern", date: "2025-09-20", status: "Pending" }
  ];

  // Sample skill gap analysis
  const skillGaps = [
    { skill: "Cloud Computing", current: 60, required: 80, gap: 20 },
    { skill: "System Design", current: 50, required: 75, gap: 25 },
    { skill: "Data Structures", current: 85, required: 80, gap: -5 }
  ];

  // Sample recommended training
  const recommendedTraining = [
    { id: 1, title: "AWS Cloud Practitioner", provider: "Amazon", duration: "4 weeks", priority: "High" },
    { id: 2, title: "System Design Masterclass", provider: "Udemy", duration: "6 weeks", priority: "Medium" },
    { id: 3, title: "Advanced DSA", provider: "Coursera", duration: "8 weeks", priority: "Low" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log("Saving student data:", studentData);
    setIsEditing(false);
  };

  const handleUpdateStatus = (status) => {
    console.log("Updating status to:", status);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'applied': return 'status-applied';
      case 'interviewed': return 'status-interview';
      case 'offered': return 'status-offered';
      case 'joined': return 'status-joined';
      case 'rejected': return 'status-rejected';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  return (
    <div className="student-detail">
      <div className="page-header">
        <h1>Student Detail & Tracking</h1>
        <p>View and manage individual student profile and placement status</p>
      </div>

      {/* Student Header */}
      <div className="student-header-card">
        <div className="student-basic-info">
          <div className="student-avatar-large">
            {studentData.name.charAt(0)}
          </div>
          <div className="student-details">
            <h2>{studentData.name}</h2>
            <p>{studentData.branch} - {studentData.batch}</p>
            <p>Roll Number: {studentData.rollNumber}</p>
            <div className="contact-info">
              <p>Email: <a href={`mailto:${studentData.email}`}>{studentData.email}</a></p>
              <p>Phone: <a href={`tel:${studentData.phone}`}>{studentData.phone}</a></p>
            </div>
          </div>
        </div>
        
        <div className="student-stats">
          <div className="stat-item">
            <span className="label">CGPA</span>
            <span className="value">{studentData.cgpa}</span>
          </div>
          <div className="stat-item">
            <span className="label">10th %</span>
            <span className="value">{studentData.tenthPercentage}%</span>
          </div>
          <div className="stat-item">
            <span className="label">12th %</span>
            <span className="value">{studentData.twelfthPercentage}%</span>
          </div>
        </div>
        
        <div className="student-actions">
          <button 
            className="edit-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit3 size={16} />
            {isEditing ? "Save" : "Edit Profile"}
          </button>
          <button className="export-button">
            <Download size={16} />
            Download Resume
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={`tab ${activeTab === 'status' ? 'active' : ''}`}
          onClick={() => setActiveTab('status')}
        >
          Placement Status
        </button>
        <button 
          className={`tab ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          Applications
        </button>
        <button 
          className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          Skill Gap Analysis
        </button>
        <button 
          className={`tab ${activeTab === 'training' ? 'active' : ''}`}
          onClick={() => setActiveTab('training')}
        >
          Recommended Training
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'profile' && (
          <div className="profile-tab">
            <div className="form-container">
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={studentData.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{studentData.name}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label>Roll Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="rollNumber"
                      value={studentData.rollNumber}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{studentData.rollNumber}</p>
                  )}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Branch</label>
                  {isEditing ? (
                    <select
                      name="branch"
                      value={studentData.branch}
                      onChange={handleInputChange}
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Civil">Civil</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Design">Design</option>
                    </select>
                  ) : (
                    <p>{studentData.branch}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label>Batch</label>
                  {isEditing ? (
                    <select
                      name="batch"
                      value={studentData.batch}
                      onChange={handleInputChange}
                    >
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                    </select>
                  ) : (
                    <p>{studentData.batch}</p>
                  )}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={studentData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p><a href={`mailto:${studentData.email}`}>{studentData.email}</a></p>
                  )}
                </div>
                
                <div className="form-group">
                  <label>Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={studentData.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p><a href={`tel:${studentData.phone}`}>{studentData.phone}</a></p>
                  )}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>CGPA</label>
                  {isEditing ? (
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      name="cgpa"
                      value={studentData.cgpa}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{studentData.cgpa}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label>Address</label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={studentData.address}
                      onChange={handleInputChange}
                      rows="2"
                    />
                  ) : (
                    <p>{studentData.address}</p>
                  )}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>10th Percentage</label>
                  {isEditing ? (
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      name="tenthPercentage"
                      value={studentData.tenthPercentage}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{studentData.tenthPercentage}%</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label>12th Percentage</label>
                  {isEditing ? (
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      name="twelfthPercentage"
                      value={studentData.twelfthPercentage}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{studentData.twelfthPercentage}%</p>
                  )}
                </div>
              </div>
              
              {isEditing && (
                <div className="form-actions">
                  <button className="primary-button" onClick={handleSave}>
                    <Check size={16} />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'status' && (
          <div className="status-tab">
            <div className="status-timeline">
              <h3>Placement Status Tracking</h3>
              <div className="timeline">
                {placementStatus.map((item, index) => (
                  <div key={item.id} className="timeline-item">
                    <div className="timeline-marker">
                      <div className="marker-icon">
                        {item.status === 'Applied' && <FileText size={16} />}
                        {item.status === 'Interviewed' && <Users size={16} />}
                        {item.status === 'Offered' && <Award size={16} />}
                        {item.status === 'Joined' && <Check size={16} />}
                      </div>
                    </div>
                    <div className="timeline-content">
                      <div className="status-header">
                        <h4>{item.status}</h4>
                        <span className="date">{item.date}</span>
                      </div>
                      <p><strong>{item.company}</strong> - {item.details}</p>
                      <div className={`status-badge ${getStatusClass(item.status)}`}>
                        {item.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="update-status">
                <h4>Update Status</h4>
                <div className="status-actions">
                  <button 
                    className="status-button applied"
                    onClick={() => handleUpdateStatus('Applied')}
                  >
                    Applied
                  </button>
                  <button 
                    className="status-button interviewed"
                    onClick={() => handleUpdateStatus('Interviewed')}
                  >
                    Interviewed
                  </button>
                  <button 
                    className="status-button offered"
                    onClick={() => handleUpdateStatus('Offered')}
                  >
                    Offered
                  </button>
                  <button 
                    className="status-button joined"
                    onClick={() => handleUpdateStatus('Joined')}
                  >
                    Joined
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="applications-tab">
            <h3>Student Applications</h3>
            <div className="applications-list">
              {applications.map(app => (
                <div key={app.id} className="application-card">
                  <div className="application-header">
                    <h4>{app.company}</h4>
                    <div className={`status-badge ${getStatusClass(app.status)}`}>
                      {app.status}
                    </div>
                  </div>
                  <div className="application-details">
                    <p><strong>Position:</strong> {app.position}</p>
                    <p><strong>Applied on:</strong> {app.date}</p>
                  </div>
                  <div className="application-actions">
                    <button className="secondary-button">
                      <FileText size={16} />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="skills-tab">
            <h3>Skill Gap Analysis</h3>
            <div className="skills-analysis">
              <div className="skills-chart">
                {skillGaps.map((skill, index) => (
                  <div key={index} className="skill-bar-container">
                    <div className="skill-label">
                      <span>{skill.skill}</span>
                      <span>Gap: {skill.gap > 0 ? `+${skill.gap}` : skill.gap}%</span>
                    </div>
                    <div className="skill-bars">
                      <div className="required-bar">
                        <div 
                          className="required-fill" 
                          style={{ width: `${skill.required}%` }}
                        ></div>
                      </div>
                      <div className="current-bar">
                        <div 
                          className="current-fill" 
                          style={{ width: `${skill.current}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="skill-legend">
                      <div className="legend-item">
                        <div className="current-legend"></div>
                        <span>Current: {skill.current}%</span>
                      </div>
                      <div className="legend-item">
                        <div className="required-legend"></div>
                        <span>Required: {skill.required}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'training' && (
          <div className="training-tab">
            <h3>Recommended Training Programs</h3>
            <div className="training-list">
              {recommendedTraining.map(training => (
                <div key={training.id} className="training-card">
                  <div className="training-header">
                    <h4>{training.title}</h4>
                    <div className={`priority-badge ${training.priority.toLowerCase()}`}>
                      {training.priority}
                    </div>
                  </div>
                  <div className="training-details">
                    <p><strong>Provider:</strong> {training.provider}</p>
                    <p><strong>Duration:</strong> {training.duration}</p>
                  </div>
                  <div className="training-actions">
                    <button className="primary-button">
                      <TrendingUp size={16} />
                      Enroll Student
                    </button>
                    <button className="secondary-button">
                      <FileText size={16} />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetail;