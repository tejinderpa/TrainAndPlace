import React, { useState } from 'react';
import { Download, FileText, Plus, Search, Filter, Upload } from 'lucide-react';
import '../../App.css';

const TpoForms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isUploading, setIsUploading] = useState(false);

  // Sample forms data
  const forms = [
    {
      id: 1,
      title: "Internship Application Form",
      category: "Internship",
      description: "Form for students to apply for summer/winter internships",
      fileSize: "150 KB",
      lastUpdated: "2025-10-01",
      downloads: 1250
    },
    {
      id: 2,
      title: "Placement Registration Form",
      category: "Placement",
      description: "Mandatory form for students registering for campus placements",
      fileSize: "220 KB",
      lastUpdated: "2025-09-15",
      downloads: 890
    },
    {
      id: 3,
      title: "Resume Template",
      category: "Resume",
      description: "Official resume template for placement purposes",
      fileSize: "85 KB",
      lastUpdated: "2025-08-20",
      downloads: 2100
    },
    {
      id: 4,
      title: "No Objection Certificate",
      category: "Certificates",
      description: "NOC form for students pursuing off-campus opportunities",
      fileSize: "95 KB",
      lastUpdated: "2025-07-10",
      downloads: 340
    },
    {
      id: 5,
      title: "Internship Completion Certificate",
      category: "Certificates",
      description: "Certificate to be filled by students after internship completion",
      fileSize: "110 KB",
      lastUpdated: "2025-06-05",
      downloads: 560
    },
    {
      id: 6,
      title: "Placement Policy Document",
      category: "Policy",
      description: "Official placement policy document for students and companies",
      fileSize: "450 KB",
      lastUpdated: "2025-05-20",
      downloads: 720
    }
  ];

  const categories = [...new Set(forms.map(form => form.category))];

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || form.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="tpo-forms">
      <div className="page-header">
        <h1>Downloadable Forms</h1>
        <p>Access and download all placement-related forms and documents</p>
      </div>

      {/* Controls */}
      <div className="reviews-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search forms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <button 
            className="add-review-button"
            onClick={() => setIsUploading(true)}
          >
            <Upload size={20} />
            Upload Form
          </button>
        </div>
      </div>

      {/* Forms List */}
      <div className="forms-grid">
        {filteredForms.map(form => (
          <div key={form.id} className="form-card">
            <div className="form-header">
              <div className="form-icon">
                <FileText size={32} />
              </div>
              <div className="form-info">
                <h3>{form.title}</h3>
                <p className="category">{form.category}</p>
              </div>
            </div>
            
            <div className="form-details">
              <p className="description">{form.description}</p>
              
              <div className="form-meta">
                <div className="meta-item">
                  <span className="file-size">{form.fileSize}</span>
                </div>
                <div className="meta-item">
                  <span className="last-updated">Updated: {form.lastUpdated}</span>
                </div>
                <div className="meta-item">
                  <span className="downloads">Downloads: {form.downloads}</span>
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button className="download-button">
                <Download size={16} />
                Download
              </button>
              <button className="preview-button">
                Preview
              </button>
            </div>
          </div>
        ))}
        
        {filteredForms.length === 0 && (
          <div className="no-reviews">
            <p>No forms found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Upload Form Modal */}
      {isUploading && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Upload New Form</h2>
              <button 
                className="close-button"
                onClick={() => setIsUploading(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Form Title</label>
                <input type="text" placeholder="Enter form title" />
              </div>
              
              <div className="form-group">
                <label>Category</label>
                <select>
                  <option value="">Select category</option>
                  <option value="Internship">Internship</option>
                  <option value="Placement">Placement</option>
                  <option value="Resume">Resume</option>
                  <option value="Certificates">Certificates</option>
                  <option value="Policy">Policy</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  rows="3" 
                  placeholder="Enter form description"
                ></textarea>
              </div>
              
              <div className="form-group">
                <label>Upload File</label>
                <div className="file-upload">
                  <input type="file" />
                  <div className="file-upload-placeholder">
                    <Upload size={24} />
                    <p>Drag and drop file here or click to browse</p>
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="cancel-button"
                  onClick={() => setIsUploading(false)}
                >
                  Cancel
                </button>
                <button className="submit-button">
                  Upload Form
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TpoForms;