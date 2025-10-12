import React, { useState } from 'react';
import { Search, Filter, Users, Calendar, MessageCircle, TrendingUp, Send, Heart, Share2 } from 'lucide-react';
import '../../App.css';

const NetworkingCommunity = () => {
  const [activeTab, setActiveTab] = useState('forum');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');

  // Sample forum posts
  const forumPosts = [
    {
      id: 1,
      author: {
        name: "Rahul Sharma",
        company: "Google",
        avatar: "RS"
      },
      title: "Best practices for remote team management",
      content: "After working remotely for 3 years, I've learned several key practices that help maintain team productivity and morale. Here are my top 5 tips...",
      tags: ["Remote Work", "Leadership", "Management"],
      likes: 24,
      comments: 8,
      timestamp: "2025-10-12 14:30"
    },
    {
      id: 2,
      author: {
        name: "Priya Patel",
        company: "Microsoft",
        avatar: "PP"
      },
      title: "Transitioning from academia to industry",
      content: "Many students struggle with the transition from academic projects to real-world software development. Here's what helped me make the shift...",
      tags: ["Career Advice", "Transition", "Software Development"],
      likes: 18,
      comments: 12,
      timestamp: "2025-10-11 09:15"
    },
    {
      id: 3,
      author: {
        name: "Amit Kumar",
        company: "Amazon",
        avatar: "AK"
      },
      title: "Emerging trends in cloud computing for 2026",
      content: "The cloud landscape is evolving rapidly. Here are the key trends I'm seeing that will shape the industry in the coming year...",
      tags: ["Cloud Computing", "Technology", "Trends"],
      likes: 32,
      comments: 15,
      timestamp: "2025-10-10 16:45"
    }
  ];

  // Sample groups
  const groups = [
    {
      id: 1,
      name: "Computer Science Alumni",
      members: 1240,
      description: "For alumni from the Computer Science department",
      icon: "💻"
    },
    {
      id: 2,
      name: "New York Alumni Network",
      members: 850,
      description: "Alumni based in the New York metropolitan area",
      icon: "🗽"
    },
    {
      id: 3,
      name: "Entrepreneurship Circle",
      members: 520,
      description: "Alumni who have started their own companies",
      icon: "🚀"
    },
    {
      id: 4,
      name: "Data Science Professionals",
      members: 780,
      description: "For alumni working in data science and analytics",
      icon: "📊"
    }
  ];

  // Sample events
  const events = [
    {
      id: 1,
      title: "Annual Alumni Reunion",
      date: "2025-11-15",
      time: "6:00 PM - 10:00 PM",
      location: "College Campus, Main Auditorium",
      attendees: 250,
      rsvpStatus: "Going"
    },
    {
      id: 2,
      title: "Tech Industry Trends Webinar",
      date: "2025-10-25",
      time: "3:00 PM - 4:30 PM",
      location: "Online",
      attendees: 320,
      rsvpStatus: "Interested"
    },
    {
      id: 3,
      title: "Startup Pitch Night",
      date: "2025-11-05",
      time: "7:00 PM - 9:00 PM",
      location: "Innovation Hub, Bangalore",
      attendees: 150,
      rsvpStatus: "Not Going"
    }
  ];

  // Sample industry news
  const industryNews = [
    {
      id: 1,
      title: "AI Breakthrough in Natural Language Processing",
      source: "Tech Journal",
      summary: "Researchers have developed a new model that significantly improves language understanding capabilities...",
      timestamp: "2025-10-12"
    },
    {
      id: 2,
      title: "Remote Work Policies Evolving in Tech Giants",
      source: "Business Weekly",
      summary: "Major tech companies are revising their remote work policies as hybrid models become the norm...",
      timestamp: "2025-10-11"
    }
  ];

  const filteredPosts = forumPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleLikePost = (postId) => {
    console.log("Liking post:", postId);
  };

  const handleComment = (postId) => {
    console.log("Commenting on post:", postId);
  };

  const handleSharePost = (postId) => {
    console.log("Sharing post:", postId);
  };

  const handleRsvp = (eventId, status) => {
    console.log(`RSVP for event ${eventId}: ${status}`);
  };

  return (
    <div className="networking-community">
      <div className="page-header">
        <h1>Networking & Community</h1>
        <p>Connect with fellow alumni and stay updated with industry trends</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'forum' ? 'active' : ''}`}
          onClick={() => setActiveTab('forum')}
        >
          <MessageCircle size={16} />
          Alumni Forum
        </button>
        <button 
          className={`tab ${activeTab === 'groups' ? 'active' : ''}`}
          onClick={() => setActiveTab('groups')}
        >
          <Users size={16} />
          Groups
        </button>
        <button 
          className={`tab ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          <Calendar size={16} />
          Events
        </button>
        <button 
          className={`tab ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          <TrendingUp size={16} />
          Industry News
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'forum' && (
          <div className="forum-tab">
            <h2>Alumni Forum</h2>
            
            {/* Controls */}
            <div className="forum-controls">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button className="primary-button">
                <MessageCircle size={16} />
                Start New Discussion
              </button>
            </div>

            {/* Forum Posts */}
            <div className="forum-posts">
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <div key={post.id} className="forum-post">
                    <div className="post-header">
                      <div className="author-info">
                        <div className="author-avatar">
                          {post.author.avatar}
                        </div>
                        <div>
                          <h3>{post.author.name}</h3>
                          <p>{post.author.company}</p>
                        </div>
                      </div>
                      <div className="post-time">
                        {post.timestamp}
                      </div>
                    </div>
                    
                    <div className="post-content">
                      <h4>{post.title}</h4>
                      <p>{post.content}</p>
                      
                      <div className="post-tags">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="post-actions">
                      <button 
                        className="action-button"
                        onClick={() => handleLikePost(post.id)}
                      >
                        <Heart size={16} />
                        {post.likes}
                      </button>
                      <button 
                        className="action-button"
                        onClick={() => handleComment(post.id)}
                      >
                        <MessageCircle size={16} />
                        {post.comments}
                      </button>
                      <button 
                        className="action-button"
                        onClick={() => handleSharePost(post.id)}
                      >
                        <Share2 size={16} />
                        Share
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>No discussions found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'groups' && (
          <div className="groups-tab">
            <h2>Alumni Groups</h2>
            
            {/* Controls */}
            <div className="groups-controls">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search groups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Groups List */}
            <div className="groups-list">
              {groups.map(group => (
                <div key={group.id} className="group-card">
                  <div className="group-header">
                    <div className="group-icon">
                      {group.icon}
                    </div>
                    <div className="group-info">
                      <h3>{group.name}</h3>
                      <p>{group.description}</p>
                    </div>
                  </div>
                  
                  <div className="group-stats">
                    <div className="stat-item">
                      <Users size={16} />
                      <span>{group.members} members</span>
                    </div>
                  </div>
                  
                  <div className="group-actions">
                    <button className="primary-button">Join Group</button>
                    <button className="secondary-button">View Group</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="events-tab">
            <h2>Upcoming Events</h2>
            
            {/* Events List */}
            <div className="events-list">
              {events.map(event => (
                <div key={event.id} className="event-card">
                  <div className="event-header">
                    <h3>{event.title}</h3>
                    <div className="event-date">
                      {event.date}
                    </div>
                  </div>
                  
                  <div className="event-details">
                    <div className="detail-item">
                      <Calendar size={16} />
                      <span>{event.time}</span>
                    </div>
                    <div className="detail-item">
                      <Users size={16} />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                  
                  <div className="event-location">
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="event-actions">
                    <button 
                      className={`rsvp-button ${event.rsvpStatus === 'Going' ? 'going' : ''}`}
                      onClick={() => handleRsvp(event.id, 'Going')}
                    >
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
                      Not Going
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="news-tab">
            <h2>Industry News & Trends</h2>
            
            {/* News List */}
            <div className="news-list">
              {industryNews.map(news => (
                <div key={news.id} className="news-card">
                  <div className="news-header">
                    <h3>{news.title}</h3>
                    <div className="news-meta">
                      <span className="source">{news.source}</span>
                      <span className="timestamp">{news.timestamp}</span>
                    </div>
                  </div>
                  
                  <div className="news-summary">
                    <p>{news.summary}</p>
                  </div>
                  
                  <div className="news-actions">
                    <button className="secondary-button">
                      <Send size={16} />
                      Share
                    </button>
                    <button className="secondary-button">
                      Read Full Article
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Submit Article */}
            <div className="submit-article">
              <h3>Share Industry Insights</h3>
              <div className="form-container">
                <div className="form-group">
                  <label>Article Title</label>
                  <input type="text" placeholder="Enter article title" />
                </div>
                
                <div className="form-group">
                  <label>Summary</label>
                  <textarea 
                    rows="3" 
                    placeholder="Provide a brief summary of the article or insight..."
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label>Full Content</label>
                  <textarea 
                    rows="6" 
                    placeholder="Share your detailed insights, experiences, or industry observations..."
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <button className="primary-button">
                    <Send size={16} />
                    Publish Article
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkingCommunity;