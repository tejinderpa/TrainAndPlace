import React, { useState } from 'react';
import { Download, TrendingUp, BarChart3, PieChart, LineChart, Users, Award } from 'lucide-react';
import '../../App.css';

const BenchmarkingAnalytics = () => {
  const [activeTab, setActiveTab] = useState('performance');
  const [timeRange, setTimeRange] = useState('year');

  // Sample benchmarking data
  const collegePerformance = [
    { college: "Our College", placed: 78, avgPackage: 12.5, highestPackage: 35 },
    { college: "IIT Delhi", placed: 92, avgPackage: 18.2, highestPackage: 120 },
    { college: "NIT Trichy", placed: 85, avgPackage: 15.8, highestPackage: 42 },
    { college: "IIIT Hyderabad", placed: 88, avgPackage: 16.5, highestPackage: 38 }
  ];

  const placementTrends = [
    { year: "2021", placed: 65, avgPackage: 8.2, companies: 45 },
    { year: "2022", placed: 70, avgPackage: 9.5, companies: 52 },
    { year: "2023", placed: 72, avgPackage: 10.8, companies: 60 },
    { year: "2024", placed: 75, avgPackage: 11.6, companies: 68 },
    { year: "2025", placed: 78, avgPackage: 12.5, companies: 75 }
  ];

  const packageDistribution = [
    { range: "0-5 LPA", count: 15 },
    { range: "5-10 LPA", count: 45 },
    { range: "10-15 LPA", count: 65 },
    { range: "15-20 LPA", count: 35 },
    { range: "20+ LPA", count: 20 }
  ];

  const branchWisePlacement = [
    { branch: "Computer Science", placed: 85, total: 120 },
    { branch: "Electronics", placed: 75, total: 100 },
    { branch: "Mechanical", placed: 65, total: 90 },
    { branch: "Civil", placed: 60, total: 85 },
    { branch: "Data Science", placed: 80, total: 95 }
  ];

  const skillGaps = [
    { skill: "Cloud Computing", demand: 85, supply: 60 },
    { skill: "AI/ML", demand: 90, supply: 65 },
    { skill: "Cybersecurity", demand: 75, supply: 50 },
    { skill: "Data Analytics", demand: 80, supply: 55 },
    { skill: "DevOps", demand: 70, supply: 45 }
  ];

  const companyHiringPatterns = [
    { company: "Microsoft", hires: 24, avgPackage: 18, years: 5 },
    { company: "Google", hires: 18, avgPackage: 22, years: 4 },
    { company: "Amazon", hires: 32, avgPackage: 15, years: 6 },
    { company: "Meta", hires: 15, avgPackage: 25, years: 3 }
  ];

  const exportReport = () => {
    console.log("Exporting benchmarking report");
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

  const LineChartComponent = ({ data, xKey, yKey, color = "#4f46e5" }) => (
    <div className="line-chart-container">
      <svg viewBox="0 0 400 200" className="line-chart">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={data.map((item, index) => {
            const x = (index / (data.length - 1)) * 380 + 10;
            const y = 190 - (item[yKey] / Math.max(...data.map(d => d[yKey]))) * 180;
            return `${x},${y}`;
          }).join(" ")}
        />
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 380 + 10;
          const y = 190 - (item[yKey] / Math.max(...data.map(d => d[yKey]))) * 180;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill={color}
            />
          );
        })}
      </svg>
      <div className="line-chart-labels">
        {data.map((item, index) => (
          <span key={index}>{item[xKey]}</span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="benchmarking-analytics">
      <div className="page-header">
        <h1>Benchmarking & Analytics</h1>
        <p>Compare performance and identify improvement areas</p>
      </div>

      {/* Controls */}
      <div className="analytics-controls">
        <div className="time-filters">
          <button 
            className={`time-button ${timeRange === 'year' ? 'active' : ''}`}
            onClick={() => setTimeRange('year')}
          >
            This Year
          </button>
          <button 
            className={`time-button ${timeRange === 'quarter' ? 'active' : ''}`}
            onClick={() => setTimeRange('quarter')}
          >
            This Quarter
          </button>
          <button 
            className={`time-button ${timeRange === 'month' ? 'active' : ''}`}
            onClick={() => setTimeRange('month')}
          >
            This Month
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
          className={`tab ${activeTab === 'performance' ? 'active' : ''}`}
          onClick={() => setActiveTab('performance')}
        >
          <BarChart3 size={16} />
          Performance Comparison
        </button>
        <button 
          className={`tab ${activeTab === 'trends' ? 'active' : ''}`}
          onClick={() => setActiveTab('trends')}
        >
          <TrendingUp size={16} />
          Placement Trends
        </button>
        <button 
          className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          <Users size={16} />
          Skill Analysis
        </button>
        <button 
          className={`tab ${activeTab === 'hiring' ? 'active' : ''}`}
          onClick={() => setActiveTab('hiring')}
        >
          <Award size={16} />
          Hiring Patterns
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'performance' && (
          <div className="performance-tab">
            <div className="analytics-grid">
              <div className="chart-card">
                <div className="card-header">
                  <h3>College Performance Comparison</h3>
                </div>
                <div className="performance-table">
                  <table>
                    <thead>
                      <tr>
                        <th>College</th>
                        <th>Placement %</th>
                        <th>Avg Package (LPA)</th>
                        <th>Highest Package (LPA)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {collegePerformance.map((college, index) => (
                        <tr key={index} className={college.college === "Our College" ? "highlight" : ""}>
                          <td>{college.college}</td>
                          <td>{college.placed}%</td>
                          <td>{college.avgPackage}</td>
                          <td>{college.highestPackage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="chart-card">
                <div className="card-header">
                  <h3>Branch-wise Placement Statistics</h3>
                </div>
                <div className="branch-chart">
                  <BarChart data={branchWisePlacement} xKey="branch" yKey="placed" color="#10b981" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="trends-tab">
            <div className="analytics-grid">
              <div className="chart-card">
                <div className="card-header">
                  <h3>Year-wise Placement Trends</h3>
                </div>
                <div className="trends-chart">
                  <LineChartComponent data={placementTrends} xKey="year" yKey="placed" color="#8b5cf6" />
                </div>
              </div>
              
              <div className="chart-card">
                <div className="card-header">
                  <h3>Package Distribution</h3>
                </div>
                <div className="package-chart">
                  <BarChart data={packageDistribution} xKey="range" yKey="count" color="#f59e0b" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="skills-tab">
            <div className="analytics-grid">
              <div className="chart-card">
                <div className="card-header">
                  <h3>Skill Gap Analysis</h3>
                </div>
                <div className="skills-gap-chart">
                  <div className="gap-legend">
                    <div className="legend-item">
                      <div className="demand-legend"></div>
                      <span>Demand</span>
                    </div>
                    <div className="legend-item">
                      <div className="supply-legend"></div>
                      <span>Supply</span>
                    </div>
                  </div>
                  {skillGaps.map((skill, index) => (
                    <div key={index} className="skill-gap-item">
                      <div className="skill-name">{skill.skill}</div>
                      <div className="skill-bars">
                        <div className="demand-bar">
                          <div 
                            className="demand-fill" 
                            style={{ width: `${skill.demand}%` }}
                          ></div>
                        </div>
                        <div className="supply-bar">
                          <div 
                            className="supply-fill" 
                            style={{ width: `${skill.supply}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="gap-value">{skill.demand - skill.supply}% gap</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="chart-card">
                <div className="card-header">
                  <h3>Student Readiness Score</h3>
                </div>
                <div className="readiness-score">
                  <div className="score-circle">
                    <div className="score-value">72%</div>
                    <div className="score-label">Overall Readiness</div>
                  </div>
                  <div className="score-breakdown">
                    <div className="score-item">
                      <span>Technical Skills</span>
                      <div className="score-bar">
                        <div className="score-fill" style={{ width: '75%' }}></div>
                      </div>
                      <span>75%</span>
                    </div>
                    <div className="score-item">
                      <span>Soft Skills</span>
                      <div className="score-bar">
                        <div className="score-fill" style={{ width: '68%' }}></div>
                      </div>
                      <span>68%</span>
                    </div>
                    <div className="score-item">
                      <span>Industry Knowledge</span>
                      <div className="score-bar">
                        <div className="score-fill" style={{ width: '70%' }}></div>
                      </div>
                      <span>70%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hiring' && (
          <div className="hiring-tab">
            <div className="analytics-grid">
              <div className="chart-card">
                <div className="card-header">
                  <h3>Company Hiring Patterns</h3>
                </div>
                <div className="company-hiring-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Company</th>
                        <th>Students Hired</th>
                        <th>Avg Package (LPA)</th>
                        <th>Years of Partnership</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companyHiringPatterns.map((company, index) => (
                        <tr key={index}>
                          <td>{company.company}</td>
                          <td>{company.hires}</td>
                          <td>{company.avgPackage}</td>
                          <td>{company.years}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="chart-card">
                <div className="card-header">
                  <h3>Top Recruiting Companies</h3>
                </div>
                <div className="top-companies-chart">
                  <BarChart 
                    data={companyHiringPatterns} 
                    xKey="company" 
                    yKey="hires" 
                    color="#ec4899" 
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BenchmarkingAnalytics;