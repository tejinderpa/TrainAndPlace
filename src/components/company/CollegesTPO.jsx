import React, { useState } from 'react';
import { Search, Filter, Building2, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import '../../App.css';

const CollegesTPO = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('All');

  // Mock data for colleges and TPO contacts
  const colleges = [
    {
      id: 1,
      name: "National Institute of Technology",
      location: "New Delhi, India",
      type: "Public",
      students: 4500,
      established: "1961",
      website: "https://www.nit.edu",
      tpo: {
        name: "Dr. Rajesh Kumar",
        email: "tpo@nit.edu",
        phone: "+91 11 2345 6789",
        designation: "Chief Placement Officer"
      }
    },
    {
      id: 2,
      name: "Indian Institute of Technology",
      location: "Mumbai, India",
      type: "Public",
      students: 3200,
      established: "1958",
      website: "https://www.iit.edu",
      tpo: {
        name: "Prof. Meera Patel",
        email: "tpo@iit.edu",
        phone: "+91 22 3456 7890",
        designation: "Dean of Placements"
      }
    },
    {
      id: 3,
      name: "Delhi Technological University",
      location: "Delhi, India",
      type: "Public",
      students: 5100,
      established: "1941",
      website: "https://www.dtu.edu",
      tpo: {
        name: "Dr. Anil Sharma",
        email: "tpo@dtu.edu",
        phone: "+91 11 4567 8901",
        designation: "Placement Coordinator"
      }
    }
  ];

  // Filter colleges based on search and filters
  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          college.tpo.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = filterLocation === 'All' || college.location.includes(filterLocation);
    
    return matchesSearch && matchesLocation;
  });

  // Get unique locations for filter
  const locations = ['All', ...new Set(colleges.map(college => {
    const parts = college.location.split(',');
    return parts[parts.length - 2] ? parts[parts.length - 2].trim() : college.location;
  }))];

  return (
    <div className="colleges-tpo">
      <div className="page-header">
        <h1>Colleges & TPO Directory</h1>
        <p>Connect with colleges and their Training & Placement Officers</p>
      </div>

      {/* Search and Filters */}
      <div className="colleges-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search colleges, TPOs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={filterLocation} 
              onChange={(e) => setFilterLocation(e.target.value)}
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
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
                <div className="college-icon">
                  <Building2 size={32} />
                </div>
                <div className="college-info">
                  <h3>{college.name}</h3>
                  <p>{college.type} Institution • Est. {college.established}</p>
                  <p className="location">
                    <MapPin size={16} />
                    {college.location}
                  </p>
                  <p>{college.students} students</p>
                </div>
              </div>
              
              <div className="college-details">
                <div className="website">
                  <a href={college.website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </a>
                </div>
                
                <div className="tpo-info">
                  <h4>TPO Contact</h4>
                  <div className="info-item">
                    <User size={16} />
                    <span>{college.tpo.name}</span>
                  </div>
                  <div className="info-item">
                    <Mail size={16} />
                    <a href={`mailto:${college.tpo.email}`}>{college.tpo.email}</a>
                  </div>
                  <div className="info-item">
                    <Phone size={16} />
                    <a href={`tel:${college.tpo.phone}`}>{college.tpo.phone}</a>
                  </div>
                  <div className="info-item">
                    <Briefcase size={16} />
                    <span>{college.tpo.designation}</span>
                  </div>
                </div>
              </div>
              
              <div className="college-actions">
                <button className="primary-button">
                  <Mail size={16} />
                  Contact TPO
                </button>
                <button className="secondary-button">
                  <Calendar size={16} />
                  Schedule Meeting
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-colleges">
            <p>No colleges found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegesTPO;