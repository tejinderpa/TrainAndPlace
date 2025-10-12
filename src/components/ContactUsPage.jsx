import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Clock, HelpCircle } from 'lucide-react';
import '../App.css';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      question: "How do I register as a student?",
      answer: "Click on the 'Join Now' button on the homepage, select 'Student' as your role, and fill in the required details. You'll receive a verification email to complete your registration."
    },
    {
      question: "What documents are required for company verification?",
      answer: "Companies need to provide their business registration certificate, PAN card, and authorized representative identification. Our team will verify these documents within 2-3 business days."
    },
    {
      question: "Is there a fee for using the platform?",
      answer: "The basic features are free for students and educational institutions. Companies have access to different pricing plans based on their hiring requirements. Contact our sales team for detailed pricing information."
    },
    {
      question: "How can alumni contribute to the platform?",
      answer: "Alumni can participate in mentorship programs, share industry insights, post job opportunities, and engage with campus events. Your professional experience can greatly benefit current students."
    },
    {
      question: "How long does it take to get placed through the portal?",
      answer: "Placement timelines vary depending on the role, company requirements, and your profile match. On average, students receive interview calls within 2-4 weeks of profile completion."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form data:', formData);
    // Here you would typically send the data to your backend
    alert('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <header className="page-header">
        <div className="container">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <h1>Contact Us</h1>
          <p>We're here to help and answer any questions you might have</p>
        </div>
      </header>

      <div className="container">
        <div className="contact-layout">
          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="contact-info-section">
            <h2>Contact Information</h2>
            
            <div className="contact-details">
              <div className="contact-item">
                <Mail size={24} />
                <div>
                  <h3>Email</h3>
                  <p>support@nationaltpoportal.edu</p>
                  <p>sales@nationaltpoportal.edu</p>
                </div>
              </div>
              
              <div className="contact-item">
                <Phone size={24} />
                <div>
                  <h3>Phone</h3>
                  <p>+91 98765 43210</p>
                  <p>+91 87654 32109</p>
                </div>
              </div>
              
              <div className="contact-item">
                <MapPin size={24} />
                <div>
                  <h3>Address</h3>
                  <p>National TPO Headquarters</p>
                  <p>123 Education Street, New Delhi, India</p>
                </div>
              </div>
              
              <div className="contact-item">
                <Clock size={24} />
                <div>
                  <h3>Working Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>

            {/* Office Map */}
            <div className="map-container">
              <h3>Our Location</h3>
              <div className="map-placeholder">
                <MapPin size={48} />
                <p>Interactive Map Placeholder</p>
                <p className="map-address">123 Education Street, New Delhi, India</p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="social-links">
              <h3>Connect With Us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon">f</a>
                <a href="#" className="social-icon">in</a>
                <a href="#" className="social-icon">t</a>
                <a href="#" className="social-icon">ig</a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <HelpCircle size={20} />
                <div>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="more-help">
            <p>Still have questions? <Link to="/contact">Contact our support team</Link> for personalized assistance.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUsPage;