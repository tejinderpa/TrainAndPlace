import React, { useState } from 'react';
import { BookOpen, Play, CheckCircle, Clock, Filter, Search } from 'lucide-react';
import '../../App.css';

const LearningPage = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchTerm, setSearchTerm] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState(new Set([1, 3])); // Pre-enrolled courses for demo

  // Sample learning data
  const courses = [
    {
      id: 1,
      title: "Advanced React Development",
      provider: "Coursera",
      duration: "8 weeks",
      level: "Intermediate",
      rating: 4.7,
      students: 12500,
      description: "Master advanced React concepts including hooks, context, and performance optimization.",
      thumbnail: "react",
      progress: 65,
      isEnrolled: true
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      provider: "Udemy",
      duration: "12 weeks",
      level: "Beginner",
      rating: 4.9,
      students: 25000,
      description: "Comprehensive course covering essential data structures and algorithms for coding interviews.",
      thumbnail: "dsa",
      progress: 0,
      isEnrolled: false
    },
    {
      id: 3,
      title: "Cloud Computing with AWS",
      provider: "Amazon",
      duration: "6 weeks",
      level: "Advanced",
      rating: 4.5,
      students: 8500,
      description: "Learn to design and deploy scalable applications on Amazon Web Services.",
      thumbnail: "aws",
      progress: 30,
      isEnrolled: true
    },
    {
      id: 4,
      title: "Machine Learning Fundamentals",
      provider: "Google",
      duration: "10 weeks",
      level: "Intermediate",
      rating: 4.8,
      students: 18000,
      description: "Introduction to machine learning concepts and practical implementation with Python.",
      thumbnail: "ml",
      progress: 0,
      isEnrolled: false
    }
  ];

  const workshops = [
    {
      id: 1,
      title: "Technical Interview Preparation",
      provider: "Microsoft",
      date: "2025-10-25",
      time: "2:00 PM - 5:00 PM",
      duration: "3 hours",
      level: "All Levels",
      registered: 120,
      maxParticipants: 150,
      description: "Learn strategies and techniques to excel in technical interviews."
    },
    {
      id: 2,
      title: "Resume Building Workshop",
      provider: "LinkedIn",
      date: "2025-11-01",
      time: "4:00 PM - 6:00 PM",
      duration: "2 hours",
      level: "Beginner",
      registered: 85,
      maxParticipants: 100,
      description: "Create a professional resume that stands out to recruiters."
    }
  ];

  const certifications = [
    {
      id: 1,
      title: "AWS Certified Developer",
      provider: "Amazon",
      validity: "3 years",
      exams: 1,
      price: "₹2500",
      description: "Validate your ability to develop and maintain AWS-based applications."
    },
    {
      id: 2,
      title: "Google Cloud Professional",
      provider: "Google",
      validity: "2 years",
      exams: 1,
      price: "₹3000",
      description: "Demonstrate your expertise in designing and managing Google Cloud solutions."
    }
  ];

  const practiceTests = [
    {
      id: 1,
      title: "Aptitude Test Series",
      questions: 50,
      time: "60 minutes",
      attempts: 3,
      description: "Practice quantitative, logical, and verbal aptitude questions."
    },
    {
      id: 2,
      title: "Technical MCQs",
      questions: 100,
      time: "90 minutes",
      attempts: 5,
      description: "Test your knowledge in computer science fundamentals."
    }
  ];

  const toggleEnrollment = (courseId) => {
    const newEnrolledCourses = new Set(enrolledCourses);
    if (newEnrolledCourses.has(courseId)) {
      newEnrolledCourses.delete(courseId);
    } else {
      newEnrolledCourses.add(courseId);
    }
    setEnrolledCourses(newEnrolledCourses);
  };

  // Filter data based on search term
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredWorkshops = workshops.filter(workshop => 
    workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workshop.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCertifications = certifications.filter(cert => 
    cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPracticeTests = practiceTests.filter(test => 
    test.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={i <= Math.floor(rating) ? 'star-filled' : 'star-empty'}
        >
          ★
        </span>
      );
    }
    return <div className="stars">{stars}</div>;
  };

  return (
    <div className="learning-page">
      <div className="page-header">
        <h1>Learning & Skill Development</h1>
        <p>Enhance your skills with our curated learning resources</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          Courses
        </button>
        <button 
          className={`tab ${activeTab === 'workshops' ? 'active' : ''}`}
          onClick={() => setActiveTab('workshops')}
        >
          Workshops
        </button>
        <button 
          className={`tab ${activeTab === 'certifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('certifications')}
        >
          Certifications
        </button>
        <button 
          className={`tab ${activeTab === 'practice' ? 'active' : ''}`}
          onClick={() => setActiveTab('practice')}
        >
          Practice Tests
        </button>
      </div>

      {/* Search and Filters */}
      <div className="learning-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search learning resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="filter-button">
          <Filter size={20} />
          Filters
        </button>
      </div>

      {/* Content based on active tab */}
      <div className="learning-content">
        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="courses-grid">
            {filteredCourses.map(course => (
              <div key={course.id} className="course-card">
                <div className="course-thumbnail">
                  <div className="thumbnail-placeholder">
                    {course.thumbnail}
                  </div>
                  {course.isEnrolled && (
                    <div className="progress-badge">
                      {course.progress}%
                    </div>
                  )}
                </div>
                
                <div className="course-info">
                  <h3>{course.title}</h3>
                  <p className="provider">{course.provider}</p>
                  
                  <div className="course-meta">
                    <span className="duration">{course.duration}</span>
                    <span className="level">{course.level}</span>
                  </div>
                  
                  <div className="course-rating">
                    {renderStars(course.rating)}
                    <span>({course.students} students)</span>
                  </div>
                  
                  <p className="description">{course.description}</p>
                  
                  <div className="course-actions">
                    {course.isEnrolled ? (
                      <>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <p className="progress-text">{course.progress}% completed</p>
                        <button className="continue-button">
                          <Play size={16} />
                          Continue
                        </button>
                      </>
                    ) : (
                      <button 
                        className="enroll-button"
                        onClick={() => toggleEnrollment(course.id)}
                      >
                        Enroll Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredCourses.length === 0 && (
              <div className="no-results">
                <p>No courses found matching your criteria.</p>
              </div>
            )}
          </div>
        )}

        {/* Workshops Tab */}
        {activeTab === 'workshops' && (
          <div className="workshops-list">
            {filteredWorkshops.map(workshop => (
              <div key={workshop.id} className="workshop-card">
                <div className="workshop-header">
                  <div className="workshop-info">
                    <h3>{workshop.title}</h3>
                    <p className="provider">{workshop.provider}</p>
                  </div>
                  <div className="workshop-meta">
                    <span className="date">{new Date(workshop.date).toLocaleDateString()}</span>
                    <span className="time">{workshop.time}</span>
                  </div>
                </div>
                
                <div className="workshop-details">
                  <div className="workshop-meta">
                    <span className="duration">{workshop.duration}</span>
                    <span className="level">{workshop.level}</span>
                    <span className="participants">{workshop.registered}/{workshop.maxParticipants} registered</span>
                  </div>
                  
                  <p className="description">{workshop.description}</p>
                  
                  <button className="register-button">
                    Register for Workshop
                  </button>
                </div>
              </div>
            ))}
            
            {filteredWorkshops.length === 0 && (
              <div className="no-results">
                <p>No workshops found matching your criteria.</p>
              </div>
            )}
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div className="certifications-grid">
            {filteredCertifications.map(cert => (
              <div key={cert.id} className="certification-card">
                <div className="cert-header">
                  <div className="cert-icon">
                    <CheckCircle size={32} />
                  </div>
                  <div>
                    <h3>{cert.title}</h3>
                    <p className="provider">{cert.provider}</p>
                  </div>
                </div>
                
                <div className="cert-details">
                  <div className="cert-meta">
                    <span className="validity">Validity: {cert.validity}</span>
                    <span className="exams">Exams: {cert.exams}</span>
                    <span className="price">{cert.price}</span>
                  </div>
                  
                  <p className="description">{cert.description}</p>
                  
                  <button className="prepare-button">
                    Prepare for Certification
                  </button>
                </div>
              </div>
            ))}
            
            {filteredCertifications.length === 0 && (
              <div className="no-results">
                <p>No certifications found matching your criteria.</p>
              </div>
            )}
          </div>
        )}

        {/* Practice Tests Tab */}
        {activeTab === 'practice' && (
          <div className="practice-tests">
            {filteredPracticeTests.map(test => (
              <div key={test.id} className="test-card">
                <div className="test-header">
                  <div className="test-icon">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3>{test.title}</h3>
                    <div className="test-meta">
                      <span>{test.questions} questions</span>
                      <span>{test.time}</span>
                      <span>{test.attempts} attempts</span>
                    </div>
                  </div>
                </div>
                
                <p className="description">{test.description}</p>
                
                <button className="start-test-button">
                  <Play size={16} />
                  Start Test
                </button>
              </div>
            ))}
            
            {filteredPracticeTests.length === 0 && (
              <div className="no-results">
                <p>No practice tests found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPage;