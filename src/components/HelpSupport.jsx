import React, { useState } from 'react';
import { HelpCircle, BookOpen, MessageCircle, Video, Mail, Search, ChevronDown, ChevronRight } from 'lucide-react';
import '../App.css';

const HelpSupport = () => {
  const [activeCategory, setActiveCategory] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQs, setOpenFAQs] = useState({});
  const [ticketData, setTicketData] = useState({
    subject: '',
    category: 'general',
    priority: 'medium',
    message: ''
  });

  // Sample FAQ data
  const faqData = [
    {
      id: 1,
      category: 'account',
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page. Enter your email address and follow the instructions sent to your inbox."
    },
    {
      id: 2,
      category: 'account',
      question: "How do I update my profile information?",
      answer: "Go to your profile page and click the 'Edit Profile' button. You can update your personal information, education details, and skills there."
    },
    {
      id: 3,
      category: 'jobs',
      question: "How do I apply for a job?",
      answer: "Navigate to the Jobs section, find a position you're interested in, and click the 'Apply Now' button. Make sure your profile is complete before applying."
    },
    {
      id: 4,
      category: 'jobs',
      question: "What documents do I need to upload for job applications?",
      answer: "You'll typically need to upload your resume, cover letter, and any relevant certificates. Some companies may request additional documents during the application process."
    },
    {
      id: 5,
      category: 'events',
      question: "How do I register for events?",
      answer: "Go to the Events section, find the event you want to attend, and click the 'Register' button. You'll receive a confirmation email with event details."
    },
    {
      id: 6,
      category: 'technical',
      question: "The website is loading slowly. What should I do?",
      answer: "Try refreshing the page, clearing your browser cache, or using a different browser. If the issue persists, please contact our support team."
    }
  ];

  // Sample knowledge base articles
  const knowledgeBase = [
    {
      id: 1,
      title: "Getting Started Guide",
      category: "Getting Started",
      excerpt: "A comprehensive guide to help you get started with our platform.",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Optimizing Your Profile",
      category: "Profile",
      excerpt: "Learn how to create a compelling profile that attracts recruiters.",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Job Application Best Practices",
      category: "Jobs",
      excerpt: "Tips and tricks for submitting successful job applications.",
      readTime: "10 min read"
    },
    {
      id: 4,
      title: "Preparing for Interviews",
      category: "Interviews",
      excerpt: "Essential interview preparation techniques and common questions.",
      readTime: "12 min read"
    }
  ];

  // Sample tutorial videos
  const tutorialVideos = [
    {
      id: 1,
      title: "Creating Your Profile",
      duration: "3:45",
      thumbnail: "profile-video"
    },
    {
      id: 2,
      title: "Applying for Jobs",
      duration: "5:20",
      thumbnail: "job-video"
    },
    {
      id: 3,
      title: "Using the Mentorship Feature",
      duration: "4:15",
      thumbnail: "mentorship-video"
    },
    {
      id: 4,
      title: "Navigating the Dashboard",
      duration: "6:30",
      thumbnail: "dashboard-video"
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleTicketChange = (e) => {
    const { name, value } = e.target;
    setTicketData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    // In a real app, this would submit to backend
    console.log("Support ticket submitted", ticketData);
    alert("Your support ticket has been submitted. We'll get back to you soon!");
    setTicketData({
      subject: '',
      category: 'general',
      priority: 'medium',
      message: ''
    });
  };

  const filteredFAQs = faqData.filter(faq => 
    (faq.category === activeCategory || activeCategory === 'all') &&
    (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="help-support">
      <div className="page-header">
        <h1>Help & Support</h1>
        <p>We're here to help you make the most of our platform</p>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-bar large">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search help articles, FAQs, and tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="help-layout">
        {/* Sidebar Navigation */}
        <div className="help-sidebar">
          <button 
            className={`help-nav-item ${activeCategory === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveCategory('faq')}
          >
            <HelpCircle size={20} />
            FAQ Section
          </button>
          <button 
            className={`help-nav-item ${activeCategory === 'knowledge' ? 'active' : ''}`}
            onClick={() => setActiveCategory('knowledge')}
          >
            <BookOpen size={20} />
            Knowledge Base
          </button>
          <button 
            className={`help-nav-item ${activeCategory === 'support' ? 'active' : ''}`}
            onClick={() => setActiveCategory('support')}
          >
            <MessageCircle size={20} />
            Submit Support Ticket
          </button>
          <button 
            className={`help-nav-item ${activeCategory === 'tutorials' ? 'active' : ''}`}
            onClick={() => setActiveCategory('tutorials')}
          >
            <Video size={20} />
            Tutorial Videos
          </button>
          <button 
            className={`help-nav-item ${activeCategory === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveCategory('contact')}
          >
            <Mail size={20} />
            Contact Support Team
          </button>
        </div>

        {/* Main Content */}
        <div className="help-content">
          {/* FAQ Section */}
          {activeCategory === 'faq' && (
            <div className="help-section">
              <h2>Frequently Asked Questions</h2>
              <p>Find answers to common questions about our platform</p>
              
              <div className="faq-categories">
                <button 
                  className={activeCategory === 'all' ? 'active' : ''}
                  onClick={() => setActiveCategory('all')}
                >
                  All
                </button>
                <button 
                  className={activeCategory === 'account' ? 'active' : ''}
                  onClick={() => setActiveCategory('account')}
                >
                  Account
                </button>
                <button 
                  className={activeCategory === 'jobs' ? 'active' : ''}
                  onClick={() => setActiveCategory('jobs')}
                >
                  Jobs & Applications
                </button>
                <button 
                  className={activeCategory === 'events' ? 'active' : ''}
                  onClick={() => setActiveCategory('events')}
                >
                  Events
                </button>
                <button 
                  className={activeCategory === 'technical' ? 'active' : ''}
                  onClick={() => setActiveCategory('technical')}
                >
                  Technical Issues
                </button>
              </div>
              
              <div className="faq-list">
                {filteredFAQs.map(faq => (
                  <div key={faq.id} className="faq-item">
                    <button 
                      className="faq-question"
                      onClick={() => toggleFAQ(faq.id)}
                    >
                      <span>{faq.question}</span>
                      {openFAQs[faq.id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>
                    {openFAQs[faq.id] && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Knowledge Base */}
          {activeCategory === 'knowledge' && (
            <div className="help-section">
              <h2>Knowledge Base</h2>
              <p>Comprehensive documentation and guides</p>
              
              <div className="knowledge-base">
                {knowledgeBase.map(article => (
                  <div key={article.id} className="knowledge-article">
                    <div className="article-header">
                      <span className="category-badge">{article.category}</span>
                      <span className="read-time">{article.readTime}</span>
                    </div>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <button className="secondary-button">
                      Read Article
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Support Ticket */}
          {activeCategory === 'support' && (
            <div className="help-section">
              <h2>Submit Support Ticket</h2>
              <p>Can't find what you're looking for? Submit a support ticket and we'll help you</p>
              
              <div className="support-ticket-form">
                <form onSubmit={handleSubmitTicket}>
                  <div className="form-group">
                    <label>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={ticketData.subject}
                      onChange={handleTicketChange}
                      required
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        name="category"
                        value={ticketData.category}
                        onChange={handleTicketChange}
                      >
                        <option value="general">General Inquiry</option>
                        <option value="account">Account Issues</option>
                        <option value="technical">Technical Problem</option>
                        <option value="billing">Billing Question</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Priority</label>
                      <select
                        name="priority"
                        value={ticketData.priority}
                        onChange={handleTicketChange}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      name="message"
                      value={ticketData.message}
                      onChange={handleTicketChange}
                      rows="6"
                      required
                    />
                  </div>
                  
                  <button type="submit" className="primary-button">
                    Submit Ticket
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Tutorial Videos */}
          {activeCategory === 'tutorials' && (
            <div className="help-section">
              <h2>Tutorial Videos</h2>
              <p>Watch our video tutorials to learn how to use different features</p>
              
              <div className="tutorial-videos">
                {tutorialVideos.map(video => (
                  <div key={video.id} className="video-card">
                    <div className="video-thumbnail">
                      <div className="thumbnail-placeholder">
                        {video.thumbnail}
                      </div>
                      <div className="video-duration">
                        {video.duration}
                      </div>
                    </div>
                    <h3>{video.title}</h3>
                    <button className="secondary-button">
                      <Video size={16} />
                      Watch Video
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Support Team */}
          {activeCategory === 'contact' && (
            <div className="help-section">
              <h2>Contact Support Team</h2>
              <p>Get in touch with our support team for personalized assistance</p>
              
              <div className="contact-options">
                <div className="contact-card">
                  <Mail size={24} />
                  <h3>Email Support</h3>
                  <p>support@placementportal.com</p>
                  <p>Response within 24 hours</p>
                  <button className="secondary-button">
                    Send Email
                  </button>
                </div>
                
                <div className="contact-card">
                  <MessageCircle size={24} />
                  <h3>Live Chat</h3>
                  <p>Chat with our support team</p>
                  <p>Available 9AM - 6PM (Mon-Fri)</p>
                  <button className="primary-button">
                    Start Chat
                  </button>
                </div>
                
                <div className="contact-card">
                  <Phone size={24} />
                  <h3>Phone Support</h3>
                  <p>+1 (800) 123-4567</p>
                  <p>Available 9AM - 5PM (Mon-Fri)</p>
                  <button className="secondary-button">
                    Call Now
                  </button>
                </div>
              </div>
              
              <div className="support-hours">
                <h3>Support Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM (EST)</p>
                <p>Saturday: 10:00 AM - 4:00 PM (EST)</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;