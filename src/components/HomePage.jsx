import React, { useState } from 'react';
import { 
  Users, 
  Building2, 
  GraduationCap, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin,
  Menu,
  X,
  Info,
  Contact
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../App.css';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const features = [
    {
      icon: <GraduationCap size={40} />,
      title: "For Students",
      description: "Access thousands of job opportunities, career resources, and connect with top recruiters.",
      highlights: [
        "Personalized job recommendations",
        "Resume building tools",
        "Interview preparation",
        "Career counseling"
      ]
    },
    {
      icon: <Building2 size={40} />,
      title: "For Companies",
      description: "Find the best talent pool, streamline recruitment, and build your employer brand.",
      highlights: [
        "Access to verified student profiles",
        "Campus recruitment scheduling",
        "AI-powered candidate matching",
        "Analytics dashboard"
      ]
    },
    {
      icon: <Users size={40} />,
      title: "For Alumni",
      description: "Stay connected with your alma mater and help current students with mentorship.",
      highlights: [
        "Networking opportunities",
        "Mentorship programs",
        "Industry insights sharing",
        "Campus event participation"
      ]
    },
    {
      icon: <Briefcase size={40} />,
      title: "For TPO",
      description: "Efficiently manage placements, track statistics, and enhance student outcomes.",
      highlights: [
        "Centralized dashboard",
        "Real-time analytics",
        "Communication tools",
        "Report generation"
      ]
    }
  ];

  const benefits = [
    "Centralized Placement Portal",
    "Verified Company Profiles",
    "Real-time Analytics",
    "AI-Powered Matching",
    "24/7 Support",
    "Secure Data Management"
  ];

  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <header className="navbar">
        <div className="nav-container">
          <div className="logo">
            <h2>National TPO Portal</h2>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="nav-menu">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#benefits">Benefits</a>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          
          <div className="nav-buttons">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/register" className="join-btn">Join Now</Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="mobile-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav-menu">
            <a href="#features" onClick={toggleMenu}>Features</a>
            <a href="#how-it-works" onClick={toggleMenu}>How It Works</a>
            <a href="#benefits" onClick={toggleMenu}>Benefits</a>
            <Link to="/about" onClick={toggleMenu}>About Us</Link>
            <Link to="/contact" onClick={toggleMenu}>Contact</Link>
            <Link to="/login" className="login-btn mobile" onClick={toggleMenu}>Login</Link>
            <Link to="/register" className="join-btn mobile" onClick={toggleMenu}>Join Now</Link>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Connecting Talent with Opportunities Nationwide</h1>
          <p>
            The National TPO Portal bridges the gap between students, educational institutions, 
            and employers to create a seamless placement experience across the country.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="primary-btn">Get Started</Link>
            <Link to="/about" className="secondary-btn">Learn More</Link>
          </div>
          <div className="stats">
            <div className="stat-item">
              <h3>5000+</h3>
              <p>Companies</p>
            </div>
            <div className="stat-item">
              <h3>10L+</h3>
              <p>Students Placed</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Institutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Tailored Solutions for Every Stakeholder</h2>
          <p className="section-subtitle">
            Our platform offers specialized features for students, companies, alumni, and TPO coordinators
          </p>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <ul className="feature-highlights">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Get started in three simple steps
          </p>
          
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Sign Up</h3>
              <p>Create your account and complete your profile with relevant details.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Connect</h3>
              <p>Browse opportunities or candidates based on your role and requirements.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Succeed</h3>
              <p>Engage, interview, and achieve your placement or hiring goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="benefits">
        <div className="container">
          <h2 className="section-title">Why Choose Our Portal</h2>
          <p className="section-subtitle">
            Experience the advantages of a centralized, efficient placement system
          </p>
          
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                <div className="benefit-number">{index + 1}</div>
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have questions? Our team is here to help.
          </p>
          
          <div className="contact-info">
            <div className="contact-item">
              <Mail size={24} />
              <div>
                <h3>Email</h3>
                <p>support@nationaltpoportal.edu</p>
              </div>
            </div>
            <div className="contact-item">
              <Phone size={24} />
              <div>
                <h3>Phone</h3>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="contact-item">
              <MapPin size={24} />
              <div>
                <h3>Address</h3>
                <p>National TPO Headquarters, New Delhi, India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Transform Your Placement Experience?</h2>
          <p>Join thousands of institutions and companies already using our platform</p>
          <Link to="/register" className="join-btn large">Join Now</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>National TPO Portal</h3>
              <p>Connecting talent with opportunities across the nation since 2025.</p>
            </div>
            
            <div className="footer-section">
              <h4>For Students</h4>
              <ul>
                <li><a href="#">Browse Jobs</a></li>
                <li><a href="#">Career Resources</a></li>
                <li><a href="#">Resume Builder</a></li>
                <li><a href="#">Interview Prep</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>For Companies</h4>
              <ul>
                <li><a href="#">Post Jobs</a></li>
                <li><a href="#">Search Candidates</a></li>
                <li><a href="#">Campus Hiring</a></li>
                <li><a href="#">Pricing</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 National TPO Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;