import React, { useState } from 'react';
import { Search, Filter, Download, Eye, FileText, Check, X } from 'lucide-react';
import '../../App.css';

const StudentDatabase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table'); // table or card
  const [filters, setFilters] = useState({
    college: 'all',
    branch: 'all',
    batch: 'all',
    minCgpa: 0,
    maxCgpa: 10,
    skills: ''
  });

  // Sample student data
  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      college: "NIT Trichy",
      branch: "Computer Science",
      batch: "2026",
      cgpa: 8.7,
      skills: ["JavaScript", "React", "Node.js", "Python"],
      resumeLink: "#",
      portfolioLinks: ["#"],
      resumeParsed: true,
      projectVerified: true,
      mockInterviewScore: 85
    },
    {
      id: 2,
      name: "Sarah Williams",
      college: "IIT Delhi",
      branch: "Electronics",
      batch: "2025",
      cgpa: 9.2,
      skills: ["Java", "Spring", "MySQL", "AWS"],
      resumeLink: "#",
      portfolioLinks: ["#", "#"],
      resumeParsed: true,
      projectVerified: false,
      mockInterviewScore: 92
    },
    {
      id: 3,
      name: "Michael Chen",
      college: "IIIT Hyderabad",
      branch: "Data Science",
      batch: "2026",
      cgpa: 8.9,
      skills: ["Python", "TensorFlow", "SQL", "Tableau"],
      resumeLink: "#",
      portfolioLinks: ["#"],
      resumeParsed: true,
      projectVerified: true,
      mockInterviewScore: 78
    },
    {
      id: 4,
      name: "Priya Sharma",
      college: "NID Ahmedabad",
      branch: "Design",
      batch: "2025",
      cgpa: 8.5,
      skills: ["Figma", "Adobe XD", "Illustrator", "Photoshop"],
      resumeLink: "#",
      portfolioLinks: ["#", "#", "#"],
      resumeParsed: false,
      projectVerified: true,
      mockInterviewScore: 88
    }
  ];

  const colleges = [...new Set(students.map(student => student.college))];
  const branches = [...new Set(students.map(student => student.branch))];
  const batches = [...new Set(students.map(student => student.batch))];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCollege = filters.college === 'all' || student.college === filters.college;
    const matchesBranch = filters.branch === 'all' || student.branch === filters.branch;
    const matchesBatch = filters.batch === 'all' || student.batch === filters.batch;
    const matchesCgpa = student.cgpa >= filters.minCgpa && student.cgpa <= filters.maxCgpa;
    
    return matchesSearch && matchesCollege && matchesBranch && matchesBatch && matchesCgpa;
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const exportResumes = () => {
    // In a real app, this would export selected resumes
    console.log("Exporting resumes");
  };

  return (
    <div className="student-database">
      <div className="page-header">
        <h1>Student Database</h1>
        <p>Browse and search through student profiles</p>
      </div>

      {/* Controls */}
      <div className="database-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by name or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="view-controls">
          <button 
            className={`view-button ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            Table View
          </button>
          <button 
            className={`view-button ${viewMode === 'card' ? 'active' : ''}`}
            onClick={() => setViewMode('card')}
          >
            Card View
          </button>
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={filters.college} 
              onChange={(e) => handleFilterChange('college', e.target.value)}
            >
              <option value="all">All Colleges</option>
              {colleges.map(college => (
                <option key={college} value={college}>{college}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <select 
              value={filters.branch} 
              onChange={(e) => handleFilterChange('branch', e.target.value)}
            >
              <option value="all">All Branches</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <select 
              value={filters.batch} 
              onChange={(e) => handleFilterChange('batch', e.target.value)}
            >
              <option value="all">All Batches</option>
              {batches.map(batch => (
                <option key={batch} value={batch}>{batch}</option>
              ))}
            </select>
          </div>
          
          <button className="export-button" onClick={exportResumes}>
            <Download size={20} />
            Export Resumes
          </button>
        </div>
      </div>

      {/* Student List */}
      {viewMode === 'table' ? (
        <div className="students-table-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>College</th>
                <th>Branch</th>
                <th>Batch</th>
                <th>CGPA</th>
                <th>Skills</th>
                <th>Resume</th>
                <th>Verified</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.college}</td>
                  <td>{student.branch}</td>
                  <td>{student.batch}</td>
                  <td>{student.cgpa}</td>
                  <td>
                    <div className="skills-cell">
                      {student.skills.slice(0, 3).join(', ')}
                      {student.skills.length > 3 && ` +${student.skills.length - 3}`}
                    </div>
                  </td>
                  <td>
                    <a href={student.resumeLink} className="resume-link">
                      <FileText size={16} />
                    </a>
                  </td>
                  <td>
                    {student.projectVerified ? (
                      <Check size={16} className="verified-icon" />
                    ) : (
                      <X size={16} className="not-verified-icon" />
                    )}
                  </td>
                  <td>{student.mockInterviewScore}%</td>
                  <td>
                    <button className="action-button view-button">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="students-grid">
          {filteredStudents.map(student => (
            <div key={student.id} className="student-card">
              <div className="student-header">
                <div className="student-avatar">
                  {student.name.charAt(0)}
                </div>
                <div className="student-info">
                  <h3>{student.name}</h3>
                  <p>{student.college}</p>
                  <p>{student.branch} - {student.batch}</p>
                </div>
              </div>
              
              <div className="student-details">
                <div className="detail-item">
                  <span className="label">CGPA:</span>
                  <span className="value">{student.cgpa}</span>
                </div>
                
                <div className="detail-item">
                  <span className="label">Skills:</span>
                  <div className="skills-tags">
                    {student.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                    {student.skills.length > 3 && (
                      <span className="skill-tag">+{student.skills.length - 3}</span>
                    )}
                  </div>
                </div>
                
                <div className="detail-item">
                  <span className="label">Interview Score:</span>
                  <span className="value">{student.mockInterviewScore}%</span>
                </div>
                
                <div className="detail-item">
                  <span className="label">Resume Parsed:</span>
                  <span className={`value ${student.resumeParsed ? 'success' : 'warning'}`}>
                    {student.resumeParsed ? 'Yes' : 'No'}
                  </span>
                </div>
                
                <div className="detail-item">
                  <span className="label">Projects Verified:</span>
                  <span className={`value ${student.projectVerified ? 'success' : 'warning'}`}>
                    {student.projectVerified ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
              
              <div className="student-actions">
                <a href={student.resumeLink} className="action-button">
                  <FileText size={16} />
                  Resume
                </a>
                <button className="action-button view-button">
                  <Eye size={16} />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredStudents.length === 0 && (
        <div className="no-results">
          <p>No students found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default StudentDatabase;