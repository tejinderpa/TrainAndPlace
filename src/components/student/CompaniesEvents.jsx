import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Building2, Search, Filter } from 'lucide-react';
import '../../App.css';

const CompaniesEvents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  // Mock data for events
  const events = [
    {
      id: 1,
      title: "Google Tech Talk & Recruitment Drive",
      company: "Google",
      date: "2025-10-20",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium, College Campus",
      type: "Placement Drive",
      attendees: 150,
      description: "Join us for a tech talk by Google engineers followed by a recruitment drive for software engineering positions.",
      registrationDeadline: "2025-10-18",
      registered: true
    },
    {
      id: 2,
      title: "Microsoft Coding Workshop",
      company: "Microsoft",
      date: "2025-10-25",
      time: "2:00 PM - 5:00 PM",
      location: "Computer Science Department",
      type: "Workshop",
      attendees: 80,
      description: "Hands-on coding workshop covering data structures and algorithms with Microsoft engineers.",
      registrationDeadline: "2025-10-23",
      registered: false
    },
    {
      id: 3,
      title: "Amazon Leadership Series",
      company: "Amazon",
      date: "2025-11-02",
      time: "11:00 AM - 1:00 PM",
      location: "Seminar Hall 2",
      type: "Seminar",
      attendees: 120,
      description: "Learn about leadership principles at Amazon and career opportunities in the company.",
      registrationDeadline: "2025-10-30",
      registered: false
    },
    {
      id: 4,
      title: "Adobe Design Masterclass",
      company: "Adobe",
      date: "2025-11-08",
      time: "3:00 PM - 6:00 PM",
      location: "Design Studio",
      type: "Workshop",
      attendees: 60,
      description: "Master the art of UI/UX design with Adobe's design experts in this interactive session.",
      registrationDeadline: "2025-11-05",
      registered: false
    }
  ];

  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'All' || event.type === filterType;
    
    return matchesSearch && matchesType;
  });

  // Get unique event types for filter
  const eventTypes = ['All', ...new Set(events.map(event => event.type))];

  return (
    <div className="companies-events">
      <div className="page-header">
        <h1>Company Events</h1>
        <p>Upcoming events, workshops, and placement drives</p>
      </div>

      {/* Search and Filters */}
      <div className="events-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search events, companies..."
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
              {eventTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="events-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-header">
                <div className="company-info">
                  <div className="company-logo">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3>{event.title}</h3>
                    <p>{event.company}</p>
                  </div>
                </div>
                <div className={`registration-status ${event.registered ? 'registered' : 'not-registered'}`}>
                  {event.registered ? 'Registered' : 'Not Registered'}
                </div>
              </div>
              
              <div className="event-details">
                <div className="event-info">
                  <div className="info-item">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                  </div>
                  <div className="info-item">
                    <Clock size={16} />
                    <span>{event.time}</span>
                  </div>
                  <div className="info-item">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  <div className="info-item">
                    <Users size={16} />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>
                
                <p className="event-description">{event.description}</p>
                
                <div className="event-meta">
                  <div className="event-type">
                    <span className="tag">{event.type}</span>
                  </div>
                  <div className="deadline">
                    Registration deadline: {event.registrationDeadline}
                  </div>
                </div>
              </div>
              
              <div className="event-actions">
                {event.registered ? (
                  <button className="secondary-button">View Details</button>
                ) : (
                  <button className="primary-button">Register Now</button>
                )}
                <button className="secondary-button">Add to Calendar</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-events">
            <p>No events found matching your criteria. Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompaniesEvents;