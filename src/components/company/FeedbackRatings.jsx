import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Search, Filter, Download } from 'lucide-react';
import '../../App.css';

const FeedbackRatings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Sample feedback data
  const feedbackData = [
    {
      id: 1,
      student: {
        name: "Alex Johnson",
        college: "NIT Trichy",
        branch: "Computer Science"
      },
      interviewDate: "2025-10-15",
      rating: 4,
      feedback: "Strong technical skills and problem-solving ability. Communication needs improvement.",
      recommendation: "Recommended",
      status: "Completed"
    },
    {
      id: 2,
      student: {
        name: "Sarah Williams",
        college: "IIT Delhi",
        branch: "Electronics"
      },
      interviewDate: "2025-10-16",
      rating: 5,
      feedback: "Exceptional candidate with deep technical knowledge and leadership qualities.",
      recommendation: "Highly Recommended",
      status: "Completed"
    },
    {
      id: 3,
      student: {
        name: "Michael Chen",
        college: "IIIT Hyderabad",
        branch: "Data Science"
      },
      interviewDate: "2025-10-17",
      rating: 3,
      feedback: "Good technical foundation but lacks project experience in required domain.",
      recommendation: "Not Recommended",
      status: "Completed"
    },
    {
      id: 4,
      student: {
        name: "Priya Sharma",
        college: "NID Ahmedabad",
        branch: "Design"
      },
      interviewDate: "2025-10-18",
      rating: 4,
      feedback: "Creative thinking and innovative approach. Strong portfolio presentation.",
      recommendation: "Recommended",
      status: "Pending"
    }
  ];

  const filteredFeedback = feedbackData.filter(feedback => {
    const matchesSearch = feedback.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.student.college.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || feedback.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.interviewDate) - new Date(a.interviewDate);
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else {
      return a.student.name.localeCompare(b.student.name);
    }
  });

  const exportFeedback = () => {
    console.log("Exporting feedback data");
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

  const RecommendationBadge = ({ recommendation }) => {
    const getRecommendationClass = (rec) => {
      switch (rec.toLowerCase()) {
        case 'highly recommended': return 'highly-recommended';
        case 'recommended': return 'recommended';
        case 'not recommended': return 'not-recommended';
        default: return '';
      }
    };

    return (
      <span className={`recommendation-badge ${getRecommendationClass(recommendation)}`}>
        {recommendation}
      </span>
    );
  };

  return (
    <div className="feedback-ratings">
      <div className="page-header">
        <h1>Feedback & Ratings</h1>
        <p>Rate students and provide feedback after interviews</p>
      </div>

      {/* Controls */}
      <div className="feedback-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by student name or college..."
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
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          
          <div className="filter-group">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
          
          <button className="export-button" onClick={exportFeedback}>
            <Download size={20} />
            Export Data
          </button>
        </div>
      </div>

      {/* Feedback List */}
      <div className="feedback-list">
        {filteredFeedback.length > 0 ? (
          filteredFeedback.map(feedback => (
            <div key={feedback.id} className="feedback-card">
              <div className="feedback-header">
                <div className="student-info">
                  <div className="student-avatar">
                    {feedback.student.name.charAt(0)}
                  </div>
                  <div>
                    <h3>{feedback.student.name}</h3>
                    <p>{feedback.student.college} - {feedback.student.branch}</p>
                  </div>
                </div>
                
                <div className="feedback-meta">
                  <p>Interview Date: {feedback.interviewDate}</p>
                  <div className="status-badge">{feedback.status}</div>
                </div>
              </div>
              
              <div className="feedback-content">
                <div className="rating-section">
                  <div className="rating-label">Rating:</div>
                  <RatingStars rating={feedback.rating} size={24} />
                  <span className="rating-text">({feedback.rating}/5)</span>
                </div>
                
                <div className="recommendation-section">
                  <div className="recommendation-label">Recommendation:</div>
                  <RecommendationBadge recommendation={feedback.recommendation} />
                </div>
                
                <div className="feedback-text">
                  <p>{feedback.feedback}</p>
                </div>
              </div>
              
              <div className="feedback-actions">
                <button className="secondary-button">
                  <ThumbsUp size={16} />
                  Like
                </button>
                <button className="secondary-button">
                  <ThumbsDown size={16} />
                  Dislike
                </button>
                <button className="primary-button">
                  Edit Feedback
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No feedback found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Summary Statistics */}
      <div className="feedback-summary">
        <h3>Feedback Summary</h3>
        <div className="summary-stats">
          <div className="stat-card">
            <div className="stat-value">{feedbackData.length}</div>
            <div className="stat-label">Total Reviews</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {(feedbackData.reduce((sum, fb) => sum + fb.rating, 0) / feedbackData.length).toFixed(1)}
            </div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {feedbackData.filter(fb => fb.recommendation.includes('Recommended')).length}
            </div>
            <div className="stat-label">Recommended</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackRatings;