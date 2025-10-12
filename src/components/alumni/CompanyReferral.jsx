import React, { useState } from 'react';
import { Search, Filter, Send, CheckCircle, Clock, Award, Download } from 'lucide-react';
import '../../App.css';

const CompanyReferral = () => {
  const [activeTab, setActiveTab] = useState('submit');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample referral data
  const referrals = [
    {
      id: 1,
      company: "TechCorp Solutions",
      contact: "Rajesh Kumar",
      type: "Internship",
      submittedDate: "2025-10-01",
      status: "Accepted",
      rewardPoints: 50
    },
    {
      id: 2,
      company: "InnovateX",
      contact: "Priya Sharma",
      type: "Placement",
      submittedDate: "2025-09-15",
      status: "Pending",
      rewardPoints: 0
    },
    {
      id: 3,
      company: "CreativeWorks",
      contact: "Amit Patel",
      type: "Workshop",
      submittedDate: "2025-08-20",
      status: "Completed",
      rewardPoints: 30
    }
  ];

  // Form state
  const [referralForm, setReferralForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    opportunityType: 'Internship',
    description: ''
  });

  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch = referral.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.contact.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || referral.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Submitting referral:", referralForm);
    // Reset form
    setReferralForm({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      opportunityType: 'Internship',
      description: ''
    });
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReferralForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted': return 'status-accepted';
      case 'pending': return 'status-pending';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  const successRate = Math.round((referrals.filter(r => r.status === 'Accepted' || r.status === 'Completed').length / referrals.length) * 100);

  return (
    <div className="company-referral">
      <div className="page-header">
        <h1>Company Referrals</h1>
        <p>Refer companies and track your referral success</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'submit' ? 'active' : ''}`}
          onClick={() => setActiveTab('submit')}
        >
          <Send size={16} />
          Submit Referral
        </button>
        <button 
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <Award size={16} />
          Referral History
        </button>
        <button 
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <CheckCircle size={16} />
          Analytics
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'submit' && (
          <div className="submit-tab">
            <h2>Submit a New Referral</h2>
            <div className="form-container">
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label>Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={referralForm.companyName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter company name"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Person *</label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={referralForm.contactPerson}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter contact person name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={referralForm.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={referralForm.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label>Opportunity Type</label>
                    <select
                      name="opportunityType"
                      value={referralForm.opportunityType}
                      onChange={handleInputChange}
                    >
                      <option value="Internship">Internship</option>
                      <option value="Placement">Placement</option>
                      <option value="Hackathon">Hackathon</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Webinar">Webinar</option>
                      <option value="Mentorship">Mentorship Program</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={referralForm.description}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Provide details about the opportunity and why you're referring this company..."
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="primary-button"
                    disabled={isSubmitting}
                  >
                    <Send size={16} />
                    {isSubmitting ? "Submitting..." : "Submit Referral"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="history-tab">
            <h2>Referral History</h2>
            
            {/* Controls */}
            <div className="referral-controls">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search referrals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filters">
                <div className="filter-group">
                  <Filter size={20} />
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Referrals List */}
            <div className="referrals-list">
              {filteredReferrals.length > 0 ? (
                filteredReferrals.map(referral => (
                  <div key={referral.id} className="referral-card">
                    <div className="referral-header">
                      <div className="company-info">
                        <h3>{referral.company}</h3>
                        <p>Contact: {referral.contact}</p>
                      </div>
                      <div className={`status-badge ${getStatusClass(referral.status)}`}>
                        {referral.status}
                      </div>
                    </div>
                    
                    <div className="referral-details">
                      <div className="detail-item">
                        <span className="label">Type:</span>
                        <span className="value">{referral.type}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Submitted:</span>
                        <span className="value">{referral.submittedDate}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Reward Points:</span>
                        <span className="value">{referral.rewardPoints}</span>
                      </div>
                    </div>
                    
                    <div className="referral-actions">
                      <button className="secondary-button">
                        <Download size={16} />
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>No referrals found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-tab">
            <h2>Referral Analytics</h2>
            
            {/* Key Metrics */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon"><Send size={24} /></div>
                <div className="stat-info">
                  <h3>{referrals.length}</h3>
                  <p>Total Referrals</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><CheckCircle size={24} /></div>
                <div className="stat-info">
                  <h3>{successRate}%</h3>
                  <p>Success Rate</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><Award size={24} /></div>
                <div className="stat-info">
                  <h3>{referrals.reduce((sum, r) => sum + r.rewardPoints, 0)}</h3>
                  <p>Total Reward Points</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon"><Clock size={24} /></div>
                <div className="stat-info">
                  <h3>{referrals.filter(r => r.status === 'Pending').length}</h3>
                  <p>Pending Referrals</p>
                </div>
              </div>
            </div>

            {/* Success Rate Chart */}
            <div className="chart-card">
              <div className="card-header">
                <h3>Referral Success Rate</h3>
              </div>
              <div className="success-rate-chart">
                <div className="rate-display">
                  <div className="rate-value">{successRate}%</div>
                  <div className="rate-label">Success Rate</div>
                </div>
                <div className="rate-bar">
                  <div 
                    className="rate-fill" 
                    style={{ width: `${successRate}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Status Distribution */}
            <div className="chart-card">
              <div className="card-header">
                <h3>Referral Status Distribution</h3>
              </div>
              <div className="status-distribution">
                <div className="status-item">
                  <div className="status-label">Accepted</div>
                  <div className="status-count">
                    {referrals.filter(r => r.status === 'Accepted').length}
                  </div>
                </div>
                <div className="status-item">
                  <div className="status-label">Completed</div>
                  <div className="status-count">
                    {referrals.filter(r => r.status === 'Completed').length}
                  </div>
                </div>
                <div className="status-item">
                  <div className="status-label">Pending</div>
                  <div className="status-count">
                    {referrals.filter(r => r.status === 'Pending').length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyReferral;