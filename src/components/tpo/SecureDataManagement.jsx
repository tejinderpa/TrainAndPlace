import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Key, Users, Building2, Shield, Download, Upload, AlertTriangle, CheckCircle } from 'lucide-react';
import '../../App.css';

const SecureDataManagement = () => {
  const [activeTab, setActiveTab] = useState('access-control');
  const [showPasswords, setShowPasswords] = useState({});

  // Mock data for access control
  const accessControlData = [
    {
      id: 1,
      role: "Student",
      permissions: ["View Profile", "Apply to Jobs", "View Applications"],
      userCount: 1250,
      status: "Active"
    },
    {
      id: 2,
      role: "TPO Staff",
      permissions: ["Full Access", "Manage Students", "Manage Companies", "Generate Reports"],
      userCount: 15,
      status: "Active"
    },
    {
      id: 3,
      role: "Company Representative",
      permissions: ["View Students", "Post Jobs", "Schedule Interviews"],
      userCount: 85,
      status: "Active"
    },
    {
      id: 4,
      role: "Alumni",
      permissions: ["View Students", "Mentorship Access", "Event Participation"],
      userCount: 320,
      status: "Active"
    }
  ];

  // Mock data for data privacy
  const privacySettings = [
    {
      id: 1,
      setting: "Student Academic Records",
      visibility: "TPO Staff Only",
      encryption: "AES-256",
      lastUpdated: "2025-10-01"
    },
    {
      id: 2,
      setting: "Placement Statistics",
      visibility: "Public (Anonymized)",
      encryption: "AES-256",
      lastUpdated: "2025-10-05"
    },
    {
      id: 3,
      setting: "Company Data",
      visibility: "TPO Staff & Companies",
      encryption: "AES-256",
      lastUpdated: "2025-09-28"
    },
    {
      id: 4,
      setting: "Student Contact Info",
      visibility: "TPO Staff & Companies (with consent)",
      encryption: "AES-256",
      lastUpdated: "2025-10-03"
    }
  ];

  // Mock data for backup and restore
  const backupData = [
    {
      id: 1,
      date: "2025-10-10",
      time: "02:00 AM",
      size: "2.4 GB",
      status: "Completed",
      type: "Full Backup"
    },
    {
      id: 2,
      date: "2025-10-09",
      time: "02:00 AM",
      size: "2.3 GB",
      status: "Completed",
      type: "Full Backup"
    },
    {
      id: 3,
      date: "2025-10-08",
      time: "02:00 AM",
      size: "2.3 GB",
      status: "Completed",
      type: "Full Backup"
    }
  ];

  // Mock data for audit logs
  const auditLogs = [
    {
      id: 1,
      user: "Dr. Rajesh Kumar",
      action: "Generated Placement Report",
      timestamp: "2025-10-12 14:30:22",
      ip: "192.168.1.105"
    },
    {
      id: 2,
      user: "Microsoft Recruiter",
      action: "Downloaded Student Database",
      timestamp: "2025-10-12 11:45:17",
      ip: "20.190.102.231"
    },
    {
      id: 3,
      user: "Sarah Williams",
      action: "Updated Profile",
      timestamp: "2025-10-12 09:15:44",
      ip: "103.210.45.78"
    },
    {
      id: 4,
      user: "System",
      action: "Automated Backup Completed",
      timestamp: "2025-10-12 02:00:05",
      ip: "192.168.1.1"
    }
  ];

  const togglePasswordVisibility = (id) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleRunBackup = () => {
    alert("Backup process initiated. This may take a few minutes.");
  };

  const handleRestoreBackup = (id) => {
    if (window.confirm("Are you sure you want to restore this backup? This will overwrite current data.")) {
      alert("Restore process initiated. Please wait for completion.");
    }
  };

  return (
    <div className="secure-data-management">
      <div className="page-header">
        <h1>Secure Data Management</h1>
        <p>Manage data security, privacy settings, and compliance</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={activeTab === 'access-control' ? 'active' : ''}
          onClick={() => setActiveTab('access-control')}
        >
          <Users size={16} />
          Access Control
        </button>
        <button 
          className={activeTab === 'privacy' ? 'active' : ''}
          onClick={() => setActiveTab('privacy')}
        >
          <Shield size={16} />
          Data Privacy
        </button>
        <button 
          className={activeTab === 'backup' ? 'active' : ''}
          onClick={() => setActiveTab('backup')}
        >
          <Download size={16} />
          Backup & Restore
        </button>
        <button 
          className={activeTab === 'audit' ? 'active' : ''}
          onClick={() => setActiveTab('audit')}
        >
          <Eye size={16} />
          Audit Logs
        </button>
        <button 
          className={activeTab === 'compliance' ? 'active' : ''}
          onClick={() => setActiveTab('compliance')}
        >
          <CheckCircle size={16} />
          Compliance
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Access Control Tab */}
        {activeTab === 'access-control' && (
          <div className="tab-pane">
            <div className="section-header">
              <h2>Role-Based Access Control</h2>
              <p>Manage permissions for different user roles</p>
            </div>
            
            <div className="access-control-grid">
              {accessControlData.map(role => (
                <div key={role.id} className="role-card">
                  <div className="role-header">
                    <div className="role-icon">
                      {role.role === "Student" && <Users size={24} />}
                      {role.role === "TPO Staff" && <Key size={24} />}
                      {role.role === "Company Representative" && <Building2 size={24} />}
                      {role.role === "Alumni" && <Users size={24} />}
                    </div>
                    <div className="role-info">
                      <h3>{role.role}</h3>
                      <p>{role.userCount} users</p>
                    </div>
                    <div className={`status-badge ${role.status.toLowerCase()}`}>
                      {role.status}
                    </div>
                  </div>
                  
                  <div className="role-permissions">
                    <h4>Permissions:</h4>
                    <ul>
                      {role.permissions.map((permission, index) => (
                        <li key={index}>{permission}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="role-actions">
                    <button className="secondary-button">
                      <Key size={16} />
                      Manage Permissions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data Privacy Tab */}
        {activeTab === 'privacy' && (
          <div className="tab-pane">
            <div className="section-header">
              <h2>Data Privacy Settings</h2>
              <p>Control visibility and encryption of sensitive data</p>
            </div>
            
            <div className="privacy-table">
              <div className="table-header">
                <div className="table-cell">Data Type</div>
                <div className="table-cell">Visibility</div>
                <div className="table-cell">Encryption</div>
                <div className="table-cell">Last Updated</div>
                <div className="table-cell">Actions</div>
              </div>
              
              {privacySettings.map(setting => (
                <div key={setting.id} className="table-row">
                  <div className="table-cell">
                    <strong>{setting.setting}</strong>
                  </div>
                  <div className="table-cell">
                    <span className="badge">{setting.visibility}</span>
                  </div>
                  <div className="table-cell">
                    <Lock size={16} /> {setting.encryption}
                  </div>
                  <div className="table-cell">
                    {setting.lastUpdated}
                  </div>
                  <div className="table-cell">
                    <button className="icon-button">
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Backup & Restore Tab */}
        {activeTab === 'backup' && (
          <div className="tab-pane">
            <div className="section-header">
              <h2>Backup & Restore</h2>
              <p>Manage data backups and restore points</p>
            </div>
            
            <div className="backup-controls">
              <button className="primary-button" onClick={handleRunBackup}>
                <Upload size={16} />
                Run Manual Backup
              </button>
              
              <div className="backup-info">
                <p><strong>Last Backup:</strong> Today at 02:00 AM</p>
                <p><strong>Next Scheduled Backup:</strong> Tomorrow at 02:00 AM</p>
              </div>
            </div>
            
            <div className="backup-history">
              <h3>Backup History</h3>
              <div className="backup-list">
                {backupData.map(backup => (
                  <div key={backup.id} className="backup-item">
                    <div className="backup-details">
                      <h4>{backup.type} - {backup.date}</h4>
                      <p>{backup.time} • {backup.size}</p>
                    </div>
                    <div className="backup-status">
                      <div className={`status-badge ${backup.status.toLowerCase()}`}>
                        {backup.status}
                      </div>
                      <button 
                        className="secondary-button"
                        onClick={() => handleRestoreBackup(backup.id)}
                      >
                        Restore
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Audit Logs Tab */}
        {activeTab === 'audit' && (
          <div className="tab-pane">
            <div className="section-header">
              <h2>Audit Logs</h2>
              <p>Track all system activities and user actions</p>
            </div>
            
            <div className="audit-filters">
              <div className="filter-group">
                <label>Date Range:</label>
                <input type="date" />
                <span>to</span>
                <input type="date" />
              </div>
              
              <div className="filter-group">
                <label>User:</label>
                <select>
                  <option>All Users</option>
                  <option>TPO Staff</option>
                  <option>Company Representatives</option>
                  <option>Students</option>
                  <option>Alumni</option>
                </select>
              </div>
              
              <button className="secondary-button">
                <Download size={16} />
                Export Logs
              </button>
            </div>
            
            <div className="audit-table">
              <div className="table-header">
                <div className="table-cell">User</div>
                <div className="table-cell">Action</div>
                <div className="table-cell">Timestamp</div>
                <div className="table-cell">IP Address</div>
              </div>
              
              {auditLogs.map(log => (
                <div key={log.id} className="table-row">
                  <div className="table-cell">
                    <strong>{log.user}</strong>
                  </div>
                  <div className="table-cell">
                    {log.action}
                  </div>
                  <div className="table-cell">
                    {log.timestamp}
                  </div>
                  <div className="table-cell">
                    {log.ip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compliance Tab */}
        {activeTab === 'compliance' && (
          <div className="tab-pane">
            <div className="section-header">
              <h2>Compliance Management</h2>
              <p>Ensure adherence to data protection regulations</p>
            </div>
            
            <div className="compliance-grid">
              <div className="compliance-card">
                <div className="compliance-header">
                  <CheckCircle size={24} />
                  <h3>GDPR Compliance</h3>
                </div>
                <p className="compliance-status">Fully Compliant</p>
                <p>Last audit: October 5, 2025</p>
                <button className="secondary-button">View Report</button>
              </div>
              
              <div className="compliance-card">
                <div className="compliance-header">
                  <CheckCircle size={24} />
                  <h3>Data Protection Act</h3>
                </div>
                <p className="compliance-status">Fully Compliant</p>
                <p>Last audit: September 28, 2025</p>
                <button className="secondary-button">View Report</button>
              </div>
              
              <div className="compliance-card">
                <div className="compliance-header">
                  <AlertTriangle size={24} />
                  <h3>Privacy Policy Update</h3>
                </div>
                <p className="compliance-status">Update Due</p>
                <p>Due by: December 31, 2025</p>
                <button className="primary-button">Update Now</button>
              </div>
              
              <div className="compliance-card">
                <div className="compliance-header">
                  <CheckCircle size={24} />
                  <h3>Security Certification</h3>
                </div>
                <p className="compliance-status">Certified</p>
                <p>Valid until: March 15, 2026</p>
                <button className="secondary-button">View Certificate</button>
              </div>
            </div>
            
            <div className="compliance-actions">
              <button className="primary-button">
                <Download size={16} />
                Generate Compliance Report
              </button>
              <button className="secondary-button">
                <Eye size={16} />
                View Compliance History
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecureDataManagement;