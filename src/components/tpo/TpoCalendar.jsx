import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Plus, Search, Filter } from 'lucide-react';
import '../../App.css';

const TpoCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, day
  const [searchTerm, setSearchTerm] = useState('');

  // Sample events data
  const events = [
    {
      id: 1,
      title: "Microsoft Campus Drive",
      date: "2025-10-15",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium",
      type: "Placement",
      company: "Microsoft",
      attendees: 120
    },
    {
      id: 2,
      title: "Resume Building Workshop",
      date: "2025-10-18",
      time: "2:00 PM - 5:00 PM",
      location: "Seminar Hall 1",
      type: "Workshop",
      company: "TPO Office",
      attendees: 85
    },
    {
      id: 3,
      title: "Google Interview Prep Session",
      date: "2025-10-20",
      time: "11:00 AM - 1:00 PM",
      location: "Online",
      type: "Session",
      company: "Google",
      attendees: 250
    },
    {
      id: 4,
      title: "Amazon Internship Test",
      date: "2025-10-22",
      time: "9:00 AM - 12:00 PM",
      location: "Computer Labs",
      type: "Test",
      company: "Amazon",
      attendees: 95
    },
    {
      id: 5,
      title: "TCS Placement Drive",
      date: "2025-10-25",
      time: "10:00 AM - 5:00 PM",
      location: "Main Building",
      type: "Placement",
      company: "TCS",
      attendees: 210
    }
  ];

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    // Days from previous month to show
    const startDay = firstDay.getDay();
    // Total days to display (including previous/next month)
    const daysInMonth = lastDay.getDate();
    const totalDays = 42; // 6 weeks
    
    const days = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Next month days
    const remainingDays = totalDays - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Get month name and year
  const getMonthYear = () => {
    return currentMonth.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="tpo-calendar">
      <div className="page-header">
        <h1>Placements Calendar</h1>
        <p>View and manage all placement-related events</p>
      </div>

      {/* Controls */}
      <div className="events-controls">
        <div className="calendar-navigation">
          <button onClick={prevMonth} className="nav-button">‹</button>
          <h2>{getMonthYear()}</h2>
          <button onClick={nextMonth} className="nav-button">›</button>
        </div>
        
        <div className="view-controls">
          <button 
            className={`view-button ${view === 'month' ? 'active' : ''}`}
            onClick={() => setView('month')}
          >
            Month
          </button>
          <button 
            className={`view-button ${view === 'week' ? 'active' : ''}`}
            onClick={() => setView('week')}
          >
            Week
          </button>
          <button 
            className={`view-button ${view === 'day' ? 'active' : ''}`}
            onClick={() => setView('day')}
          >
            Day
          </button>
        </div>
        
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button className="filter-button">
          <Filter size={20} />
          Filters
        </button>
        
        <button className="add-review-button">
          <Plus size={20} />
          Add Event
        </button>
      </div>

      {/* Calendar View */}
      <div className="calendar-container">
        {/* Weekday Headers */}
        <div className="calendar-header">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="calendar-day-header">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="calendar-grid">
          {calendarDays.map((day, index) => {
            const dayEvents = getEventsForDate(day.date);
            return (
              <div 
                key={index} 
                className={`calendar-day ${day.isCurrentMonth ? 'current-month' : 'other-month'}`}
              >
                <div className="day-number">
                  {day.date.getDate()}
                </div>
                
                <div className="day-events">
                  {dayEvents.slice(0, 3).map(event => (
                    <div key={event.id} className="day-event">
                      <div className={`event-type ${event.type.toLowerCase()}`}>
                        {event.title}
                      </div>
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="more-events">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Events List */}
      <div className="events-section">
        <h2>Upcoming Events</h2>
        <div className="events-list">
          {events.map(event => (
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
                    <span>{formatDate(new Date(event.date))}</span>
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
                    <Users size={16} />
                    <span>{event.attendees} students</span>
                  </div>
                </div>
                
                <div className="event-type-badge">
                  {event.type}
                </div>
              </div>
              
              <div className="event-actions">
                <button className="register-button">
                  Edit Event
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TpoCalendar;