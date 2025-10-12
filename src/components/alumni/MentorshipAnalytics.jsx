import React, { useState } from 'react';
import { Download, TrendingUp, BarChart3, PieChart, LineChart } from 'lucide-react';
import '../../App.css';

const MentorshipAnalytics = () => {
  const [timeRange, setTimeRange] = useState('6months');

  // Sample analytics data
  const stats = {
    totalMentored: 24,
    successStories: 18,
    sessionCompletion: 85,
    averageRating: 4.7
  };

  const successStories = [
    { id: 1, student: "Alex Johnson", company: "Microsoft", role: "Software Engineer", package: "15 LPA" },
    { id: 2, student: "Sarah Williams", company: "Google", role: "Product Manager", package: "22 LPA" },
    { id: 3, student: "Michael Chen", company: "Amazon", role: "Data Scientist", package: "18 LPA" },
    { id: 4, student: "Priya Sharma", company: "Adobe", role: "UI/UX Designer", package: "12 LPA" }
  ];

  const sessionCompletionData = [
    { month: "Apr", completion: 75 },
    { month: "May", completion: 82 },
    { month: "Jun", completion: 78 },
    { month: "Jul", completion: 85 },
    { month: "Aug", completion: 88 },
    { month: "Sep", completion: 90 }
  ];

  const ratingDistribution = [
    { rating: 5, count: 18 },
    { rating: 4, count: 5 },
    { rating: 3, count: 1 }
  ];

  const impactMetrics = [
    { metric: "Students who got internships", value: "12 (50%)" },
    { metric: "Students who got full-time offers", value: "6 (25%)" },
    { metric: "Average package increase", value: "4.2 LPA" },
    { metric: "Students who changed career paths", value: "3 (12%)" }
  ];

  const exportReport = () => {
    console.log("Exporting mentorship analytics report");
  };

  // Simple chart components for demonstration
  const BarChart = ({ data, xKey, yKey, color = "#4f46e5" }) => (
    <div className="chart-container">
      {data.map((item, index) => (
        <div key={index} className="bar-container">
          <div 
            className="bar" 
            style={{ 
              height: `${(item[yKey] / Math.max(...data.map(d => d[yKey]))) * 100}%`,
              backgroundColor: color
            }}
          ></div>
          <span className="bar-label">{item[xKey]}</span>
        </div>
      ))}
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
                fill={`hsl(${index * 120}, 70%, 50%)`}
              />
            );
          })}
        </svg>
        <div className="pie-legend">
          {data.map((item, index) => (
            <div key={index} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: `hsl(${index * 120}, 70%, 50%)` }}
              ></div>
              <span>{item.rating} Stars: {item.count}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mentorship-analytics">
      <div className="page-header">
        <h1>Mentorship Analytics</h1>
        <p>Track your impact and effectiveness as a mentor</p>
      </div>

      {/* Controls */}
      <div className="analytics-controls">
        <div className="time-filters">
          <button 
            className={`time-button ${timeRange === '1month' ? 'active' : ''}`}
            onClick={() => setTimeRange('1month')}
          >
            1 Month
          </button>
          <button 
            className={`time-button ${timeRange === '3months' ? 'active' : ''}`}
            onClick={() => setTimeRange('3months')}
          >
            3 Months
          </button>
          <button 
            className={`time-button ${timeRange === '6months' ? 'active' : ''}`}
            onClick={() => setTimeRange('6months')}
          >
            6 Months
          </button>
          <button 
            className={`time-button ${timeRange === '1year' ? 'active' : ''}`}
            onClick={() => setTimeRange('1year')}
          >
            1 Year
          </button>
        </div>
        
        <button className="export-button" onClick={exportReport}>
          <Download size={20} />
          Export Report
        </button>
      </div>

      {/* Key Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><TrendingUp size={24} /></div>
          <div className="stat-info">
            <h3>{stats.totalMentored}</h3>
            <p>Total Students Mentored</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><BarChart3 size={24} /></div>
          <div className="stat-info">
            <h3>{stats.successStories}</h3>
            <p>Success Stories</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><PieChart size={24} /></div>
          <div className="stat-info">
            <h3>{stats.sessionCompletion}%</h3>
            <p>Session Completion Rate</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><LineChart size={24} /></div>
          <div className="stat-info">
            <h3>{stats.averageRating}</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="analytics-grid">
        {/* Success Stories */}
        <div className="chart-card">
          <div className="card-header">
            <h3>Success Stories</h3>
          </div>
          <div className="success-stories-list">
            {successStories.map(story => (
              <div key={story.id} className="story-item">
                <div className="student-info">
                  <div className="student-avatar">
                    {story.student.charAt(0)}
                  </div>
                  <div>
                    <h4>{story.student}</h4>
                    <p>{story.role} at {story.company}</p>
                  </div>
                </div>
                <div className="package">
                  {story.package}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Session Completion Rate */}
        <div className="chart-card">
          <div className="card-header">
            <h3>Session Completion Rate</h3>
          </div>
          <div className="chart-container">
            <BarChart data={sessionCompletionData} xKey="month" yKey="completion" color="#10b981" />
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="chart-card">
          <div className="card-header">
            <h3>Rating Distribution</h3>
          </div>
          <div className="chart-container">
            <PieChartComponent data={ratingDistribution} />
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="chart-card">
          <div className="card-header">
            <h3>Impact Metrics</h3>
          </div>
          <div className="metrics-list">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="metric-item">
                <span className="metric-label">{metric.metric}</span>
                <span className="metric-value">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorshipAnalytics;