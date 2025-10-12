import React, { useState } from 'react';
import { Search, Filter, Plus, Edit3, Eye, Mail, Phone, Calendar, Check, X } from 'lucide-react';
import '../../App.css';

const CompanyManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [isAdding, setIsAdding] = useState(false);

  // Sample company data
  const companies = [
    {
      id: 1,
      name: "Microsoft",
      industry: "Technology",
      contactPerson: "John Smith",
      email: "john.smith@microsoft.com",
      phone: "+1 (555) 123-4567",
      website: "https://microsoft.com",
      lastVisit: "2025-09-15",
      studentsPlaced: 24,
      avgPackage: "18 LPA",
      status: "Active"
    },
    {
      id: 2,
      name: "Google",
      industry: "Technology",
      contactPerson: "Sarah Johnson",
      email: "sarah.johnson@google.com",
      phone: "+1 (555) 234-5678",
      website: "https://google.com",
      lastVisit: "2025-08-20",
      studentsPlaced: 18,
      avgPackage: "22 LPA",
      status: "Active"
    },
    {
      id: 3,
      name: "Amazon",
      industry: "E-commerce",
      contactPerson: "Michael Brown",
      email: "michael.brown@amazon.com",
      phone: "+1 (555) 345-6789",
      website: "https://amazon.com",
      lastVisit: "2025-07-10",
      studentsPlaced: 32,
      avgPackage: "15 LPA",
      status: "Pending"
    },
    {
      id: 4,
      name: "Meta",
      industry: "Technology",
      contactPerson: "Emily Davis",
      email: "emily.davis@meta.com",
      phone: "+1 (555) 456-7890",
      website: "https://meta.com",
      lastVisit: "2025-06-05",
      studentsPlaced: 15,
      avgPackage: "25 LPA",
      status: "Active"
    }
  ];

  const industries = [...new Set(companies.map(company => company.industry))];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = industryFilter === 'all' || company.industry === industryFilter;
    
    return matchesSearch && matchesIndustry;
  });

  const handleAddCompany = () => {
    setIsAdding(true);
  };

  const handleEditCompany = (companyId) => {
    console.log("Editing company:", companyId);
  };

  const handleViewCompany = (companyId) => {
    console.log("Viewing company:", companyId);
  };

  const handleContactCompany = (companyId) => {
    console.log("Contacting company:", companyId);
  };

  const handleInviteCompany = (companyId) => {
    console.log("Inviting company:", companyId);
  };

  const handleViewJobs = (companyId) => {
    console.log("Viewing jobs for company:", companyId);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'status-active';
      case 'pending': return 'status-pending';
      case 'inactive': return 'status-inactive';
      default: return '';
    }
  };

  return (
    <div className="company-management">
      <div className="page-header">
        <h1>Company Management</h1>
        <p>Manage registered companies and their placement data</p>
      </div>

      {/* Controls */}
      <div className="management-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search companies or contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={industryFilter} 
              onChange={(e) => setIndustryFilter(e.target.value)}
            >
              <option value="all">All Industries</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="actions">
          <button 
            className="primary-button"
            onClick={handleAddCompany}
          >
            <Plus size={16} />
            Add Company
          </button>
        </div>
      </div>

      {/* Companies List */}
      <div className="companies-grid">
        {filteredCompanies.map(company => (
          <div key={company.id} className="company-card">
            <div className="company-header">
              <div className="company-info">
                <div className="company-logo">
                  {company.name.charAt(0)}
                </div>
                <div>
                  <h3>{company.name}</h3>
                  <p className="industry">{company.industry}</p>
                  <div className={`status-badge ${getStatusClass(company.status)}`}>
                    {company.status}
                  </div>
                </div>
              </div>
              <div className="company-actions">
                <button 
                  className="action-button edit-button"
                  onClick={() => handleEditCompany(company.id)}
                >
                  <Edit3 size={16} />
                </button>
                <button 
                  className="action-button view-button"
                  onClick={() => handleViewCompany(company.id)}
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
            
            <div className="company-details">
              <div className="contact-info">
                <div className="contact-item">
                  <User size={16} />
                  <span>{company.contactPerson}</span>
                </div>
                <div className="contact-item">
                  <Mail size={16} />
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </div>
                <div className="contact-item">
                  <Phone size={16} />
                  <a href={`tel:${company.phone}`}>{company.phone}</a>
                </div>
              </div>
              
              <div className="company-stats">
                <div className="stat">
                  <span className="label">Last Visit:</span>
                  <span className="value">{company.lastVisit}</span>
                </div>
                <div className="stat">
                  <span className="label">Students Placed:</span>
                  <span className="value">{company.studentsPlaced}</span>
                </div>
                <div className="stat">
                  <span className="label">Avg Package:</span>
                  <span className="value">{company.avgPackage}</span>
                </div>
              </div>
            </div>
            
            <div className="company-actions-footer">
              <button 
                className="secondary-button"
                onClick={() => handleContactCompany(company.id)}
              >
                <Mail size={16} />
                Contact
              </button>
              <button 
                className="primary-button"
                onClick={() => handleInviteCompany(company.id)}
              >
                <Calendar size={16} />
                Invite for Drive
              </button>
              <button 
                className="action-button"
                onClick={() => handleViewJobs(company.id)}
              >
                <Eye size={16} />
                View Jobs
              </button>
            </div>
          </div>
        ))}
        
        {filteredCompanies.length === 0 && (
          <div className="no-results">
            <p>No companies found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Add Company Modal */}
      {isAdding && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Company</h2>
              <button 
                className="close-button"
                onClick={() => setIsAdding(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Company Name *</label>
                <input type="text" placeholder="Enter company name" />
              </div>
              
              <div className="form-group">
                <label>Industry *</label>
                <select>
                  <option value="">Select industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Education">Education</option>
                </select>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Contact Person *</label>
                  <input type="text" placeholder="Enter contact person name" />
                </div>
                
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" placeholder="Enter email address" />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" placeholder="Enter phone number" />
                </div>
                
                <div className="form-group">
                  <label>Website</label>
                  <input type="url" placeholder="Enter website URL" />
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="cancel-button"
                  onClick={() => setIsAdding(false)}
                >
                  Cancel
                </button>
                <button className="submit-button">
                  Add Company
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement;