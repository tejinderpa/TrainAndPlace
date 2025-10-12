import React, { useState } from 'react';
import { Award, Briefcase, Code, Trophy, Download, Share2, Edit3, Plus, Trash2, Link } from 'lucide-react';
import '../../App.css';

const PortfolioPage = () => {
  const [activeTab, setActiveTab] = useState('showcase');
  const [isEditing, setIsEditing] = useState(false);

  // Sample portfolio data
  const studentInfo = {
    name: "Alex Johnson",
    batch: "2022-2026",
    branch: "Computer Science",
    email: "alex.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    linkedIn: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson"
  };

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, product search, cart management, and payment processing.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "ecommerce",
      link: "https://github.com/alexjohnson/ecommerce",
      date: "2025-06"
    },
    {
      id: 2,
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for analyzing sales data with real-time charts and graphs. Built with Python, D3.js, and Flask.",
      technologies: ["Python", "D3.js", "Flask", "PostgreSQL"],
      image: "dashboard",
      link: "https://github.com/alexjohnson/dashboard",
      date: "2025-03"
    },
    {
      id: 3,
      title: "Mobile Task Manager",
      description: "Cross-platform mobile application for task management with offline capabilities. Built with React Native and Firebase.",
      technologies: ["React Native", "Firebase", "Redux"],
      image: "taskmanager",
      link: "https://github.com/alexjohnson/taskmanager",
      date: "2024-11"
    }
  ];

  const internships = [
    {
      id: 1,
      company: "Microsoft",
      position: "Software Engineering Intern",
      duration: "May 2025 - July 2025",
      description: "Worked on the Azure cloud platform team, developing new features for resource management. Collaborated with senior engineers on code reviews and system design.",
      skills: ["Azure", "C#", "REST APIs", "Agile"]
    },
    {
      id: 2,
      company: "Google",
      position: "Data Science Intern",
      duration: "Jan 2025 - Mar 2025",
      description: "Analyzed user engagement data to improve product recommendations. Built machine learning models to predict user behavior.",
      skills: ["Python", "TensorFlow", "BigQuery", "Machine Learning"]
    }
  ];

  const hackathons = [
    {
      id: 1,
      name: "Tech Innovation Hackathon",
      position: "1st Place",
      date: "September 2025",
      description: "Won first place for our AI-powered solution to reduce food waste in restaurants.",
      team: ["Alex Johnson", "Sarah Williams", "Michael Chen"]
    },
    {
      id: 2,
      name: "Startup Weekend",
      position: "Top 5 Finalist",
      date: "June 2025",
      description: "Developed a prototype for a peer-to-peer learning platform in 48 hours.",
      team: ["Alex Johnson", "Priya Sharma", "Rajesh Kumar"]
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "August 2025",
      link: "https://example.com/aws-cert"
    },
    {
      id: 2,
      name: "Google Cloud Professional",
      issuer: "Google Cloud",
      date: "May 2025",
      link: "https://example.com/gcp-cert"
    },
    {
      id: 3,
      name: "Advanced React Development",
      issuer: "Coursera",
      date: "March 2025",
      link: "https://example.com/react-cert"
    }
  ];

  const handleDownloadPortfolio = () => {
    // In a real app, this would generate and download a PDF
    console.log("Downloading portfolio as PDF");
  };

  const handleSharePortfolio = () => {
    // In a real app, this would generate a shareable link
    console.log("Generating shareable portfolio link");
  };

  return (
    <div className="portfolio-page">
      <div className="page-header">
        <h1>Achievements & Portfolio</h1>
        <p>Showcase your skills and accomplishments</p>
      </div>

      {/* Portfolio Header */}
      <div className="portfolio-header">
        <div className="student-info">
          <div className="avatar">
            <div className="avatar-placeholder">
              <span>{studentInfo.name.charAt(0)}</span>
            </div>
          </div>
          <div className="info">
            <h2>{studentInfo.name}</h2>
            <p>{studentInfo.branch} • {studentInfo.batch}</p>
            <div className="contact-info">
              <span>{studentInfo.email}</span>
              <span>{studentInfo.phone}</span>
            </div>
          </div>
        </div>
        
        <div className="portfolio-actions">
          <button 
            className="edit-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit3 size={16} />
            {isEditing ? "Save" : "Edit"}
          </button>
          <button 
            className="share-button"
            onClick={handleSharePortfolio}
          >
            <Share2 size={16} />
            Share
          </button>
          <button 
            className="download-button"
            onClick={handleDownloadPortfolio}
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'showcase' ? 'active' : ''}`}
          onClick={() => setActiveTab('showcase')}
        >
          <Award size={16} />
          Showcase
        </button>
        <button 
          className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <Code size={16} />
          Projects
        </button>
        <button 
          className={`tab ${activeTab === 'internships' ? 'active' : ''}`}
          onClick={() => setActiveTab('internships')}
        >
          <Briefcase size={16} />
          Internships
        </button>
        <button 
          className={`tab ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          <Trophy size={16} />
          Achievements
        </button>
      </div>

      {/* Content based on active tab */}
      <div className="portfolio-content">
        {/* Showcase Tab */}
        {activeTab === 'showcase' && (
          <div className="showcase-section">
            <div className="showcase-grid">
              <div className="showcase-card">
                <div className="card-header">
                  <Code size={24} />
                  <h3>Projects</h3>
                </div>
                <div className="card-content">
                  <p className="count">{projects.length}</p>
                  <p className="description">Completed projects showcasing technical skills</p>
                </div>
              </div>
              
              <div className="showcase-card">
                <div className="card-header">
                  <Briefcase size={24} />
                  <h3>Internships</h3>
                </div>
                <div className="card-content">
                  <p className="count">{internships.length}</p>
                  <p className="description">Industry experience gained through internships</p>
                </div>
              </div>
              
              <div className="showcase-card">
                <div className="card-header">
                  <Trophy size={24} />
                  <h3>Hackathons</h3>
                </div>
                <div className="card-content">
                  <p className="count">{hackathons.length}</p>
                  <p className="description">Participated in hackathons and competitions</p>
                </div>
              </div>
              
              <div className="showcase-card">
                <div className="card-header">
                  <Award size={24} />
                  <h3>Certifications</h3>
                </div>
                <div className="card-content">
                  <p className="count">{certifications.length}</p>
                  <p className="description">Professional certifications earned</p>
                </div>
              </div>
            </div>
            
            {/* Featured Projects Preview */}
            <div className="featured-section">
              <h2>Featured Projects</h2>
              <div className="projects-preview">
                {projects.slice(0, 2).map(project => (
                  <div key={project.id} className="project-preview">
                    <div className="project-image">
                      <div className="image-placeholder">
                        {project.image}
                      </div>
                    </div>
                    <div className="project-info">
                      <h3>{project.title}</h3>
                      <p>{project.description.substring(0, 100)}...</p>
                      <div className="technologies">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span key={index} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="projects-section">
            {isEditing && (
              <div className="add-section">
                <button className="add-button">
                  <Plus size={16} />
                  Add New Project
                </button>
              </div>
            )}
            
            <div className="projects-grid">
              {projects.map(project => (
                <div key={project.id} className="project-card">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    {isEditing && (
                      <div className="project-actions">
                        <button className="edit-action">
                          <Edit3 size={16} />
                        </button>
                        <button className="delete-action">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="project-image">
                    <div className="image-placeholder">
                      {project.image}
                    </div>
                  </div>
                  
                  <div className="project-details">
                    <p className="date">{project.date}</p>
                    <p className="description">{project.description}</p>
                    
                    <div className="technologies">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <Link size={16} />
                      View Project
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Internships Tab */}
        {activeTab === 'internships' && (
          <div className="internships-section">
            {isEditing && (
              <div className="add-section">
                <button className="add-button">
                  <Plus size={16} />
                  Add New Internship
                </button>
              </div>
            )}
            
            <div className="internships-list">
              {internships.map(internship => (
                <div key={internship.id} className="internship-card">
                  <div className="internship-header">
                    <h3>{internship.position}</h3>
                    <p className="company">{internship.company}</p>
                    {isEditing && (
                      <div className="internship-actions">
                        <button className="edit-action">
                          <Edit3 size={16} />
                        </button>
                        <button className="delete-action">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="internship-details">
                    <p className="duration">{internship.duration}</p>
                    <p className="description">{internship.description}</p>
                    
                    <div className="skills">
                      <h4>Key Skills:</h4>
                      <div className="skills-list">
                        {internship.skills.map((skill, index) => (
                          <span key={index} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="achievements-section">
            <div className="achievements-grid">
              {/* Hackathons */}
              <div className="achievements-category">
                <h2>Hackathons & Competitions</h2>
                {isEditing && (
                  <button className="add-button small">
                    <Plus size={16} />
                    Add
                  </button>
                )}
                
                <div className="achievements-list">
                  {hackathons.map(hackathon => (
                    <div key={hackathon.id} className="achievement-card">
                      <div className="achievement-header">
                        <Trophy size={20} />
                        <h3>{hackathon.name}</h3>
                        {isEditing && (
                          <div className="achievement-actions">
                            <button className="edit-action">
                              <Edit3 size={16} />
                            </button>
                            <button className="delete-action">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="achievement-details">
                        <p className="position">{hackathon.position}</p>
                        <p className="date">{hackathon.date}</p>
                        <p className="description">{hackathon.description}</p>
                        <div className="team">
                          <p><strong>Team:</strong> {hackathon.team.join(", ")}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Certifications */}
              <div className="achievements-category">
                <h2>Certifications</h2>
                {isEditing && (
                  <button className="add-button small">
                    <Plus size={16} />
                    Add
                  </button>
                )}
                
                <div className="achievements-list">
                  {certifications.map(cert => (
                    <div key={cert.id} className="achievement-card">
                      <div className="achievement-header">
                        <Award size={20} />
                        <h3>{cert.name}</h3>
                        {isEditing && (
                          <div className="achievement-actions">
                            <button className="edit-action">
                              <Edit3 size={16} />
                            </button>
                            <button className="delete-action">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="achievement-details">
                        <p className="issuer">{cert.issuer}</p>
                        <p className="date">{cert.date}</p>
                        <a 
                          href={cert.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="cert-link"
                        >
                          <Link size={16} />
                          View Certificate
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;