import React, { useState } from 'react';
import { Star, Award, TrendingUp, Users, Gift, Download } from 'lucide-react';
import '../../App.css';

const RewardsRecognition = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample reward data
  const totalPoints = 420;
  const currentLevel = "Gold";
  const nextLevelPoints = 500;
  const progressToNext = Math.round((totalPoints / nextLevelPoints) * 100);

  const pointsBreakdown = [
    { activity: "Mentorship Sessions", points: 180, icon: <Users size={16} /> },
    { activity: "Company Referrals", points: 120, icon: <Award size={16} /> },
    { activity: "Event Participation", points: 80, icon: <Gift size={16} /> },
    { activity: "Content Contributions", points: 40, icon: <TrendingUp size={16} /> }
  ];

  const badges = [
    { id: 1, name: "Mentorship Champion", icon: "🏆", earned: true, date: "2025-09-15" },
    { id: 2, name: "Top Referrer", icon: "⭐", earned: true, date: "2025-08-20" },
    { id: 3, name: "Community Leader", icon: "👑", earned: true, date: "2025-07-10" },
    { id: 4, name: "Content Creator", icon: "✍️", earned: true, date: "2025-06-05" },
    { id: 5, name: "Event Organizer", icon: "📅", earned: false },
    { id: 6, name: "Alumni Ambassador", icon: "🎖️", earned: false }
  ];

  const leaderboard = [
    { id: 1, name: "Rahul Sharma", points: 420, company: "Google", position: 1 },
    { id: 2, name: "Priya Patel", points: 380, company: "Microsoft", position: 2 },
    { id: 3, name: "Amit Kumar", points: 350, company: "Amazon", position: 3 },
    { id: 4, name: "Sneha Gupta", points: 320, company: "Meta", position: 4 },
    { id: 5, name: "Vikram Singh", points: 300, company: "Apple", position: 5 }
  ];

  const exportLeaderboard = () => {
    console.log("Exporting leaderboard");
  };

  return (
    <div className="rewards-recognition">
      <div className="page-header">
        <h1>Rewards & Recognition</h1>
        <p>Track your contributions and redeem rewards</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <Star size={16} />
          Dashboard
        </button>
        <button 
          className={`tab ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          <TrendingUp size={16} />
          Leaderboard
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-tab">
            {/* Points Overview */}
            <div className="points-overview">
              <div className="points-card">
                <div className="points-header">
                  <div className="points-icon">
                    <Star size={32} />
                  </div>
                  <div className="points-info">
                    <h2>{totalPoints}</h2>
                    <p>Total Reward Points</p>
                  </div>
                </div>
                
                <div className="level-info">
                  <div className="current-level">
                    <span className="level-badge gold">Gold Level</span>
                  </div>
                  <div className="progress-to-next">
                    <p>{nextLevelPoints - totalPoints} points to Platinum</p>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${progressToNext}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Points Breakdown */}
            <div className="points-breakdown">
              <h3>Points Breakdown</h3>
              <div className="breakdown-list">
                {pointsBreakdown.map((item, index) => (
                  <div key={index} className="breakdown-item">
                    <div className="breakdown-icon">
                      {item.icon}
                    </div>
                    <div className="breakdown-info">
                      <h4>{item.activity}</h4>
                      <p>{item.points} points</p>
                    </div>
                    <div className="breakdown-bar">
                      <div 
                        className="breakdown-fill" 
                        style={{ width: `${(item.points / totalPoints) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges Collection */}
            <div className="badges-collection">
              <h3>Badges Collection</h3>
              <div className="badges-grid">
                {badges.map(badge => (
                  <div 
                    key={badge.id} 
                    className={`badge-card ${badge.earned ? 'earned' : 'locked'}`}
                  >
                    <div className="badge-icon">
                      {badge.icon}
                    </div>
                    <div className="badge-info">
                      <h4>{badge.name}</h4>
                      {badge.earned ? (
                        <p className="earned-date">Earned: {badge.date}</p>
                      ) : (
                        <p className="locked-text">Locked</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="leaderboard-tab">
            <h2>Alumni Leaderboard</h2>
            
            {/* Controls */}
            <div className="leaderboard-controls">
              <div className="leaderboard-filters">
                <select>
                  <option>All Time</option>
                  <option>This Month</option>
                  <option>This Quarter</option>
                  <option>This Year</option>
                </select>
              </div>
              
              <button className="export-button" onClick={exportLeaderboard}>
                <Download size={20} />
                Export Leaderboard
              </button>
            </div>

            {/* Leaderboard */}
            <div className="leaderboard-list">
              {leaderboard.map((alumni, index) => (
                <div 
                  key={alumni.id} 
                  className={`leaderboard-item ${index < 3 ? `position-${index + 1}` : ''}`}
                >
                  <div className="rank">
                    {index === 0 && <span className="gold">🥇</span>}
                    {index === 1 && <span className="silver">🥈</span>}
                    {index === 2 && <span className="bronze">🥉</span>}
                    {index > 2 && <span className="normal">#{alumni.position}</span>}
                  </div>
                  
                  <div className="alumni-info">
                    <div className="alumni-avatar">
                      {alumni.name.charAt(0)}
                    </div>
                    <div>
                      <h3>{alumni.name}</h3>
                      <p>{alumni.company}</p>
                    </div>
                  </div>
                  
                  <div className="points">
                    {alumni.points} pts
                  </div>
                </div>
              ))}
            </div>

            {/* Your Position */}
            <div className="your-position">
              <h3>Your Position</h3>
              <div className="position-card">
                <div className="position-info">
                  <div className="position-rank">
                    <span className="gold">🥇</span>
                    <span className="rank-number">#1</span>
                  </div>
                  <div className="position-details">
                    <h4>Rahul Sharma</h4>
                    <p>Google - 420 points</p>
                  </div>
                </div>
                <div className="position-stats">
                  <div className="stat-item">
                    <span className="label">Rank</span>
                    <span className="value">#1</span>
                  </div>
                  <div className="stat-item">
                    <span className="label">Points</span>
                    <span className="value">420</span>
                  </div>
                  <div className="stat-item">
                    <span className="label">Ahead of #2</span>
                    <span className="value">+40 pts</span>
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

export default RewardsRecognition;