import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../App.css';

const RegistrationPage = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    batch: '',
    branch: '',
    phone: '',
    companyName: '',
    industry: '',
    contactPerson: '',
    website: '',
    currentCompany: '',
    graduationYear: '',
    collegeName: '',
    collegeId: '',
    officialEmail: ''
  });

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data:', { ...formData, role: selectedRole });
    // Here you would typically send the data to your backend
    alert('Registration submitted successfully!');
  };

  const renderRoleForm = () => {
    switch (selectedRole) {
      case 'student':
        return (
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="college"
              placeholder="College"
              value={formData.college}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="batch"
              placeholder="Batch"
              value={formData.batch}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="branch"
              placeholder="Branch"
              value={formData.branch}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
        );
      case 'company':
        return (
          <div className="form-group">
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="industry"
              placeholder="Industry"
              value={formData.industry}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="contactPerson"
              placeholder="Contact Person"
              value={formData.contactPerson}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <input
              type="url"
              name="website"
              placeholder="Website"
              value={formData.website}
              onChange={handleInputChange}
              required
            />
          </div>
        );
      case 'alumni':
        return (
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="college"
              placeholder="College"
              value={formData.college}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="batch"
              placeholder="Batch"
              value={formData.batch}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="branch"
              placeholder="Branch"
              value={formData.branch}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="currentCompany"
              placeholder="Current Company"
              value={formData.currentCompany}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="graduationYear"
              placeholder="Graduation Year"
              value={formData.graduationYear}
              onChange={handleInputChange}
              required
            />
          </div>
        );
      case 'tpo':
        return (
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="collegeName"
              placeholder="College Name"
              value={formData.collegeName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="collegeId"
              placeholder="College ID (Verification)"
              value={formData.collegeId}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="officialEmail"
              placeholder="Official Email"
              value={formData.officialEmail}
              onChange={handleInputChange}
              required
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          Back to Home
        </Link>
        
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join our platform and connect with opportunities</p>
        </div>

        {!selectedRole ? (
          <div className="role-selection">
            <h2>Select Your Role</h2>
            <div className="role-buttons">
              <button 
                className="role-btn" 
                onClick={() => handleRoleSelect('student')}
              >
                <div className="role-icon">🎓</div>
                <span>Student</span>
              </button>
              <button 
                className="role-btn" 
                onClick={() => handleRoleSelect('company')}
              >
                <div className="role-icon">🏢</div>
                <span>Company</span>
              </button>
              <button 
                className="role-btn" 
                onClick={() => handleRoleSelect('alumni')}
              >
                <div className="role-icon">👥</div>
                <span>Alumni</span>
              </button>
              <button 
                className="role-btn" 
                onClick={() => handleRoleSelect('tpo')}
              >
                <div className="role-icon">📋</div>
                <span>TPO</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="registration-form">
            <div className="role-header">
              <h2>{selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Registration</h2>
              <button 
                className="change-role-btn"
                onClick={() => setSelectedRole('')}
              >
                Change Role
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              {renderRoleForm()}
              
              <div className="terms-section">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>I agree to the Terms & Conditions</span>
                </label>
              </div>
              
              <button type="submit" className="submit-btn">
                Create Account
              </button>
            </form>
            
            <div className="auth-footer">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;