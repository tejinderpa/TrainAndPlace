import React from 'react';
import { Building2, User, FileText, Calendar, Phone, Mail } from 'lucide-react';
import '../../App.css';

const TPOSection = () => {
  // Mock data for TPO information
  const tpoInfo = {
    name: "Dr. Rajesh Kumar",
    designation: "Chief Placement Officer",
    email: "tpo@college.edu",
    phone: "+91 98765 43210",
    office: "Placement Cell, 2nd Floor, Main Building",
    officeHours: "Monday - Friday, 10:00 AM - 5:00 PM"
  };

  const announcements = [
    {
      id: 1,
      title: "New Internship Opportunities",
      date: "Oct 12, 2025",
      content: "Several new internship opportunities are now available for final year students. Check the jobs section for more details."
    },
    {
      id: 2,
      title: "Resume Building Workshop",
      date: "Oct 15, 2025",
      content: "A workshop on effective resume building will be conducted by industry experts. Register through the events section."
    },
    {
      id: 3,
      title: "Placement Drive Schedule",
      date: "Oct 18, 2025",
      content: "The upcoming placement drive schedule has been updated. Please check the calendar for company visits."
    }
  ];

  const quickLinks = [
    { title: "TPO Profile", icon: User, path: "/tpo/profile" },
    { title: "Announcements", icon: FileText, path: "/tpo/announcements" },
    { title: "Calendar", icon: Calendar, path: "/tpo/calendar" },
    { title: "Contact Info", icon: Phone, path: "/tpo/contact" }
  ];

  return (
    <div className="tpo-section">
      <div className="page-header">
        <h1>TPO Section</h1>
        <p>Access all placement-related information and resources</p>
      </div>

      <div className="tpo-layout">
        {/* TPO Information Card */}
        <div className="info-card">
          <div className="card-header">
            <Building2 size={24} />
            <h2>TPO Information</h2>
          </div>
          <div className="card-content">
            <div className="info-item">
              <strong>Name:</strong> {tpoInfo.name}
            </div>
            <div className="info-item">
              <strong>Designation:</strong> {tpoInfo.designation}
            </div>
            <div className="info-item">
              <strong>Email:</strong> <a href={`mailto:${tpoInfo.email}`}>{tpoInfo.email}</a>
            </div>
            <div className="info-item">
              <strong>Phone:</strong> <a href={`tel:${tpoInfo.phone}`}>{tpoInfo.phone}</a>
            </div>
            <div className="info-item">
              <strong>Office:</strong> {tpoInfo.office}
            </div>
            <div className="info-item">
              <strong>Office Hours:</strong> {tpoInfo.officeHours}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="quick-links-section">
          <h2>Quick Links</h2>
          <div className="quick-links-grid">
            {quickLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <a key={index} href={link.path} className="quick-link-card">
                  <IconComponent size={24} />
                  <span>{link.title}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Announcements */}
        <div className="announcements-section">
          <div className="section-header">
            <h2>Recent Announcements</h2>
            <a href="/tpo/announcements" className="view-all">View All</a>
          </div>
          <div className="announcements-list">
            {announcements.map(announcement => (
              <div key={announcement.id} className="announcement-card">
                <h3>{announcement.title}</h3>
                <p className="announcement-date">{announcement.date}</p>
                <p className="announcement-content">{announcement.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TPOSection;