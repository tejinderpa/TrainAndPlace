import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Save, Upload, Mail, Phone, Globe, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import '../../App.css';

const CompanyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState({
    name: "TechCorp Solutions",
    industry: "Information Technology",
    website: "https://techcorpsolutions.com",
    headquarters: "Bangalore, India",
    description: "Leading technology company specializing in software development, AI solutions, and cloud services. We are committed to innovation and excellence in everything we do.",
    contactPerson: "Rajesh Kumar",
    contactEmail: "rajesh.kumar@techcorpsolutions.com",
    contactPhone: "+91 98765 43210",
    linkedin: "https://linkedin.com/company/techcorpsolutions",
    twitter: "https://twitter.com/techcorpsolutions",
    facebook: "https://facebook.com/techcorpsolutions",
    instagram: "https://instagram.com/techcorpsolutions"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In a real app, you would save to backend here
    console.log("Saving company profile:", companyData);
    setIsEditing(false);
  };

  return (
    <div className="company-profile">
      <div className="page-header">
        <h1>Company Profile</h1>
        <p>Manage your company information and details</p>
      </div>

      <div className="profile-layout">
        {/* Company Info Section */}
        <div className="profile-section">
          <div className="section-header">
            <h2>Company Information</h2>
            <button 
              className="edit-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Save size={16} />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          <div className="company-info-card">
            <div className="company-logo-section">
              <div className="logo-placeholder">
                <span>TC</span>
              </div>
              {isEditing && (
                <button className="upload-logo-button">
                  <Upload size={16} />
                  Upload Logo
                </button>
              )}
            </div>

            <div className="company-details">
              <div className="form-group">
                <label>Company Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={companyData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{companyData.name}</p>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Industry</label>
                  {isEditing ? (
                    <select
                      name="industry"
                      value={companyData.industry}
                      onChange={handleInputChange}
                    >
                      <option value="Information Technology">Information Technology</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Education">Education</option>
                      <option value="Telecommunications">Telecommunications</option>
                    </select>
                  ) : (
                    <p>{companyData.industry}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Headquarters</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="headquarters"
                      value={companyData.headquarters}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{companyData.headquarters}</p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    name="website"
                    value={companyData.website}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p><a href={companyData.website} target="_blank" rel="noopener noreferrer">{companyData.website}</a></p>
                )}
              </div>

              <div className="form-group">
                <label>Company Description</label>
                {isEditing ? (
                  <textarea
                    name="description"
                    value={companyData.description}
                    onChange={handleInputChange}
                    rows="4"
                  />
                ) : (
                  <p>{companyData.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Person Section */}
        <div className="profile-section">
          <h2>Contact Person</h2>
          <div className="contact-card">
            <div className="form-group">
              <label>Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="contactPerson"
                  value={companyData.contactPerson}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{companyData.contactPerson}</p>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="contactEmail"
                    value={companyData.contactEmail}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p><a href={`mailto:${companyData.contactEmail}`}>{companyData.contactEmail}</a></p>
                )}
              </div>

              <div className="form-group">
                <label>Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="contactPhone"
                    value={companyData.contactPhone}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p><a href={`tel:${companyData.contactPhone}`}>{companyData.contactPhone}</a></p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="profile-section">
          <h2>Social Media Links</h2>
          <div className="social-links-card">
            <div className="form-group">
              <label><Linkedin size={16} /> LinkedIn</label>
              {isEditing ? (
                <input
                  type="url"
                  name="linkedin"
                  value={companyData.linkedin}
                  onChange={handleInputChange}
                />
              ) : (
                <p><a href={companyData.linkedin} target="_blank" rel="noopener noreferrer">{companyData.linkedin}</a></p>
              )}
            </div>

            <div className="form-group">
              <label><Twitter size={16} /> Twitter</label>
              {isEditing ? (
                <input
                  type="url"
                  name="twitter"
                  value={companyData.twitter}
                  onChange={handleInputChange}
                />
              ) : (
                <p><a href={companyData.twitter} target="_blank" rel="noopener noreferrer">{companyData.twitter}</a></p>
              )}
            </div>

            <div className="form-group">
              <label><Facebook size={16} /> Facebook</label>
              {isEditing ? (
                <input
                  type="url"
                  name="facebook"
                  value={companyData.facebook}
                  onChange={handleInputChange}
                />
              ) : (
                <p><a href={companyData.facebook} target="_blank" rel="noopener noreferrer">{companyData.facebook}</a></p>
              )}
            </div>

            <div className="form-group">
              <label><Instagram size={16} /> Instagram</label>
              {isEditing ? (
                <input
                  type="url"
                  name="instagram"
                  value={companyData.instagram}
                  onChange={handleInputChange}
                />
              ) : (
                <p><a href={companyData.instagram} target="_blank" rel="noopener noreferrer">{companyData.instagram}</a></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;