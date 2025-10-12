import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, GraduationCap, Briefcase, Calendar, MessageCircle, Search, Filter } from 'lucide-react';
import '../../App.css';

const Mentorship = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('All');
  const [filterExperience, setFilterExperience] = useState('All');

  // Mock data for mentors
  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Senior Software Engineer",
      company: "Google",
      industry: "Technology",
      experience: "8+ years",
      location: "Bangalore, India",
      email: "sarah.j@google.com",
      phone: "+91 98765 43210",
      education: "PhD in Computer Science, IIT Bombay",
      skills: ["Machine Learning", "Cloud Computing", "System Design"],
      availability: "Weekends, Evening",
      rating: 4.8,
      sessions: 125,
      description: "Experienced software engineer with expertise in machine learning and cloud technologies. Passionate about mentoring students."
    },
    {
      id: 2,
      name: "Mr. Rajesh Patel",
      role: "Product Manager",
      company: "Microsoft",
      industry: "Technology",
      experience: "6+ years",
      location: "Hyderabad, India",
      email: "rajesh.p@microsoft.com",
      phone: "+91 87654 32109",
      education: "MBA, IIM Ahmedabad",
      skills: ["Product Strategy", "Agile", "Market Research"],
      availability: "Weekdays, Morning",
      rating: 4.6,
      sessions: 98,
      description: "Product management professional with experience in leading cross-functional teams and launching successful products."
    },
    {
      id: 3,
      name: "Ms. Priya Sharma",
      role: "UX Design Lead",
      company: "Adobe",
      industry: "Design",
      experience: "5+ years",
      location: "Mumbai, India",
      email: "priya.s@adobe.com",
      phone: "+91 76543 21098",
      education: "M.Des, NID",
      skills: ["UI/UX Design", "User Research", "Prototyping"],
      availability: "Weekends, Afternoon",
      rating: 4.9,
      sessions: 87,
      description: "Creative design leader with expertise in user experience and interface design. Specializes in mentoring design students."
    }
  ];

  // Mock data for upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      mentor: "Dr. Sarah Johnson",
      date: "2025-10-15",
      time: "3:00 PM - 4:00 PM",
      topic: "Machine Learning Career Path",
      status: "Confirmed"
    },
    {
      id: 2,
      mentor: "Mr. Rajesh Patel",
      date: "2025-10-18",
      time: "10:00 AM - 11:00 AM",
      topic: "Product Management Fundamentals",
      status: "Pending Confirmation"
    }
  ];

  // Filter mentors based on search and filters
  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          mentor.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesIndustry = filterIndustry === 'All' || mentor.industry === filterIndustry;
    const matchesExperience = filterExperience === 'All' || mentor.experience === filterExperience;
    
    return matchesSearch && matchesIndustry && matchesExperience;
  });

  // Get unique industries and experience levels for filters
  const industries = ['All', ...new Set(mentors.map(mentor => mentor.industry))];
  const experienceLevels = ['All', ...new Set(mentors.map(mentor => mentor.experience))];

  return (
    <div className="mentorship">
      <div className="page-header">
        <h1>Mentorship Program</h1>
        <p>Connect with industry professionals for career guidance and mentorship</p>
      </div>

      {/* Upcoming Sessions */}
      <div className="sessions-section">
        <div className="section-header">
          <h2>Upcoming Mentorship Sessions</h2>
          <a href="#" className="view-all">View All</a>
        </div>
        
        <div className="sessions-list">
          {upcomingSessions.map(session => (
            <div key={session.id} className="session-card">
              <div className="session-header">
                <h3>{session.topic}</h3>
                <div className={`session-status ${session.status.toLowerCase().replace(' ', '-')}`}>
                  {session.status}
                </div>
              </div>
              
              <div className="session-details">
                <div className="info-item">
                  <User size={16} />
                  <span>{session.mentor}</span>
                </div>
                <div className="info-item">
                  <Calendar size={16} />
                  <span>{session.date} at {session.time}</span>
                </div>
              </div>
              
              <div className="session-actions">
                <button className="secondary-button">
                  <MessageCircle size={16} />
                  Join Session
                </button>
                <button className="secondary-button">
                  Add to Calendar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mentorship-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search mentors, companies, skills..."
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
            <GraduationCap size={20} />
            <select 
              value={filterExperience} 
              onChange={(e) => setFilterExperience(e.target.value)}
            >
              {experienceLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mentors List */}
      <div className="mentors-section">
        <div className="section-header">
          <h2>Available Mentors</h2>
        </div>
        
        <div className="mentors-grid">
          {filteredMentors.map(mentor => (
            <div key={mentor.id} className="mentor-card">
              <div className="mentor-header">
                <div className="mentor-avatar">
                  <User size={32} />
                </div>
                <div className="mentor-info">
                  <h3>{mentor.name}</h3>
                  <p>{mentor.role} at {mentor.company}</p>
                  <div className="mentor-rating">
                    <span className="rating">{mentor.rating}</span>
                    <span>({mentor.sessions} sessions)</span>
                  </div>
                </div>
              </div>
              
              <div className="mentor-details">
                <div className="info-item">
                  <Briefcase size={16} />
                  <span>{mentor.industry} • {mentor.experience}</span>
                </div>
                <div className="info-item">
                  <MapPin size={16} />
                  <span>{mentor.location}</span>
                </div>
                <div className="info-item">
                  <GraduationCap size={16} />
                  <span>{mentor.education}</span>
                </div>
                
                <div className="skills-list">
                  {mentor.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
                
                <p className="mentor-description">{mentor.description}</p>
                
                <div className="mentor-availability">
                  <strong>Availability:</strong> {mentor.availability}
                </div>
              </div>
              
              <div className="mentor-actions">
                <button className="primary-button">
                  <MessageCircle size={16} />
                  Request Session
                </button>
                <button className="secondary-button">
                  <Mail size={16} />
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mentorship;