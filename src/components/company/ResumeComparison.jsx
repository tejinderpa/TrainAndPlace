import React, { useState } from 'react';
import { FileText, Download, Check, X, BarChart3 } from 'lucide-react';
import '../../App.css';

const ResumeComparison = () => {
  const [selectedResumes, setSelectedResumes] = useState([]);
  const [comparisonMode, setComparisonMode] = useState(false);

  // Sample resume data
  const resumes = [
    {
      id: 1,
      studentName: "Alex Johnson",
      college: "NIT Trichy",
      branch: "Computer Science",
      cgpa: 8.7,
      skills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
      experience: "Intern at TechCorp (3 months)",
      projects: 5,
      certifications: 3
    },
    {
      id: 2,
      studentName: "Sarah Williams",
      college: "IIT Delhi",
      branch: "Electronics",
      cgpa: 9.2,
      skills: ["Java", "Spring", "MySQL", "AWS", "Docker"],
      experience: "Intern at InnovateX (6 months)",
      projects: 4,
      certifications: 5
    },
    {
      id: 3,
      studentName: "Michael Chen",
      college: "IIIT Hyderabad",
      branch: "Data Science",
      cgpa: 8.9,
      skills: ["Python", "TensorFlow", "SQL", "Tableau", "Spark"],
      experience: "Research Assistant (1 year)",
      projects: 6,
      certifications: 4
    },
    {
      id: 4,
      studentName: "Priya Sharma",
      college: "NID Ahmedabad",
      branch: "Design",
      cgpa: 8.5,
      skills: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "UI/UX"],
      experience: "Design Intern at CreativeWorks (4 months)",
      projects: 7,
      certifications: 2
    }
  ];

  const handleSelectResume = (id) => {
    if (selectedResumes.includes(id)) {
      setSelectedResumes(selectedResumes.filter(resumeId => resumeId !== id));
    } else if (selectedResumes.length < 5) {
      setSelectedResumes([...selectedResumes, id]);
    }
  };

  const handleCompare = () => {
    if (selectedResumes.length >= 2) {
      setComparisonMode(true);
    }
  };

  const handleDownloadReport = () => {
    console.log("Downloading comparison report");
  };

  // Get selected resume data
  const selectedResumeData = resumes.filter(resume => selectedResumes.includes(resume.id));

  return (
    <div className="resume-comparison">
      <div className="page-header">
        <h1>Resume Comparison Tool</h1>
        <p>Compare multiple resumes side-by-side</p>
      </div>

      {!comparisonMode ? (
        <>
          {/* Selection Instructions */}
          <div className="selection-instructions">
            <p>Select 2-5 resumes to compare (currently {selectedResumes.length} selected)</p>
            <button 
              className="primary-button" 
              onClick={handleCompare}
              disabled={selectedResumes.length < 2}
            >
              <BarChart3 size={16} />
              Compare Selected Resumes
            </button>
          </div>

          {/* Resumes List */}
          <div className="resumes-grid">
            {resumes.map(resume => (
              <div 
                key={resume.id} 
                className={`resume-card ${selectedResumes.includes(resume.id) ? 'selected' : ''}`}
                onClick={() => handleSelectResume(resume.id)}
              >
                <div className="resume-header">
                  <div className="resume-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedResumes.includes(resume.id)}
                      onChange={() => handleSelectResume(resume.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="student-avatar">
                    {resume.studentName.charAt(0)}
                  </div>
                  <div className="resume-info">
                    <h3>{resume.studentName}</h3>
                    <p>{resume.college}</p>
                    <p>{resume.branch} - CGPA: {resume.cgpa}</p>
                  </div>
                </div>
                
                <div className="resume-details">
                  <div className="detail-item">
                    <FileText size={16} />
                    <span>{resume.skills.length} Skills</span>
                  </div>
                  <div className="detail-item">
                    <BarChart3 size={16} />
                    <span>{resume.projects} Projects</span>
                  </div>
                  <div className="detail-item">
                    <Check size={16} />
                    <span>{resume.certifications} Certifications</span>
                  </div>
                </div>
                
                <div className="resume-actions">
                  <button className="secondary-button">
                    <FileText size={16} />
                    View Resume
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        // Comparison View
        <div className="comparison-view">
          <div className="comparison-header">
            <h2>Resume Comparison</h2>
            <div className="comparison-actions">
              <button className="secondary-button" onClick={() => setComparisonMode(false)}>
                Back to Selection
              </button>
              <button className="primary-button" onClick={handleDownloadReport}>
                <Download size={16} />
                Download Report
              </button>
            </div>
          </div>

          <div className="comparison-table-container">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Criteria</th>
                  {selectedResumeData.map(resume => (
                    <th key={resume.id}>
                      <div className="student-header">
                        <div className="student-avatar-small">
                          {resume.studentName.charAt(0)}
                        </div>
                        <div>
                          <div className="student-name">{resume.studentName}</div>
                          <div className="student-college">{resume.college}</div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CGPA</td>
                  {selectedResumeData.map(resume => (
                    <td key={resume.id} className="numeric-cell">{resume.cgpa}</td>
                  ))}
                </tr>
                <tr>
                  <td>Skills</td>
                  {selectedResumeData.map(resume => (
                    <td key={resume.id}>
                      <div className="skills-list">
                        {resume.skills.slice(0, 3).join(', ')}
                        {resume.skills.length > 3 && ` +${resume.skills.length - 3}`}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td>Experience</td>
                  {selectedResumeData.map(resume => (
                    <td key={resume.id}>{resume.experience}</td>
                  ))}
                </tr>
                <tr>
                  <td>Projects</td>
                  {selectedResumeData.map(resume => (
                    <td key={resume.id} className="numeric-cell">{resume.projects}</td>
                  ))}
                </tr>
                <tr>
                  <td>Certifications</td>
                  {selectedResumeData.map(resume => (
                    <td key={resume.id} className="numeric-cell">{resume.certifications}</td>
                  ))}
                </tr>
                <tr>
                  <td>Best Match</td>
                  {selectedResumeData.map((resume, index) => (
                    <td key={resume.id} className="best-match-cell">
                      {index === 0 && <Check size={16} className="best-match-icon" />}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Skill Comparison Chart */}
          <div className="skill-comparison-chart">
            <h3>Skill Comparison</h3>
            <div className="chart-container">
              {/* This would be a more complex chart in a real implementation */}
              <div className="skills-chart-placeholder">
                <BarChart3 size={48} />
                <p>Visual skill comparison chart would appear here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeComparison;