import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, User, Edit3, Plus } from 'lucide-react';
import '../../App.css';

const TpoContact = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Sample contact information
  const contactInfo = {
    office: {
      name: "Training & Placement Office",
      address: "1st Floor, Main Building, National Institute of Technology",
      city: "New Delhi, India",
      pincode: "110001"
    },
    coordinators: [
      {
        id: 1,
        name: "Dr. Rajesh Kumar",
        role: "Chief Placement Officer",
        email: "tpo@nit.edu",
        phone: "+91 98765 43210",
        officeHours: "Mon-Fri, 9:00 AM - 5:00 PM"
      },
      {
        id: 2,
        name: "Dr. Priya Sharma",
        role: "Placement Coordinator",
        email: "placements@nit.edu",
        phone: "+91 87654 32109",
        officeHours: "Mon-Fri, 10:00 AM - 4:00 PM"
      },
      {
        id: 3,
        name: "Mr. Amit Patel",
        role: "Internship Coordinator",
        email: "internships@nit.edu",
        phone: "+91 76543 21098",
        officeHours: "Mon-Fri, 11:00 AM - 3:00 PM"
      }
    ],
    support: {
      email: "support-tpo@nit.edu",
      phone: "+91 65432 10987",
      hours: "24/7 Support"
    }
  };

  return (
    <div className="tpo-contact">
      <div className="page-header">
        <h1>TPO Contact Information</h1>
        <p>Get in touch with our placement team for any queries</p>
      </div>

      <div className="contact-layout">
        {/* Office Information */}
        <div className="contact-section">
          <h2>Office Information</h2>
          <div className="office-info">
            <div className="contact-item">
              <MapPin size={24} />
              <div>
                <h3>Address</h3>
                <p>{contactInfo.office.name}</p>
                <p>{contactInfo.office.address}</p>
                <p>{contactInfo.office.city}, {contactInfo.office.pincode}</p>
              </div>
            </div>
            
            <div className="contact-item">
              <Clock size={24} />
              <div>
                <h3>Office Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
          
          <div className="map-container">
            <h3>Location Map</h3>
            <div className="map-placeholder">
              <MapPin size={48} />
              <p>Interactive Map Placeholder</p>
              <p className="map-address">{contactInfo.office.address}, {contactInfo.office.city}</p>
            </div>
          </div>
        </div>

        {/* Coordinators */}
        <div className="contact-section">
          <div className="section-header">
            <h2>Placement Coordinators</h2>
            <button 
              className="edit-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit3 size={16} />
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
          
          <div className="coordinators-list">
            {contactInfo.coordinators.map(coordinator => (
              <div key={coordinator.id} className="coordinator-card">
                <div className="coordinator-header">
                  <div className="coordinator-avatar">
                    <User size={32} />
                  </div>
                  <div className="coordinator-info">
                    <h3>{coordinator.name}</h3>
                    <p className="role">{coordinator.role}</p>
                  </div>
                </div>
                
                <div className="coordinator-details">
                  <div className="contact-item">
                    <Mail size={16} />
                    <a href={`mailto:${coordinator.email}`}>{coordinator.email}</a>
                  </div>
                  <div className="contact-item">
                    <Phone size={16} />
                    <a href={`tel:${coordinator.phone}`}>{coordinator.phone}</a>
                  </div>
                  <div className="contact-item">
                    <Clock size={16} />
                    <span>{coordinator.officeHours}</span>
                  </div>
                </div>
                
                {isEditing && (
                  <div className="coordinator-actions">
                    <button className="edit-coordinator">
                      <Edit3 size={16} />
                      Edit
                    </button>
                    <button className="delete-coordinator">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
            
            {isEditing && (
              <div className="add-coordinator">
                <button className="add-button">
                  <Plus size={16} />
                  Add Coordinator
                </button>
              </div>
            )}
          </div>
          
          {/* Support Information */}
          <div className="support-section">
            <h2>Support</h2>
            <div className="support-info">
              <div className="contact-item">
                <Mail size={24} />
                <div>
                  <h3>Email Support</h3>
                  <a href={`mailto:${contactInfo.support.email}`}>{contactInfo.support.email}</a>
                </div>
              </div>
              
              <div className="contact-item">
                <Phone size={24} />
                <div>
                  <h3>Phone Support</h3>
                  <a href={`tel:${contactInfo.support.phone}`}>{contactInfo.support.phone}</a>
                  <p>{contactInfo.support.hours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>How to schedule a meeting with TPO?</h3>
            <p>You can schedule a meeting by emailing tpo@nit.edu or calling during office hours. Please mention your purpose and preferred time slot.</p>
          </div>
          <div className="faq-item">
            <h3>What documents are required for placement registration?</h3>
            <p>Students need to submit the placement registration form, updated resume, academic transcripts, and identity proof. All documents are available in the forms section.</p>
          </div>
          <div className="faq-item">
            <h3>How to apply for off-campus opportunities?</h3>
            <p>Students pursuing off-campus opportunities need to obtain a No Objection Certificate (NOC) from the TPO office. The form is available in the downloadable forms section.</p>
          </div>
          <div className="faq-item">
            <h3>What is the process for internship registration?</h3>
            <p>Students need to fill the internship application form, get it approved by their department, and submit it to the TPO office at least two weeks before the start date.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TpoContact;