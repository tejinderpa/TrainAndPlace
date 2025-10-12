import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Video, Send, User, Search, Filter } from 'lucide-react';
import '../../App.css';

const InterviewScheduler = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, day
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Sample student data
  const students = [
    { id: 1, name: "Alex Johnson", college: "NIT Trichy", branch: "Computer Science", cgpa: 8.7 },
    { id: 2, name: "Sarah Williams", college: "IIT Delhi", branch: "Electronics", cgpa: 9.2 },
    { id: 3, name: "Michael Chen", college: "IIIT Hyderabad", branch: "Data Science", cgpa: 8.9 },
    { id: 4, name: "Priya Sharma", college: "NID Ahmedabad", branch: "Design", cgpa: 8.5 }
  ];

  // Sample interview data
  const interviews = [
    {
      id: 1,
      student: { id: 1, name: "Alex Johnson" },
      date: "2025-10-15",
      time: "10:00 AM",
      mode: "online",
      link: "https://meet.google.com/abc-defg-hij",
      status: "scheduled"
    },
    {
      id: 2,
      student: { id: 2, name: "Sarah Williams" },
      date: "2025-10-16",
      time: "2:00 PM",
      mode: "offline",
      location: "Main Conference Room",
      status: "scheduled"
    },
    {
      id: 3,
      student: { id: 3, name: "Michael Chen" },
      date: "2025-10-17",
      time: "11:00 AM",
      mode: "online",
      link: "https://zoom.us/j/1234567890",
      status: "completed"
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

  // Get interviews for a specific date
  const getInterviewsForDate = (date) => {
    return interviews.filter(interview => {
      const interviewDate = new Date(interview.date);
      return interviewDate.toDateString() === date.toDateString();
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

  const handleSelectStudent = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter(studentId => studentId !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map(student => student.id));
    }
  };

  const handleScheduleInterviews = () => {
    console.log("Scheduling interviews for students:", selectedStudents);
  };

  return (
    <div className="interview-scheduler">
      <div className="page-header">
        <h1>Interview Scheduler</h1>
        <p>Schedule and manage interviews with students</p>
      </div>

      {/* Controls */}
      <div className="scheduler-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
        
        <button className="filter-button">
          <Filter size={20} />
          Filters
        </button>
      </div>

      <div className="scheduler-layout">
        {/* Student Selection Panel */}
        <div className="students-panel">
          <div className="panel-header">
            <h3>Select Students</h3>
            <button 
              className="select-all-button"
              onClick={handleSelectAll}
            >
              {selectedStudents.length === students.length ? "Deselect All" : "Select All"}
            </button>
          </div>
          
          <div className="students-list">
            {students.map(student => (
              <div key={student.id} className="student-item">
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => handleSelectStudent(student.id)}
                />
                <div className="student-info">
                  <h4>{student.name}</h4>
                  <p>{student.college} - {student.branch}</p>
                  <p>CGPA: {student.cgpa}</p>
                </div>
              </div>
            ))}
          </div>
          
          {selectedStudents.length > 0 && (
            <div className="schedule-actions">
              <button className="primary-button" onClick={handleScheduleInterviews}>
                <Calendar size={16} />
                Schedule Interviews
              </button>
            </div>
          )}
        </div>

        {/* Calendar View */}
        <div className="calendar-panel">
          <div className="calendar-header">
            <button onClick={prevMonth} className="nav-button">‹</button>
            <h2>{getMonthYear()}</h2>
            <button onClick={nextMonth} className="nav-button">›</button>
          </div>
          
          {/* Weekday Headers */}
          <div className="calendar-day-headers">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-day-header">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          <div className="calendar-grid">
            {calendarDays.map((day, index) => {
              const dayInterviews = getInterviewsForDate(day.date);
              return (
                <div 
                  key={index} 
                  className={`calendar-day ${day.isCurrentMonth ? 'current-month' : 'other-month'}`}
                >
                  <div className="day-number">
                    {day.date.getDate()}
                  </div>
                  
                  <div className="day-interviews">
                    {dayInterviews.slice(0, 2).map(interview => (
                      <div key={interview.id} className={`day-interview ${interview.status}`}>
                        <div className="interview-time">{interview.time}</div>
                        <div className="interview-student">{interview.student.name}</div>
                      </div>
                    ))}
                    {dayInterviews.length > 2 && (
                      <div className="more-interviews">
                        +{dayInterviews.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Interviews */}
      <div className="upcoming-interviews">
        <h3>Upcoming Interviews</h3>
        <div className="interviews-list">
          {interviews.filter(i => i.status === 'scheduled').map(interview => (
            <div key={interview.id} className="interview-card">
              <div className="interview-header">
                <div className="student-avatar">
                  <User size={24} />
                </div>
                <div className="interview-info">
                  <h4>{interview.student.name}</h4>
                  <p>{interview.date} at {interview.time}</p>
                </div>
              </div>
              
              <div className="interview-details">
                <div className="detail-item">
                  <Calendar size={16} />
                  <span>{interview.date}</span>
                </div>
                <div className="detail-item">
                  <Clock size={16} />
                  <span>{interview.time}</span>
                </div>
                <div className="detail-item">
                  {interview.mode === 'online' ? <Video size={16} /> : <MapPin size={16} />}
                  <span>
                    {interview.mode === 'online' ? 
                      <a href={interview.link} target="_blank" rel="noopener noreferrer">Online Meeting</a> : 
                      interview.location}
                  </span>
                </div>
              </div>
              
              <div className="interview-actions">
                <button className="secondary-button">
                  <Send size={16} />
                  Send Reminder
                </button>
                <button className="primary-button">
                  <Calendar size={16} />
                  Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduler;