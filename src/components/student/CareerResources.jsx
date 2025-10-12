import React, { useState } from 'react';
import { FileText, Download, Play, BookOpen, Filter, Search } from 'lucide-react';
import '../../App.css';

const CareerResources = () => {
  const [activeTab, setActiveTab] = useState('resume');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample resume templates
  const resumeTemplates = [
    {
      id: 1,
      name: "Professional Template",
      category: "Professional",
      downloads: 1250,
      preview: "professional"
    },
    {
      id: 2,
      name: "Creative Template",
      category: "Creative",
      downloads: 980,
      preview: "creative"
    },
    {
      id: 3,
      name: "Minimalist Template",
      category: "Minimalist",
      downloads: 1100,
      preview: "minimalist"
    },
    {
      id: 4,
      name: "Engineering Template",
      category: "Technical",
      downloads: 1450,
      preview: "engineering"
    }
  ];

  // Sample interview preparation resources
  const interviewResources = [
    {
      id: 1,
      title: "Common Technical Interview Questions",
      category: "Technical",
      difficulty: "Intermediate",
      views: 2500,
      duration: "15 min read"
    },
    {
      id: 2,
      title: "Behavioral Interview Tips",
      category: "Behavioral",
      difficulty: "Beginner",
      views: 1800,
      duration: "10 min read"
    },
    {
      id: 3,
      title: "System Design Interview Guide",
      category: "Technical",
      difficulty: "Advanced",
      views: 3200,
      duration: "25 min read"
    },
    {
      id: 4,
      title: "Salary Negotiation Strategies",
      category: "Career",
      difficulty: "Intermediate",
      views: 1500,
      duration: "12 min read"
    }
  ];

  // Sample video resources
  const videoResources = [
    {
      id: 1,
      title: "How to Ace Your First Interview",
      duration: "12:35",
      views: 5400,
      thumbnail: "interview"
    },
    {
      id: 2,
      title: "Resume Writing Masterclass",
      duration: "18:42",
      views: 4200,
      thumbnail: "resume"
    },
    {
      id: 3,
      title: "Networking for College Students",
      duration: "15:20",
      views: 3800,
      thumbnail: "networking"
    }
  ];

  // Filter data based on search term
  const filteredTemplates = resumeTemplates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInterviewResources = interviewResources.filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVideos = videoResources.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="career-resources">
      <div className="page-header">
        <h1>Career Resources</h1>
        <p>Tools and resources to help you succeed in your career journey</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'resume' ? 'active' : ''}`}
          onClick={() => setActiveTab('resume')}
        >
          Resume Builder
        </button>
        <button 
          className={`tab ${activeTab === 'interview' ? 'active' : ''}`}
          onClick={() => setActiveTab('interview')}
        >
          Interview Prep
        </button>
        <button 
          className={`tab ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          Video Resources
        </button>
      </div>

      {/* Search and Filters */}
      <div className="resources-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search career resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="filter-button">
          <Filter size={20} />
          Filters
        </button>
      </div>

      {/* Content based on active tab */}
      <div className="resources-content">
        {/* Resume Builder Tab */}
        {activeTab === 'resume' && (
          <div className="resume-section">
            <div className="resume-builder">
              <h2>Resume Builder</h2>
              <p>Create a professional resume with our step-by-step guide</p>
              
              <div className="builder-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Personal Information</h3>
                    <p>Add your name, contact details, and professional summary</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Education</h3>
                    <p>List your academic qualifications and achievements</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Experience</h3>
                    <p>Detail your internships, projects, and work experience</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h3>Skills</h3>
                    <p>Showcase your technical and soft skills</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">5</div>
                  <div className="step-content">
                    <h3>Preview & Download</h3>
                    <p>Review your resume and download in PDF format</p>
                  </div>
                </div>
              </div>
              
              <button className="start-builder-button">
                Start Building Your Resume
              </button>
            </div>
            
            <div className="templates-section">
              <h2>Resume Templates</h2>
              <p>Choose from our professionally designed templates</p>
              
              <div className="templates-grid">
                {filteredTemplates.map(template => (
                  <div key={template.id} className="template-card">
                    <div className="template-preview">
                      <div className="preview-placeholder">
                        {template.preview}
                      </div>
                    </div>
                    <div className="template-info">
                      <h3>{template.name}</h3>
                      <p className="category">{template.category}</p>
                      <div className="template-meta">
                        <span className="downloads">
                          <Download size={16} />
                          {template.downloads}
                        </span>
                      </div>
                      <button className="download-button">
                        <Download size={16} />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Interview Preparation Tab */}
        {activeTab === 'interview' && (
          <div className="interview-section">
            <div className="mock-interview">
              <h2>Mock Interview Scheduler</h2>
              <p>Practice with industry experts through mock interviews</p>
              
              <div className="scheduler">
                <div className="scheduler-form">
                  <div className="form-group">
                    <label>Preferred Domain</label>
                    <select>
                      <option>Software Engineering</option>
                      <option>Data Science</option>
                      <option>Product Management</option>
                      <option>Finance</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Experience Level</label>
                    <select>
                      <option>Internship</option>
                      <option>Entry Level</option>
                      <option>Mid Level</option>
                      <option>Senior Level</option>
                    </select>
                  </div>
                  <button className="schedule-button">
                    Schedule Mock Interview
                  </button>
                </div>
              </div>
            </div>
            
            <div className="interview-resources">
              <h2>Interview Preparation Resources</h2>
              
              <div className="resources-list">
                {filteredInterviewResources.map(resource => (
                  <div key={resource.id} className="resource-card">
                    <div className="resource-icon">
                      <FileText size={24} />
                    </div>
                    <div className="resource-info">
                      <h3>{resource.title}</h3>
                      <div className="resource-meta">
                        <span className="category">{resource.category}</span>
                        <span className="difficulty">{resource.difficulty}</span>
                        <span className="duration">{resource.duration}</span>
                      </div>
                      <p className="views">{resource.views} views</p>
                    </div>
                    <button className="read-button">
                      <Play size={16} />
                      Read
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Video Resources Tab */}
        {activeTab === 'videos' && (
          <div className="videos-section">
            <h2>Video Resources Library</h2>
            <p>Watch expert-led videos to enhance your career skills</p>
            
            <div className="videos-grid">
              {filteredVideos.map(video => (
                <div key={video.id} className="video-card">
                  <div className="video-thumbnail">
                    <div className="thumbnail-placeholder">
                      {video.thumbnail}
                    </div>
                    <div className="video-duration">
                      {video.duration}
                    </div>
                  </div>
                  <div className="video-info">
                    <h3>{video.title}</h3>
                    <p className="views">{video.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerResources;