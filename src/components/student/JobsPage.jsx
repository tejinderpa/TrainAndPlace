import React, { useState } from 'react';
import { Search, Bookmark, MapPin, DollarSign, Calendar, Filter } from 'lucide-react';
import '../../App.css';

const JobsPage = () => {
  const [activeTab, setActiveTab] = useState('internships');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedJobs, setSavedJobs] = useState(new Set([1, 3])); // Pre-saved jobs for demo

  // Sample job data
  const jobs = [
    {
      id: 1,
      company: "Microsoft",
      logo: "MSFT",
      role: "Software Engineering Intern",
      package: "₹40,000 - ₹50,000/month",
      location: "Hyderabad, India",
      type: "Internship",
      posted: "2 days ago",
      deadline: "2025-10-30",
      skills: ["JavaScript", "React", "Node.js"],
      description: "Join our team to work on cutting-edge web applications using modern technologies.",
      eligibility: "Currently pursuing B.Tech/M.Tech in CS/IT or related field"
    },
    {
      id: 2,
      company: "Google",
      logo: "GOOGL",
      role: "Product Manager",
      package: "₹25 LPA - ₹35 LPA",
      location: "Bangalore, India",
      type: "Full-time",
      posted: "1 week ago",
      deadline: "2025-11-15",
      skills: ["Product Management", "Analytics", "Leadership"],
      description: "Lead product development for our next-generation AI platform.",
      eligibility: "MBA or equivalent experience in product management"
    },
    {
      id: 3,
      company: "Amazon",
      logo: "AMZN",
      role: "Data Scientist",
      package: "₹20 LPA - ₹30 LPA",
      location: "Chennai, India",
      type: "Full-time",
      posted: "3 days ago",
      deadline: "2025-11-05",
      skills: ["Python", "Machine Learning", "SQL"],
      description: "Work on large-scale data analysis and machine learning models.",
      eligibility: "M.Tech/PhD in CS/Data Science or related field"
    },
    {
      id: 4,
      company: "Meta",
      logo: "META",
      role: "Frontend Developer Intern",
      package: "₹35,000 - ₹45,000/month",
      location: "Remote",
      type: "Internship",
      posted: "5 days ago",
      deadline: "2025-10-25",
      skills: ["React", "JavaScript", "CSS"],
      description: "Develop user interfaces for our social media platforms.",
      eligibility: "Currently pursuing B.Tech in CS/IT or related field"
    }
  ];

  const toggleSaveJob = (jobId) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const filteredJobs = jobs.filter(job => 
    job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="jobs-page">
      <div className="page-header">
        <h1>Companies & Jobs</h1>
        <p>Find the perfect opportunity for your career</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'internships' ? 'active' : ''}`}
          onClick={() => setActiveTab('internships')}
        >
          Internships
        </button>
        <button 
          className={`tab ${activeTab === 'placements' ? 'active' : ''}`}
          onClick={() => setActiveTab('placements')}
        >
          Placements
        </button>
      </div>

      {/* Search and Filters */}
      <div className="jobs-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by role, company, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="filter-button">
          <Filter size={20} />
          Filters
        </button>
      </div>

      {/* Job Listings */}
      <div className="jobs-list">
        {filteredJobs
          .filter(job => activeTab === 'internships' ? job.type === 'Internship' : job.type === 'Full-time')
          .map(job => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <div className="company-info">
                  <div className="company-logo">
                    {job.logo}
                  </div>
                  <div>
                    <h3>{job.role}</h3>
                    <p>{job.company}</p>
                  </div>
                </div>
                <button 
                  className={`save-button ${savedJobs.has(job.id) ? 'saved' : ''}`}
                  onClick={() => toggleSaveJob(job.id)}
                >
                  <Bookmark size={20} />
                </button>
              </div>
              
              <div className="job-details">
                <div className="job-meta">
                  <div className="meta-item">
                    <DollarSign size={16} />
                    <span>{job.package}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>Deadline: {job.deadline}</span>
                  </div>
                </div>
                
                <div className="job-skills">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <p className="job-description">
                  {job.description}
                </p>
                
                <p className="job-eligibility">
                  <strong>Eligibility:</strong> {job.eligibility}
                </p>
              </div>
              
              <div className="job-actions">
                <button className="apply-button">
                  Apply Now
                </button>
                <span className="posted-time">
                  Posted {job.posted}
                </span>
              </div>
            </div>
          ))
        }
        
        {filteredJobs.filter(job => activeTab === 'internships' ? job.type === 'Internship' : job.type === 'Full-time').length === 0 && (
          <div className="no-jobs">
            <p>No jobs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;