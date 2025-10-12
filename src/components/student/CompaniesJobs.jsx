import React, { useState } from 'react';
import { Search, Filter, Building2, MapPin, IndianRupee, Calendar, Clock } from 'lucide-react';
import '../../App.css';

const CompaniesJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');

  // Mock data for jobs
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Google",
      location: "Bangalore, India",
      salary: "15-25 LPA",
      experience: "0-2 years",
      posted: "2 days ago",
      deadline: "2025-10-25",
      type: "Full-time",
      industry: "Technology",
      description: "We are looking for a Software Engineer to join our team. You will be responsible for developing and maintaining web applications.",
      skills: ["JavaScript", "React", "Node.js", "Python"]
    },
    {
      id: 2,
      title: "Data Analyst",
      company: "Microsoft",
      location: "Hyderabad, India",
      salary: "12-18 LPA",
      experience: "1-3 years",
      posted: "1 week ago",
      deadline: "2025-10-30",
      type: "Full-time",
      industry: "Technology",
      description: "Seeking a Data Analyst to interpret data and provide actionable insights to improve business performance.",
      skills: ["SQL", "Python", "Tableau", "Excel"]
    },
    {
      id: 3,
      title: "Product Manager",
      company: "Amazon",
      location: "Mumbai, India",
      salary: "20-30 LPA",
      experience: "3-5 years",
      posted: "3 days ago",
      deadline: "2025-10-28",
      type: "Full-time",
      industry: "E-commerce",
      description: "We are looking for an experienced Product Manager to lead our product development initiatives.",
      skills: ["Product Strategy", "Agile", "Market Research", "Leadership"]
    },
    {
      id: 4,
      title: "UX Designer",
      company: "Adobe",
      location: "Noida, India",
      salary: "10-16 LPA",
      experience: "2-4 years",
      posted: "5 days ago",
      deadline: "2025-11-01",
      type: "Full-time",
      industry: "Design",
      description: "Join our design team to create intuitive and engaging user experiences for our products.",
      skills: ["Figma", "Sketch", "User Research", "Prototyping"]
    }
  ];

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesIndustry = filterIndustry === 'All' || job.industry === filterIndustry;
    const matchesLocation = filterLocation === 'All' || job.location.includes(filterLocation);
    
    return matchesSearch && matchesIndustry && matchesLocation;
  });

  // Get unique industries and locations for filters
  const industries = ['All', ...new Set(jobs.map(job => job.industry))];
  const locations = ['All', ...new Set(jobs.map(job => {
    const parts = job.location.split(',');
    return parts[parts.length - 2] ? parts[parts.length - 2].trim() : job.location;
  }))];

  return (
    <div className="companies-jobs">
      <div className="page-header">
        <h1>Job Opportunities</h1>
        <p>Browse and apply to job openings from top companies</p>
      </div>

      {/* Search and Filters */}
      <div className="jobs-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search jobs, companies, skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={filterIndustry} 
              onChange={(e) => setFilterIndustry(e.target.value)}
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <MapPin size={20} />
            <select 
              value={filterLocation} 
              onChange={(e) => setFilterLocation(e.target.value)}
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="jobs-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <div className="company-info">
                  <div className="company-logo">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3>{job.title}</h3>
                    <p>{job.company} • {job.location}</p>
                  </div>
                </div>
                <div className="job-meta">
                  <span className="salary"><IndianRupee size={16} />{job.salary}</span>
                  <span className="posted">{job.posted}</span>
                </div>
              </div>
              
              <div className="job-details">
                <div className="job-tags">
                  <span className="tag">{job.type}</span>
                  <span className="tag">{job.experience} exp</span>
                  <span className="tag deadline">Apply by: {job.deadline}</span>
                </div>
                
                <p className="job-description">{job.description}</p>
                
                <div className="job-skills">
                  <h4>Required Skills:</h4>
                  <div className="skills-list">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="job-actions">
                <button className="primary-button">Apply Now</button>
                <button className="secondary-button">Save Job</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-jobs">
            <p>No jobs found matching your criteria. Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompaniesJobs;