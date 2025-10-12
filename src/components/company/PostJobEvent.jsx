import React, { useState } from 'react';
import { Save, Eye, Send, FileText } from 'lucide-react';
import '../../App.css';

const PostJobEvent = () => {
  const [jobData, setJobData] = useState({
    type: 'Internship',
    title: '',
    description: '',
    industry: 'Information Technology',
    website: '',
    headquarters: '',
    eligibility: {
      branches: [],
      minCgpa: 0,
      batch: '2026',
      skills: []
    },
    package: '',
    stipend: '',
    location: '',
    duration: '',
    deadline: '',
    openings: '',
    restrictions: 'Open to all',
    colleges: []
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEligibilityChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({
      ...prev,
      eligibility: {
        ...prev.eligibility,
        [name]: value
      }
    }));
  };

  const handleSaveDraft = () => {
    console.log("Saving as draft:", jobData);
  };

  const handlePreview = () => {
    setPreviewMode(!previewMode);
  };

  const handlePost = () => {
    console.log("Posting job/event:", jobData);
  };

  // Sample data for form options
  const branches = [
    "Computer Science", "Electronics", "Mechanical", "Civil", 
    "Electrical", "Chemical", "Biotechnology", "Data Science"
  ];
  
  const batches = ["2024", "2025", "2026", "2027"];
  const colleges = ["NIT Trichy", "IIT Delhi", "IIIT Hyderabad", "NID Ahmedabad"];

  return (
    <div className="post-job-event">
      <div className="page-header">
        <h1>Post Job/Event</h1>
        <p>Create and publish new opportunities for students</p>
      </div>

      {!previewMode ? (
        <>
          {/* Tabs */}
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'basic' ? 'active' : ''}`}
              onClick={() => setActiveTab('basic')}
            >
              Basic Information
            </button>
            <button 
              className={`tab ${activeTab === 'eligibility' ? 'active' : ''}`}
              onClick={() => setActiveTab('eligibility')}
            >
              Eligibility
            </button>
            <button 
              className={`tab ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Additional Details
            </button>
          </div>

          {/* Form Content */}
          <div className="form-container">
            {activeTab === 'basic' && (
              <div className="form-section">
                <h2>Basic Information</h2>
                
                <div className="form-group">
                  <label>Type *</label>
                  <select
                    name="type"
                    value={jobData.type}
                    onChange={handleInputChange}
                  >
                    <option value="Internship">Internship</option>
                    <option value="Placement">Placement</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Webinar">Webinar</option>
                    <option value="Challenge">Challenge</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={jobData.title}
                    onChange={handleInputChange}
                    placeholder="Enter job/event title"
                  />
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    name="description"
                    value={jobData.description}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Provide a detailed description of the opportunity"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Industry</label>
                    <select
                      name="industry"
                      value={jobData.industry}
                      onChange={handleInputChange}
                    >
                      <option value="Information Technology">Information Technology</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Education">Education</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Website</label>
                    <input
                      type="url"
                      name="website"
                      value={jobData.website}
                      onChange={handleInputChange}
                      placeholder="Company website"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'eligibility' && (
              <div className="form-section">
                <h2>Eligibility Criteria</h2>
                
                <div className="form-group">
                  <label>Eligible Branches</label>
                  <div className="checkbox-group">
                    {branches.map(branch => (
                      <label key={branch} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={jobData.eligibility.branches.includes(branch)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setJobData(prev => ({
                                ...prev,
                                eligibility: {
                                  ...prev.eligibility,
                                  branches: [...prev.eligibility.branches, branch]
                                }
                              }));
                            } else {
                              setJobData(prev => ({
                                ...prev,
                                eligibility: {
                                  ...prev.eligibility,
                                  branches: prev.eligibility.branches.filter(b => b !== branch)
                                }
                              }));
                            }
                          }}
                        />
                        {branch}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Minimum CGPA</label>
                    <input
                      type="number"
                      name="minCgpa"
                      value={jobData.eligibility.minCgpa}
                      onChange={handleEligibilityChange}
                      min="0"
                      max="10"
                      step="0.1"
                    />
                  </div>

                  <div className="form-group">
                    <label>Batch</label>
                    <select
                      name="batch"
                      value={jobData.eligibility.batch}
                      onChange={handleEligibilityChange}
                    >
                      {batches.map(batch => (
                        <option key={batch} value={batch}>{batch}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Required Skills</label>
                  <input
                    type="text"
                    placeholder="Enter skills separated by commas"
                    onBlur={(e) => {
                      const skills = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
                      setJobData(prev => ({
                        ...prev,
                        eligibility: {
                          ...prev.eligibility,
                          skills
                        }
                      }));
                    }}
                  />
                  <div className="tags-container">
                    {jobData.eligibility.skills.map((skill, index) => (
                      <span key={index} className="tag">
                        {skill}
                        <button 
                          type="button"
                          onClick={() => {
                            setJobData(prev => ({
                              ...prev,
                              eligibility: {
                                ...prev.eligibility,
                                skills: prev.eligibility.skills.filter((_, i) => i !== index)
                              }
                            }));
                          }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="form-section">
                <h2>Additional Details</h2>
                
                {jobData.type === 'Placement' || jobData.type === 'Internship' ? (
                  <div className="form-row">
                    <div className="form-group">
                      <label>
                        {jobData.type === 'Placement' ? 'Package' : 'Stipend'} (INR)
                      </label>
                      <input
                        type="text"
                        name={jobData.type === 'Placement' ? 'package' : 'stipend'}
                        value={jobData.type === 'Placement' ? jobData.package : jobData.stipend}
                        onChange={handleInputChange}
                        placeholder="e.g., 12 LPA or 50,000/month"
                      />
                    </div>

                    <div className="form-group">
                      <label>Number of Openings</label>
                      <input
                        type="number"
                        name="openings"
                        value={jobData.openings}
                        onChange={handleInputChange}
                        min="1"
                      />
                    </div>
                  </div>
                ) : null}

                <div className="form-row">
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={jobData.location}
                      onChange={handleInputChange}
                      placeholder="Job location or event venue"
                    />
                  </div>

                  {(jobData.type === 'Internship' || jobData.type === 'Placement') && (
                    <div className="form-group">
                      <label>Duration</label>
                      <input
                        type="text"
                        name="duration"
                        value={jobData.duration}
                        onChange={handleInputChange}
                        placeholder="e.g., 6 months, 2 years"
                      />
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Application Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={jobData.deadline}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Restrictions</label>
                  <select
                    name="restrictions"
                    value={jobData.restrictions}
                    onChange={handleInputChange}
                  >
                    <option value="Open to all">Open to all</option>
                    <option value="Selective colleges">Selective colleges</option>
                    <option value="Specific branches">Specific branches</option>
                  </select>
                </div>

                {jobData.restrictions === 'Selective colleges' && (
                  <div className="form-group">
                    <label>Select Colleges</label>
                    <div className="checkbox-group">
                      {colleges.map(college => (
                        <label key={college} className="checkbox-item">
                          <input
                            type="checkbox"
                            checked={jobData.colleges.includes(college)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setJobData(prev => ({
                                  ...prev,
                                  colleges: [...prev.colleges, college]
                                }));
                              } else {
                                setJobData(prev => ({
                                  ...prev,
                                  colleges: prev.colleges.filter(c => c !== college)
                                }));
                              }
                            }}
                          />
                          {college}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Form Actions */}
            <div className="form-actions">
              <button className="secondary-button" onClick={handleSaveDraft}>
                <Save size={16} />
                Save as Draft
              </button>
              <button className="secondary-button" onClick={handlePreview}>
                <Eye size={16} />
                Preview
              </button>
              <button className="primary-button" onClick={handlePost}>
                <Send size={16} />
                Post
              </button>
            </div>
          </div>
        </>
      ) : (
        // Preview Mode
        <div className="preview-mode">
          <div className="preview-header">
            <h2>Preview</h2>
            <button className="secondary-button" onClick={handlePreview}>
              <Eye size={16} />
              Back to Edit
            </button>
          </div>
          
          <div className="job-preview-card">
            <div className="job-header">
              <div className="job-type-badge">{jobData.type}</div>
              <h3>{jobData.title || "Job/Event Title"}</h3>
              <p className="company-name">TechCorp Solutions</p>
            </div>
            
            <div className="job-details">
              <p>{jobData.description || "Job/event description will appear here..."}</p>
              
              <div className="job-meta">
                <div className="meta-item">
                  <span className="label">Location:</span>
                  <span className="value">{jobData.location || "Not specified"}</span>
                </div>
                
                {(jobData.type === 'Placement' || jobData.type === 'Internship') && (
                  <>
                    <div className="meta-item">
                      <span className="label">
                        {jobData.type === 'Placement' ? 'Package:' : 'Stipend:'}
                      </span>
                      <span className="value">
                        {jobData.type === 'Placement' ? jobData.package : jobData.stipend || "Not specified"}
                      </span>
                    </div>
                    
                    <div className="meta-item">
                      <span className="label">Duration:</span>
                      <span className="value">{jobData.duration || "Not specified"}</span>
                    </div>
                  </>
                )}
                
                <div className="meta-item">
                  <span className="label">Deadline:</span>
                  <span className="value">{jobData.deadline || "Not specified"}</span>
                </div>
                
                <div className="meta-item">
                  <span className="label">Openings:</span>
                  <span className="value">{jobData.openings || "Not specified"}</span>
                </div>
              </div>
              
              <div className="eligibility-section">
                <h4>Eligibility Criteria</h4>
                <ul>
                  <li>Minimum CGPA: {jobData.eligibility.minCgpa}</li>
                  <li>Batch: {jobData.eligibility.batch}</li>
                  <li>Branches: {jobData.eligibility.branches.join(', ') || "All branches"}</li>
                </ul>
              </div>
            </div>
            
            <div className="preview-actions">
              <button className="secondary-button" onClick={handlePreview}>
                <Eye size={16} />
                Back to Edit
              </button>
              <button className="primary-button" onClick={handlePost}>
                <Send size={16} />
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostJobEvent;