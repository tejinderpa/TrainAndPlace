import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Save, Upload, Mail, Phone, Globe, MapPin, Linkedin, User, Calendar, Award } from 'lucide-react';
import '../../App.css';

const AlumniProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [alumniData, setAlumniData] = useState({
    name: "Rahul Sharma",
    email: "rahul.sharma.alumni@gmail.com",
    phone: "+91 98765 43210",
    currentCompany: "Google",
    designation: "Senior Software Engineer",
    graduationYear: "2015",
    batch: "2011-2015",
    branch: "Computer Science",
    skills: ["JavaScript", "React", "Node.js", "Cloud Computing", "Team Leadership"],
    linkedin: "https://linkedin.com/in/rahulsharma",
    portfolio: "https://rahulsharma.dev",
    availability: true,
    bio: "Passionate software engineer with 8+ years of experience in building scalable web applications. Currently working at Google on cloud infrastructure projects. Love mentoring students and helping them navigate their career paths."
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAlumniData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setAlumniData(prev => ({
      ...prev,
      skills
    }));
  };

  const handleSave = () => {
    // In a real app, you would save to backend here
    console.log("Saving alumni profile:", alumniData);
    setIsEditing(false);
  };

  return (
    <div className="alumni-profile">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>Manage your alumni profile information</p>
      </div>

      <div className="profile-layout">
        {/* Profile Info Section */}
        <div className="profile-section">
          <div className="section-header">
            <h2>Personal Information</h2>
            <button 
              className="edit-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Save size={16} />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          <div className="profile-info-card">
            <div className="profile-header">
              <div className="profile-avatar">
                <User size={48} />
              </div>
              {isEditing && (
                <button className="upload-avatar-button">
                  <Upload size={16} />
                  Upload Photo
                </button>
              )}
              <div className="profile-name">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={alumniData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  <h2>{alumniData.name}</h2>
                )}
              </div>
            </div>

            <div className="profile-details">
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={alumniData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p><a href={`mailto:${alumniData.email}`}>{alumniData.email}</a></p>
                  )}
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={alumniData.phone}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p><a href={`tel:${alumniData.phone}`}>{alumniData.phone}</a></p>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Current Company</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="currentCompany"
                      value={alumniData.currentCompany}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{alumniData.currentCompany}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Designation</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="designation"
                      value={alumniData.designation}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{alumniData.designation}</p>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Graduation Year</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="graduationYear"
                      value={alumniData.graduationYear}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{alumniData.graduationYear}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Batch</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="batch"
                      value={alumniData.batch}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{alumniData.batch}</p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Branch</label>
                {isEditing ? (
                  <select
                    name="branch"
                    value={alumniData.branch}
                    onChange={handleInputChange}
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                    <option value="Chemical">Chemical</option>
                    <option value="Design">Design</option>
                    <option value="Data Science">Data Science</option>
                  </select>
                ) : (
                  <p>{alumniData.branch}</p>
                )}
              </div>

              <div className="form-group">
                <label>Skills and Expertise</label>
                {isEditing ? (
                  <textarea
                    value={alumniData.skills.join(', ')}
                    onChange={handleSkillsChange}
                    placeholder="Enter skills separated by commas"
                    rows="3"
                  />
                ) : (
                  <div className="skills-tags">
                    {alumniData.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>LinkedIn Profile</label>
                {isEditing ? (
                  <input
                    type="url"
                    name="linkedin"
                    value={alumniData.linkedin}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p><a href={alumniData.linkedin} target="_blank" rel="noopener noreferrer">{alumniData.linkedin}</a></p>
                )}
              </div>

              <div className="form-group">
                <label>Portfolio/Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    name="portfolio"
                    value={alumniData.portfolio}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p><a href={alumniData.portfolio} target="_blank" rel="noopener noreferrer">{alumniData.portfolio}</a></p>
                )}
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="availability"
                    checked={alumniData.availability}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  Available for Mentorship
                </label>
              </div>

              <div className="form-group">
                <label>About Me</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={alumniData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Tell us about yourself, your experience, and what you can offer as a mentor"
                  />
                ) : (
                  <p>{alumniData.bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniProfile;