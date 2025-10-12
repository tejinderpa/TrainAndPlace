import React, { useState } from 'react';
import { User, Search, Filter, MapPin, Briefcase, GraduationCap, MessageCircle, Mail, Phone } from 'lucide-react';
import '../../App.css';

const Network = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');

  // Mock data for alumni connections
  const connections = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Senior Software Engineer",
      company: "Google",
      location: "Bangalore, India",
      industry: "Technology",
      batch: "2015",
      degree: "B.Tech Computer Science",
      mutualConnections: 12,
      status: "Connected"
    },
    {
      id: 2,
      name: "Mr. Rajesh Patel",
      role: "Product Manager",
      company: "Microsoft",
      location: "Hyderabad, India",
      industry: "Technology",
      batch: "2014",
      degree: "MBA",
      mutualConnections: 8,
      status: "Pending"
    },
    {
      id: 3,
      name: "Ms. Priya Sharma",
      role: "UX Design Lead",
      company: "Adobe",
      location: "Mumbai, India",
      industry: "Design",
      batch: "2016",
      degree: "M.Des",
      mutualConnections: 15,
      status: "Connected"
    },
    {
      id: 4,
      name: "Mr. Amit Kumar",
      role: "Data Scientist",
      company: "Amazon",
      location: "Delhi, India",
      industry: "E-commerce",
      batch: "2017",
      degree: "B.Tech Electronics",
      mutualConnections: 5,
      status: "Not Connected"
    }
  ];

  // Filter connections based on search and filters
  const filteredConnections = connections.filter(connection => {
    const matchesSearch = connection.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          connection.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          connection.industry.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = filterIndustry === 'All' || connection.industry === filterIndustry;
    const matchesLocation = filterLocation === 'All' || connection.location.includes(filterLocation);
    
    return matchesSearch && matchesIndustry && matchesLocation;
  });

  // Get unique industries and locations for filters
  const industries = ['All', ...new Set(connections.map(connection => connection.industry))];
  const locations = ['All', ...new Set(connections.map(connection => {
    const parts = connection.location.split(',');
    return parts[parts.length - 2] ? parts[parts.length - 2].trim() : connection.location;
  }))];

  return (
    <div className="network">
      <div className="page-header">
        <h1>Alumni Network</h1>
        <p>Connect with fellow alumni and expand your professional network</p>
      </div>

      {/* Search and Filters */}
      <div className="network-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search alumni by name, company, or industry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={filterIndustry} 
              onChange={(e) => setFilterIndustry(e.target.value)}
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <MapPin size={20} />
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

      {/* Connections List */}
      <div className="connections-grid">
        {filteredConnections.length > 0 ? (
          filteredConnections.map(connection => (
            <div key={connection.id} className="connection-card">
              <div className="connection-header">
                <div className="connection-avatar">
                  <User size={32} />
                </div>
                <div className="connection-info">
                  <h3>{connection.name}</h3>
                  <p>{connection.role} at {connection.company}</p>
                  <div className={`connection-status ${connection.status.toLowerCase().replace(' ', '-')}`}>
                    {connection.status}
                  </div>
                </div>
              </div>
              
              <div className="connection-details">
                <div className="info-item">
                  <MapPin size={16} />
                  <span>{connection.location}</span>
                </div>
                <div className="info-item">
                  <Briefcase size={16} />
                  <span>{connection.industry}</span>
                </div>
                <div className="info-item">
                  <GraduationCap size={16} />
                  <span>Batch of {connection.batch} • {connection.degree}</span>
                </div>
                <div className="info-item">
                  <User size={16} />
                  <span>{connection.mutualConnections} mutual connections</span>
                </div>
              </div>
              
              <div className="connection-actions">
                {connection.status === 'Connected' ? (
                  <>
                    <button className="primary-button">
                      <MessageCircle size={16} />
                      Message
                    </button>
                    <button className="secondary-button">
                      <Mail size={16} />
                      Email
                    </button>
                  </>
                ) : connection.status === 'Pending' ? (
                  <button className="secondary-button" disabled>
                    <Clock size={16} />
                    Request Pending
                  </button>
                ) : (
                  <button className="primary-button">
                    <User size={16} />
                    Connect
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-connections">
            <p>No alumni connections found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Network Stats */}
      <div className="network-stats">
        <div className="stat-card">
          <User size={32} />
          <div>
            <h3>{connections.length}</h3>
            <p>Total Connections</p>
          </div>
        </div>
        <div className="stat-card">
          <Briefcase size={32} />
          <div>
            <h3>{new Set(connections.map(c => c.industry)).size}</h3>
            <p>Industries</p>
          </div>
        </div>
        <div className="stat-card">
          <MapPin size={32} />
          <div>
            <h3>{new Set(connections.map(c => c.location)).size}</h3>
            <p>Locations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;