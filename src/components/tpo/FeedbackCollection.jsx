import React, { useState } from 'react';
import { Search, Filter, Download, TrendingUp, BarChart3, PieChart, Send, Edit3, Eye, Star } from 'lucide-react';
import '../../App.css';

const FeedbackCollection = () => {
  const [activeTab, setActiveTab] = useState('company');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('quarter');

  // Sample feedback data
  const companyFeedback = [
    {
      id: 1,
      company: "Microsoft",
      contact: "John Smith",
      role: "Campus Hiring Manager",
      date: "2025-10-15",
      rating: 4,
      feedback: "The organization of the placement drive was excellent. Students were well-prepared and the facilities were top-notch. Minor improvements needed in the interview scheduling process.",
      status: "Reviewed"
    },
    {
      id: 2,
      company: "Google",
      contact: "Sarah Johnson",
      role: "Recruitment Lead",
      date: "2025-10-10",
      rating: 5,
      feedback: "Outstanding experience! Students showed exceptional technical skills. The coordination team was very professional and responsive.",
      status: "New"
    },
    {
      id: 3,
      company: "Amazon",
      contact: "Michael Brown",
      role: "HR Manager",
      date: "2025-09-25",
      rating: 3,
      feedback: "Good overall experience, but there were some delays in the documentation process. Students' technical skills were satisfactory.",
      status: "Archived"
    }
  ];

  const studentFeedback = [
    {
      id: 1,
      student: "Alex Johnson",
      branch: "Computer Science",
      batch: "2026",
      date: "2025-10-12",
      rating: 4,
      feedback: "The TPO services are quite helpful. The job notifications are timely and the career guidance sessions are informative. Would appreciate more workshops on interview skills.",
      status: "Reviewed"
    },
    {
      id: 2,
      student: "Priya Sharma",
      branch: "Design",
      batch: "2025",
      date: "2025-10-08",
      rating: 5,
      feedback: "Excellent support from the TPO team. The placement process is well-organized and transparent. The resume building workshop was particularly useful.",
      status: "New"
    }
  ];

  const eventFeedback = [
    {
      id: 1,
      event: "Career Guidance Workshop",
      date: "2025-10-05",
      attendees: 150,
      rating: 4,
      feedback: "Very informative session. The speaker was knowledgeable and engaging. Good interaction with students. Could have been longer to cover more topics.",
      status: "Reviewed"
    },
    {
      id: 2,
      event: "Mock Interview Session",
      date: "2025-09-20",
      attendees: 85,
      rating: 5,
      feedback: "Extremely beneficial for students. The feedback from industry experts was valuable. Well-organized and practical sessions.",
      status: "New"
    }
  ];

  const feedbackTrends = [
    { month: "Jul", company: 4.2, student: 4.0, event: 4.1 },
    { month: "Aug", company: 4.5, student: 4.3, event: 4.4 },
    { month: "Sep", company: 4.0, student: 4.1, event: 4.2 },
    { month: "Oct", company: 4.3, student: 4.5, event: 4.4 }
  ];

  const ratingDistribution = [
    { rating: 5, count: 12 },
    { rating: 4, count: 18 },
    { rating: 3, count: 5 },
    { rating: 2, count: 2 },
    { rating: 1, count: 1 }
  ];

  const exportFeedback = () => {
    console.log("Exporting feedback data");
  };

  const handleViewFeedback = (feedbackId) => {
    console.log("Viewing feedback:", feedbackId);
  };

  const handleRespondToFeedback = (feedbackId) => {
    console.log("Responding to feedback:", feedbackId);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'new': return 'status-new';
      case 'reviewed': return 'status-reviewed';
      case 'archived': return 'status-archived';
      default: return '';
    }
  };

  const RatingStars = ({ rating, size = 16 }) => {
    return (
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map(star => (
          <Star 
            key={star} 
            size={size} 
            className={star <= rating ? 'filled' : 'empty'}
          />
        ))}
      </div>
    );
  };

  // Simple chart components for demonstration
  const BarChart = ({ data, xKey, yKeys, colors = ["#4f46e5", "#10b981", "#f59e0b"] }) => (
    <div className="multi-bar-chart">
      <div className="bar-labels">
        {data.map((item, index) => (
          <span key={index}>{item[xKey]}</span>
        ))}
      </div>
      <div className="bars-container">
        {data.map((item, index) => (
          <div key={index} className="bar-group">
            {yKeys.map((key, keyIndex) => (
              <div 
                key={keyIndex}
                className="bar"
                style={{ 
                  height: `${(item[key] / 5) * 100}%`,
                  backgroundColor: colors[keyIndex],
                  left: `${(keyIndex * 20) + 10}%`
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="bar-legend">
        {yKeys.map((key, index) => (
          <div key={index} className="legend-item">
            <div 
              className="legend-color" 
              style={{ backgroundColor: colors[index] }}
            ></div>
            <span>{key}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const PieChartComponent = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    let startAngle = 0;
    
    return (
      <div className="pie-chart-container">
        <svg viewBox="0 0 100 100" className="pie-chart">
          {data.map((item, index) => {
            const percentage = (item.count / total) * 100;
            const angle = (percentage / 100) * 360;
            const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 50 + 40 * Math.cos(((startAngle + angle) * Math.PI) / 180);
            const y2 = 50 + 40 * Math.sin(((startAngle + angle) * Math.PI) / 180);
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
            
            startAngle += angle;
            
            return (
              <path
                key={index}
                d={pathData}
                fill={`hsl(${index * 72}, 70%, 50%)`}
              />
            );
          })}
        </svg>
        <div className="pie-legend">
          {data.map((item, index) => (
            <div key={index} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: `hsl(${index * 72}, 70%, 50%)` }}
              ></div>
              <span>{item.rating} Stars: {item.count}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="feedback-collection">
      <div className="page-header">
        <h1>Feedback Collection</h1>
        <p>Gather and analyze feedback from all stakeholders</p>
      </div>

      {/* Controls */}
      <div className="feedback-controls">
        <div className="time-filters">
          <button 
            className={`time-button ${timeRange === 'month' ? 'active' : ''}`}
            onClick={() => setTimeRange('month')}
          >
            This Month
          </button>
          <button 
            className={`time-button ${timeRange === 'quarter' ? 'active' : ''}`}
            onClick={() => setTimeRange('quarter')}
          >
            This Quarter
          </button>
          <button 
            className={`time-button ${timeRange === 'year' ? 'active' : ''}`}
            onClick={() => setTimeRange('year')}
          >
            This Year
          </button>
        </div>
        
        <button className="export-button" onClick={exportFeedback}>
          <Download size={20} />
          Export Data
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'company' ? 'active' : ''}`}
          onClick={() => setActiveTab('company')}
        >
          Company Feedback
        </button>
        <button 
          className={`tab ${activeTab === 'student' ? 'active' : ''}`}
          onClick={() => setActiveTab('student')}
        >
          Student Feedback
        </button>
        <button 
          className={`tab ${activeTab === 'event' ? 'active' : ''}`}
          onClick={() => setActiveTab('event')}
        >
          Event Feedback
        </button>
        <button 
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <TrendingUp size={16} />
          Analytics
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'company' && (
          <div className="company-feedback">
            <div className="feedback-controls">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search company feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filters">
                <div className="filter-group">
                  <Filter size={20} />
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="feedback-list">
              {companyFeedback.map(feedback => (
                <div key={feedback.id} className="feedback-card">
                  <div className="feedback-header">
                    <div className="feedback-info">
                      <h3>{feedback.company}</h3>
                      <p>{feedback.contact} - {feedback.role}</p>
                      <p className="feedback-date">{feedback.date}</p>
                    </div>
                    <div className="feedback-meta">
                      <RatingStars rating={feedback.rating} size={20} />
                      <div className={`status-badge ${getStatusClass(feedback.status)}`}>
                        {feedback.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="feedback-content">
                    <p>{feedback.feedback}</p>
                  </div>
                  
                  <div className="feedback-actions">
                    <button 
                      className="secondary-button"
                      onClick={() => handleViewFeedback(feedback.id)}
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                    <button 
                      className="primary-button"
                      onClick={() => handleRespondToFeedback(feedback.id)}
                    >
                      <Send size={16} />
                      Respond
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'student' && (
          <div className="student-feedback">
            <div className="feedback-controls">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search student feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filters">
                <div className="filter-group">
                  <Filter size={20} />
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="feedback-list">
              {studentFeedback.map(feedback => (
                <div key={feedback.id} className="feedback-card">
                  <div className="feedback-header">
                    <div className="feedback-info">
                      <h3>{feedback.student}</h3>
                      <p>{feedback.branch} - {feedback.batch}</p>
                      <p className="feedback-date">{feedback.date}</p>
                    </div>
                    <div className="feedback-meta">
                      <RatingStars rating={feedback.rating} size={20} />
                      <div className={`status-badge ${getStatusClass(feedback.status)}`}>
                        {feedback.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="feedback-content">
                    <p>{feedback.feedback}</p>
                  </div>
                  
                  <div className="feedback-actions">
                    <button 
                      className="secondary-button"
                      onClick={() => handleViewFeedback(feedback.id)}
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                    <button 
                      className="primary-button"
                      onClick={() => handleRespondToFeedback(feedback.id)}
                    >
                      <Send size={16} />
                      Respond
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'event' && (
          <div className="event-feedback">
            <div className="feedback-controls">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search event feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filters">
                <div className="filter-group">
                  <Filter size={20} />
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="feedback-list">
              {eventFeedback.map(feedback => (
                <div key={feedback.id} className="feedback-card">
                  <div className="feedback-header">
                    <div className="feedback-info">
                      <h3>{feedback.event}</h3>
                      <p>{feedback.attendees} attendees</p>
                      <p className="feedback-date">{feedback.date}</p>
                    </div>
                    <div className="feedback-meta">
                      <RatingStars rating={feedback.rating} size={20} />
                      <div className={`status-badge ${getStatusClass(feedback.status)}`}>
                        {feedback.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="feedback-content">
                    <p>{feedback.feedback}</p>
                  </div>
                  
                  <div className="feedback-actions">
                    <button 
                      className="secondary-button"
                      onClick={() => handleViewFeedback(feedback.id)}
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                    <button 
                      className="primary-button"
                      onClick={() => handleRespondToFeedback(feedback.id)}
                    >
                      <Send size={16} />
                      Respond
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="feedback-analytics">
            <div className="analytics-grid">
              <div className="chart-card">
                <div className="card-header">
                  <h3>Feedback Trends</h3>
                </div>
                <div className="trends-chart">
                  <BarChart 
                    data={feedbackTrends} 
                    xKey="month" 
                    yKeys={["company", "student", "event"]} 
                    colors={["#4f46e5", "#10b981", "#f59e0b"]} 
                  />
                </div>
              </div>
              
              <div className="chart-card">
                <div className="card-header">
                  <h3>Rating Distribution</h3>
                </div>
                <div className="distribution-chart">
                  <PieChartComponent data={ratingDistribution} />
                </div>
              </div>
              
              <div className="chart-card">
                <div className="card-header">
                  <h3>Feedback Summary</h3>
                </div>
                <div className="feedback-summary">
                  <div className="summary-stats">
                    <div className="stat-card">
                      <div className="stat-icon"><TrendingUp size={24} /></div>
                      <div className="stat-info">
                        <h3>4.3</h3>
                        <p>Average Rating</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon"><BarChart3 size={24} /></div>
                      <div className="stat-info">
                        <h3>35</h3>
                        <p>Total Feedback</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon"><Send size={24} /></div>
                      <div className="stat-info">
                        <h3>28</h3>
                        <p>Responses Sent</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="recommendations">
                    <h4>Strategic Recommendations</h4>
                    <ul>
                      <li>Improve interview scheduling process based on company feedback</li>
                      <li>Organize more workshops on interview skills as requested by students</li>
                      <li>Extend event durations to cover more topics comprehensively</li>
                      <li>Enhance documentation process for smoother company interactions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackCollection;