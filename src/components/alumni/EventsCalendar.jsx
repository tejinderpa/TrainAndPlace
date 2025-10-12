import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Search, Filter, Check, X } from 'lucide-react';
import '../../App.css';

const EventsCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, day
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');

  // Sample events data
  const events = [
    {
      id: 1,
      title: "Annual Alumni Reunion",
      date: "2025-11-15",
      time: "6:00 PM - 10:00 PM",
      location: "College Campus, Main Auditorium",
      type: "Reunion",
      attendees: 250,
      rsvpStatus: "Going",
      description: "Join us for our annual alumni reunion with networking opportunities, awards ceremony, and dinner."
    },
    {
      id: 2,
      title: "Tech Industry Trends Webinar",
      date: "2025-10-25",
      time: "3:00 PM - 4:30 PM",
      location: "Online",
      type: "Webinar",
      attendees: 320,
      rsvpStatus: "Interested",
      description: "Explore the latest trends shaping the technology industry in 2026 with our expert panel."
    },
    {
      id: 3,
      title: "Startup Pitch Night",
      date: "2025-11-05",
      time: "7:00 PM - 9:00 PM",
      location: "Innovation Hub, Bangalore",
      type: "Networking",
      attendees: 150,
      rsvpStatus: "Not Going",
      description: "Watch promising startups pitch their ideas to investors and industry experts."
    },
    {
      id: 4,
      title: "Career Guidance Workshop",
      date: "2025-10-18",
      time: "10:00 AM - 12:00 PM",
      location: "Online",
      type: "Workshop",
      attendees: 180,
      rsvpStatus: "Going",
      description: "Learn essential career skills including resume writing, interview techniques, and networking."
    },
    {
      id: 5,
      title: "Data Science Conference",
      date: "2025-12-01",
      time: "9:00 AM - 5:00 PM",
      location: "IT Park, Hyderabad",
      type: "Conference",
      attendees: 400,
      rsvpStatus: "Interested",
      description: "Annual conference featuring leading data scientists and industry experts."
    }
  ];

  const pastEvents = [
    {
      id: 6,
      title: "Mentorship Program Kickoff",
      date: "2025-09-15",
      time: "4:00 PM - 6:00 PM",
      location: "Online",
      type: "Mentorship",
      attendees: 85,
      rsvpStatus: "Attended",
      description: "Introduction to the new mentorship program connecting alumni with students."
    },
    {
      id: 7,
      title: "Leadership Workshop",
      date: "2025-08-20",
      time: "2:00 PM - 5:00 PM",
      location: "College Campus",
      type: "Workshop",
      attendees: 120,
      rsvpStatus: "Attended",
      description: "Develop your leadership skills with our interactive workshop."
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

  const handleRsvp = (eventId, status) => {
    console.log(`RSVP for event ${eventId}: ${status}`);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = eventTypeFilter === 'all' || event.type.toLowerCase() === eventTypeFilter;
    
    return matchesSearch && matchesType;
  });

  const getTypeClass = (type) => {
    switch (type.toLowerCase()) {
      case 'webinar': return 'webinar-event';
      case 'workshop': return 'workshop-event';
      case 'conference': return 'conference-event';
      case 'networking': return 'networking-event';
      case 'reunion': return 'reunion-event';
      case 'mentorship': return 'mentorship-event';
      default: return 'default-event';
    }
  };

  return (
    <div className="events-calendar">
      <div className="page-header">
        <h1>Events Calendar</h1>
        <p>Browse upcoming events and manage your RSVPs</p>
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
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={eventTypeFilter} 
              onChange={(e) => setEventTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="webinar">Webinars</option>
              <option value="workshop">Workshops</option>
              <option value="conference">Conferences</option>
              <option value="networking">Networking</option>
              <option value="reunion">Reunions</option>
              <option value="mentorship">Mentorship</option>
            </select>
          </div>
        </div>
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
                    <div key={event.id} className={`day-event ${getTypeClass(event.type)}`}>
                      <div className="event-time">{event.time.split(' ')[0]}</div>
                      <div className="event-title">{event.title}</div>
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

      {/* Upcoming Events List */}
      <div className="upcoming-events">
        <h2>Upcoming Events</h2>
        
        {filteredEvents.length > 0 ? (
          <div className="events-list">
            {filteredEvents.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-header">
                  <div className={`event-type-badge ${getTypeClass(event.type)}`}>
                    {event.type}
                  </div>
                  <h3>{event.title}</h3>
                  <div className="event-date">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                
                <div className="event-details">
                  <div className="detail-item">
                    <Clock size={16} />
                    <span>{event.time}</span>
                  </div>
                  <div className="detail-item">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  <div className="detail-item">
                    <Users size={16} />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
                
                <div className="event-description">
                  <p>{event.description}</p>
                </div>
                
                <div className="event-actions">
                  <button 
                    className={`rsvp-button ${event.rsvpStatus === 'Going' ? 'going' : ''}`}
                    onClick={() => handleRsvp(event.id, 'Going')}
                  >
                    <Check size={16} />
                    Going
                  </button>
                  <button 
                    className={`rsvp-button ${event.rsvpStatus === 'Interested' ? 'interested' : ''}`}
                    onClick={() => handleRsvp(event.id, 'Interested')}
                  >
                    Interested
                  </button>
                  <button 
                    className={`rsvp-button ${event.rsvpStatus === 'Not Going' ? 'not-going' : ''}`}
                    onClick={() => handleRsvp(event.id, 'Not Going')}
                  >
                    <X size={16} />
                    Not Going
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No upcoming events found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Past Events */}
      <div className="past-events">
        <h2>Past Events You Attended</h2>
        
        {pastEvents.length > 0 ? (
          <div className="events-list">
            {pastEvents.map(event => (
              <div key={event.id} className="event-card past-event">
                <div className="event-header">
                  <div className={`event-type-badge ${getTypeClass(event.type)}`}>
                    {event.type}
                  </div>
                  <h3>{event.title}</h3>
                  <div className="event-date">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                
                <div className="event-details">
                  <div className="detail-item">
                    <Clock size={16} />
                    <span>{event.time}</span>
                  </div>
                  <div className="detail-item">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  <div className="detail-item">
                    <Users size={16} />
                    <span>{event.attendees} attended</span>
                  </div>
                </div>
                
                <div className="event-description">
                  <p>{event.description}</p>
                </div>
                
                <div className="event-status">
                  <div className="status-badge attended">
                    Attended
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>You haven't attended any past events.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsCalendar;