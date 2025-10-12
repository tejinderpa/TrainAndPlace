import React, { useState } from 'react';
import { Save, Upload, Users, Building2, MapPin, Phone, Mail, Globe, FileText } from 'lucide-react';
import '../../App.css';

const TpoProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tpoData, setTpoData] = useState({
    officerName: "Dr. Rajesh Kumar",
    designation: "Chief Placement Officer",
    email: "tpo@college.edu",
    phone: "+91 98765 43210",
    collegeName: "National Institute of Technology",
    collegeAddress: "Main Building, New Delhi, India",
    collegePhone: "+91 11 2345 6789",
    collegeEmail: "info@college.edu",
    collegeWebsite: "https://www.college.edu",
    totalStudents: 4500,
    placementRate: "78%",
    avgPackage: "12.5 LPA",
    highestPackage: "35 LPA",
    infrastructure: "Modern labs, Wi-Fi campus, Library, Hostel facilities",
    brochure: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTpoData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTpoData(prev => ({
        ...prev,
        brochure: file.name
      }));
    }
  };

  const handleSave = () => {
    console.log("Saving TPO profile:", tpoData);
    setIsEditing(false);
  };

  return (
    <div className="tpo-profile">
      <div className="page-header">
        <h1>TPO Profile & College Info</h1>
        <p>Manage your profile and college information</p>
      </div>

      <div className="profile-layout">
        {/* TPO Officer Info */}
        <div className="profile-section">
          <div className="section-header">
            <h2>TPO Officer Details</h2>
            <button 
              className="edit-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Save size={16} />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          <div className="profile-card">
            <div className="form-group">
              <label>Officer Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="officerName"
                  value={tpoData.officerName}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{tpoData.officerName}</p>
              )}
            </div>

            <div className="form-group">
              <label>Designation</label>
              {isEditing ? (
                <input
                  type="text"
                  name="designation"
                  value={tpoData.designation}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{tpoData.designation}</p>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={tpoData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p><a href={`mailto:${tpoData.email}`}>{tpoData.email}</a></p>
                )}
              </div>

              <div className="form-group">
                <label>Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={tpoData.phone}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p><a href={`tel:${tpoData.phone}`}>{tpoData.phone}</a></p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* College Information */}
        <div className="profile-section">
          <div className="section-header">
            <h2>College Information</h2>
          </div>

          <div className="profile-card">
            <div className="form-group">
              <label>College Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="collegeName"
                  value={tpoData.collegeName}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{tpoData.collegeName}</p>
              )}
            </div>

            <div className="form-group">
              <label>Address</label>
              {isEditing ? (
                <textarea
                  name="collegeAddress"
                  value={tpoData.collegeAddress}
                  onChange={handleInputChange}
                  rows="3"
                />
              ) : (
                <p>{tpoData.collegeAddress}</p>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="collegePhone"
                    value={tpoData.collegePhone}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p><a href={`tel:${tpoData.collegePhone}`}>{tpoData.collegePhone}</a></p>
                )}
              </div>

              <div className="form-group">
                <label>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="collegeEmail"
                    value={tpoData.collegeEmail}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p><a href={`mailto:${tpoData.collegeEmail}`}>{tpoData.collegeEmail}</a></p>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Website</label>
              {isEditing ? (
                <input
                  type="url"
                  name="collegeWebsite"
                  value={tpoData.collegeWebsite}
                  onChange={handleInputChange}
                />
              ) : (
                <p><a href={tpoData.collegeWebsite} target="_blank" rel="noopener noreferrer">{tpoData.collegeWebsite}</a></p>
              )}
            </div>

            <div className="form-group">
              <label>College Brochure</label>
              {isEditing ? (
                <div className="file-upload">
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleFileUpload}
                  />
                  <div className="file-upload-placeholder">
                    <Upload size={24} />
                    <p>Upload brochure (PDF, DOC, DOCX)</p>
                  </div>
                </div>
              ) : (
                <div className="brochure-info">
                  {tpoData.brochure ? (
                    <p><FileText size={16} /> {tpoData.brochure}</p>
                  ) : (
                    <p>No brochure uploaded</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Placement Statistics */}
        <div className="profile-section">
          <div className="section-header">
            <h2>Placement Statistics</h2>
          </div>

          <div className="stats-card">
            <div className="stat-row">
              <div className="stat-item">
                <Users size={24} />
                <div>
                  <h3>{tpoData.totalStudents}</h3>
                  <p>Total Students</p>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <span className="percentage-icon">%</span>
                </div>
                <div>
                  <h3>{tpoData.placementRate}</h3>
                  <p>Placement Rate</p>
                </div>
              </div>
            </div>

            <div className="stat-row">
              <div className="stat-item">
                <div className="stat-icon">
                  <span className="rupee-icon">₹</span>
                </div>
                <div>
                  <h3>{tpoData.avgPackage}</h3>
                  <p>Average Package</p>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <span className="rupee-icon">₹</span>
                </div>
                <div>
                  <h3>{tpoData.highestPackage}</h3>
                  <p>Highest Package</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Infrastructure Details */}
        <div className="profile-section">
          <div className="section-header">
            <h2>Infrastructure Details</h2>
          </div>

          <div className="profile-card">
            <div className="form-group">
              <label>Infrastructure</label>
              {isEditing ? (
                <textarea
                  name="infrastructure"
                  value={tpoData.infrastructure}
                  onChange={handleInputChange}
                  rows="4"
                />
              ) : (
                <p>{tpoData.infrastructure}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TpoProfile;