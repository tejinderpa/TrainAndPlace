import React, { useState } from 'react';
import { MessageCircle, Users, Search, Filter, Plus, Send, User, Heart } from 'lucide-react';
import '../../App.css';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('forum');
  const [searchTerm, setSearchTerm] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  // Sample forum threads
  const forumThreads = [
    {
      id: 1,
      title: "Best resources for learning React in 2025?",
      author: "Alex Johnson",
      authorBatch: "2022-2026",
      replies: 24,
      views: 156,
      lastActivity: "2 hours ago",
      tags: ["React", "Frontend", "Resources"],
      content: "I'm looking for the best resources to learn React in 2025. Any recommendations for courses, books, or projects?",
      isLiked: false,
      likes: 12
    },
    {
      id: 2,
      title: "Internship opportunities at startups vs MNCs",
      author: "Sarah Williams",
      authorBatch: "2021-2025",
      replies: 18,
      views: 98,
      lastActivity: "5 hours ago",
      tags: ["Internships", "Career Advice"],
      content: "What are your thoughts on choosing between startup and MNC internships? Pros and cons of each?",
      isLiked: true,
      likes: 8
    },
    {
      id: 3,
      title: "Preparing for coding interviews - Tips and resources",
      author: "Michael Chen",
      authorBatch: "2020-2024",
      replies: 32,
      views: 210,
      lastActivity: "1 day ago",
      tags: ["Interviews", "Coding", "Preparation"],
      content: "Sharing my experience and resources for coding interview preparation. What worked for you?",
      isLiked: false,
      likes: 15
    }
  ];

  // Sample alumni connections
  const alumniConnections = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      company: "Google",
      position: "Senior Software Engineer",
      batch: "2010-2014",
      branch: "Computer Science",
      mutualConnections: 12,
      isFollowing: true
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      company: "Microsoft",
      position: "Product Manager",
      batch: "2008-2012",
      branch: "Electronics",
      mutualConnections: 8,
      isFollowing: false
    },
    {
      id: 3,
      name: "Neha Patel",
      company: "Amazon",
      position: "Data Scientist",
      batch: "2012-2016",
      branch: "Mathematics",
      mutualConnections: 5,
      isFollowing: true
    }
  ];

  // Sample groups
  const groups = [
    {
      id: 1,
      name: "Coding Club",
      members: 128,
      description: "For students interested in competitive programming and coding challenges",
      isJoined: true
    },
    {
      id: 2,
      name: "Entrepreneurship Circle",
      members: 85,
      description: "Connect with fellow entrepreneurs and startup enthusiasts",
      isJoined: false
    },
    {
      id: 3,
      name: "Data Science Enthusiasts",
      members: 96,
      description: "Discuss machine learning, AI, and data analytics topics",
      isJoined: true
    },
    {
      id: 4,
      name: "UI/UX Designers",
      members: 64,
      description: "Share design resources, tools, and portfolio feedback",
      isJoined: false
    }
  ];

  // Sample group discussions
  const groupDiscussions = [
    {
      id: 1,
      groupId: 1,
      groupName: "Coding Club",
      author: "Alex Johnson",
      content: "Just solved an interesting dynamic programming problem. Would love to discuss different approaches!",
      timestamp: "2 hours ago",
      replies: 5,
      likes: 12
    },
    {
      id: 2,
      groupId: 3,
      groupName: "Data Science Enthusiasts",
      author: "Sarah Williams",
      content: "Anyone working on NLP projects? Looking for collaboration opportunities.",
      timestamp: "4 hours ago",
      replies: 8,
      likes: 6
    }
  ];

  // Filter data based on search term
  const filteredThreads = forumThreads.filter(thread => 
    thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    thread.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredAlumni = alumniConnections.filter(alumni => 
    alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alumni.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleLike = (threadId) => {
    // In a real app, this would update the backend
    console.log(`Toggled like for thread ${threadId}`);
  };

  const toggleFollow = (alumniId) => {
    // In a real app, this would update the backend
    console.log(`Toggled follow for alumni ${alumniId}`);
  };

  const toggleGroupJoin = (groupId) => {
    // In a real app, this would update the backend
    console.log(`Toggled join for group ${groupId}`);
  };

  const createPost = () => {
    if (newPostContent.trim() !== '') {
      console.log(`Creating new post: ${newPostContent}`);
      setNewPostContent('');
    }
  };

  return (
    <div className="community-page">
      <div className="page-header">
        <h1>Networking & Community</h1>
        <p>Connect with peers, alumni, and join interest groups</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'forum' ? 'active' : ''}`}
          onClick={() => setActiveTab('forum')}
        >
          Student Forum
        </button>
        <button 
          className={`tab ${activeTab === 'alumni' ? 'active' : ''}`}
          onClick={() => setActiveTab('alumni')}
        >
          Alumni Connect
        </button>
        <button 
          className={`tab ${activeTab === 'groups' ? 'active' : ''}`}
          onClick={() => setActiveTab('groups')}
        >
          Groups & Clubs
        </button>
      </div>

      {/* Search and Filters */}
      <div className="community-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search discussions, alumni, or groups..."
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
      <div className="community-content">
        {/* Student Forum Tab */}
        {activeTab === 'forum' && (
          <div className="forum-section">
            <div className="new-post">
              <div className="post-input">
                <textarea
                  placeholder="Start a new discussion thread..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
                <button 
                  className="post-button"
                  onClick={createPost}
                >
                  <Send size={16} />
                  Post
                </button>
              </div>
            </div>
            
            <div className="threads-list">
              {filteredThreads.map(thread => (
                <div key={thread.id} className="thread-card">
                  <div className="thread-header">
                    <h3>{thread.title}</h3>
                    <div className="thread-tags">
                      {thread.tags.map((tag, index) => (
                        <span key={index} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="thread-content">
                    <p>{thread.content}</p>
                  </div>
                  
                  <div className="thread-meta">
                    <div className="author-info">
                      <div className="author-avatar">
                        <User size={16} />
                      </div>
                      <div>
                        <p className="author-name">{thread.author}</p>
                        <p className="author-batch">{thread.authorBatch}</p>
                      </div>
                    </div>
                    
                    <div className="thread-stats">
                      <span className="replies">
                        <MessageCircle size={16} />
                        {thread.replies}
                      </span>
                      <span className="views">
                        👁️ {thread.views}
                      </span>
                      <span className="last-activity">
                        {thread.lastActivity}
                      </span>
                    </div>
                  </div>
                  
                  <div className="thread-actions">
                    <button 
                      className={`like-button ${thread.isLiked ? 'liked' : ''}`}
                      onClick={() => toggleLike(thread.id)}
                    >
                      <Heart size={16} />
                      {thread.likes}
                    </button>
                    <button className="reply-button">
                      <MessageCircle size={16} />
                      Reply
                    </button>
                  </div>
                </div>
              ))}
              
              {filteredThreads.length === 0 && (
                <div className="no-results">
                  <p>No forum threads found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Alumni Connect Tab */}
        {activeTab === 'alumni' && (
          <div className="alumni-section">
            <div className="alumni-grid">
              {filteredAlumni.map(alumni => (
                <div key={alumni.id} className="alumni-card">
                  <div className="alumni-header">
                    <div className="alumni-avatar">
                      <User size={32} />
                    </div>
                    <div className="alumni-info">
                      <h3>{alumni.name}</h3>
                      <p className="position">{alumni.position} at {alumni.company}</p>
                      <p className="batch">{alumni.batch} • {alumni.branch}</p>
                    </div>
                  </div>
                  
                  <div className="alumni-details">
                    <div className="mutual-connections">
                      <Users size={16} />
                      <span>{alumni.mutualConnections} mutual connections</span>
                    </div>
                  </div>
                  
                  <div className="alumni-actions">
                    <button 
                      className={`follow-button ${alumni.isFollowing ? 'following' : ''}`}
                      onClick={() => toggleFollow(alumni.id)}
                    >
                      {alumni.isFollowing ? 'Following' : 'Follow'}
                    </button>
                    <button className="message-button">
                      <MessageCircle size={16} />
                      Message
                    </button>
                  </div>
                </div>
              ))}
              
              {filteredAlumni.length === 0 && (
                <div className="no-results">
                  <p>No alumni found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Groups & Clubs Tab */}
        {activeTab === 'groups' && (
          <div className="groups-section">
            <div className="groups-header">
              <h2>Join Groups & Clubs</h2>
              <button className="create-group-button">
                <Plus size={16} />
                Create Group
              </button>
            </div>
            
            <div className="groups-grid">
              {filteredGroups.map(group => (
                <div key={group.id} className="group-card">
                  <div className="group-header">
                    <div className="group-icon">
                      <Users size={24} />
                    </div>
                    <div>
                      <h3>{group.name}</h3>
                      <p className="members">{group.members} members</p>
                    </div>
                  </div>
                  
                  <p className="description">{group.description}</p>
                  
                  <div className="group-actions">
                    <button 
                      className={`join-button ${group.isJoined ? 'joined' : ''}`}
                      onClick={() => toggleGroupJoin(group.id)}
                    >
                      {group.isJoined ? 'Joined' : 'Join Group'}
                    </button>
                  </div>
                  
                  <div className="recent-discussions">
                    <h4>Recent Discussions</h4>
                    {groupDiscussions
                      .filter(discussion => discussion.groupId === group.id)
                      .map(discussion => (
                        <div key={discussion.id} className="discussion-preview">
                          <p><strong>{discussion.author}:</strong> {discussion.content}</p>
                          <div className="discussion-meta">
                            <span>{discussion.timestamp}</span>
                            <span>{discussion.replies} replies</span>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))}
              
              {filteredGroups.length === 0 && (
                <div className="no-results">
                  <p>No groups found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;