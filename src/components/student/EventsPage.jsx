import React, { useState } from 'react';
import { Calendar, MapPin, Clock, User, Filter } from 'lucide-react';
import '../../App.css';

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('hackathons');
  const [registeredEvents, setRegisteredEvents] = useState(new Set([1, 4])); // Pre-registered events for demo

  // Sample event data
  const events = [
    {
      id: 1,
      company: "Microsoft",
      title: "Azure Cloud Hackathon",
      date: "2025-10-20",
      time: "10:00 AM - 6:00 PM",
      location: "Microsoft Office, Hyderabad",
      type: "Hackathons",
      description: "48-hour hackathon focused on building innovative solutions using Azure cloud services.",
      registered: 120,
      maxParticipants: 150
    },
    {
      id: 2,
      company: "Google",
      title: "Machine Learning Workshop",
      date: "2025-10-25",
      time: "2:00 PM - 5:00 PM",
      location: "Google Office, Bangalore",
      type: "Workshops",
      description: "Hands-on workshop covering the fundamentals of machine learning with TensorFlow.",
      registered: 85,
      maxParticipants: 100
    },
    {
      id: 3,
      company: "Amazon",
      title: "AWS Certification Webinar",
      date: "2025-11-01",
      time: "4:00 PM - 6:00 PM",
      location: "Online",
      type: "Webinars",
      description: "Learn about AWS certification paths and prepare for the Cloud Practitioner exam.",
      registered: 250,
      maxParticipants: 500
    },
    {
      id: 4,
      company: "Meta",
      title: "React Challenge",
      date: "2025-11-05",
      time: "9:00 AM - 5:00 PM",
      location: "Meta Office, Mumbai",
      type: "Challenges",
      description: "Coding challenge focused on building modern web applications with React.",
      registered: 75,
      maxParticipants: 100
    },
    {
      id: 5,
      company: "Apple",
      title: "iOS Development Workshop",
      date: "2025-11-10",
      time: "11:00 AM - 3:00 PM",
      location: "Apple Developer Center, Delhi",
      type: "Workshops",
      description: "Learn to build iOS applications using Swift and Xcode.",
      registered: 45,
      maxParticipants: 60
    }
  ];

  const toggleRegistration = (eventId) => {
    const newRegisteredEvents = new Set(registeredEvents);
    if (newRegisteredEvents.has(eventId)) {
      newRegisteredEvents.delete(eventId);
    } else {
      newRegisteredEvents.add(eventId);
    }
    setRegisteredEvents(newRegisteredEvents);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="events-page">
      <div className="page-header">
        <h1>Companies & Events</h1>
        <p>Discover upcoming events and expand your network</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'hackathons' ? 'active' : ''}`}
          onClick={() => setActiveTab('hackathons')}
        >
          Hackathons
        </button>
        <button 
          className={`tab ${activeTab === 'workshops' ? 'active' : ''}`}
          onClick={() => setActiveTab('workshops')}
        >
          Workshops
        </button>
        <button 
          className={`tab ${activeTab === 'webinars' ? 'active' : ''}`}
          onClick={() => setActiveTab('webinars')}
        >
          Webinars
        </button>
        <button 
          className={`tab ${activeTab === 'challenges' ? 'active' : ''}`}
          onClick={() => setActiveTab('challenges')}
        >
          Challenges
        </button>
      </div>

      {/* Search and Filters */}
      <div className="events-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search events..."
          />
        </div>
        <button className="filter-button">
          <Filter size={20} />
          Filters
        </button>
      </div>

      {/* Event Listings */}
      <div className="events-list">
        {events
          .filter(event => event.type.toLowerCase() === activeTab)
          .map(event => (
            <div key={event.id} className="event-card">
              <div className="event-header">
                <div className="company-info">
                  <div className="company-logo">
                    {event.company.charAt(0)}
                  </div>
                  <div>
                    <h3>{event.title}</h3>
                    <p>{event.company}</p>
                  </div>
                </div>
                <div className="event-date-badge">
                  <span className="date">{new Date(event.date).getDate()}</span>
                  <span className="month">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                </div>
              </div>
              
              <div className="event-details">
                <div className="event-meta">
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>{event.time}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  <div className="meta-item">
                    <User size={16} />
                    <span>{event.registered}/{event.maxParticipants} registered</span>
                  </div>
                </div>
                
                <p className="event-description">
                  {event.description}
                </p>
              </div>
              
              <div className="event-actions">
                <button 
                  className={`register-button ${registeredEvents.has(event.id) ? 'registered' : ''}`}
                  onClick={() => toggleRegistration(event.id)}
                >
                  {registeredEvents.has(event.id) ? 'Registered' : 'Register'}
                </button>
              </div>
            </div>
          ))
        }
        
        {events.filter(event => event.type.toLowerCase() === activeTab).length === 0 && (
          <div className="no-events">
            <p>No events found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;