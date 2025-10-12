import React, { useState } from 'react';
import { User, Lock, Eye, Shield, Trash2, LogOut, Key } from 'lucide-react';
import '../App.css';

const AccountSettings = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [accountStatus, setAccountStatus] = useState('active'); // active, deactivated

  // Sample user data - in a real app, this would come from context or API
  const userData = {
    name: "User Name",
    email: "user@example.com",
    role: "Student" // This would be dynamic based on user role
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
    alert("Password updated successfully!");
  };

  const handleDeactivateAccount = () => {
    if (window.confirm("Are you sure you want to deactivate your account? You can reactivate it later by logging in.")) {
      setAccountStatus('deactivated');
      alert("Account deactivated successfully.");
    }
  };

  const handleReactivateAccount = () => {
    setAccountStatus('active');
    alert("Account reactivated successfully.");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
      // In a real app, this would delete the user account
      console.log("Account deletion requested");
      alert("Account deleted successfully. You will be logged out.");
    }
  };

  const handleLogout = () => {
    // In a real app, this would clear user session
    console.log("User logged out");
    alert("You have been logged out.");
  };

  return (
    <div className="account-settings">
      <div className="page-header">
        <h1>Account Settings</h1>
        <p>Manage your account preferences and security settings</p>
      </div>

      <div className="settings-layout">
        {/* Sidebar Navigation */}
        <div className="settings-sidebar">
          <button 
            className={`settings-nav-item ${activeSection === 'account' ? 'active' : ''}`}
            onClick={() => setActiveSection('account')}
          >
            <User size={20} />
            Account Information
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
            className={`settings-nav-item ${activeSection === 'account-status' ? 'active' : ''}`}
            onClick={() => setActiveSection('account-status')}
          >
            <Shield size={20} />
            Account Status
          </button>
          <button 
            className="settings-nav-item logout"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="settings-content">
          {/* Account Information */}
          {activeSection === 'account' && (
            <div className="settings-section">
              <h2>Account Information</h2>
              
              <div className="settings-card">
                <h3>Personal Details</h3>
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
                  <label>Role</label>
                  <input 
                    type="text" 
                    defaultValue={userData.role}
                    disabled
                  />
                </div>
                <button className="save-button">Save Changes</button>
              </div>
              
              <div className="settings-card">
                <h3>Profile Visibility</h3>
                <div className="toggle-group">
                  <div className="toggle-item">
                    <span>Make profile visible to relevant users</span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>Show activity to connections</span>
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
                    <input 
                      type="checkbox" 
                      checked={twoFactorEnabled}
                      onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <p className="help-text">
                  Add an extra layer of security to your account by requiring a code in addition to your password.
                </p>
                
                {twoFactorEnabled && (
                  <div className="two-factor-setup">
                    <h4>Setup Instructions</h4>
                    <ol>
                      <li>Download an authenticator app (Google Authenticator, Authy, etc.)</li>
                      <li>Scan the QR code below with your authenticator app</li>
                      <li>Enter the 6-digit code generated by your app</li>
                    </ol>
                    <div className="qr-code-placeholder">
                      <p>QR Code would appear here</p>
                    </div>
                    <div className="form-group">
                      <label>Enter 6-digit code</label>
                      <input 
                        type="text" 
                        placeholder="123456"
                        maxLength="6"
                      />
                    </div>
                    <button className="save-button">Verify and Enable</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Privacy Settings */}
          {activeSection === 'privacy' && (
            <div className="settings-section">
              <h2>Privacy Settings</h2>
              
              <div className="settings-card">
                <h3>Data Sharing Preferences</h3>
                <div className="toggle-group">
                  <div className="toggle-item">
                    <span>Share anonymized data for research purposes</span>
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
                    <span>Show basic profile information to other users</span>
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
                    <span>Show participation in events</span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-item">
                    <span>Show achievements and certifications</span>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account Status */}
          {activeSection === 'account-status' && (
            <div className="settings-section">
              <h2>Account Status Management</h2>
              
              <div className="settings-card">
                <h3>Account Status</h3>
                <div className="account-status-info">
                  <p><strong>Current Status:</strong> 
                    <span className={`status-badge ${accountStatus}`}>
                      {accountStatus.charAt(0).toUpperCase() + accountStatus.slice(1)}
                    </span>
                  </p>
                  <p className="help-text">
                    {accountStatus === 'active' 
                      ? "Your account is currently active and fully functional." 
                      : "Your account is deactivated. You won't receive notifications or be able to access certain features."}
                  </p>
                  
                  {accountStatus === 'active' ? (
                    <button 
                      className="warning-button"
                      onClick={handleDeactivateAccount}
                    >
                      <Shield size={16} />
                      Deactivate Account
                    </button>
                  ) : (
                    <button 
                      className="save-button"
                      onClick={handleReactivateAccount}
                    >
                      <Shield size={16} />
                      Reactivate Account
                    </button>
                  )}
                </div>
              </div>
              
              <div className="settings-card">
                <h3>Delete Account</h3>
                <p className="warning-text">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button 
                  className="delete-button"
                  onClick={handleDeleteAccount}
                >
                  <Trash2 size={16} />
                  Delete Account Permanently
                </button>
              </div>
              
              <div className="settings-card">
                <h3>Data Export</h3>
                <p>Download a copy of your data from our platform.</p>
                <button className="export-button">
                  <Key size={16} />
                  Export My Data
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;