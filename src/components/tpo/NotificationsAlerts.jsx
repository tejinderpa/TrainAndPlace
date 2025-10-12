import React, { useState, useEffect } from 'react';
import { Bell, Mail, Check, X, Trash2, Eye, Search, Filter, Clock, AlertCircle, CheckCircle, Info } from 'lucide-react';
import '../../App.css';

const NotificationsAlerts = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Company Registration",
      message: "Meta has registered on the platform and is awaiting verification.",
      type: "info",
      timestamp: "2025-10-12 14:30",
      read: false,
      category: "company"
    },
    {
      id: 2,
      title: "Job Posting Approval Required",
      message: "Microsoft has posted a new job opening that requires your approval.",
      type: "alert",
      timestamp: "2025-10-12 13:45",
      read: false,
      category: "job"
    },
    {
      id: 3,
      title: "Upcoming Placement Drive",
      message: "Google placement drive is scheduled for October 20, 2025.",
      type: "reminder",
      timestamp: "2025-10-12 12:15",
      read: true,
      category: "event"
    },
    {
      id: 4,
      title: "Student Application Update",
      message: "Sarah Williams has applied for the Software Engineer position at Amazon.",
      type: "info",
      timestamp: "2025-10-12 11:30",
      read: true,
      category: "application"
    },
    {
      id: 5,
      title: "System Maintenance Scheduled",
      message: "Platform maintenance scheduled for October 15, 2025 from 2:00 AM to 4:00 AM.",
      type: "system",
      timestamp: "2025-10-12 10:00",
      read: true,
      category: "system"
    },
    {
      id: 6,
      title: "Document Verification Pending",
      method: "Verify 15 student documents pending verification.",
      type: "alert",
      timestamp: "2025-10-12 09:45",
      read: false,
      category: "student"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRead, setFilterRead] = useState('all');
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, read: true } 
        : notification
    ));
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // Delete all read notifications
  const deleteAllRead = () => {
    setNotifications(notifications.filter(notification => !notification.read));
  };

  // Send broadcast message
  const sendBroadcast = (messageData) => {
    const newNotification = {
      id: notifications.length + 1,
      title: "Broadcast Message",
      message: messageData.message,
      type: "info",
      timestamp: new Date().toLocaleString(),
      read: false,
      category: "broadcast",
      sender: messageData.sender
    };
    setNotifications([newNotification, ...notifications]);
    setShowBroadcastModal(false);
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || notification.category === filterCategory;
    const matchesRead = filterRead === 'all' || 
                       (filterRead === 'read' && notification.read) || 
                       (filterRead === 'unread' && !notification.read);
    return matchesSearch && matchesCategory && matchesRead;
  });

  // Get unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications-alerts">
      <div className="page-header">
        <h1>Notifications & Alerts Center</h1>
        <p>Manage system notifications and broadcast messages</p>
      </div>

      {/* Controls */}
      <div className="controls-section">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-controls">
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="company">Company</option>
            <option value="job">Job Postings</option>
            <option value="event">Events</option>
            <option value="application">Applications</option>
            <option value="student">Students</option>
            <option value="system">System</option>
          </select>
          
          <select 
            value={filterRead} 
            onChange={(e) => setFilterRead(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
          
          <button className="secondary-button" onClick={markAllAsRead}>
            <Check size={16} />
            Mark All Read
          </button>
          
          <button className="secondary-button" onClick={deleteAllRead}>
            <Trash2 size={16} />
            Clear Read
          </button>
          
          <button className="primary-button" onClick={() => setShowBroadcastModal(true)}>
            <Mail size={16} />
            Broadcast Message
          </button>
        </div>
      </div>

      {/* Unread Count */}
      <div className="unread-count">
        <Bell size={20} />
        <span>{unreadCount} unread notifications</span>
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
            >
              <div className="notification-icon">
                {notification.type === 'alert' && <AlertCircle size={20} />}
                {notification.type === 'info' && <Info size={20} />}
                {notification.type === 'reminder' && <Clock size={20} />}
                {notification.type === 'system' && <Bell size={20} />}
              </div>
              
              <div className="notification-content">
                <div className="notification-header">
                  <h3>{notification.title}</h3>
                  <span className="notification-time">{notification.timestamp}</span>
                </div>
                <p>{notification.message}</p>
                <div className="notification-category">
                  <span className="badge">{notification.category}</span>
                </div>
              </div>
              
              <div className="notification-actions">
                {!notification.read && (
                  <button 
                    className="icon-button"
                    onClick={() => markAsRead(notification.id)}
                    title="Mark as read"
                  >
                    <Check size={16} />
                  </button>
                )}
                <button 
                  className="icon-button"
                  onClick={() => deleteNotification(notification.id)}
                  title="Delete notification"
                >
                  <Trash2 size={16} />
                </button>
                <button className="icon-button" title="View details">
                  <Eye size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-notifications">
            <Bell size={48} />
            <h3>No notifications found</h3>
            <p>There are no notifications matching your current filters.</p>
          </div>
        )}
      </div>

      {/* Broadcast Modal */}
      {showBroadcastModal && (
        <BroadcastModal 
          onSend={sendBroadcast}
          onClose={() => setShowBroadcastModal(false)}
        />
      )}
    </div>
  );
};

const BroadcastModal = ({ onSend, onClose }) => {
  const [messageData, setMessageData] = useState({
    message: '',
    sender: 'TPO Office',
    recipients: 'all'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessageData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageData.message.trim()) {
      onSend(messageData);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Broadcast Message</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={messageData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Enter your broadcast message..."
              required
            />
          </div>
          
          <div className="form-group">
            <label>Sender</label>
            <input
              type="text"
              name="sender"
              value={messageData.sender}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Recipients</label>
            <select
              name="recipients"
              value={messageData.recipients}
              onChange={handleChange}
            >
              <option value="all">All Users</option>
              <option value="students">Students Only</option>
              <option value="companies">Companies Only</option>
              <option value="tpo">TPO Staff Only</option>
              <option value="alumni">Alumni Only</option>
            </select>
          </div>
          
          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              <Mail size={16} />
              Send Broadcast
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationsAlerts;