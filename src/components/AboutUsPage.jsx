import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Target, Eye, Award, Users2 } from 'lucide-react';
import '../App.css';

const AboutUsPage = () => {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      name: "Sarah Williams",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      name: "Priya Sharma",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1573496358961-3c82838ef589?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
    }
  ];

  const testimonials = [
    {
      quote: "This platform transformed our campus recruitment process. We've seen a 40% increase in placement rates since using it.",
      author: "Dr. Rajesh Kumar",
      position: "TPO Director, IIT Delhi",
      company: "IIT Delhi"
    },
    {
      quote: "As a company, we've found exceptional talent through this portal. The matching algorithm is incredibly accurate.",
      author: "Neha Patel",
      position: "HR Director",
      company: "Tech Innovations Ltd"
    },
    {
      quote: "The alumni network feature helped me connect with mentors who guided my career transition successfully.",
      author: "Rahul Mehta",
      position: "Alumni",
      company: "Class of 2018, NIT Trichy"
    }
  ];

  const partners = [
    { name: "IIT Delhi", logo: "https://placehold.co/150x80?text=IIT+Delhi" },
    { name: "NIT Trichy", logo: "https://placehold.co/150x80?text=NIT+Trichy" },
    { name: "TechCorp", logo: "https://placehold.co/150x80?text=TechCorp" },
    { name: "Innovate Ltd", logo: "https://placehold.co/150x80?text=Innovate+Ltd" },
    { name: "Future University", logo: "https://placehold.co/150x80?text=Future+University" },
    { name: "Global Solutions", logo: "https://placehold.co/150x80?text=Global+Solutions" }
  ];

  return (
    <div className="about-page">
      {/* Header */}
      <header className="page-header">
        <div className="container">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <h1>About National TPO Portal</h1>
          <p>Bridging the gap between education and employment</p>
        </div>
      </header>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mission-vision-content">
            <div className="mission-card">
              <Target size={48} className="icon" />
              <h3>Our Mission</h3>
              <p>
                To create a seamless connection between educational institutions, students, 
                and employers by providing a centralized, efficient, and technology-driven 
                placement platform that enhances career opportunities for all stakeholders.
              </p>
            </div>
            
            <div className="vision-card">
              <Eye size={48} className="icon" />
              <h3>Our Vision</h3>
              <p>
                To become the leading national placement platform that revolutionizes the 
                way talent connects with opportunities, fostering a collaborative ecosystem 
                that drives economic growth and career development across the country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="platform-overview">
        <div className="container">
          <h2 className="section-title">Platform Overview</h2>
          <div className="overview-content">
            <div className="overview-text">
              <p>
                The National TPO Portal is a comprehensive platform designed to streamline 
                the placement process for educational institutions, students, companies, 
                and alumni. Our innovative solution addresses the challenges faced by 
                traditional placement systems through technology-driven features.
              </p>
              <p>
                Launched in 2025, our platform has already connected thousands of students 
                with top-tier companies, helping educational institutions enhance their 
                placement statistics and providing alumni with networking opportunities.
              </p>
              <div className="stats-grid">
                <div className="stat-item">
                  <Users size={32} />
                  <h3>5000+</h3>
                  <p>Companies</p>
                </div>
                <div className="stat-item">
                  <Users2 size={32} />
                  <h3>10L+</h3>
                  <p>Students</p>
                </div>
                <div className="stat-item">
                  <Award size={32} />
                  <h3>500+</h3>
                  <p>Institutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Our Leadership Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">Success Stories</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <p className="quote">"{testimonial.quote}"</p>
                <div className="author">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.position}, {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="partners">
        <div className="container">
          <h2 className="section-title">Our Partners</h2>
          <div className="partners-grid">
            {partners.map((partner, index) => (
              <div key={index} className="partner-logo">
                <img src={partner.logo} alt={partner.name} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;