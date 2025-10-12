import React, { useState } from 'react';
import { Star, Filter, Search, Plus, User } from 'lucide-react';
import '../../App.css';

const CompanyReviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');

  // Sample company reviews data
  const companies = [
    {
      id: 1,
      name: "Microsoft",
      logo: "MSFT",
      avgRating: 4.5,
      totalReviews: 128,
      reviews: [
        {
          id: 101,
          username: "Alex Johnson",
          batch: "2022-2026",
          role: "Software Engineer Intern",
          rating: 5,
          date: "2025-09-15",
          title: "Amazing internship experience",
          content: "Microsoft provided excellent mentorship and learning opportunities. The work culture is collaborative and inclusive. Work-life balance is maintained well.",
          pros: ["Great mentorship", "Learning opportunities", "Good work culture"],
          cons: ["Fast-paced environment"]
        },
        {
          id: 102,
          username: "Sarah Williams",
          batch: "2021-2025",
          role: "Data Analyst",
          rating: 4,
          date: "2025-08-20",
          title: "Good growth opportunities",
          content: "The projects were challenging and meaningful. Got to work with cutting-edge technologies. Management is supportive of career growth.",
          pros: ["Challenging projects", "Supportive management", "Career growth"],
          cons: ["Occasional long hours"]
        }
      ]
    },
    {
      id: 2,
      name: "Google",
      logo: "GOOGL",
      avgRating: 4.2,
      totalReviews: 96,
      reviews: [
        {
          id: 201,
          username: "Michael Chen",
          batch: "2020-2024",
          role: "Product Manager",
          rating: 4,
          date: "2025-09-01",
          title: "Innovative work environment",
          content: "Working at Google has been a dream come true. The innovation culture is unmatched. Perks and benefits are excellent.",
          pros: ["Innovative culture", "Excellent perks", "Smart colleagues"],
          cons: ["High competition", "Complex processes"]
        }
      ]
    },
    {
      id: 3,
      name: "Amazon",
      logo: "AMZN",
      avgRating: 3.8,
      totalReviews: 75,
      reviews: [
        {
          id: 301,
          username: "Priya Sharma",
          batch: "2021-2025",
          role: "Software Development Engineer",
          rating: 4,
          date: "2025-08-10",
          title: "Great for career growth",
          content: "Amazon pushes you to grow rapidly. Leadership principles are deeply embedded in the culture. Challenging but rewarding.",
          pros: ["Rapid growth", "Strong culture", "Career advancement"],
          cons: ["High pressure", "Work-life balance issues"]
        }
      ]
    }
  ];

  // Get all unique years from reviews
  const getAllYears = () => {
    const years = new Set();
    companies.forEach(company => {
      company.reviews.forEach(review => {
        const year = new Date(review.date).getFullYear();
        years.add(year);
      });
    });
    return Array.from(years).sort((a, b) => b - a);
  };

  const years = getAllYears();

  // Filter companies based on search and filters
  const filteredCompanies = companies.filter(company => {
    // Search filter
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Rating filter
    const matchesRating = ratingFilter === 'all' || 
      (ratingFilter === '4+' && company.avgRating >= 4) ||
      (ratingFilter === '3+' && company.avgRating >= 3) ||
      (ratingFilter === '2+' && company.avgRating >= 2);
    
    // Year filter
    const matchesYear = yearFilter === 'all' || 
      company.reviews.some(review => new Date(review.date).getFullYear() == yearFilter);
    
    return matchesSearch && matchesRating && matchesYear;
  });

  // Render star ratings
  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'star-filled' : 'star-empty'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="reviews-page">
      <div className="page-header">
        <h1>Company Reviews</h1>
        <p>Read and share experiences about companies you've interviewed with</p>
      </div>

      {/* Search and Filters */}
      <div className="reviews-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={ratingFilter} 
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="all">All Ratings</option>
              <option value="4+">4+ Stars</option>
              <option value="3+">3+ Stars</option>
              <option value="2+">2+ Stars</option>
            </select>
          </div>
          
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={yearFilter} 
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="all">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          
          <button className="add-review-button">
            <Plus size={20} />
            Add Review
          </button>
        </div>
      </div>

      {/* Company List */}
      <div className="companies-list">
        {filteredCompanies.map(company => (
          <div key={company.id} className="company-card">
            <div className="company-header">
              <div className="company-info">
                <div className="company-logo">
                  {company.logo}
                </div>
                <div>
                  <h3>{company.name}</h3>
                  <div className="company-rating">
                    {renderStars(company.avgRating)}
                    <span>{company.avgRating} ({company.totalReviews} reviews)</span>
                  </div>
                </div>
              </div>
              <button className="add-review-button small">
                <Plus size={16} />
                Add Review
              </button>
            </div>
            
            <div className="reviews-list">
              {company.reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        <User size={24} />
                      </div>
                      <div>
                        <h4>{review.username}</h4>
                        <p>{review.batch} • {review.role}</p>
                      </div>
                    </div>
                    <div className="review-rating">
                      {renderStars(review.rating)}
                      <span>{review.rating}/5</span>
                    </div>
                  </div>
                  
                  <div className="review-content">
                    <h5>{review.title}</h5>
                    <p>{review.content}</p>
                    
                    <div className="review-details">
                      <div className="pros-cons">
                        <div className="pros">
                          <h6>Pros:</h6>
                          <ul>
                            {review.pros.map((pro, index) => (
                              <li key={index}>{pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="cons">
                          <h6>Cons:</h6>
                          <ul>
                            {review.cons.map((con, index) => (
                              <li key={index}>{con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="review-footer">
                    <span className="review-date">
                      Reviewed on {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {filteredCompanies.length === 0 && (
          <div className="no-reviews">
            <p>No companies found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyReviews;