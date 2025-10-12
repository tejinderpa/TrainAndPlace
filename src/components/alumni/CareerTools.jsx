import React, { useState } from 'react';
import { Search, Filter, Briefcase, TrendingUp, Send, Download, Upload, FileText } from 'lucide-react';
import '../../App.css';

const CareerTools = () => {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [searchTerm, setSearchTerm] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('all');

  // Sample job opportunities from TPO
  const jobOpportunities = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Solutions",
      location: "Bangalore",
      type: "Placement",
      package: "18-25 LPA",
      postedDate: "2025-10-10",
      deadline: "2025-10-31",
      skills: ["JavaScript", "React", "Node.js"]
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "InnovateX",
      location: "Hyderabad",
      type: "Internship",
      stipend: "50,000/month",
      postedDate: "2025-10-05",
      deadline: "2025-10-25",
      skills: ["Python", "TensorFlow", "SQL"]
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "CreativeWorks",
      location: "Mumbai",
      type: "Placement",
      package: "12-18 LPA",
      postedDate: "2025-10-01",
      deadline: "2025-10-20",
      skills: ["Figma", "Adobe XD", "UI/UX"]
    }
  ];

  // Sample industry insights
  const industryInsights = [
    {
      id: 1,
      title: "The Future of Remote Work in Tech",
      author: "Rahul Sharma",
      views: 1250,
      likes: 87,
      date: "2025-10-12"
    },
    {
      id: 2,
      title: "Emerging Technologies to Watch in 2026",
      author: "Priya Patel",
      views: 980,
      likes: 64,
      date: "2025-10-08"
    }
  ];

  const filteredJobs = jobOpportunities.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = jobTypeFilter === 'all' || job.type.toLowerCase() === jobTypeFilter;
    
    return matchesSearch && matchesType;
  });

  const handleApply = (jobId) => {
    console.log("Applying for job:", jobId);
  };

  const handleDownload = (jobId) => {
    console.log("Downloading job details:", jobId);
  };

  const handlePublishArticle = (e) => {
    e.preventDefault();
    console.log("Publishing article");
  };

  return (
    <div className="career-tools">
      <div className="page-header">
        <h1>Career Tools</h1>
        <p>Access opportunities and share your expertise</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'opportunities' ? 'active' : ''}`}
          onClick={() => setActiveTab('opportunities')}
        >
          <Briefcase size={16} />
          Job Opportunities
        </button>
        <button 
          className={`tab ${activeTab === 'insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('insights')}
        >
          <TrendingUp size={16} />
          Industry Insights
        </button>
        <button 
          className={`tab ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          <FileText size={16} />
          Share Resources
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'opportunities' && (
          <div className="opportunities-tab">
            <h2>Job & Internship Opportunities</h2>
            
            {/* Controls */}
            <div className="opportunities-controls">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search jobs by title, company, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filters">
                <div className="filter-group">
                  <Filter size={20} />
                  <select 
                    value={jobTypeFilter} 
                    onChange={(e) => setJobTypeFilter(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="internship">Internships</option>
                    <option value="placement">Placements</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div className="jobs-list">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <div key={job.id} className="job-card">
                    <div className="job-header">
                      <div className="company-logo">
                        {job.company.charAt(0)}
                      </div>
                      <div className="job-info">
                        <h3>{job.title}</h3>
                        <p>{job.company} - {job.location}</p>
                      </div>
                      <div className="job-type-badge">
                        {job.type}
                      </div>
                    </div>
                    
                    <div className="job-details">
                      <div className="detail-item">
                        <span className="label">
                          {job.type === 'Placement' ? 'Package:' : 'Stipend:'}
                        </span>
                        <span className="value">
                          {job.type === 'Placement' ? job.package : job.stipend}
                        </span>
                      </div>
                      
                      <div className="detail-item">
                        <span className="label">Posted:</span>
                        <span className="value">{job.postedDate}</span>
                      </div>
                      
                      <div className="detail-item">
                        <span className="label">Deadline:</span>
                        <span className="value">{job.deadline}</span>
                      </div>
                      
                      <div className="skills-tags">
                        {job.skills.map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="job-actions">
                      <button 
                        className="primary-button"
                        onClick={() => handleApply(job.id)}
                      >
                        <Send size={16} />
                        Refer/Apply
                      </button>
                      <button 
                        className="secondary-button"
                        onClick={() => handleDownload(job.id)}
                      >
                        <Download size={16} />
                        Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>No job opportunities found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="insights-tab">
            <h2>Publish Industry Insights</h2>
            
            {/* Publish Form */}
            <div className="form-container">
              <form onSubmit={handlePublishArticle}>
                <div className="form-group">
                  <label>Article Title *</label>
                  <input 
                    type="text" 
                    placeholder="Enter a compelling title for your article" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Category</label>
                  <select>
                    <option value="career-advice">Career Advice</option>
                    <option value="industry-trends">Industry Trends</option>
                    <option value="technical">Technical Insights</option>
                    <option value="leadership">Leadership</option>
                    <option value="entrepreneurship">Entrepreneurship</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Summary</label>
                  <textarea 
                    rows="3" 
                    placeholder="Provide a brief summary of your article (150-200 words)"
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label>Content *</label>
                  <textarea 
                    rows="10" 
                    placeholder="Share your detailed insights, experiences, or industry observations..."
                    required
                  ></textarea>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Tags</label>
                    <input 
                      type="text" 
                      placeholder="Enter tags separated by commas" 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Featured Image</label>
                    <div className="file-upload">
                      <input type="file" accept="image/*" />
                      <div className="file-upload-placeholder">
                        <Upload size={24} />
                        <p>Upload image</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="primary-button">
                    <Send size={16} />
                    Publish Article
                  </button>
                </div>
              </form>
            </div>
            
            {/* Published Insights */}
            <div className="published-insights">
              <h3>Your Published Insights</h3>
              
              {industryInsights.length > 0 ? (
                <div className="insights-list">
                  {industryInsights.map(insight => (
                    <div key={insight.id} className="insight-card">
                      <div className="insight-header">
                        <h4>{insight.title}</h4>
                        <div className="insight-meta">
                          <span>By {insight.author}</span>
                          <span>{insight.date}</span>
                        </div>
                      </div>
                      
                      <div className="insight-stats">
                        <div className="stat-item">
                          <TrendingUp size={16} />
                          <span>{insight.views} views</span>
                        </div>
                        <div className="stat-item">
                          <Send size={16} />
                          <span>{insight.likes} likes</span>
                        </div>
                      </div>
                      
                      <div className="insight-actions">
                        <button className="secondary-button">
                          <Download size={16} />
                          View Analytics
                        </button>
                        <button className="secondary-button">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <p>You haven't published any insights yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="resources-tab">
            <h2>Share Resources with Students</h2>
            
            {/* Resource Sharing Form */}
            <div className="form-container">
              <div className="form-group">
                <label>Resource Title *</label>
                <input 
                  type="text" 
                  placeholder="Enter a descriptive title for your resource" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Resource Type</label>
                <select>
                  <option value="tutorial">Tutorial/Guide</option>
                  <option value="template">Template</option>
                  <option value="tool">Tool/Software</option>
                  <option value="book">Book/Article</option>
                  <option value="course">Online Course</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Description *</label>
                <textarea 
                  rows="4" 
                  placeholder="Describe what this resource is and how it can help students..."
                  required
                ></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Resource URL</label>
                  <input 
                    type="url" 
                    placeholder="Link to the resource (if applicable)" 
                  />
                </div>
                
                <div className="form-group">
                  <label>File Upload</label>
                  <div className="file-upload">
                    <input type="file" />
                    <div className="file-upload-placeholder">
                      <Upload size={24} />
                      <p>Upload file</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label>Target Audience</label>
                <div className="checkbox-group">
                  <label className="checkbox-item">
                    <input type="checkbox" /> Computer Science
                  </label>
                  <label className="checkbox-item">
                    <input type="checkbox" /> Electronics
                  </label>
                  <label className="checkbox-item">
                    <input type="checkbox" /> Mechanical
                  </label>
                  <label className="checkbox-item">
                    <input type="checkbox" /> Design
                  </label>
                </div>
              </div>
              
              <div className="form-actions">
                <button className="primary-button">
                  <Send size={16} />
                  Share Resource
                </button>
              </div>
            </div>
            
            {/* Webinar Hosting */}
            <div className="webinar-hosting">
              <h3>Host a Webinar</h3>
              
              <div className="form-container">
                <div className="form-group">
                  <label>Webinar Title *</label>
                  <input 
                    type="text" 
                    placeholder="Enter webinar title" 
                    required 
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Date *</label>
                    <input type="date" required />
                  </div>
                  
                  <div className="form-group">
                    <label>Time *</label>
                    <input type="time" required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Duration</label>
                  <select>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Description *</label>
                  <textarea 
                    rows="4" 
                    placeholder="Describe what you'll cover in the webinar..."
                    required
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label>Platform</label>
                  <select>
                    <option value="zoom">Zoom</option>
                    <option value="google-meet">Google Meet</option>
                    <option value="microsoft-teams">Microsoft Teams</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-actions">
                  <button className="primary-button">
                    <Send size={16} />
                    Schedule Webinar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerTools;