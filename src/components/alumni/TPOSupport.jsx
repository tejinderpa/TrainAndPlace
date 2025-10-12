import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, FileText, Calendar, Search, Filter, Send } from 'lucide-react';
import '../../App.css';

const TPOSupport = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Mock data for TPO contacts
  const tpoContacts = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      designation: "Chief Placement Officer",
      email: "tpo@college.edu",
      phone: "+91 98765 43210",
      department: "Placement Cell",
      office: "Main Building, Room 201"
    },
    {
      id: 2,
      name: "Ms. Priya Sharma",
      designation: "Assistant TPO",
      email: "tpo.assistant@college.edu",
      phone: "+91 87654 32109",
      department: "Placement Cell",
      office: "Main Building, Room 202"
    }
  ];

  // Mock data for documents
  const documents = [
    {
      id: 1,
      title: "Alumni Referral Guidelines",
      category: "Guidelines",
      date: "2025-09-15",
      size: "2.4 MB",
      downloads: 124
    },
    {
      id: 2,
      title: "Company Outreach Template",
      category: "Templates",
      date: "2025-08-22",
      size: "1.1 MB",
      downloads: 87
    },
    {
      id: 3,
      title: "Alumni Success Stories Submission Form",
      category: "Forms",
      date: "2025-07-30",
      size: "0.8 MB",
      downloads: 156
    }
  ];

  // Mock data for events
  const events = [
    {
      id: 1,
      title: "Alumni Meet & Greet",
      date: "2025-10-25",
      time: "4:00 PM - 6:00 PM",
      location: "Main Auditorium",
      description: "Quarterly meet-up for alumni to connect with TPO team and fellow alumni."
    },
    {
      id: 2,
      title: "Industry Trends Seminar",
      date: "2025-11-10",
      time: "10:00 AM - 12:00 PM",
      location: "Seminar Hall 1",
      description: "Discussion on current industry trends and their impact on student placements."
    }
  ];

  // Filter documents based on search and filters
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'All' || doc.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = ['All', ...new Set(documents.map(doc => doc.category))];

  return (
    <div className="tpo-support">
      <div className="page-header">
        <h1>TPO Support</h1>
        <p>Connect with the Training and Placement Office for alumni-related support</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={activeTab === 'contact' ? 'active' : ''}
          onClick={() => setActiveTab('contact')}
        >
          <Mail size={16} />
          Contact TPO
        </button>
        <button 
          className={activeTab === 'documents' ? 'active' : ''}
          onClick={() => setActiveTab('documents')}
        >
          <FileText size={16} />
          Documents
        </button>
        <button 
          className={activeTab === 'events' ? 'active' : ''}
          onClick={() => setActiveTab('events')}
        >
          <Calendar size={16} />
          Events
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Contact TPO Tab */}
        {activeTab === 'contact' && (
          <div className="contact-tab">
            <div className="contacts-grid">
              {tpoContacts.map(contact => (
                <div key={contact.id} className="contact-card">
                  <div className="contact-header">
                    <h3>{contact.name}</h3>
                    <p>{contact.designation}</p>
                  </div>
                  
                  <div className="contact-details">
                    <div className="info-item">
                      <Mail size={16} />
                      <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </div>
                    <div className="info-item">
                      <Phone size={16} />
                      <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                    </div>
                    <div className="info-item">
                      <FileText size={16} />
                      <span>{contact.department}</span>
                    </div>
                    <div className="info-item">
                      <Calendar size={16} />
                      <span>{contact.office}</span>
                    </div>
                  </div>
                  
                  <div className="contact-actions">
                    <button className="primary-button">
                      <Mail size={16} />
                      Send Email
                    </button>
                    <button className="secondary-button">
                      <MessageCircle size={16} />
                      Schedule Meeting
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="message-form">
              <h3>Send a Message to TPO</h3>
              <form>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" placeholder="Enter subject" />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea rows="5" placeholder="Enter your message"></textarea>
                </div>
                <button type="submit" className="primary-button">
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="documents-tab">
            {/* Search and Filters */}
            <div className="documents-controls">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search documents..."
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
            
            {/* Documents List */}
            <div className="documents-list">
              {filteredDocuments.map(doc => (
                <div key={doc.id} className="document-card">
                  <div className="document-icon">
                    <FileText size={24} />
                  </div>
                  <div className="document-info">
                    <h3>{doc.title}</h3>
                    <p className="document-meta">
                      <span className="category">{doc.category}</span>
                      <span>{doc.date}</span>
                      <span>{doc.size}</span>
                    </p>
                    <p className="downloads">{doc.downloads} downloads</p>
                  </div>
                  <div className="document-actions">
                    <button className="primary-button">Download</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="events-tab">
            <div className="events-list">
              {events.map(event => (
                <div key={event.id} className="event-card">
                  <div className="event-header">
                    <h3>{event.title}</h3>
                    <div className="event-date">
                      <Calendar size={16} />
                      <span>{event.date} at {event.time}</span>
                    </div>
                  </div>
                  
                  <div className="event-details">
                    <div className="info-item">
                      <Calendar size={16} />
                      <span>{event.location}</span>
                    </div>
                    <p>{event.description}</p>
                  </div>
                  
                  <div className="event-actions">
                    <button className="primary-button">Register</button>
                    <button className="secondary-button">Add to Calendar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TPOSupport;