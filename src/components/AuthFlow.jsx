import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building2, GraduationCap, Shield } from 'lucide-react';
import '../App.css';

const AuthFlow = () => {
  const [step, setStep] = useState('role-selection'); // role-selection, login, register
  const [selectedRole, setSelectedRole] = useState('');
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setStep('login'); // For now, we'll go to login. In a real app, you might check if user exists
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you would authenticate with Firebase here
    console.log('Login attempt with:', credentials);
    
    // Redirect based on role
    switch(selectedRole) {
      case 'student':
        navigate('/student/dashboard');
        break;
      case 'company':
        navigate('/company/dashboard');
        break;
      case 'alumni':
        navigate('/alumni/dashboard');
        break;
      case 'tpo':
        navigate('/tpo/dashboard');
        break;
      default:
        // Stay on login page
        break;
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // In a real app, you would register with Firebase here
    console.log('Registration attempt with:', registrationData);
    
    // Redirect based on role
    switch(selectedRole) {
      case 'student':
        navigate('/student/dashboard');
        break;
      case 'company':
        navigate('/company/dashboard');
        break;
      case 'alumni':
        navigate('/alumni/dashboard');
        break;
      case 'tpo':
        navigate('/tpo/dashboard');
        break;
      default:
        // Stay on registration page
        break;
    }
  };

  const handleCredentialChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const roleOptions = [
    { id: 'student', label: 'Student', icon: User, color: '#2196f3' },
    { id: 'company', label: 'Company', icon: Building2, color: '#4caf50' },
    { id: 'alumni', label: 'Alumni', icon: GraduationCap, color: '#ff9800' },
    { id: 'tpo', label: 'TPO', icon: Shield, color: '#9c27b0' }
  ];

  return (
    <div className="auth-flow">
      {step === 'role-selection' && (
        <div className="role-selection">
          <div className="auth-card">
            <h2>Welcome to Placement Portal</h2>
            <p>Please select your role to continue</p>
            
            <div className="role-grid">
              {roleOptions.map((role) => {
                const IconComponent = role.icon;
                return (
                  <button
                    key={role.id}
                    className="role-card"
                    onClick={() => handleRoleSelect(role.id)}
                  >
                    <IconComponent size={32} style={{ color: role.color }} />
                    <span>{role.label}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="auth-footer">
              <p>Already have an account? <button onClick={() => setStep('login')}>Login</button></p>
              <p>Don't have an account? <button onClick={() => setStep('register')}>Register</button></p>
            </div>
          </div>
        </div>
      )}

      {step === 'login' && (
        <div className="login-form">
          <div className="auth-card">
            <h2>Login as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</h2>
            <p>Enter your credentials to access your account</p>
            
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleCredentialChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleCredentialChange}
                  required
                />
              </div>
              
              <button type="submit" className="primary-button">Login</button>
            </form>
            
            <div className="auth-footer">
              <p>Don't have an account? <button onClick={() => setStep('register')}>Register</button></p>
              <p><button onClick={() => setStep('role-selection')}>Change Role</button></p>
            </div>
          </div>
        </div>
      )}

      {step === 'register' && (
        <div className="register-form">
          <div className="auth-card">
            <h2>Register as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</h2>
            <p>Create a new account to get started</p>
            
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={registrationData.name}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={registrationData.email}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={registrationData.password}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={registrationData.confirmPassword}
                  onChange={handleRegistrationChange}
                  required
                />
              </div>
              
              <button type="submit" className="primary-button">Register</button>
            </form>
            
            <div className="auth-footer">
              <p>Already have an account? <button onClick={() => setStep('login')}>Login</button></p>
              <p><button onClick={() => setStep('role-selection')}>Change Role</button></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthFlow;