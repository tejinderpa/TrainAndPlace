import React, { useState } from 'react';
import { Gift, Star, Download, Filter, Search } from 'lucide-react';
import '../../App.css';

const RedeemRewards = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('points');
  const [totalPoints, setTotalPoints] = useState(420);

  // Sample rewards data
  const rewards = [
    {
      id: 1,
      name: "Online Course Access",
      description: "Access to premium online learning platform for 1 year",
      points: 150,
      category: "Education",
      image: "📚",
      redeemed: false
    },
    {
      id: 2,
      name: "Professional Certification",
      description: "Reimbursement for one professional certification exam",
      points: 200,
      category: "Education",
      image: "🎓",
      redeemed: false
    },
    {
      id: 3,
      name: "Conference Pass",
      description: "Free pass to a major industry conference",
      points: 300,
      category: "Events",
      image: "🎫",
      redeemed: true
    },
    {
      id: 4,
      name: "Mentorship Session",
      description: "One-on-one mentorship session with industry expert",
      points: 100,
      category: "Mentorship",
      image: "👨‍🏫",
      redeemed: false
    },
    {
      id: 5,
      name: "Alumni Network Dinner",
      description: "Exclusive dinner event with top alumni",
      points: 250,
      category: "Events",
      image: "🍽️",
      redeemed: false
    },
    {
      id: 6,
      name: "Professional Headshot",
      description: "Professional photography session for LinkedIn profile",
      points: 75,
      category: "Personal Development",
      image: "📸",
      redeemed: false
    }
  ];

  const redemptionHistory = [
    {
      id: 1,
      reward: "Conference Pass",
      date: "2025-09-15",
      points: 300,
      status: "Delivered"
    },
    {
      id: 2,
      reward: "Mentorship Session",
      date: "2025-08-20",
      points: 100,
      status: "Completed"
    }
  ];

  const benefitsClaimed = [
    {
      id: 1,
      benefit: "LinkedIn Premium",
      date: "2025-07-10",
      expiry: "2026-07-10"
    },
    {
      id: 2,
      benefit: "GitHub Pro",
      date: "2025-06-05",
      expiry: "2026-06-05"
    }
  ];

  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || reward.category.toLowerCase() === categoryFilter;
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'points') {
      return a.points - b.points;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  const handleRedeem = (rewardId) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (reward && totalPoints >= reward.points) {
      console.log("Redeeming reward:", reward.name);
      setTotalPoints(totalPoints - reward.points);
    } else {
      console.log("Not enough points to redeem this reward");
    }
  };

  return (
    <div className="redeem-rewards">
      <div className="page-header">
        <h1>Redeem Rewards</h1>
        <p>Use your points to claim exciting benefits</p>
      </div>

      {/* Points Banner */}
      <div className="points-banner">
        <div className="points-info">
          <div className="points-icon">
            <Star size={32} />
          </div>
          <div>
            <h2>{totalPoints} Points Available</h2>
            <p>Redeem for exciting rewards and benefits</p>
          </div>
        </div>
        <button className="primary-button">
          <Gift size={16} />
          Earn More Points
        </button>
      </div>

      {/* Controls */}
      <div className="rewards-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search rewards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="education">Education</option>
              <option value="events">Events</option>
              <option value="mentorship">Mentorship</option>
              <option value="personal development">Personal Development</option>
            </select>
          </div>
          
          <div className="filter-group">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="points">Sort by Points</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rewards Catalog */}
      <div className="rewards-catalog">
        <h2>Available Rewards</h2>
        
        {filteredRewards.length > 0 ? (
          <div className="rewards-grid">
            {filteredRewards.map(reward => (
              <div key={reward.id} className={`reward-card ${reward.redeemed ? 'redeemed' : ''}`}>
                <div className="reward-header">
                  <div className="reward-icon">
                    {reward.image}
                  </div>
                  <div className="reward-points">
                    <Star size={16} />
                    <span>{reward.points}</span>
                  </div>
                </div>
                
                <div className="reward-info">
                  <h3>{reward.name}</h3>
                  <p>{reward.description}</p>
                  <div className="reward-category">
                    {reward.category}
                  </div>
                </div>
                
                <div className="reward-actions">
                  {reward.redeemed ? (
                    <button className="secondary-button" disabled>
                      Already Redeemed
                    </button>
                  ) : totalPoints >= reward.points ? (
                    <button 
                      className="primary-button"
                      onClick={() => handleRedeem(reward.id)}
                    >
                      <Gift size={16} />
                      Redeem
                    </button>
                  ) : (
                    <button className="secondary-button" disabled>
                      Need {reward.points - totalPoints} More Points
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No rewards found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Redemption History */}
      <div className="redemption-history">
        <h2>Redemption History</h2>
        
        {redemptionHistory.length > 0 ? (
          <div className="history-list">
            {redemptionHistory.map(item => (
              <div key={item.id} className="history-item">
                <div className="history-info">
                  <h3>{item.reward}</h3>
                  <p>Redeemed on {item.date}</p>
                </div>
                <div className="history-details">
                  <div className="points-spent">
                    <Star size={16} />
                    <span>{item.points} pts</span>
                  </div>
                  <div className={`status-badge ${item.status.toLowerCase()}`}>
                    {item.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>You haven't redeemed any rewards yet.</p>
          </div>
        )}
      </div>

      {/* Benefits Claimed */}
      <div className="benefits-claimed">
        <h2>Active Benefits</h2>
        
        {benefitsClaimed.length > 0 ? (
          <div className="benefits-list">
            {benefitsClaimed.map(benefit => (
              <div key={benefit.id} className="benefit-item">
                <div className="benefit-info">
                  <h3>{benefit.benefit}</h3>
                  <p>Claimed on {benefit.date}</p>
                </div>
                <div className="benefit-expiry">
                  <p>Expires: {benefit.expiry}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>You don't have any active benefits.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RedeemRewards;