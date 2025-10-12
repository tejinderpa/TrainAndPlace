import React, { useState } from 'react';
import { Search, Filter, TrendingUp, BarChart3, PieChart, Download, Users, Award } from 'lucide-react';
import '../../App.css';

const StudentSkillAnalytics = () => {
  const [activeTab, setActiveTab] = useState('distribution');
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('year');

  // Sample skill data
  const branchSkills = [
    { branch: "Computer Science", skills: ["JavaScript", "React", "Node.js", "Python", "SQL"] },
    { branch: "Electronics", skills: ["Circuit Design", "Embedded Systems", "MATLAB", "VHDL", "PCB Design"] },
    { branch: "Mechanical", skills: ["AutoCAD", "SolidWorks", "CATIA", "Thermodynamics", "Manufacturing"] },
    { branch: "Civil", skills: ["AutoCAD", "STAAD Pro", "Revit", "Structural Analysis", "Surveying"] },
    { branch: "Data Science", skills: ["Python", "R", "TensorFlow", "SQL", "Tableau"] }
  ];

  const skillDistribution = [
    { skill: "JavaScript", count: 180, percentage: 25 },
    { skill: "Python", count: 150, percentage: 21 },
    { skill: "React", count: 120, percentage: 17 },
    { skill: "SQL", count: 100, percentage: 14 },
    { skill: "Node.js", count: 80, percentage: 11 },
    { skill: "Java", count: 60, percentage: 8 },
    { skill: "C++", count: 40, percentage: 6 }
  ];

  const skillGaps = [
    { skill: "Cloud Computing", demand: 85, supply: 60, gap: 25 },
    { skill: "AI/ML", demand: 90, supply: 65, gap: 25 },
    { skill: "Cybersecurity", demand: 75, supply: 50, gap: 25 },
    { skill: "Data Analytics", demand: 80, supply: 55, gap: 25 },
    { skill: "DevOps", demand: 70, supply: 45, gap: 25 }
  ];

  const trainingPrograms = [
    { id: 1, title: "AWS Cloud Practitioner", provider: "Amazon", duration: "4 weeks", enrolled: 45, completion: 85 },
    { id: 2, title: "Machine Learning Specialization", provider: "Coursera", duration: "6 months", enrolled: 38, completion: 75 },
    { id: 3, title: "Cybersecurity Fundamentals", provider: "Cisco", duration: "8 weeks", enrolled: 32, completion: 80 },
    { id: 4, title: "Advanced Data Analytics", provider: "Udemy", duration: "3 months", enrolled: 28, completion: 70 }
  ];

  const readinessScores = [
    { branch: "Computer Science", technical: 78, soft: 72, industry: 75, overall: 75 },
    { branch: "Electronics", technical: 72, soft: 68, industry: 70, overall: 70 },
    { branch: "Mechanical", technical: 68, soft: 65, industry: 67, overall: 67 },
    { branch: "Civil", technical: 65, soft: 62, industry: 64, overall: 64 },
    { branch: "Data Science", technical: 82, soft: 75, industry: 78, overall: 78 }
  ];

  const exportReport = () => {
    console.log("Exporting skill analytics report");
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
                fill={`hsl(${index * 60}, 70%, 50%)`}
              />
            );
          })}
        </svg>
        <div className="pie-legend">
          {data.map((item, index) => (
            <div key={index} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
              ></div>
              <span>{item.skill}: {item.count}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="student-skill-analytics">
      <div className="page-header">
        <h1>Student Skill Analytics</h1>
        <p>Analyze student skills and identify improvement areas</p>
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
          className={`tab ${activeTab === 'distribution' ? 'active' : ''}`}
          onClick={() => setActiveTab('distribution')}
        >
          <BarChart3 size={16} />
          Skill Distribution
        </button>
        <button 
          className={`tab ${activeTab === 'gaps' ? 'active' : ''}`}
          onClick={() => setActiveTab('gaps')}
        >
          <TrendingUp size={16} />
          Skill Gaps
        </button>
        <button 
          className={`tab ${activeTab === 'training' ? 'active' : ''}`}
          onClick={() => setActiveTab('training')}
        >
          <Users size={16} />
          Training Programs
        </button>
        <button 
          className={`tab ${activeTab === 'readiness' ? 'active' : ''}`}
          onClick={() => setActiveTab('readiness')}
        >
          <Award size={16} />
          Readiness Score
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'distribution' && (
          <div className="distribution-tab">
            <div className="analytics-grid">
              <div className="chart-card">
                <div className="card-header">
                  <h3>Skill Distribution by Branch</h3>
                </div>
                <div className="branch-skills">
                  {branchSkills.map((branch, index) => (
                    <div key={index} className="branch-skill-item">
                      <h4>{branch.branch}</h4>
                      <div className="skills-tags">
                        {branch.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="chart-card">
                <div className="card-header">
                  <h3>Top Skills in College</h3>
                </div>
                <div className="top-skills-chart">
                  <BarChart data={skillDistribution} xKey="skill" yKey="count" color="#10b981" />
                </div>
              </div>
              
              <div className="chart-card">
                <div className="card-header">
                  <h3>Skill Distribution Overview</h3>
                </div>
                <div className="skills-overview">
                  <PieChartComponent data={skillDistribution} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gaps' && (
          <div className="gaps-tab">
            <div className="analytics-grid">
              <div className="chart-card">
                <div className="card-header">
                  <h3>Skill Gap Analysis</h3>
                </div>
                <div className="skill-gaps-chart">
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
                      <div className="gap-value">{skill.gap}% gap</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="chart-card">
                <div className="card-header">
                  <h3>Recommended Training Programs</h3>
                </div>
                <div className="training-recommendations">
                  <ul>
                    {skillGaps.map((skill, index) => (
                      <li key={index}>
                        <strong>{skill.skill}</strong> - Gap: {skill.gap}%
                        <button className="secondary-button">
                          <Users size={16} />
                          Recommend Training
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'training' && (
          <div className="training-tab">
            <div className="analytics-grid">
              <div className="chart-card">
                <div className="card-header">
                  <h3>Available Training Programs</h3>
                </div>
                <div className="training-programs">
                  {trainingPrograms.map(program => (
                    <div key={program.id} className="program-card">
                      <div className="program-header">
                        <h4>{program.title}</h4>
                        <p>{program.provider} • {program.duration}</p>
                      </div>
                      <div className="program-stats">
                        <div className="stat-item">
                          <span className="label">Enrolled:</span>
                          <span className="value">{program.enrolled}</span>
                        </div>
                        <div className="stat-item">
                          <span className="label">Completion:</span>
                          <span className="value">{program.completion}%</span>
                        </div>
                      </div>
                      <div className="program-actions">
                        <button className="secondary-button">
                          <Users size={16} />
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="chart-card">
                <div className="card-header">
                  <h3>Certificate Completions</h3>
                </div>
                <div className="certificate-stats">
                  <div className="stat-card">
                    <div className="stat-icon"><Award size={24} /></div>
                    <div className="stat-info">
                      <h3>142</h3>
                      <p>Total Certificates</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon"><TrendingUp size={24} /></div>
                    <div className="stat-info">
                      <h3>78%</h3>
                      <p>Avg Completion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'readiness' && (
          <div className="readiness-tab">
            <div className="analytics-grid">
              <div className="chart-card">
                <div className="card-header">
                  <h3>Student Readiness Score by Branch</h3>
                </div>
                <div className="readiness-scores">
                  {readinessScores.map((branch, index) => (
                    <div key={index} className="branch-readiness">
                      <h4>{branch.branch}</h4>
                      <div className="readiness-bars">
                        <div className="readiness-item">
                          <span>Technical</span>
                          <div className="score-bar">
                            <div 
                              className="score-fill" 
                              style={{ width: `${branch.technical}%` }}
                            ></div>
                          </div>
                          <span>{branch.technical}%</span>
                        </div>
                        <div className="readiness-item">
                          <span>Soft Skills</span>
                          <div className="score-bar">
                            <div 
                              className="score-fill" 
                              style={{ width: `${branch.soft}%` }}
                            ></div>
                          </div>
                          <span>{branch.soft}%</span>
                        </div>
                        <div className="readiness-item">
                          <span>Industry</span>
                          <div className="score-bar">
                            <div 
                              className="score-fill" 
                              style={{ width: `${branch.industry}%` }}
                            ></div>
                          </div>
                          <span>{branch.industry}%</span>
                        </div>
                      </div>
                      <div className="overall-score">
                        <span>Overall: {branch.overall}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="chart-card">
                <div className="card-header">
                  <h3>Overall Readiness Dashboard</h3>
                </div>
                <div className="overall-readiness">
                  <div className="readiness-circle">
                    <div className="readiness-value">72%</div>
                    <div className="readiness-label">College Average</div>
                  </div>
                  <div className="readiness-breakdown">
                    <div className="breakdown-item">
                      <span>Technical Skills</span>
                      <span>75%</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Soft Skills</span>
                      <span>70%</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Industry Knowledge</span>
                      <span>73%</span>
                    </div>
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

export default StudentSkillAnalytics;