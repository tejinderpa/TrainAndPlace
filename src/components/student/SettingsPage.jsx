import React, { useState } from 'react';
import { User, Lock, Eye, Bell, Shield, Trash2, LogOut } from 'lucide-react';
import '../../App.css';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Sample user data
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    batch: "2022-2026",
    branch: "Computer Science"
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    // In a real app, this would update the backend
    console.log("Password change requested", passwordData);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleLogout = () => {
    // In a real app, this would clear user session
    console.log("User logged out");
  };

  const handleDeleteAccount = () => {
    // In a real app, this would delete the user account
    console.log("Account deletion requested");
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account preferences and privacy settings</p>
      </div>

      <div className="settings-layout">
        {/* Sidebar Navigation */}
        <div className="settings-sidebar">
          <button 
            className={`settings-nav-item ${activeSection === 'account' ? 'active' : ''}`}
            onClick={() => setActiveSection('account')}
          >
            <User size={20} />
            Account Settings
          </button>
          <button 
            className={`settings-nav-item ${activeSection === 'security' ? 'active' : ''}`}
            onClick={() => setActiveSection('security')}
          >
            <Lock size={20} />
            Security
          </button>
          <button 
            className={`settings-nav-item ${activeSection === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveSection('privacy')}
          >
            <Eye size={20} />
            Privacy
          </button>
          <button 
            className={`settings-nav-item ${activeSection === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveSection('notifications')}
          >
            <Bell size={20} />
            Notifications
          </button>
          <button 
            className={`settings-nav-item ${activeSection === 'data' ? 'active' : ''}`}
            onClick={() => setActiveSection('data')}
          >
            <Shield size={20} />
            Data & Permissions
          </button>
          <button 
            className="settings-nav-item logout"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Logout
          </button>
          <button 
            className="settings-nav-item delete"
            onClick={handleDeleteAccount}
          >
            <Trash2 size={20} />
            Delete Account
          </button>
        </div>

        {/* Main Content */}
        <div className="settings-content">
          {/* Account Settings */}
          {activeSection === 'account' && (
            <div className="settings-section">
              <h2>Account Settings</h2>
              
              <div className="settings-card">
                <h3>Personal Information</h3>
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    defaultValue={userData.name}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    defaultValue={userData.email}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    defaultValue={userData.phone}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Batch</label>
                    <input 
                      type="text" 
                      defaultValue={userData.batch}
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label>Branch</label>
                    <input 
                      type="text" 
                      defaultValue={userData.branch}
                      disabled
                    />
                  </div>
                </div>
                <button className="save-button">Save Changes</button>
              </div>
              
              <div className="settings-card">
                <h3>Profile Visibility</h3>
                <div className="toggle-group">
                  <div className="toggle-item">
                    <span>Make profile visible to recruiters</span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>Show contact information to alumni</span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>Display achievements publicly</span>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeSection === 'security' && (
            <div className="settings-section">
              <h2>Security Settings</h2>
              
              <div className="settings-card">
                <h3>Change Password</h3>
                <form onSubmit={handleSubmitPassword}>
                  <div className="form-group">
                    <label>Current Password</label>
                    <input 
                      type="password" 
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input 
                      type="password" 
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input 
                      type="password" 
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <button type="submit" className="save-button">Update Password</button>
                </form>
              </div>
              
              <div className="settings-card">
                <h3>Two-Factor Authentication</h3>
                <div className="toggle-item">
                  <span>Enable two-factor authentication</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <p className="help-text">
                  Add an extra layer of security to your account by requiring a code in addition to your password.
                </p>
              </div>
              
              <div className="settings-card">
                <h3>Login Activity</h3>
                <div className="login-activity">
                  <div className="activity-item">
                    <div>
                      <p><strong>Chrome on Windows</strong></p>
                      <p>New York, USA • 2 hours ago</p>
                    </div>
                    <button className="revoke-button">Revoke</button>
                  </div>
                  <div className="activity-item">
                    <div>
                      <p><strong>Safari on iPhone</strong></p>
                      <p>San Francisco, USA • 1 day ago</p>
                    </div>
                    <button className="revoke-button">Revoke</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Settings */}
          {activeSection === 'privacy' && (
            <div className="settings-section">
              <h2>Privacy Settings</h2>
              
              <div className="settings-card">
                <h3>Data Sharing</h3>
                <div className="toggle-group">
                  <div className="toggle-item">
                    <span>Share anonymized data for research</span>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>Allow profile to appear in search results</span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>Show online status to connections</span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="settings-card">
                <h3>Activity Visibility</h3>
                <div className="toggle-group">
                  <div className="toggle-item">
                    <span>Show course enrollments to connections</span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>Show event attendance publicly</span>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>Show project activity to followers</span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeSection === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Preferences</h2>
              
              <div className="settings-card">
                <h3>Email Notifications</h3>
                <div className="toggle-group">
                  <div className="toggle-item">
                    <span>Job alerts and opportunities</span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>Event reminders</span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>Application status updates</span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>Newsletter and updates</span>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="settings-card">
                <h3>Push Notifications</h3>
                <div className="toggle-group">
                  <div className="toggle-item">
                    <span>Instant job notifications</span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>Event notifications</span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>Mentorship messages</span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>Community activity</span>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="settings-card">
                <h3>In-App Notifications</h3>
                <div className="toggle-group">
                  <div className="toggle-item">
                    <span>Show notification badges</span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>Play notification sounds</span>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data & Permissions */}
          {activeSection === 'data' && (
            <div className="settings-section">
              <h2>Data & Permissions</h2>
              
              <div className="settings-card">
                <h3>Data Export</h3>
                <p>Download a copy of your data from our platform.</p>
                <button className="export-button">Export Data</button>
              </div>
              
              <div className="settings-card">
                <h3>Data Deletion</h3>
                <p>
                  Permanently delete your account and all associated data. 
                  This action cannot be undone.
                </p>
                <button 
                  className="delete-button"
                  onClick={handleDeleteAccount}
                >
                  <Trash2 size={16} />
                  Delete Account
                </button>
              </div>
              
              <div className="settings-card">
                <h3>Third-Party Permissions</h3>
                <div className="permissions-list">
                  <div className="permission-item">
                    <div>
                      <p><strong>LinkedIn Integration</strong></p>
                      <p>Sync profile and connections</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="permission-item">
                    <div>
                      <p><strong>GitHub Integration</strong></p>
                      <p>Import repositories and contributions</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;