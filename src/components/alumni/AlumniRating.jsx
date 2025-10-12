import React, { useState } from 'react';
import { Star, Search, Filter, Download, Send, User } from 'lucide-react';
import '../../App.css';

const AlumniRating = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Sample rating data
  const overallRating = 4.7;
  const totalRatings = 24;

  const feedbackData = [
    {
      id: 1,
      student: {
        name: "Alex Johnson",
        branch: "Computer Science",
        batch: "2026",
        avatar: "AJ"
      },
      rating: 5,
      feedback: "Rahul Sir provided excellent guidance on my career path and helped me secure an internship at Microsoft. His insights on technical interviews were invaluable.",
      date: "2025-10-12",
      response: "Thank you, Alex! I'm glad I could help. Wishing you all the best at Microsoft!"
    },
    {
      id: 2,
      student: {
        name: "Sarah Williams",
        branch: "Electronics",
        batch: "2025",
        avatar: "SW"
      },
      rating: 4,
      feedback: "Very knowledgeable and approachable mentor. Helped me understand the industry expectations and improve my technical skills.",
      date: "2025-10-05",
      response: null
    },
    {
      id: 3,
      student: {
        name: "Michael Chen",
        branch: "Data Science",
        batch: "2026",
        avatar: "MC"
      },
      rating: 5,
      feedback: "Outstanding mentor! Rahul Sir's experience in the industry and his ability to explain complex concepts simply is remarkable. Highly recommended!",
      date: "2025-09-28",
      response: "Thank you for the kind words, Michael. It's been a pleasure mentoring you!"
    },
    {
      id: 4,
      student: {
        name: "Priya Sharma",
        branch: "Design",
        batch: "2025",
        avatar: "PS"
      },
      rating: 4,
      feedback: "Great mentor with practical industry experience. Provided valuable feedback on my portfolio and career direction.",
      date: "2025-09-20",
      response: null
    }
  ];

  const ratingDistribution = [
    { rating: 5, count: 18, percentage: 75 },
    { rating: 4, count: 5, percentage: 21 },
    { rating: 3, count: 1, percentage: 4 },
    { rating: 2, count: 0, percentage: 0 },
    { rating: 1, count: 0, percentage: 0 }
  ];

  const filteredFeedback = feedbackData.filter(feedback => {
    const matchesSearch = feedback.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.feedback.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
      (filter === 'responded' && feedback.response) || 
      (filter === 'pending' && !feedback.response);
    
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else {
      return a.student.name.localeCompare(b.student.name);
    }
  });

  const exportFeedback = () => {
    console.log("Exporting feedback data");
  };

  const RatingStars = ({ rating, size = 16, interactive = false, onRate = null }) => {
    return (
      <div className={`rating-stars ${interactive ? 'interactive' : ''}`}>
        {[1, 2, 3, 4, 5].map(star => (
          <Star 
            key={star} 
            size={size} 
            className={star <= rating ? 'filled' : 'empty'}
            onClick={interactive && onRate ? () => onRate(star) : undefined}
          />
        ))}
      </div>
    );
  };

  const handleRespond = (feedbackId, response) => {
    console.log(`Responding to feedback ${feedbackId}: ${response}`);
  };

  return (
    <div className="alumni-rating">
      <div className="page-header">
        <h1>Rating & Feedback</h1>
        <p>View feedback from students and respond to reviews</p>
      </div>

      {/* Overall Rating */}
      <div className="overall-rating">
        <div className="rating-summary">
          <div className="rating-value">
            <span className="large-rating">{overallRating}</span>
            <span className="max-rating">/5</span>
          </div>
          <div className="rating-details">
            <RatingStars rating={overallRating} size={24} />
            <p>{totalRatings} total ratings</p>
          </div>
        </div>
        
        <div className="rating-distribution">
          {ratingDistribution.map(item => (
            <div key={item.rating} className="distribution-item">
              <div className="rating-label">
                <RatingStars rating={item.rating} size={16} />
              </div>
              <div className="distribution-bar">
                <div 
                  className="distribution-fill" 
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <div className="rating-count">
                {item.count}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="rating-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Feedback</option>
              <option value="responded">Responded</option>
              <option value="pending">Pending Response</option>
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
                    {feedback.student.avatar}
                  </div>
                  <div>
                    <h3>{feedback.student.name}</h3>
                    <p>{feedback.student.branch} - {feedback.student.batch}</p>
                  </div>
                </div>
                
                <div className="feedback-meta">
                  <div className="feedback-date">{feedback.date}</div>
                  <RatingStars rating={feedback.rating} size={20} />
                </div>
              </div>
              
              <div className="feedback-content">
                <p className="feedback-text">"{feedback.feedback}"</p>
              </div>
              
              {feedback.response && (
                <div className="feedback-response">
                  <div className="response-header">
                    <div className="response-icon">
                      <Send size={16} />
                    </div>
                    <h4>Your Response</h4>
                  </div>
                  <p className="response-text">"{feedback.response}"</p>
                </div>
              )}
              
              {!feedback.response && (
                <div className="response-form">
                  <textarea 
                    placeholder="Write your response to this feedback..."
                    rows="3"
                  ></textarea>
                  <div className="form-actions">
                    <button 
                      className="primary-button"
                      onClick={() => handleRespond(feedback.id, "Thank you for your feedback!")}
                    >
                      <Send size={16} />
                      Send Response
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No feedback found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniRating;