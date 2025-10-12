import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Settings, AlertCircle, CheckCircle } from 'lucide-react';
import '../App.css';

const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState({
    email: {
      jobAlerts: true,
      eventReminders: true,
      applicationUpdates: true,
      newsletters: false,
      systemUpdates: true
    },
    push: {
      instantJobNotifications: true,
      eventNotifications: true,
      mentorshipMessages: true,
      communityActivity: false
    },
    inApp: {
      showBadges: true,
      playSounds: false,
      desktopNotifications: true
    },
    frequency: 'immediate',
    categories: {
      jobs: true,
      events: true,
      mentorship: true,
      community: true,
      system: true
    }
  });

  const handleToggle = (category, field) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: !prev[category][field]
      }
    }));
  };

  const handleFrequencyChange = (value) => {
    setPreferences(prev => ({
      ...prev,
      frequency: value
    }));
  };

  const handleCategoryToggle = (category) => {
    setPreferences(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: !prev.categories[category]
      }
    }));
  };

  const handleSavePreferences = () => {
    // In a real app, this would save to backend
    console.log("Notification preferences saved", preferences);
    alert("Notification preferences saved successfully!");
  };

  return (
    <div className="notification-preferences">
      <div className="page-header">
        <h1>Notification Preferences</h1>
        <p>Customize how and when you receive notifications</p>
      </div>

      <div className="preferences-layout">
        <div className="preferences-content">
          {/* Email Notifications */}
          <div className="settings-card">
            <div className="section-header">
              <Mail size={24} />
              <h2>Email Notifications</h2>
            </div>
            <p>Choose which types of emails you'd like to receive</p>
            
            <div className="toggle-group">
              <div className="toggle-item">
                <div>
                  <p><strong>Job alerts and opportunities</strong></p>
                  <p>Get notified about new job postings matching your profile</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={preferences.email.jobAlerts}
                    onChange={() => handleToggle('email', 'jobAlerts')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="toggle-item">
                <div>
                  <p><strong>Event reminders</strong></p>
                  <p>Receive reminders for upcoming events and workshops</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={preferences.email.eventReminders}
                    onChange={() => handleToggle('email', 'eventReminders')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="toggle-item">
                <div>
                  <p><strong>Application status updates</strong></p>
                  <p>Get updates on your job applications and interview schedules</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={preferences.email.applicationUpdates}
                    onChange={() => handleToggle('email', 'applicationUpdates')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="toggle-item">
                <div>
                  <p><strong>Newsletter and updates</strong></p>
                  <p>Receive our monthly newsletter and platform updates</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={preferences.email.newsletters}
                    onChange={() => handleToggle('email', 'newsletters')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="toggle-item">
                <div>
                  <p><strong>System updates and maintenance</strong></p>
                  <p>Important notifications about system maintenance and updates</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={preferences.email.systemUpdates}
                    onChange={() => handleToggle('email', 'systemUpdates')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Push Notifications */}
          <div className="settings-card">
            <div className="section-header">
              <Smartphone size={24} />
              <h2>Push Notifications</h2>
            </div>
            <p>Receive instant notifications on your mobile device</p>
            
            <div className="toggle-group">
              <div className="toggle-item">
                <div>
                  <p><strong>Instant job notifications</strong></p>
                  <p>Get notified immediately when new jobs are posted</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={preferences.push.instantJobNotifications}
                    onChange={() => handleToggle('push', 'instantJobNotifications')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="toggle-item">
                <div>
                  <p><strong>Event notifications</strong></p>
                  <p>Receive notifications about upcoming events</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={preferences.push.eventNotifications}
                    onChange={() => handleToggle('push', 'eventNotifications')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="toggle-item">
                <div>
                  <p><strong>Mentorship messages</strong></p>
                  <p>Get notified when you receive mentorship requests or messages</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={preferences.push.mentorshipMessages}
                    onChange={() => handleToggle('push', 'mentorshipMessages')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="toggle-item">
                <div>
                  <p><strong>Community activity</strong></p>
                  <p>Notifications about posts and activities in your community</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={preferences.push.communityActivity}
                    onChange={() => handleToggle('push', 'communityActivity')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* In-App Notifications */}
          <div className="settings-card">
            <div className="section-header">
              <Bell size={24} />
              <h2>In-App Notifications</h2>
            </div>
            <p>Customize notifications within the application</p>
            
            <div className="toggle-group">
              <div className="toggle-item">
                <div>
                  <p><strong>Show notification badges</strong></p>
                  <p>Display badge counters on navigation items</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={preferences.inApp.showBadges}
                    onChange={() => handleToggle('inApp', 'showBadges')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="toggle-item">
                <div>
                  <p><strong>Play notification sounds</strong></p>
                  <p>Play sounds when you receive new notifications</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={preferences.inApp.playSounds}
                    onChange={() => handleToggle('inApp', 'playSounds')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="toggle-item">
                <div>
                  <p><strong>Desktop notifications</strong></p>
                  <p>Show desktop notifications when the app is open</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={preferences.inApp.desktopNotifications}
                    onChange={() => handleToggle('inApp', 'desktopNotifications')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Frequency Settings */}
          <div className="settings-card">
            <div className="section-header">
              <Settings size={24} />
              <h2>Notification Frequency</h2>
            </div>
            <p>Choose how often you want to receive notifications</p>
            
            <div className="radio-group">
              <label className="radio-item">
                <input 
                  type="radio" 
                  name="frequency" 
                  value="immediate"
                  checked={preferences.frequency === 'immediate'}
                  onChange={() => handleFrequencyChange('immediate')}
                />
                <div>
                  <p><strong>Immediate</strong></p>
                  <p>Receive notifications as they happen</p>
                </div>
              </label>
              
              <label className="radio-item">
                <input 
                  type="radio" 
                  name="frequency" 
                  value="hourly"
                  checked={preferences.frequency === 'hourly'}
                  onChange={() => handleFrequencyChange('hourly')}
                />
                <div>
                  <p><strong>Hourly Digest</strong></p>
                  <p>Receive a summary of notifications every hour</p>
                </div>
              </label>
              
              <label className="radio-item">
                <input 
                  type="radio" 
                  name="frequency" 
                  value="daily"
                  checked={preferences.frequency === 'daily'}
                  onChange={() => handleFrequencyChange('daily')}
                />
                <div>
                  <p><strong>Daily Digest</strong></p>
                  <p>Receive a daily summary of all notifications</p>
                </div>
              </label>
              
              <label className="radio-item">
                <input 
                  type="radio" 
                  name="frequency" 
                  value="weekly"
                  checked={preferences.frequency === 'weekly'}
                  onChange={() => handleFrequencyChange('weekly')}
                />
                <div>
                  <p><strong>Weekly Digest</strong></p>
                  <p>Receive a weekly summary of all notifications</p>
                </div>
              </label>
            </div>
          </div>

          {/* Category-wise Preferences */}
          <div className="settings-card">
            <div className="section-header">
              <AlertCircle size={24} />
              <h2>Category Preferences</h2>
            </div>
            <p>Choose which categories of notifications you want to receive</p>
            
            <div className="category-preferences">
              <div className="category-item">
                <div>
                  <p><strong>Jobs & Internships</strong></p>
                  <p>Notifications related to job postings and internships</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={preferences.categories.jobs}
                    onChange={() => handleCategoryToggle('jobs')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="category-item">
                <div>
                  <p><strong>Events & Workshops</strong></p>
                  <p>Notifications about upcoming events and workshops</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={preferences.categories.events}
                    onChange={() => handleCategoryToggle('events')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="category-item">
                <div>
                  <p><strong>Mentorship</strong></p>
                  <p>Notifications related to mentorship programs</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={preferences.categories.mentorship}
                    onChange={() => handleCategoryToggle('mentorship')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="category-item">
                <div>
                  <p><strong>Community</strong></p>
                  <p>Notifications from community discussions and activities</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={preferences.categories.community}
                    onChange={() => handleCategoryToggle('community')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              
              <div className="category-item">
                <div>
                  <p><strong>System & Updates</strong></p>
                  <p>Important system notifications and updates</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={preferences.categories.system}
                    onChange={() => handleCategoryToggle('system')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="save-section">
            <button className="primary-button" onClick={handleSavePreferences}>
              <CheckCircle size={16} />
              Save Notification Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;