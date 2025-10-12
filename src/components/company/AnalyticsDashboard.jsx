import React, { useState } from 'react';
import { Download, TrendingUp, BarChart3, PieChart, LineChart } from 'lucide-react';
import '../../App.css';

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('6months');

  // Sample analytics data
  const jobPerformance = [
    { job: "Software Engineering Intern", views: 128, applications: 42, shortlisted: 18, selected: 8 },
    { job: "Campus Placement Drive", views: 342, applications: 87, shortlisted: 35, selected: 22 },
    { job: "AI Workshop", views: 210, applications: 0, shortlisted: 0, selected: 0 },
    { job: "Hackathon 2025", views: 87, applications: 0, shortlisted: 0, selected: 0 }
  ];

  const applicationFunnel = {
    applied: 129,
    shortlisted: 53,
    interviewed: 35,
    offered: 30,
    accepted: 22
  };

  const topColleges = [
    { college: "NIT Trichy", applications: 42 },
    { college: "IIT Delhi", applications: 35 },
    { college: "IIIT Hyderabad", applications: 28 },
    { college: "NID Ahmedabad", applications: 15 },
    { college: "IIT Bombay", applications: 9 }
  ];

  const skillInsights = [
    { skill: "JavaScript", count: 87 },
    { skill: "React", count: 76 },
    { skill: "Python", count: 68 },
    { skill: "Node.js", count: 54 },
    { skill: "SQL", count: 49 }
  ];

  const batchAnalytics = [
    { batch: "2024", applications: 24, selected: 18 },
    { batch: "2025", applications: 56, selected: 35 },
    { batch: "2026", applications: 49, selected: 22 }
  ];

  const exportReport = () => {
    console.log("Exporting report");
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

  const FunnelChart = ({ data }) => {
    const steps = [
      { label: "Applied", value: data.applied },
      { label: "Shortlisted", value: data.shortlisted },
      { label: "Interviewed", value: data.interviewed },
      { label: "Offered", value: data.offered },
      { label: "Accepted", value: data.accepted }
    ];

    return (
      <div className="funnel-chart">
        {steps.map((step, index) => (
          <div key={index} className="funnel-step">
            <div 
              className="funnel-bar" 
              style={{ 
                width: `${(step.value / data.applied) * 100}%`,
                backgroundColor: `hsl(${120 - (index * 20)}, 70%, 50%)`
              }}
            ></div>
            <div className="funnel-label">
              <span className="step-name">{step.label}</span>
              <span className="step-value">{step.value}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="analytics-dashboard">
      <div className="page-header">
        <h1>Analytics Dashboard</h1>
        <p>Insights and performance metrics for your opportunities</p>
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

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 size={16} />
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'funnel' ? 'active' : ''}`}
          onClick={() => setActiveTab('funnel')}
        >
          <TrendingUp size={16} />
          Application Funnel
        </button>
        <button 
          className={`tab ${activeTab === 'colleges' ? 'active' : ''}`}
          onClick={() => setActiveTab('colleges')}
        >
          <PieChart size={16} />
          College Insights
        </button>
        <button 
          className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          <LineChart size={16} />
          Skill Insights
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="analytics-grid">
              <div className="chart-card">
                <h3>Job/Event Performance</h3>
                <div className="performance-metrics">
                  <table className="metrics-table">
                    <thead>
                      <tr>
                        <th>Job/Event</th>
                        <th>Views</th>
                        <th>Applications</th>
                        <th>Shortlisted</th>
                        <th>Selected</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobPerformance.map((job, index) => (
                        <tr key={index}>
                          <td>{job.job}</td>
                          <td>{job.views}</td>
                          <td>{job.applications}</td>
                          <td>{job.shortlisted}</td>
                          <td>{job.selected}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="chart-card">
                <h3>Batch-wise Analytics</h3>
                <div className="batch-chart">
                  <BarChart data={batchAnalytics} xKey="batch" yKey="applications" color="#10b981" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'funnel' && (
          <div className="funnel-tab">
            <div className="chart-card">
              <h3>Application Funnel</h3>
              <FunnelChart data={applicationFunnel} />
            </div>
          </div>
        )}

        {activeTab === 'colleges' && (
          <div className="colleges-tab">
            <div className="analytics-grid">
              <div className="chart-card">
                <h3>Top Colleges by Applications</h3>
                <div className="colleges-chart">
                  <BarChart data={topColleges} xKey="college" yKey="applications" color="#8b5cf6" />
                </div>
              </div>
              
              <div className="chart-card">
                <h3>College Distribution</h3>
                <div className="pie-chart-placeholder">
                  <PieChart size={64} />
                  <p>Pie chart visualization would appear here</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="skills-tab">
            <div className="analytics-grid">
              <div className="chart-card">
                <h3>Most Common Skills in Applications</h3>
                <div className="skills-chart">
                  <BarChart data={skillInsights} xKey="skill" yKey="count" color="#f59e0b" />
                </div>
              </div>
              
              <div className="chart-card">
                <h3>Skill Trend Analysis</h3>
                <div className="line-chart-placeholder">
                  <LineChart size={64} />
                  <p>Line chart visualization would appear here</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;