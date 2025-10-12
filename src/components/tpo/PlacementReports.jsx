import React, { useState } from 'react';
import { Download, TrendingUp, BarChart3, PieChart, FileText, Calendar } from 'lucide-react';
import '../../App.css';

const PlacementReports = () => {
  const [reportType, setReportType] = useState('overview');
  const [timeRange, setTimeRange] = useState('annual');

  // Sample report data
  const overallStats = {
    placementPercentage: 78,
    totalStudents: 1250,
    placedStudents: 975,
    avgPackage: "12.5 LPA",
    highestPackage: "35 LPA",
    totalCompanies: 85
  };

  const topRecruiters = [
    { company: "Microsoft", hires: 24, avgPackage: "18 LPA" },
    { company: "Google", hires: 18, avgPackage: "22 LPA" },
    { company: "Amazon", hires: 32, avgPackage: "15 LPA" },
    { company: "Meta", hires: 15, avgPackage: "25 LPA" },
    { company: "Adobe", hires: 12, avgPackage: "14 LPA" }
  ];

  const branchWiseData = [
    { branch: "Computer Science", total: 150, placed: 117, percentage: 78 },
    { branch: "Electronics", total: 120, placed: 90, percentage: 75 },
    { branch: "Mechanical", total: 100, placed: 65, percentage: 65 },
    { branch: "Civil", total: 90, placed: 54, percentage: 60 },
    { branch: "Data Science", total: 80, placed: 64, percentage: 80 }
  ];

  const packageTrends = [
    { year: "2021", avg: 8.2, highest: 25 },
    { year: "2022", avg: 9.5, highest: 28 },
    { year: "2023", avg: 10.8, highest: 32 },
    { year: "2024", avg: 11.6, highest: 34 },
    { year: "2025", avg: 12.5, highest: 35 }
  ];

  const handleGenerateReport = () => {
    console.log("Generating report:", reportType, timeRange);
  };

  const handleExportReport = (format) => {
    console.log("Exporting report in", format, "format");
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
    const total = data.reduce((sum, item) => sum + item.hires, 0);
    let startAngle = 0;
    
    return (
      <div className="pie-chart-container">
        <svg viewBox="0 0 100 100" className="pie-chart">
          {data.map((item, index) => {
            const percentage = (item.hires / total) * 100;
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
                fill={`hsl(${index * 72}, 70%, 50%)`}
              />
            );
          })}
        </svg>
        <div className="pie-legend">
          {data.map((item, index) => (
            <div key={index} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: `hsl(${index * 72}, 70%, 50%)` }}
              ></div>
              <span>{item.company}: {item.hires}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="placement-reports">
      <div className="page-header">
        <h1>Placement Reports Dashboard</h1>
        <p>Comprehensive placement statistics and reports</p>
      </div>

      {/* Report Controls */}
      <div className="report-controls">
        <div className="report-filters">
          <div className="filter-group">
            <label>Report Type</label>
            <select 
              value={reportType} 
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="overview">Overview Report</option>
              <option value="detailed">Detailed Report</option>
              <option value="branch">Branch-wise Report</option>
              <option value="company">Company-wise Report</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Time Range</label>
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="annual">Annual</option>
              <option value="quarterly">Quarterly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
        
        <div className="report-actions">
          <button 
            className="primary-button"
            onClick={handleGenerateReport}
          >
            <FileText size={16} />
            Generate Report
          </button>
          <button 
            className="export-button"
            onClick={() => handleExportReport('pdf')}
          >
            <Download size={16} />
            Export PDF
          </button>
          <button 
            className="export-button"
            onClick={() => handleExportReport('excel')}
          >
            <Download size={16} />
            Export Excel
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><TrendingUp size={24} /></div>
          <div className="stat-info">
            <h3>{overallStats.placementPercentage}%</h3>
            <p>Placement Percentage</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Users size={24} /></div>
          <div className="stat-info">
            <h3>{overallStats.placedStudents}/{overallStats.totalStudents}</h3>
            <p>Students Placed</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><BarChart3 size={24} /></div>
          <div className="stat-info">
            <h3>{overallStats.avgPackage}</h3>
            <p>Average Package</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Award size={24} /></div>
          <div className="stat-info">
            <h3>{overallStats.highestPackage}</h3>
            <p>Highest Package</p>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="reports-grid">
        {/* Overall Placement Percentage */}
        <div className="chart-card">
          <div className="card-header">
            <h3>Overall Placement Percentage</h3>
          </div>
          <div className="placement-percentage">
            <div className="percentage-circle">
              <div className="percentage-value">{overallStats.placementPercentage}%</div>
              <div className="percentage-label">Placed</div>
            </div>
            <div className="percentage-breakdown">
              <div className="breakdown-item">
                <span>Placed Students</span>
                <span className="value">{overallStats.placedStudents}</span>
              </div>
              <div className="breakdown-item">
                <span>Not Placed</span>
                <span className="value">{overallStats.totalStudents - overallStats.placedStudents}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Recruiters */}
        <div className="chart-card">
          <div className="card-header">
            <h3>Top Recruiters</h3>
          </div>
          <div className="top-recruiters">
            <PieChartComponent data={topRecruiters} />
          </div>
        </div>

        {/* Branch-wise Placement Data */}
        <div className="chart-card">
          <div className="card-header">
            <h3>Branch-wise Placement Data</h3>
          </div>
          <div className="branch-chart">
            <BarChart data={branchWiseData} xKey="branch" yKey="placed" color="#10b981" />
            <div className="branch-table">
              <table>
                <thead>
                  <tr>
                    <th>Branch</th>
                    <th>Total</th>
                    <th>Placed</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {branchWiseData.map((branch, index) => (
                    <tr key={index}>
                      <td>{branch.branch}</td>
                      <td>{branch.total}</td>
                      <td>{branch.placed}</td>
                      <td>{branch.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Package Trends */}
        <div className="chart-card">
          <div className="card-header">
            <h3>Average Package Trends</h3>
          </div>
          <div className="package-trends">
            <div className="trend-chart">
              <BarChart data={packageTrends} xKey="year" yKey="avg" color="#f59e0b" />
            </div>
            <div className="trend-table">
              <table>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Avg Package (LPA)</th>
                    <th>Highest Package (LPA)</th>
                  </tr>
                </thead>
                <tbody>
                  {packageTrends.map((trend, index) => (
                    <tr key={index}>
                      <td>{trend.year}</td>
                      <td>{trend.avg}</td>
                      <td>{trend.highest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Annual Report Generation */}
      <div className="annual-report">
        <h2>Generate Annual Report</h2>
        <div className="report-form">
          <div className="form-row">
            <div className="form-group">
              <label>Report Year</label>
              <select>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Format</label>
              <select>
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="word">Word</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Include Sections</label>
            <div className="checkbox-group">
              <label className="checkbox-item">
                <input type="checkbox" defaultChecked /> Executive Summary
              </label>
              <label className="checkbox-item">
                <input type="checkbox" defaultChecked /> Placement Statistics
              </label>
              <label className="checkbox-item">
                <input type="checkbox" defaultChecked /> Company Analysis
              </label>
              <label className="checkbox-item">
                <input type="checkbox" defaultChecked /> Student Performance
              </label>
              <label className="checkbox-item">
                <input type="checkbox" defaultChecked /> Recommendations
              </label>
            </div>
          </div>
          
          <div className="form-actions">
            <button className="primary-button">
              <FileText size={16} />
              Generate Annual Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementReports;