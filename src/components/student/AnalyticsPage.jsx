import React, { useState } from 'react';
import { BarChart, LineChart, PieChart, TrendingUp, Users, Briefcase, Award, Calendar } from 'lucide-react';
import '../../App.css';

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('6months');

  // Sample analytics data
  const placementStats = {
    applications: 24,
    interviews: 8,
    offers: 3,
    acceptanceRate: 37.5
  };

  const skillProgress = [
    { skill: "React", progress: 85, target: 90 },
    { skill: "JavaScript", progress: 92, target: 95 },
    { skill: "Python", progress: 78, target: 85 },
    { skill: "Node.js", progress: 70, target: 80 },
    { skill: "SQL", progress: 65, target: 75 }
  ];

  const courseCompletion = [
    { course: "Advanced React", progress: 65 },
    { course: "Data Structures", progress: 100 },
    { course: "Cloud Computing", progress: 30 },
    { course: "Machine Learning", progress: 0 }
  ];

  const applicationTimeline = [
    { month: "May", applications: 3, interviews: 1, offers: 0 },
    { month: "Jun", applications: 5, interviews: 2, offers: 1 },
    { month: "Jul", applications: 4, interviews: 1, offers: 0 },
    { month: "Aug", applications: 6, interviews: 2, offers: 1 },
    { month: "Sep", applications: 4, interviews: 2, offers: 1 },
    { month: "Oct", applications: 2, interviews: 0, offers: 0 }
  ];

  const batchComparison = {
    yourProgress: 72,
    batchAverage: 68,
    percentile: 65
  };

  // Render a simple bar chart (in a real app, you would use a charting library)
  const renderBarChart = (data, keys) => {
    const maxValue = Math.max(...data.map(item => Math.max(...keys.map(key => item[key]))));
    
    return (
      <div className="chart-container">
        {data.map((item, index) => (
          <div key={index} className="chart-bar-group">
            <div className="chart-label">{item.month}</div>
            <div className="chart-bars">
              {keys.map((key, keyIndex) => (
                <div 
                  key={keyIndex}
                  className={`chart-bar ${key}`}
                  style={{ height: `${(item[key] / maxValue) * 100}%` }}
                >
                  <span className="bar-value">{item[key]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render a simple progress chart
  const renderProgressChart = (data) => {
    return (
      <div className="progress-chart">
        {data.map((item, index) => (
          <div key={index} className="progress-item">
            <div className="progress-info">
              <span className="skill-name">{item.skill || item.course}</span>
              <span className="progress-percent">{item.progress}%</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar" 
                style={{ width: `${item.progress}%` }}
              ></div>
              {item.target && (
                <div 
                  className="target-marker" 
                  style={{ left: `${item.target}%` }}
                ></div>
              )}
            </div>
            {item.target && (
              <div className="target-info">
                Target: {item.target}%
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1>Analytics & Progress Tracker</h1>
        <p>Track your career development and compare with peers</p>
      </div>

      {/* Time Range Selector */}
      <div className="time-range-selector">
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="1month">Last 1 Month</option>
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last 1 Year</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart size={16} />
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          <LineChart size={16} />
          Skill Progress
        </button>
        <button 
          className={`tab ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          <PieChart size={16} />
          Course Completion
        </button>
        <button 
          className={`tab ${activeTab === 'comparison' ? 'active' : ''}`}
          onClick={() => setActiveTab('comparison')}
        >
          <Users size={16} />
          Batch Comparison
        </button>
      </div>

      {/* Content based on active tab */}
      <div className="analytics-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <Briefcase size={24} />
                </div>
                <div className="stat-info">
                  <h3>{placementStats.applications}</h3>
                  <p>Applications</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <Calendar size={24} />
                </div>
                <div className="stat-info">
                  <h3>{placementStats.interviews}</h3>
                  <p>Interviews</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <Award size={24} />
                </div>
                <div className="stat-info">
                  <h3>{placementStats.offers}</h3>
                  <p>Offers</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <TrendingUp size={24} />
                </div>
                <div className="stat-info">
                  <h3>{placementStats.acceptanceRate}%</h3>
                  <p>Acceptance Rate</p>
                </div>
              </div>
            </div>
            
            <div className="chart-section">
              <h2>Application Timeline</h2>
              <div className="chart-wrapper">
                {renderBarChart(applicationTimeline, ['applications', 'interviews', 'offers'])}
              </div>
            </div>
            
            <div className="insights-section">
              <h2>Personalized Insights</h2>
              <div className="insights-list">
                <div className="insight-card">
                  <TrendingUp size={20} />
                  <div>
                    <h3>Increase Applications</h3>
                    <p>Your application rate has decreased this month. Try applying to 5 more positions.</p>
                  </div>
                </div>
                <div className="insight-card">
                  <Award size={20} />
                  <div>
                    <h3>Update Skills</h3>
                    <p>Consider updating your React skills based on recent job requirements.</p>
                  </div>
                </div>
                <div className="insight-card">
                  <Users size={20} />
                  <div>
                    <h3>Network More</h3>
                    <p>You're below the batch average in networking activities. Attend upcoming events.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skill Progress Tab */}
        {activeTab === 'skills' && (
          <div className="skills-section">
            <div className="chart-section">
              <h2>Skill Progress Tracking</h2>
              <div className="chart-wrapper">
                {renderProgressChart(skillProgress)}
              </div>
            </div>
            
            <div className="recommendations-section">
              <h2>Learning Recommendations</h2>
              <div className="recommendations-list">
                <div className="recommendation-card">
                  <h3>Advanced React Patterns</h3>
                  <p>Course to improve your React skills and reach your target of 90%</p>
                  <button className="enroll-button">Enroll Now</button>
                </div>
                <div className="recommendation-card">
                  <h3>Node.js Best Practices</h3>
                  <p>Workshop to enhance your backend development skills</p>
                  <button className="enroll-button">Register</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Course Completion Tab */}
        {activeTab === 'courses' && (
          <div className="courses-section">
            <div className="chart-section">
              <h2>Course Completion Progress</h2>
              <div className="chart-wrapper">
                {renderProgressChart(courseCompletion)}
              </div>
            </div>
            
            <div className="courses-summary">
              <h2>Learning Summary</h2>
              <div className="summary-stats">
                <div className="summary-card">
                  <h3>4</h3>
                  <p>Courses Enrolled</p>
                </div>
                <div className="summary-card">
                  <h3>1</h3>
                  <p>Completed</p>
                </div>
                <div className="summary-card">
                  <h3>75%</h3>
                  <p>Average Progress</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Batch Comparison Tab */}
        {activeTab === 'comparison' && (
          <div className="comparison-section">
            <div className="comparison-header">
              <h2>Batch Performance Comparison</h2>
              <p>Compare your progress with your batch average</p>
            </div>
            
            <div className="comparison-charts">
              <div className="radar-chart">
                <h3>Skills Comparison</h3>
                <div className="radar-placeholder">
                  <p>Radar chart showing your skills vs batch average</p>
                </div>
              </div>
              
              <div className="progress-comparison">
                <h3>Overall Progress</h3>
                <div className="comparison-bars">
                  <div className="comparison-bar">
                    <span className="label">Your Progress</span>
                    <div className="bar-container">
                      <div 
                        className="bar your-progress" 
                        style={{ width: `${batchComparison.yourProgress}%` }}
                      >
                        {batchComparison.yourProgress}%
                      </div>
                    </div>
                  </div>
                  <div className="comparison-bar">
                    <span className="label">Batch Average</span>
                    <div className="bar-container">
                      <div 
                        className="bar batch-average" 
                        style={{ width: `${batchComparison.batchAverage}%` }}
                      >
                        {batchComparison.batchAverage}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="percentile">
                  <p>You're in the <strong>{batchComparison.percentile}th percentile</strong> of your batch</p>
                </div>
              </div>
            </div>
            
            <div className="improvement-section">
              <h2>Areas for Improvement</h2>
              <div className="improvement-list">
                <div className="improvement-item">
                  <h3>Technical Interviews</h3>
                  <p>Your score is 15% below batch average</p>
                  <button className="improve-button">Practice Now</button>
                </div>
                <div className="improvement-item">
                  <h3>Resume Quality</h3>
                  <p>Your resume score is 10% below batch average</p>
                  <button className="improve-button">Get Feedback</button>
                </div>
                <div className="improvement-item">
                  <h3>Networking</h3>
                  <p>You've attended 30% fewer events than average</p>
                  <button className="improve-button">Find Events</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;