import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Edit3, 
  Upload, 
  Plus, 
  Trash2,
  CheckCircle
} from 'lucide-react';
import '../../App.css';

const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  // Form data state
  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    address: "123 University Ave, City, State 12345",
    dateOfBirth: "1998-05-15",
    gender: "Male",
    
    // Academic Details
    tenthPercentage: 92.5,
    twelfthPercentage: 88.0,
    currentCGPA: 8.7,
    branch: "Computer Science",
    batch: "2022-2026",
    
    // Skills
    skills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
    newSkill: "",
    
    // Projects
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        description: "A full-stack e-commerce solution built with MERN stack",
        technologies: ["React", "Node.js", "MongoDB"],
        link: "https://github.com/alexjohnson/ecommerce"
      },
      {
        id: 2,
        title: "Data Visualization Dashboard",
        description: "Interactive dashboard for analyzing sales data",
        technologies: ["Python", "D3.js", "Flask"],
        link: "https://github.com/alexjohnson/dashboard"
      }
    ],
    newProject: {
      title: "",
      description: "",
      technologies: "",
      link: ""
    },
    
    // Certifications
    certifications: [
      {
        id: 1,
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2024-03-15",
        link: "https://example.com/cert1"
      },
      {
        id: 2,
        name: "Google Cloud Professional",
        issuer: "Google Cloud",
        date: "2024-06-20",
        link: "https://example.com/cert2"
      }
    ],
    newCertification: {
      name: "",
      issuer: "",
      date: "",
      link: ""
    },
    
    // Portfolio Links
    linkedIn: "https://linkedin.com/in/alexjohnson",
    github: "https://github.com/alexjohnson",
    leetcode: "https://leetcode.com/alexjohnson",
    kaggle: "https://kaggle.com/alexjohnson",
    
    // Resume
    resume: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNestedInputChange = (e, section, field) => {
    const { value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addSkill = () => {
    if (profileData.newSkill.trim() !== "") {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: ""
      }));
    }
  };

  const removeSkill = (index) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    if (profileData.newProject.title.trim() !== "") {
      const newProj = {
        id: Date.now(),
        title: profileData.newProject.title,
        description: profileData.newProject.description,
        technologies: profileData.newProject.technologies.split(',').map(t => t.trim()),
        link: profileData.newProject.link
      };
      
      setProfileData(prev => ({
        ...prev,
        projects: [...prev.projects, newProj],
        newProject: {
          title: "",
          description: "",
          technologies: "",
          link: ""
        }
      }));
    }
  };

  const removeProject = (id) => {
    setProfileData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  };

  const addCertification = () => {
    if (profileData.newCertification.name.trim() !== "") {
      const newCert = {
        id: Date.now(),
        name: profileData.newCertification.name,
        issuer: profileData.newCertification.issuer,
        date: profileData.newCertification.date,
        link: profileData.newCertification.link
      };
      
      setProfileData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCert],
        newCertification: {
          name: "",
          issuer: "",
          date: "",
          link: ""
        }
      }));
    }
  };

  const removeCertification = (id) => {
    setProfileData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData(prev => ({
        ...prev,
        resume: file.name
      }));
    }
  };

  const calculateProfileCompletion = () => {
    // Simple calculation based on filled fields
    let completedFields = 0;
    let totalFields = 0;
    
    // Personal info
    totalFields += 6;
    if (profileData.firstName) completedFields++;
    if (profileData.lastName) completedFields++;
    if (profileData.email) completedFields++;
    if (profileData.phone) completedFields++;
    if (profileData.address) completedFields++;
    if (profileData.dateOfBirth) completedFields++;
    
    // Academic info
    totalFields += 5;
    if (profileData.tenthPercentage) completedFields++;
    if (profileData.twelfthPercentage) completedFields++;
    if (profileData.currentCGPA) completedFields++;
    if (profileData.branch) completedFields++;
    if (profileData.batch) completedFields++;
    
    // Skills
    totalFields += 1;
    if (profileData.skills.length > 0) completedFields++;
    
    // Projects
    totalFields += 1;
    if (profileData.projects.length > 0) completedFields++;
    
    // Certifications
    totalFields += 1;
    if (profileData.certifications.length > 0) completedFields++;
    
    // Portfolio links
    totalFields += 4;
    if (profileData.linkedIn) completedFields++;
    if (profileData.github) completedFields++;
    if (profileData.leetcode) completedFields++;
    if (profileData.kaggle) completedFields++;
    
    // Resume
    totalFields += 1;
    if (profileData.resume) completedFields++;
    
    return Math.round((completedFields / totalFields) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            <User size={48} />
          </div>
          <div className="profile-details">
            <h1>{profileData.firstName} {profileData.lastName}</h1>
            <p>{profileData.branch} • {profileData.batch}</p>
            <div className="profile-completion">
              <div className="completion-bar">
                <div 
                  className="completion-fill" 
                  style={{ width: `${profileCompletion}%` }}
                ></div>
              </div>
              <p>Profile Completion: {profileCompletion}%</p>
            </div>
          </div>
        </div>
        <div className="profile-actions">
          <button 
            className="edit-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit3 size={20} />
            {isEditing ? "Save Profile" : "Edit Profile"}
          </button>
        </div>
      </div>

      <div className="profile-content">
        {/* Tabs */}
        <div className="profile-tabs">
          <button 
            className={`tab ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            Personal Info
          </button>
          <button 
            className={`tab ${activeTab === 'academic' ? 'active' : ''}`}
            onClick={() => setActiveTab('academic')}
          >
            Academic Details
          </button>
          <button 
            className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            Skills
          </button>
          <button 
            className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button 
            className={`tab ${activeTab === 'certifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('certifications')}
          >
            Certifications
          </button>
          <button 
            className={`tab ${activeTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </button>
          <button 
            className={`tab ${activeTab === 'resume' ? 'active' : ''}`}
            onClick={() => setActiveTab('resume')}
          >
            Resume
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Personal Information */}
          {activeTab === 'personal' && (
            <div className="tab-pane">
              <h2>Personal Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={profileData.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Academic Details */}
          {activeTab === 'academic' && (
            <div className="tab-pane">
              <h2>Academic Details</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>10th Percentage</label>
                  <input
                    type="number"
                    name="tenthPercentage"
                    value={profileData.tenthPercentage}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    step="0.01"
                  />
                </div>
                <div className="form-group">
                  <label>12th Percentage</label>
                  <input
                    type="number"
                    name="twelfthPercentage"
                    value={profileData.twelfthPercentage}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    step="0.01"
                  />
                </div>
                <div className="form-group">
                  <label>Current CGPA</label>
                  <input
                    type="number"
                    name="currentCGPA"
                    value={profileData.currentCGPA}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    step="0.01"
                  />
                </div>
                <div className="form-group">
                  <label>Branch</label>
                  <input
                    type="text"
                    name="branch"
                    value={profileData.branch}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label>Batch</label>
                  <input
                    type="text"
                    name="batch"
                    value={profileData.batch}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Skills */}
          {activeTab === 'skills' && (
            <div className="tab-pane">
              <h2>Skills</h2>
              {isEditing && (
                <div className="form-group">
                  <div className="skill-input">
                    <input
                      type="text"
                      value={profileData.newSkill}
                      onChange={(e) => handleInputChange({ target: { name: 'newSkill', value: e.target.value } })}
                      placeholder="Add a skill"
                    />
                    <button onClick={addSkill} className="add-button">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              )}
              <div className="skills-container">
                {profileData.skills.map((skill, index) => (
                  <div key={index} className="skill-tag">
                    <span>{skill}</span>
                    {isEditing && (
                      <button 
                        onClick={() => removeSkill(index)}
                        className="remove-skill"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {activeTab === 'projects' && (
            <div className="tab-pane">
              <h2>Projects</h2>
              {isEditing && (
                <div className="project-form">
                  <h3>Add New Project</h3>
                  <div className="form-group">
                    <label>Project Title</label>
                    <input
                      type="text"
                      value={profileData.newProject.title}
                      onChange={(e) => handleNestedInputChange(e, 'newProject', 'title')}
                      placeholder="Project title"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={profileData.newProject.description}
                      onChange={(e) => handleNestedInputChange(e, 'newProject', 'description')}
                      placeholder="Project description"
                    />
                  </div>
                  <div className="form-group">
                    <label>Technologies (comma separated)</label>
                    <input
                      type="text"
                      value={profileData.newProject.technologies}
                      onChange={(e) => handleNestedInputChange(e, 'newProject', 'technologies')}
                      placeholder="JavaScript, React, Node.js"
                    />
                  </div>
                  <div className="form-group">
                    <label>Project Link</label>
                    <input
                      type="url"
                      value={profileData.newProject.link}
                      onChange={(e) => handleNestedInputChange(e, 'newProject', 'link')}
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                  <button onClick={addProject} className="add-button">
                    Add Project
                  </button>
                </div>
              )}
              <div className="projects-list">
                {profileData.projects.map(project => (
                  <div key={project.id} className="project-card">
                    <div className="project-header">
                      <h3>{project.title}</h3>
                      {isEditing && (
                        <button 
                          onClick={() => removeProject(project.id)}
                          className="remove-button"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <p>{project.description}</p>
                    <div className="project-tech">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                        View Project
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {activeTab === 'certifications' && (
            <div className="tab-pane">
              <h2>Certifications</h2>
              {isEditing && (
                <div className="certification-form">
                  <h3>Add New Certification</h3>
                  <div className="form-group">
                    <label>Certification Name</label>
                    <input
                      type="text"
                      value={profileData.newCertification.name}
                      onChange={(e) => handleNestedInputChange(e, 'newCertification', 'name')}
                      placeholder="Certification name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Issuer</label>
                    <input
                      type="text"
                      value={profileData.newCertification.issuer}
                      onChange={(e) => handleNestedInputChange(e, 'newCertification', 'issuer')}
                      placeholder="Issuing organization"
                    />
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={profileData.newCertification.date}
                      onChange={(e) => handleNestedInputChange(e, 'newCertification', 'date')}
                    />
                  </div>
                  <div className="form-group">
                    <label>Certificate Link</label>
                    <input
                      type="url"
                      value={profileData.newCertification.link}
                      onChange={(e) => handleNestedInputChange(e, 'newCertification', 'link')}
                      placeholder="https://example.com/certificate"
                    />
                  </div>
                  <button onClick={addCertification} className="add-button">
                    Add Certification
                  </button>
                </div>
              )}
              <div className="certifications-list">
                {profileData.certifications.map(cert => (
                  <div key={cert.id} className="certification-card">
                    <div className="certification-header">
                      <h3>{cert.name}</h3>
                      {isEditing && (
                        <button 
                          onClick={() => removeCertification(cert.id)}
                          className="remove-button"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <p><strong>Issuer:</strong> {cert.issuer}</p>
                    <p><strong>Date:</strong> {cert.date}</p>
                    {cert.link && (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link">
                        View Certificate
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio Links */}
          {activeTab === 'portfolio' && (
            <div className="tab-pane">
              <h2>Portfolio Links</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>LinkedIn</label>
                  <input
                    type="url"
                    name="linkedIn"
                    value={profileData.linkedIn}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div className="form-group">
                  <label>GitHub</label>
                  <input
                    type="url"
                    name="github"
                    value={profileData.github}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="https://github.com/username"
                  />
                </div>
                <div className="form-group">
                  <label>LeetCode</label>
                  <input
                    type="url"
                    name="leetcode"
                    value={profileData.leetcode}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="https://leetcode.com/username"
                  />
                </div>
                <div className="form-group">
                  <label>Kaggle</label>
                  <input
                    type="url"
                    name="kaggle"
                    value={profileData.kaggle}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="https://kaggle.com/username"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Resume */}
          {activeTab === 'resume' && (
            <div className="tab-pane">
              <h2>Resume</h2>
              <div className="resume-section">
                {profileData.resume ? (
                  <div className="resume-uploaded">
                    <CheckCircle size={48} className="check-icon" />
                    <h3>Resume Uploaded</h3>
                    <p>{profileData.resume}</p>
                    {isEditing && (
                      <button className="update-resume-button">
                        Update Resume
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="resume-upload">
                    <Upload size={48} />
                    <p>Upload your resume to get started</p>
                    {isEditing && (
                      <label className="upload-button">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          style={{ display: 'none' }}
                        />
                        Upload Resume
                      </label>
                    )}
                  </div>
                )}
                {isEditing && profileData.resume && (
                  <label className="change-resume-button">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                    Change Resume
                  </label>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;