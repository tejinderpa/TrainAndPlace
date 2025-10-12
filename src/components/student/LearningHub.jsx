import React, { useState } from 'react';
import { BookOpen, Play, Clock, User, Star, Search, Filter, Award } from 'lucide-react';
import '../../App.css';

const LearningHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Mock data for courses
  const courses = [
    {
      id: 1,
      title: "Advanced Data Structures & Algorithms",
      provider: "Google",
      category: "Programming",
      duration: "8 weeks",
      level: "Intermediate",
      rating: 4.8,
      students: 1250,
      progress: 75,
      description: "Master advanced data structures and algorithms to crack coding interviews at top tech companies.",
      skills: ["Algorithms", "Data Structures", "Problem Solving", "Big O Notation"]
    },
    {
      id: 2,
      title: "Full Stack Web Development",
      provider: "Microsoft",
      category: "Web Development",
      duration: "12 weeks",
      level: "Beginner",
      rating: 4.6,
      students: 980,
      progress: 30,
      description: "Learn to build modern web applications using React, Node.js, and cloud technologies.",
      skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB"]
    },
    {
      id: 3,
      title: "Data Science & Machine Learning",
      provider: "Amazon",
      category: "Data Science",
      duration: "10 weeks",
      level: "Advanced",
      rating: 4.9,
      students: 750,
      progress: 0,
      description: "Comprehensive course on data science techniques and machine learning algorithms.",
      skills: ["Python", "Pandas", "Scikit-learn", "TensorFlow", "Statistics"]
    },
    {
      id: 4,
      title: "UI/UX Design Fundamentals",
      provider: "Adobe",
      category: "Design",
      duration: "6 weeks",
      level: "Beginner",
      rating: 4.7,
      students: 620,
      progress: 0,
      description: "Learn the principles of user interface and user experience design.",
      skills: ["Figma", "Design Thinking", "Prototyping", "User Research"]
    }
  ];

  // Mock data for workshops
  const workshops = [
    {
      id: 1,
      title: "Resume Building Masterclass",
      date: "2025-10-15",
      time: "2:00 PM - 4:00 PM",
      instructor: "Dr. Sarah Johnson",
      attendees: 150,
      registered: true
    },
    {
      id: 2,
      title: "Interview Preparation Workshop",
      date: "2025-10-20",
      time: "10:00 AM - 1:00 PM",
      instructor: "Mr. Rajesh Patel",
      attendees: 200,
      registered: false
    }
  ];

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory === 'All' || course.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = ['All', ...new Set(courses.map(course => course.category))];

  return (
    <div className="learning-hub">
      <div className="page-header">
        <h1>Learning Hub</h1>
        <p>Enhance your skills with courses and workshops from industry experts</p>
      </div>

      {/* Search and Filters */}
      <div className="learning-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search courses, skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="courses-section">
        <div className="section-header">
          <h2>Recommended Courses</h2>
          <a href="#" className="view-all">View All</a>
        </div>
        
        <div className="courses-grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-header">
                <div className="course-icon">
                  <BookOpen size={24} />
                </div>
                <div className="progress-badge">
                  {course.progress > 0 ? `${course.progress}% Complete` : 'Not Started'}
                </div>
              </div>
              
              <div className="course-info">
                <h3>{course.title}</h3>
                <span className="provider">by {course.provider}</span>
                
                <div className="course-meta">
                  <span>{course.duration}</span>
                  <span>{course.level}</span>
                </div>
                
                <div className="course-rating">
                  <Star size={16} fill="#ffc107" stroke="#ffc107" />
                  <span>{course.rating} ({course.students} students)</span>
                </div>
                
                <p className="description">{course.description}</p>
                
                <div className="skills-list">
                  {course.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                  {course.skills.length > 3 && (
                    <span className="skill-tag">+{course.skills.length - 3} more</span>
                  )}
                </div>
                
                <div className="progress-section">
                  {course.progress > 0 && (
                    <>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="progress-text">{course.progress}% completed</div>
                    </>
                  )}
                  <button className={course.progress > 0 ? 'continue-button' : 'enroll-button'}>
                    <Play size={16} />
                    {course.progress > 0 ? 'Continue Learning' : 'Enroll Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workshops Section */}
      <div className="workshops-section">
        <div className="section-header">
          <h2>Upcoming Workshops</h2>
          <a href="#" className="view-all">View All</a>
        </div>
        
        <div className="workshops-list">
          {workshops.map(workshop => (
            <div key={workshop.id} className="workshop-card">
              <div className="workshop-header">
                <div>
                  <h3>{workshop.title}</h3>
                  <p>by {workshop.instructor}</p>
                </div>
                <div className="workshop-meta">
                  <span>{workshop.date}</span>
                  <span>{workshop.time}</span>
                </div>
              </div>
              
              <div className="workshop-details">
                <div className="workshop-meta">
                  <span>{workshop.attendees} attendees</span>
                  <div className={`registration-status ${workshop.registered ? 'registered' : 'not-registered'}`}>
                    {workshop.registered ? 'Registered' : 'Not Registered'}
                  </div>
                </div>
                
                <button className="register-button">
                  {workshop.registered ? 'View Details' : 'Register Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningHub;