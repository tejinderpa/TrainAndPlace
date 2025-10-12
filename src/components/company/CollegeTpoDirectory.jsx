import React, { useState } from 'react';
import { Search, Filter, Mail, Phone, MapPin, TrendingUp, Send } from 'lucide-react';
import '../../App.css';

const CollegeTpoDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');

  // Sample college data
  const colleges = [
    {
      id: 1,
      name: "National Institute of Technology Trichy",
      location: "Tiruchirappalli, Tamil Nadu",
      branches: ["Computer Science", "Electronics", "Mechanical", "Civil"],
      studentStrength: 4500,
      tpo: {
        name: "Dr. Rajesh Kumar",
        email: "tpo@nittrichy.edu.in",
        phone: "+91 98765 43210"
      },
      stats: {
        placementRate: 85,
        avgPackage: "12.5 LPA",
        highestPackage: "35 LPA"
      }
    },
    {
      id: 2,
      name: "Indian Institute of Technology Delhi",
      location: "New Delhi",
      branches: ["Computer Science", "Electrical", "Mechanical", "Chemical"],
      studentStrength: 5200,
      tpo: {
        name: "Dr. Priya Sharma",
        email: "tpo@iitd.ac.in",
        phone: "+91 87654 32109"
      },
      stats: {
        placementRate: 92,
        avgPackage: "18.2 LPA",
        highestPackage: "1.2 Cr PA"
      }
    },
    {
      id: 3,
      name: "International Institute of Information Technology Hyderabad",
      location: "Hyderabad, Telangana",
      branches: ["Computer Science", "Data Science", "Electronics"],
      studentStrength: 2800,
      tpo: {
        name: "Dr. Amit Patel",
        email: "tpo@iiit.ac.in",
        phone: "+91 76543 21098"
      },
      stats: {
        placementRate: 88,
        avgPackage: "15.8 LPA",
        highestPackage: "42 LPA"
      }
    },
    {
      id: 4,
      name: "National Institute of Design Ahmedabad",
      location: "Ahmedabad, Gujarat",
      branches: ["Design", "Communication", "Textile"],
      studentStrength: 1200,
      tpo: {
        name: "Ms. Sneha Desai",
        email: "tpo@nid.edu",
        phone: "+91 65432 10987"
      },
      stats: {
        placementRate: 78,
        avgPackage: "8.5 LPA",
        highestPackage: "22 LPA"
      }
    }
  ];

  const locations = [...new Set(colleges.map(college => college.location.split(',')[1]?.trim() || college.location))];
  const branches = [...new Set(colleges.flatMap(college => college.branches))];

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === 'all' || 
      college.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    const matchesBranch = branchFilter === 'all' || 
      college.branches.some(branch => branch.toLowerCase().includes(branchFilter.toLowerCase()));
    
    return matchesSearch && matchesLocation && matchesBranch;
  });

  const handleContactTpo = (tpo) => {
    console.log("Contacting TPO:", tpo);
  };

  return (
    <div className="college-tpo-directory">
      <div className="page-header">
        <h1>College & TPO Directory</h1>
        <p>Connect with colleges and their placement coordinators</p>
      </div>

      {/* Controls */}
      <div className="directory-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by college name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={locationFilter} 
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="all">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <select 
              value={branchFilter} 
              onChange={(e) => setBranchFilter(e.target.value)}
            >
              <option value="all">All Branches</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Colleges List */}
      <div className="colleges-grid">
        {filteredColleges.length > 0 ? (
          filteredColleges.map(college => (
            <div key={college.id} className="college-card">
              <div className="college-header">
                <div className="college-logo">
                  {college.name.charAt(0)}
                </div>
                <div className="college-info">
                  <h3>{college.name}</h3>
                  <div className="college-location">
                    <MapPin size={16} />
                    <span>{college.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="college-details">
                <div className="college-stats">
                  <div className="stat-item">
                    <span className="label">Student Strength</span>
                    <span className="value">{college.studentStrength}</span>
                  </div>
                  <div className="stat-item">
                    <span className="label">Placement Rate</span>
                    <span className="value">{college.stats.placementRate}%</span>
                  </div>
                  <div className="stat-item">
                    <span className="label">Avg Package</span>
                    <span className="value">{college.stats.avgPackage}</span>
                  </div>
                </div>
                
                <div className="branches">
                  <h4>Branches Offered</h4>
                  <div className="branch-tags">
                    {college.branches.slice(0, 3).map((branch, index) => (
                      <span key={index} className="branch-tag">{branch}</span>
                    ))}
                    {college.branches.length > 3 && (
                      <span className="branch-tag">+{college.branches.length - 3}</span>
                    )}
                  </div>
                </div>
                
                <div className="tpo-info">
                  <h4>TPO Contact</h4>
                  <div className="tpo-details">
                    <p><strong>{college.tpo.name}</strong></p>
                    <div className="contact-info">
                      <div className="contact-item">
                        <Mail size={16} />
                        <a href={`mailto:${college.tpo.email}`}>{college.tpo.email}</a>
                      </div>
                      <div className="contact-item">
                        <Phone size={16} />
                        <a href={`tel:${college.tpo.phone}`}>{college.tpo.phone}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="college-actions">
                <button 
                  className="primary-button"
                  onClick={() => handleContactTpo(college.tpo)}
                >
                  <Send size={16} />
                  Contact TPO
                </button>
                <button className="secondary-button">
                  <TrendingUp size={16} />
                  View Statistics
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No colleges found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeTpoDirectory;