import React, { useState } from 'react';
import { Search, Filter, Plus, Edit3, Eye, Mail, Phone } from 'lucide-react';
import '../../App.css';

const TpoCompanies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [isAdding, setIsAdding] = useState(false);

  // Sample companies data
  const companies = [
    {
      id: 1,
      name: "Microsoft",
      logo: "MSFT",
      industry: "Technology",
      contactPerson: "John Smith",
      email: "john.smith@microsoft.com",
      phone: "+1 (555) 123-4567",
      website: "https://microsoft.com",
      lastVisit: "2025-09-15",
      studentsPlaced: 24,
      avgPackage: "18 LPA"
    },
    {
      id: 2,
      name: "Google",
      logo: "GOOGL",
      industry: "Technology",
      contactPerson: "Sarah Johnson",
      email: "sarah.johnson@google.com",
      phone: "+1 (555) 234-5678",
      website: "https://google.com",
      lastVisit: "2025-08-20",
      studentsPlaced: 18,
      avgPackage: "22 LPA"
    },
    {
      id: 3,
      name: "Amazon",
      logo: "AMZN",
      industry: "E-commerce",
      contactPerson: "Michael Brown",
      email: "michael.brown@amazon.com",
      phone: "+1 (555) 345-6789",
      website: "https://amazon.com",
      lastVisit: "2025-07-10",
      studentsPlaced: 32,
      avgPackage: "15 LPA"
    },
    {
      id: 4,
      name: "Meta",
      logo: "META",
      industry: "Technology",
      contactPerson: "Emily Davis",
      email: "emily.davis@meta.com",
      phone: "+1 (555) 456-7890",
      website: "https://meta.com",
      lastVisit: "2025-06-05",
      studentsPlaced: 15,
      avgPackage: "25 LPA"
    }
  ];

  const industries = [...new Set(companies.map(company => company.industry))];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = industryFilter === 'all' || company.industry === industryFilter;
    
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="tpo-companies">
      <div className="page-header">
        <h1>Companies</h1>
        <p>Manage and view company details for placement drives</p>
      </div>

      {/* Controls */}
      <div className="reviews-controls">
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
          
          <button 
            className="add-review-button"
            onClick={() => setIsAdding(true)}
          >
            <Plus size={20} />
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
                  {company.logo}
                </div>
                <div>
                  <h3>{company.name}</h3>
                  <p className="industry">{company.industry}</p>
                </div>
              </div>
              <div className="company-actions">
                <button className="edit-button">
                  <Edit3 size={16} />
                </button>
                <button className="view-button">
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
                  <span>{company.email}</span>
                </div>
                <div className="contact-item">
                  <Phone size={16} />
                  <span>{company.phone}</span>
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
              <button className="primary-button">
                Schedule Visit
              </button>
              <button className="secondary-button">
                View Details
              </button>
            </div>
          </div>
        ))}
        
        {filteredCompanies.length === 0 && (
          <div className="no-reviews">
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
                <label>Company Name</label>
                <input type="text" placeholder="Enter company name" />
              </div>
              
              <div className="form-group">
                <label>Industry</label>
                <select>
                  <option value="">Select industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Manufacturing">Manufacturing</option>
                </select>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Contact Person</label>
                  <input type="text" placeholder="Enter contact person name" />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
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

export default TpoCompanies;