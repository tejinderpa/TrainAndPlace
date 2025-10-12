import React, { useState } from 'react';
import { Trophy, Star, Gift, Clock, CheckCircle, Search, Filter } from 'lucide-react';
import '../../App.css';

const Rewards = () => {
  const [activeTab, setActiveTab] = useState('rewards');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Mock data for rewards
  const rewards = [
    {
      id: 1,
      title: "Top Mentor of the Month",
      description: "Awarded for exceptional mentoring contributions in the past month",
      points: 500,
      category: "Mentorship",
      earned: true,
      date: "2025-10-01"
    },
    {
      id: 2,
      title: "Successful Referral Bonus",
      description: "Earned for referring a student who got placed",
      points: 300,
      category: "Referral",
      earned: true,
      date: "2025-09-25"
    },
    {
      id: 3,
      title: "Event Participation",
      description: "Points for participating in alumni events",
      points: 150,
      category: "Event",
      earned: true,
      date: "2025-09-20"
    },
    {
      id: 4,
      title: "Content Contribution",
      description: "Points for contributing articles or resources",
      points: 200,
      category: "Content",
      earned: false,
      date: null
    }
  ];

  // Mock data for redeemable items
  const redeemableItems = [
    {
      id: 1,
      title: "College Merchandise Set",
      description: "T-shirt, hoodie, and college accessories",
      points: 1000,
      category: "Merchandise",
      available: true
    },
    {
      id: 2,
      title: "Professional Development Course",
      description: "Access to premium online learning platform",
      points: 1500,
      category: "Learning",
      available: true
    },
    {
      id: 3,
      title: "Alumni Networking Dinner",
      description: "Exclusive dinner with fellow alumni and faculty",
      points: 2000,
      category: "Event",
      available: false
    },
    {
      id: 4,
      title: "College Sports Pass",
      description: "Free access to all college sports events for a year",
      points: 800,
      category: "Recreation",
      available: true
    }
  ];

  // Filter rewards based on search and filters
  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          reward.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'All' || reward.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Filter redeemable items based on search and filters
  const filteredRedeemableItems = redeemableItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = ['All', ...new Set([...rewards, ...redeemableItems].map(item => item.category))];

  // Calculate total points
  const totalPoints = rewards.filter(r => r.earned).reduce((sum, reward) => sum + reward.points, 0);

  return (
    <div className="rewards">
      <div className="page-header">
        <h1>Rewards & Recognition</h1>
        <p>Earn points for your contributions and redeem them for exciting rewards</p>
      </div>

      {/* Points Summary */}
      <div className="points-summary">
        <div className="stat-card">
          <Trophy size={32} />
          <div>
            <h3>{totalPoints}</h3>
            <p>Total Points</p>
          </div>
        </div>
        <div className="stat-card">
          <Gift size={32} />
          <div>
            <h3>{rewards.filter(r => r.earned).length}</h3>
            <p>Rewards Earned</p>
          </div>
        </div>
        <div className="stat-card">
          <Star size={32} />
          <div>
            <h3>{redeemableItems.filter(i => i.available).length}</h3>
            <p>Available Rewards</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={activeTab === 'rewards' ? 'active' : ''}
          onClick={() => setActiveTab('rewards')}
        >
          <Trophy size={16} />
          My Rewards
        </button>
        <button 
          className={activeTab === 'redeem' ? 'active' : ''}
          onClick={() => setActiveTab('redeem')}
        >
          <Gift size={16} />
          Redeem Points
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* My Rewards Tab */}
        {activeTab === 'rewards' && (
          <div className="rewards-tab">
            {/* Search and Filters */}
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
                    value={filterCategory} 
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Rewards List */}
            <div className="rewards-list">
              {filteredRewards.length > 0 ? (
                filteredRewards.map(reward => (
                  <div key={reward.id} className={`reward-card ${reward.earned ? 'earned' : ''}`}>
                    <div className="reward-icon">
                      {reward.earned ? <CheckCircle size={24} /> : <Clock size={24} />}
                    </div>
                    <div className="reward-info">
                      <h3>{reward.title}</h3>
                      <p>{reward.description}</p>
                      <div className="reward-meta">
                        <span className="points">+{reward.points} points</span>
                        <span className="category">{reward.category}</span>
                        {reward.earned && reward.date && (
                          <span className="date">Earned: {reward.date}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-rewards">
                  <p>No rewards found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Redeem Points Tab */}
        {activeTab === 'redeem' && (
          <div className="redeem-tab">
            {/* Search and Filters */}
            <div className="redeem-controls">
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
                    value={filterCategory} 
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Redeemable Items List */}
            <div className="redeem-list">
              {filteredRedeemableItems.length > 0 ? (
                filteredRedeemableItems.map(item => (
                  <div key={item.id} className={`redeem-card ${item.available ? '' : 'unavailable'}`}>
                    <div className="redeem-info">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className="redeem-meta">
                        <span className="points">{item.points} points</span>
                        <span className="category">{item.category}</span>
                      </div>
                    </div>
                    <div className="redeem-actions">
                      {item.available ? (
                        <button className="primary-button">
                          <Gift size={16} />
                          Redeem Now
                        </button>
                      ) : (
                        <button className="secondary-button" disabled>
                          <Clock size={16} />
                          Coming Soon
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-rewards">
                  <p>No redeemable items found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rewards;