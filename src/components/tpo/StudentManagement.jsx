import React, { useState } from 'react';
import { Search, Filter, Upload, Plus, Edit3, Eye, Download, Check, X } from 'lucide-react';
import '../../App.css';

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [batchFilter, setBatchFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Sample student data
  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      rollNumber: "CS2026001",
      branch: "Computer Science",
      batch: "2026",
      email: "alex.johnson@student.edu",
      phone: "+91 98765 43210",
      cgpa: 8.7,
      placementStatus: "Placed",
      company: "Microsoft",
      verified: true
    },
    {
      id: 2,
      name: "Sarah Williams",
      rollNumber: "EC2025002",
      branch: "Electronics",
      batch: "2025",
      email: "sarah.williams@student.edu",
      phone: "+91 87654 32109",
      cgpa: 9.2,
      placementStatus: "Interview",
      company: "Google",
      verified: true
    },
    {
      id: 3,
      name: "Michael Chen",
      rollNumber: "DS2026003",
      branch: "Data Science",
      batch: "2026",
      email: "michael.chen@student.edu",
      phone: "+91 76543 21098",
      cgpa: 8.9,
      placementStatus: "Applied",
      company: "Amazon",
      verified: false
    },
    {
      id: 4,
      name: "Priya Sharma",
      rollNumber: "DE2025004",
      branch: "Design",
      batch: "2025",
      email: "priya.sharma@student.edu",
      phone: "+91 65432 10987",
      cgpa: 8.5,
      placementStatus: "Not Applied",
      company: null,
      verified: true
    }
  ];

  const branches = [...new Set(students.map(student => student.branch))];
  const batches = [...new Set(students.map(student => student.batch))];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBranch = branchFilter === 'all' || student.branch === branchFilter;
    const matchesBatch = batchFilter === 'all' || student.batch === batchFilter;
    const matchesVerification = verificationFilter === 'all' || 
      (verificationFilter === 'verified' && student.verified) || 
      (verificationFilter === 'unverified' && !student.verified);
    
    return matchesSearch && matchesBranch && matchesBatch && matchesVerification;
  });

  const handleBulkUpload = () => {
    setIsUploading(true);
  };

  const handleAddStudent = () => {
    setIsAdding(true);
  };

  const handleEditStudent = (studentId) => {
    console.log("Editing student:", studentId);
  };

  const handleViewStudent = (studentId) => {
    console.log("Viewing student:", studentId);
  };

  const handleExportData = () => {
    console.log("Exporting student data");
  };

  const handleVerifyStudent = (studentId) => {
    console.log("Verifying student:", studentId);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'placed': return 'status-placed';
      case 'interview': return 'status-interview';
      case 'applied': return 'status-applied';
      case 'not applied': return 'status-not-applied';
      default: return '';
    }
  };

  return (
    <div className="student-management">
      <div className="page-header">
        <h1>Student Management</h1>
        <p>Manage student database and placement status</p>
      </div>

      {/* Controls */}
      <div className="management-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by name, roll number, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={branchFilter} 
              onChange={(e) => setBranchFilter(e.target.value)}
            >
              <option value="all">All Branches</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
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
              value={verificationFilter} 
              onChange={(e) => setVerificationFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </select>
          </div>
        </div>
        
        <div className="actions">
          <button 
            className="primary-button"
            onClick={handleBulkUpload}
          >
            <Upload size={16} />
            Bulk Upload
          </button>
          <button 
            className="secondary-button"
            onClick={handleAddStudent}
          >
            <Plus size={16} />
            Add Student
          </button>
          <button 
            className="export-button"
            onClick={handleExportData}
          >
            <Download size={16} />
            Export Data
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="students-table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Branch</th>
              <th>Batch</th>
              <th>CGPA</th>
              <th>Placement Status</th>
              <th>Company</th>
              <th>Verified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.rollNumber}</td>
                <td>{student.branch}</td>
                <td>{student.batch}</td>
                <td>{student.cgpa}</td>
                <td>
                  <div className={`status-badge ${getStatusClass(student.placementStatus)}`}>
                    {student.placementStatus}
                  </div>
                </td>
                <td>{student.company || "-"}</td>
                <td>
                  {student.verified ? (
                    <Check size={16} className="verified-icon" />
                  ) : (
                    <X size={16} className="not-verified-icon" />
                  )}
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-button view-button"
                      onClick={() => handleViewStudent(student.id)}
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="action-button edit-button"
                      onClick={() => handleEditStudent(student.id)}
                    >
                      <Edit3 size={16} />
                    </button>
                    {!student.verified && (
                      <button 
                        className="action-button verify-button"
                        onClick={() => handleVerifyStudent(student.id)}
                      >
                        <Check size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredStudents.length === 0 && (
        <div className="no-results">
          <p>No students found matching your criteria.</p>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {isUploading && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Bulk Upload Students</h2>
              <button 
                className="close-button"
                onClick={() => setIsUploading(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Upload CSV/Excel File</label>
                <div className="file-upload">
                  <input type="file" accept=".csv,.xlsx,.xls" />
                  <div className="file-upload-placeholder">
                    <Upload size={24} />
                    <p>Drag and drop file here or click to browse</p>
                  </div>
                </div>
                <p className="help-text">
                  Download template: <a href="#">Student_Template.csv</a>
                </p>
              </div>
              
              <div className="form-group">
                <label>Instructions</label>
                <ul className="instructions-list">
                  <li>CSV file should contain columns: Name, Roll Number, Branch, Batch, Email, Phone, CGPA</li>
                  <li>First row should be headers</li>
                  <li>Maximum file size: 10MB</li>
                  <li>Supported formats: CSV, XLSX, XLS</li>
                </ul>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="cancel-button"
                  onClick={() => setIsUploading(false)}
                >
                  Cancel
                </button>
                <button className="submit-button">
                  Upload Students
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isAdding && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Student</h2>
              <button 
                className="close-button"
                onClick={() => setIsAdding(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input type="text" placeholder="Enter student name" />
                </div>
                
                <div className="form-group">
                  <label>Roll Number *</label>
                  <input type="text" placeholder="Enter roll number" />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Branch *</label>
                  <select>
                    <option value="">Select branch</option>
                    {branches.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Batch *</label>
                  <select>
                    <option value="">Select batch</option>
                    {batches.map(batch => (
                      <option key={batch} value={batch}>{batch}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" placeholder="Enter email address" />
                </div>
                
                <div className="form-group">
                  <label>Phone *</label>
                  <input type="tel" placeholder="Enter phone number" />
                </div>
              </div>
              
              <div className="form-group">
                <label>CGPA</label>
                <input type="number" step="0.01" min="0" max="10" placeholder="Enter CGPA" />
              </div>
              
              <div className="modal-actions">
                <button 
                  className="cancel-button"
                  onClick={() => setIsAdding(false)}
                >
                  Cancel
                </button>
                <button className="submit-button">
                  Add Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;