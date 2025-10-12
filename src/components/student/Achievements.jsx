import React, { useState } from 'react';
import { Trophy, Award, Star, Calendar, BookOpen, Certificate, Search, Filter } from 'lucide-react';
import '../../App.css';

const Achievements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  // Mock data for achievements
  const achievements = [
    {
      id: 1,
      title: "Top Performer in Google Coding Challenge",
      type: "Competition",
      date: "2025-09-15",
      issuer: "Google",
      description: "Ranked in top 1% among 10,000+ participants in the Google Coding Challenge 2025.",
      points: 150,
      badge: "gold"
    },
    {
      id: 2,
      title: "Microsoft Hackathon Winner",
      type: "Hackathon",
      date: "2025-08-22",
      issuer: "Microsoft",
      description: "Won first place in the Microsoft University Hackathon for developing an innovative solution.",
      points: 200,
      badge: "gold"
    },
    {
      id: 3,
      title: "Academic Excellence Award",
      type: "Academic",
      date: "2025-07-10",
      issuer: "College Administration",
      description: "Awarded for maintaining a CGPA of 9.5 or above for two consecutive semesters.",
      points: 100,
      badge: "silver"
    },
    {
      id: 4,
      title: "Leadership in Student Council",
      type: "Leadership",
      date: "2025-06-05",
      issuer: "Student Council",
      description: "Recognized for outstanding leadership as the President of the Computer Science Student Council.",
      points: 75,
      badge: "bronze"
    },
    {
      id: 5,
      title: "AWS Cloud Practitioner Certification",
      type: "Certification",
      date: "2025-05-18",
      issuer: "Amazon Web Services",
      description: "Successfully completed the AWS Cloud Practitioner certification exam.",
      points: 125,
      badge: "silver"
    }
  ];

  // Mock data for certifications
  const certifications = [
    {
      id: 1,
      title: "Google Professional Cloud Developer",
      issuer: "Google Cloud",
      date: "2025-09-30",
      expiry: "2027-09-30",
      status: "Active",
      credentialId: "GCPCD-123456"
    },
    {
      id: 2,
      title: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      date: "2025-08-15",
      expiry: "2027-08-15",
      status: "Active",
      credentialId: "AZ-900-789012"
    },
    {
      id: 3,
      title: "Certified ScrumMaster",
      issuer: "Scrum Alliance",
      date: "2025-07-20",
      expiry: "2028-07-20",
      status: "Active",
      credentialId: "CSM-345678"
    }
  ];

  // Filter achievements based on search and filters
  const filteredAchievements = achievements.filter(achievement => {
    const matchesSearch = achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          achievement.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          achievement.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'All' || achievement.type === filterType;
    
    return matchesSearch && matchesType;
  });

  // Get unique achievement types for filter
  const achievementTypes = ['All', ...new Set(achievements.map(achievement => achievement.type))];

  return (
    <div className="achievements">
      <div className="page-header">
        <h1>Achievements & Certifications</h1>
        <p>Showcase your accomplishments and professional certifications</p>
      </div>

      {/* Stats Overview */}
      <div className="achievements-stats">
        <div className="stat-card">
          <Trophy size={32} />
          <div>
            <h3>{achievements.length}</h3>
            <p>Total Achievements</p>
          </div>
        </div>
        <div className="stat-card">
          <Certificate size={32} />
          <div>
            <h3>{certifications.length}</h3>
            <p>Certifications</p>
          </div>
        </div>
        <div className="stat-card">
          <Star size={32} />
          <div>
            <h3>{achievements.reduce((sum, achievement) => sum + achievement.points, 0)}</h3>
            <p>Total Points</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="achievements-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search achievements, certifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
            >
              {achievementTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="achievements-section">
        <div className="section-header">
          <h2>Achievements</h2>
        </div>
        
        <div className="achievements-grid">
          {filteredAchievements.map(achievement => (
            <div key={achievement.id} className="achievement-card">
              <div className="achievement-header">
                <div className={`achievement-icon ${achievement.badge}`}>
                  {achievement.type === 'Competition' && <Trophy size={24} />}
                  {achievement.type === 'Hackathon' && <Award size={24} />}
                  {achievement.type === 'Academic' && <BookOpen size={24} />}
                  {achievement.type === 'Leadership' && <Star size={24} />}
                  {achievement.type === 'Certification' && <Certificate size={24} />}
                </div>
                <div className="achievement-points">
                  +{achievement.points} pts
                </div>
              </div>
              
              <div className="achievement-content">
                <h3>{achievement.title}</h3>
                <p className="issuer">by {achievement.issuer}</p>
                <p className="date"><Calendar size={16} /> {achievement.date}</p>
                <p className="description">{achievement.description}</p>
                <span className="type-badge">{achievement.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="certifications-section">
        <div className="section-header">
          <h2>Professional Certifications</h2>
        </div>
        
        <div className="certifications-grid">
          {certifications.map(certification => (
            <div key={certification.id} className="certification-card">
              <div className="cert-header">
                <div className="cert-icon">
                  <Certificate size={24} />
                </div>
                <div className={`cert-status ${certification.status.toLowerCase()}`}>
                  {certification.status}
                </div>
              </div>
              
              <div className="cert-details">
                <h3>{certification.title}</h3>
                <p className="issuer">by {certification.issuer}</p>
                
                <div className="cert-meta">
                  <span><Calendar size={16} /> Issued: {certification.date}</span>
                  <span><Calendar size={16} /> Expires: {certification.expiry}</span>
                </div>
                
                <div className="credential-id">
                  <strong>Credential ID:</strong> {certification.credentialId}
                </div>
                
                <button className="secondary-button">
                  View Certificate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;