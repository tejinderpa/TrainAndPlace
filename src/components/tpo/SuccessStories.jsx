import React, { useState } from 'react';
import { Plus, Edit, Trash2, Star, Eye, Share2, Heart, MessageCircle, Search, Filter } from 'lucide-react';
import '../../App.css';

const SuccessStories = () => {
  const [stories, setStories] = useState([
    {
      id: 1,
      title: "From Campus to Google - Sarah's Journey",
      studentName: "Sarah Williams",
      company: "Google",
      role: "Product Manager",
      package: "22 LPA",
      date: "2025-10-01",
      likes: 124,
      comments: 18,
      category: "Placement",
      featured: true,
      content: "Sarah's journey from a computer science student to a Product Manager at Google is truly inspiring. Through dedication, consistent practice, and guidance from our placement team, she secured one of the most coveted positions in the tech industry."
    },
    {
      id: 2,
      title: "Cracking Microsoft with 35 LPA Package",
      studentName: "Alex Johnson",
      company: "Microsoft",
      role: "Software Engineer",
      package: "35 LPA",
      date: "2025-09-20",
      likes: 98,
      comments: 12,
      category: "Placement",
      featured: true,
      content: "Alex's exceptional performance in coding assessments and interviews helped him secure the highest package offered by Microsoft this year. His story showcases the importance of data structures and algorithms in cracking top tech companies."
    },
    {
      id: 3,
      title: "Alumni Success - Building a Startup",
      studentName: "Michael Chen",
      company: "Startup Founder",
      role: "CEO & Founder",
      package: "N/A",
      date: "2025-09-15",
      likes: 156,
      comments: 24,
      category: "Entrepreneurship",
      featured: false,
      content: "Michael, an alumnus of our institute, founded his own startup after gaining experience at Amazon. His journey from a student to a successful entrepreneur demonstrates the entrepreneurial spirit fostered at our institution."
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  const handleAddStory = () => {
    setCurrentStory(null);
    setShowModal(true);
  };

  const handleEditStory = (story) => {
    setCurrentStory(story);
    setShowModal(true);
  };

  const handleDeleteStory = (id) => {
    if (window.confirm('Are you sure you want to delete this success story?')) {
      setStories(stories.filter(story => story.id !== id));
    }
  };

  const handleSaveStory = (storyData) => {
    if (currentStory) {
      // Update existing story
      setStories(stories.map(story => 
        story.id === currentStory.id 
          ? { ...story, ...storyData } 
          : story
      ));
    } else {
      // Add new story
      const newStory = {
        id: stories.length + 1,
        ...storyData,
        likes: 0,
        comments: 0,
        date: new Date().toISOString().split('T')[0]
      };
      setStories([...stories, newStory]);
    }
    setShowModal(false);
  };

  const toggleFeatured = (id) => {
    setStories(stories.map(story => 
      story.id === id 
        ? { ...story, featured: !story.featured } 
        : story
    ));
  };

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          story.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          story.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'All' || story.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="success-stories">
      <div className="page-header">
        <h1>Success Stories Showcase</h1>
        <p>Highlight top placements and student achievements</p>
      </div>

      {/* Controls */}
      <div className="controls-section">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search stories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-controls">
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Placement">Placement</option>
            <option value="Entrepreneurship">Entrepreneurship</option>
            <option value="Higher Education">Higher Education</option>
          </select>
          
          <div className="view-toggle">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              Grid View
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
          </div>
          
          <button className="primary-button" onClick={handleAddStory}>
            <Plus size={16} />
            Add Story
          </button>
        </div>
      </div>

      {/* Stories List */}
      <div className={`stories-container ${viewMode}`}>
        {filteredStories.map(story => (
          <div key={story.id} className="story-card">
            <div className="story-header">
              <div className="story-meta">
                <span className="category-badge">{story.category}</span>
                {story.featured && <Star size={16} className="featured-star" />}
              </div>
              <div className="story-actions">
                <button 
                  className={`icon-button ${story.featured ? 'featured' : ''}`}
                  onClick={() => toggleFeatured(story.id)}
                  title={story.featured ? "Unfeature story" : "Feature story"}
                >
                  <Star size={16} />
                </button>
                <button 
                  className="icon-button"
                  onClick={() => handleEditStory(story)}
                >
                  <Edit size={16} />
                </button>
                <button 
                  className="icon-button"
                  onClick={() => handleDeleteStory(story.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <h3 className="story-title">{story.title}</h3>
            
            <div className="student-info">
              <p><strong>{story.studentName}</strong></p>
              <p>{story.role} at {story.company}</p>
              {story.package && <p><strong>Package:</strong> {story.package}</p>}
            </div>
            
            <p className="story-content">{story.content}</p>
            
            <div className="story-footer">
              <div className="story-stats">
                <div className="stat-item">
                  <Heart size={16} />
                  <span>{story.likes}</span>
                </div>
                <div className="stat-item">
                  <MessageCircle size={16} />
                  <span>{story.comments}</span>
                </div>
                <div className="stat-item">
                  <span>{story.date}</span>
                </div>
              </div>
              
              <div className="story-actions-bottom">
                <button className="icon-button">
                  <Eye size={16} />
                </button>
                <button className="icon-button">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Story Modal */}
      {showModal && (
        <StoryModal 
          story={currentStory}
          onSave={handleSaveStory}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const StoryModal = ({ story, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: story?.title || '',
    studentName: story?.studentName || '',
    company: story?.company || '',
    role: story?.role || '',
    package: story?.package || '',
    category: story?.category || 'Placement',
    content: story?.content || '',
    featured: story?.featured || false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content large">
        <div className="modal-header">
          <h2>{story ? 'Edit Success Story' : 'Add Success Story'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Story Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Student Name</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Placement">Placement</option>
                <option value="Entrepreneurship">Entrepreneurship</option>
                <option value="Higher Education">Higher Education</option>
                <option value="Internship">Internship</option>
                <option value="Achievement">Achievement</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Package (if applicable)</label>
            <input
              type="text"
              name="package"
              value={formData.package}
              onChange={handleChange}
              placeholder="e.g., 15 LPA"
            />
          </div>
          
          <div className="form-group">
            <label>Story Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="6"
              required
            />
          </div>
          
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              Feature this story prominently
            </label>
          </div>
          
          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              {story ? 'Update Story' : 'Add Story'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuccessStories;