import React, { useState } from 'react';
import { Search, Filter, Users, Award, Mail, Phone, Calendar, TrendingUp, Download } from 'lucide-react';
import '../../App.css';

const AlumniCoordination = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [batchFilter, setBatchFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [isInviting, setIsInviting] = useState(false);

  // Sample alumni data
  const alumniData = [
    {
      id: 1,
      name: "Rahul Sharma",
      batch: "2015",
      branch: "Computer Science",
      company: "Google",
      designation: "Senior Software Engineer",
      location: "Mountain View, CA",
      email: "rahul.sharma@google.com",
      phone: "+1 (555) 123-4567",
      linkedin: "linkedin.com/in/rahulsharma",
      contribution: "Mentorship, Referrals",
      status: "Active"
    },
    {
      id: 2,
      name: "Priya Patel",
      batch: "2014",
      branch: "Electronics",
      company: "Microsoft",
      designation: "Product Manager",
      location: "Redmond, WA",
      email: "priya.patel@microsoft.com",
      phone: "+1 (555) 234-5678",
      linkedin: "linkedin.com/in/priyapatel",
      contribution: "Guest Lectures, Referrals",
      status: "Active"
    },
    {
      id: 3,
      name: "Amit Kumar",
      batch: "2016",
      branch: "Mechanical",
      company: "Amazon",
      designation: "Senior Manager",
      location: "Seattle, WA",
      email: "amit.kumar@amazon.com",
      phone: "+1 (555) 345-6789",
      linkedin: "linkedin.com/in/amitkumar",
      contribution: "Campus Drive, Mentorship",
      status: "Inactive"
    },
    {
      id: 4,
      name: "Sneha Gupta",
      batch: "2013",
      branch: "Civil",
      company: "Meta",
      designation: "Engineering Lead",
      location: "Menlo Park, CA",
      email: "sneha.gupta@meta.com",
      phone: "+1 (555) 456-7890",
      linkedin: "linkedin.com/in/snehagupta",
      contribution: "Workshops, Referrals",
      status: "Active"
    }
  ];

  const batches = [...new Set(alumniData.map(alumni => alumni.batch))];
  const industries = [...new Set(alumniData.map(alumni => alumni.company))];

  const filteredAlumni = alumniData.filter(alumni => {
    const matchesSearch = alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.designation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBatch = batchFilter === 'all' || alumni.batch === batchFilter;
    const matchesIndustry = industryFilter === 'all' || alumni.company === industryFilter;
    
    return matchesSearch && matchesBatch && matchesIndustry;
  });

  const handleInviteAlumni = () => {
    setIsInviting(true);
  };

  const handleContactAlumni = (alumniId) => {
    console.log("Contacting alumni:", alumniId);
  };

  const handleViewProfile = (alumniId) => {
    console.log("Viewing alumni profile:", alumniId);
  };

  const handleRequestMentorship = (alumniId) => {
    console.log("Requesting mentorship from alumni:", alumniId);
  };

  const handleViewSuccessStories = () => {
    console.log("Viewing success stories");
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      default: return '';
    }
  };

  return (
    <div className="alumni-coordination">
      <div className="page-header">
        <h1>Alumni Coordination</h1>
        <p>Connect with alumni for support and engagement</p>
      </div>

      {/* Controls */}
      <div className="alumni-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search alumni by name, company, or designation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={batchFilter} 
              onChange={(e) => setBatchFilter(e.target.value)}
            >
              <option value="all">All Batches</option>
              {batches.map(batch => (
                <option key={batch} value={batch}>{batch}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <select 
              value={industryFilter} 
              onChange={(e) => setIndustryFilter(e.target.value)}
            >
              <option value="all">All Companies</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="actions">
          <button 
            className="primary-button"
            onClick={handleInviteAlumni}
          >
            <Users size={16} />
            Invite Alumni
          </button>
          <button 
            className="secondary-button"
            onClick={handleViewSuccessStories}
          >
            <Award size={16} />
            Success Stories
          </button>
        </div>
      </div>

      {/* Alumni Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><Users size={24} /></div>
          <div className="stat-info">
            <h3>{alumniData.length}</h3>
            <p>Total Alumni</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><TrendingUp size={24} /></div>
          <div className="stat-info">
            <h3>{alumniData.filter(a => a.status === 'Active').length}</h3>
            <p>Active Alumni</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Award size={24} /></div>
          <div className="stat-info">
            <h3>{alumniData.filter(a => a.contribution.includes('Referrals')).length}</h3>
            <p>Referral Contributors</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Users size={24} /></div>
          <div className="stat-info">
            <h3>{alumniData.filter(a => a.contribution.includes('Mentorship')).length}</h3>
            <p>Mentors</p>
          </div>
        </div>
      </div>

      {/* Alumni Directory */}
      <div className="alumni-directory">
        <h2>Alumni Directory</h2>
        <div className="alumni-grid">
          {filteredAlumni.map(alumni => (
            <div key={alumni.id} className="alumni-card">
              <div className="alumni-header">
                <div className="alumni-avatar">
                  {alumni.name.charAt(0)}
                </div>
                <div className="alumni-info">
                  <h3>{alumni.name}</h3>
                  <p>{alumni.designation}</p>
                  <p>{alumni.company}</p>
                  <div className={`status-badge ${getStatusClass(alumni.status)}`}>
                    {alumni.status}
                  </div>
                </div>
              </div>
              
              <div className="alumni-details">
                <div className="detail-item">
                  <span className="label">Batch:</span>
                  <span className="value">{alumni.batch} - {alumni.branch}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Location:</span>
                  <span className="value">{alumni.location}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Contribution:</span>
                  <span className="value">{alumni.contribution}</span>
                </div>
              </div>
              
              <div className="alumni-contact">
                <a href={`mailto:${alumni.email}`} className="contact-item">
                  <Mail size={16} />
                  <span>Email</span>
                </a>
                <a href={`tel:${alumni.phone}`} className="contact-item">
                  <Phone size={16} />
                  <span>Call</span>
                </a>
                <a href={`https://${alumni.linkedin}`} target="_blank" rel="noopener noreferrer" className="contact-item">
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
              
              <div className="alumni-actions">
                <button 
                  className="secondary-button"
                  onClick={() => handleViewProfile(alumni.id)}
                >
                  <Eye size={16} />
                  View Profile
                </button>
                <button 
                  className="primary-button"
                  onClick={() => handleRequestMentorship(alumni.id)}
                >
                  <Users size={16} />
                  Request Mentorship
                </button>
              </div>
            </div>
          ))}
          
          {filteredAlumni.length === 0 && (
            <div className="no-results">
              <p>No alumni found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Referral Tracking */}
      <div className="referral-tracking">
        <h2>Alumni Referral Tracking</h2>
        <div className="referral-stats">
          <div className="stat-card">
            <div className="stat-icon"><TrendingUp size={24} /></div>
            <div className="stat-info">
              <h3>42</h3>
              <p>Total Referrals</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Check size={24} /></div>
            <div className="stat-info">
              <h3>35</h3>
              <p>Successful Placements</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><BarChart3 size={24} /></div>
            <div className="stat-info">
              <h3>83%</h3>
              <p>Success Rate</p>
            </div>
          </div>
        </div>
        
        <div className="referral-actions">
          <button className="primary-button">
            <Download size={16} />
            Export Referral Report
          </button>
          <button className="secondary-button">
            <Calendar size={16} />
            Schedule Referral Meeting
          </button>
        </div>
      </div>

      {/* Invite Alumni Modal */}
      {isInviting && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Invite Alumni</h2>
              <button 
                className="close-button"
                onClick={() => setIsInviting(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Invitation Purpose</label>
                <select>
                  <option value="">Select purpose</option>
                  <option value="event">Invite to Event</option>
                  <option value="mentorship">Mentorship Program</option>
                  <option value="campus-drive">Campus Placement Drive</option>
                  <option value="workshop">Conduct Workshop/Seminar</option>
                  <option value="referral">Job Referral Program</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Select Alumni</label>
                <div className="alumni-selection">
                  {alumniData.map(alumni => (
                    <div key={alumni.id} className="alumni-checkbox">
                      <input type="checkbox" id={`alumni-${alumni.id}`} />
                      <label htmlFor={`alumni-${alumni.id}`}>
                        <div className="alumni-avatar-small">
                          {alumni.name.charAt(0)}
                        </div>
                        <div>
                          <span className="alumni-name">{alumni.name}</span>
                          <span className="alumni-company">{alumni.company}</span>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label>Custom Message</label>
                <textarea 
                  rows="4" 
                  placeholder="Add a personalized message to the alumni..."
                ></textarea>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="cancel-button"
                  onClick={() => setIsInviting(false)}
                >
                  Cancel
                </button>
                <button className="submit-button">
                  <Send size={16} />
                  Send Invitations
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniCoordination;