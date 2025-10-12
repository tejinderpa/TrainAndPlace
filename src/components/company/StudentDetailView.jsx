import React, { useState } from 'react';
import { Download, Check, X, Star, FileText, Calendar, Mail, Phone } from 'lucide-react';
import '../../App.css';

const StudentDetailView = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Sample student data
  const student = {
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
    portfolioLinks: ["https://github.com/alexjohnson", "https://linkedin.com/in/alexjohnson"],
    
    // Academic details
    academic: {
      tenth: { percentage: 92.5, year: "2018" },
      twelfth: { percentage: 88.0, year: "2020" },
      current: { cgpa: 8.7, semester: "6th" }
    },
    
    // Skills with proficiency
    skills: [
      { name: "JavaScript", proficiency: 90 },
      { name: "React", proficiency: 85 },
      { name: "Node.js", proficiency: 80 },
      { name: "Python", proficiency: 75 },
      { name: "SQL", proficiency: 70 },
      { name: "AWS", proficiency: 65 }
    ],
    
    // Projects
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        description: "Full-stack e-commerce solution with React and Node.js",
        technologies: ["React", "Node.js", "MongoDB"],
        github: "https://github.com/alexjohnson/ecommerce",
        plagiarism: 5 // percentage
      },
      {
        id: 2,
        title: "Task Management App",
        description: "Mobile-responsive task manager with real-time updates",
        technologies: ["React", "Firebase", "CSS3"],
        github: "https://github.com/alexjohnson/taskmanager",
        plagiarism: 2 // percentage
      }
    ],
    
    // Certifications
    certifications: [
      { id: 1, name: "AWS Certified Developer", issuer: "Amazon", date: "2025-06-15" },
      { id: 2, name: "React Specialization", issuer: "Coursera", date: "2025-03-20" }
    ],
    
    // Mock interview data
    mockInterview: {
      score: 85,
      feedback: "Strong technical skills and problem-solving ability. Needs improvement in communication.",
      ranking: "Top 15%"
    }
  };

  const handleShortlist = () => {
    console.log("Student shortlisted");
  };

  const handleReject = () => {
    console.log("Student rejected");
  };

  const handleScheduleInterview = () => {
    console.log("Interview scheduled");
  };

  return (
    <div className="student-detail-view">
      <div className="page-header">
        <h1>Student Profile</h1>
        <p>Detailed view of student information</p>
      </div>

      {/* Student Header */}
      <div className="student-header-card">
        <div className="student-basic-info">
          <div className="student-avatar-large">
            {student.avatar}
          </div>
          <div className="student-details">
            <h2>{student.name}</h2>
            <p>{student.college}</p>
            <p>{student.branch} - {student.batch}</p>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <a href={`mailto:${student.email}`}>{student.email}</a>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <a href={`tel:${student.phone}`}>{student.phone}</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="student-stats">
          <div className="stat-item">
            <span className="label">CGPA</span>
            <span className="value">{student.cgpa}</span>
          </div>
          <div className="stat-item">
            <span className="label">Interview Score</span>
            <span className="value">{student.mockInterview.score}%</span>
          </div>
          <div className="stat-item">
            <span className="label">Ranking</span>
            <span className="value">{student.mockInterview.ranking}</span>
          </div>
        </div>
        
        <div className="student-actions">
          <button className="primary-button" onClick={handleShortlist}>
            <Check size={16} />
            Shortlist
          </button>
          <button className="secondary-button" onClick={handleReject}>
            <X size={16} />
            Reject
          </button>
          <button className="action-button" onClick={handleScheduleInterview}>
            <Calendar size={16} />
            Schedule Interview
          </button>
          <a href={student.resumeLink} className="action-button">
            <Download size={16} />
            Download Resume
          </a>
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
          className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          Skills & Projects
        </button>
        <button 
          className={`tab ${activeTab === 'certifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('certifications')}
        >
          Certifications
        </button>
        <button 
          className={`tab ${activeTab === 'interview' ? 'active' : ''}`}
          onClick={() => setActiveTab('interview')}
        >
          Interview Feedback
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'profile' && (
          <div className="profile-tab">
            <div className="academic-section">
              <h3>Academic Details</h3>
              <div className="academic-grid">
                <div className="academic-card">
                  <h4>10th Grade</h4>
                  <p className="percentage">{student.academic.tenth.percentage}%</p>
                  <p className="year">Year: {student.academic.tenth.year}</p>
                </div>
                <div className="academic-card">
                  <h4>12th Grade</h4>
                  <p className="percentage">{student.academic.twelfth.percentage}%</p>
                  <p className="year">Year: {student.academic.twelfth.year}</p>
                </div>
                <div className="academic-card">
                  <h4>Current CGPA</h4>
                  <p className="percentage">{student.academic.current.cgpa}</p>
                  <p className="year">{student.academic.current.semester} Semester</p>
                </div>
              </div>
            </div>
            
            <div className="portfolio-section">
              <h3>Portfolio Links</h3>
              <div className="portfolio-links">
                {student.portfolioLinks.map((link, index) => (
                  <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="portfolio-link">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="skills-tab">
            <div className="skills-section">
              <h3>Technical Skills</h3>
              <div className="skills-list">
                {student.skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-proficiency">{skill.proficiency}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-bar-fill" 
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="projects-section">
              <h3>Projects</h3>
              <div className="projects-list">
                {student.projects.map(project => (
                  <div key={project.id} className="project-card">
                    <div className="project-header">
                      <h4>{project.title}</h4>
                      <div className="plagiarism-badge">
                        <span>Plagiarism: {project.plagiarism}%</span>
                        {project.plagiarism < 10 ? (
                          <Check size={16} className="verified-icon" />
                        ) : (
                          <X size={16} className="not-verified-icon" />
                        )}
                      </div>
                    </div>
                    <p>{project.description}</p>
                    <div className="technologies">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-link">
                      View on GitHub
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="certifications-tab">
            <h3>Certifications</h3>
            <div className="certifications-list">
              {student.certifications.map(cert => (
                <div key={cert.id} className="certification-card">
                  <div className="certification-header">
                    <h4>{cert.name}</h4>
                    <p className="issuer">{cert.issuer}</p>
                  </div>
                  <p className="date">Issued: {cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'interview' && (
          <div className="interview-tab">
            <div className="interview-score">
              <div className="score-circle">
                <span className="score">{student.mockInterview.score}</span>
                <span className="max-score">/100</span>
              </div>
              <div className="score-info">
                <h3>Mock Interview Score</h3>
                <p className="ranking">Ranking: {student.mockInterview.ranking}</p>
              </div>
            </div>
            
            <div className="feedback-section">
              <h3>Feedback</h3>
              <div className="feedback-card">
                <p>{student.mockInterview.feedback}</p>
              </div>
            </div>
            
            <div className="rating-section">
              <h3>Rate This Student</h3>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star} 
                    size={32} 
                    className="star-icon"
                    onClick={() => console.log(`Rated ${star} stars`)}
                  />
                ))}
              </div>
              <textarea 
                placeholder="Add your detailed feedback here..."
                rows="4"
                className="feedback-textarea"
              ></textarea>
              <button className="submit-button">Submit Rating</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetailView;