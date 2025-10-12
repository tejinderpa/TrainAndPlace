import React, { useState } from 'react';
import { Send, Plus, Calendar, Award, FileText, Search } from 'lucide-react';
import '../../App.css';

const TpoAssistance = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample TPO requests
  const tpoRequests = [
    {
      id: 1,
      title: "Guest Lecture Request",
      description: "Request for alumni to conduct a session on industry trends in software engineering",
      deadline: "2025-10-25",
      status: "Pending"
    },
    {
      id: 2,
      title: "Hackathon Judging",
      description: "Invitation to judge the annual college hackathon",
      deadline: "2025-11-05",
      status: "Accepted"
    }
  ];

  // Form states
  const [referralForm, setReferralForm] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    jobType: 'Internship',
    description: ''
  });

  const [eventForm, setEventForm] = useState({
    eventType: 'Workshop',
    title: '',
    description: '',
    proposedDate: '',
    duration: '',
    requirements: ''
  });

  const handleReferralSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Submitting company referral:", referralForm);
    // Reset form
    setReferralForm({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      jobType: 'Internship',
      description: ''
    });
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Submitting event proposal:", eventForm);
    // Reset form
    setEventForm({
      eventType: 'Workshop',
      title: '',
      description: '',
      proposedDate: '',
      duration: '',
      requirements: ''
    });
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  const handleInputChange = (formSetter, e) => {
    const { name, value } = e.target;
    formSetter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="tpo-assistance">
      <div className="page-header">
        <h1>TPO Assistance</h1>
        <p>Support your alma mater through various initiatives</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          <FileText size={16} />
          Active Requests
        </button>
        <button 
          className={`tab ${activeTab === 'referral' ? 'active' : ''}`}
          onClick={() => setActiveTab('referral')}
        >
          <Award size={16} />
          Refer Company
        </button>
        <button 
          className={`tab ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          <Calendar size={16} />
          Propose Event
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'requests' && (
          <div className="requests-tab">
            <h2>Active TPO Requests</h2>
            {tpoRequests.length > 0 ? (
              <div className="requests-list">
                {tpoRequests.map(request => (
                  <div key={request.id} className="request-card">
                    <div className="request-header">
                      <h3>{request.title}</h3>
                      <div className={`status-badge ${request.status.toLowerCase()}`}>
                        {request.status}
                      </div>
                    </div>
                    <div className="request-details">
                      <p>{request.description}</p>
                      <p className="deadline">Deadline: {request.deadline}</p>
                    </div>
                    <div className="request-actions">
                      {request.status === 'Pending' && (
                        <>
                          <button className="primary-button">Accept</button>
                          <button className="secondary-button">Decline</button>
                        </>
                      )}
                      {request.status === 'Accepted' && (
                        <button className="secondary-button">View Details</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No active requests at this time.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'referral' && (
          <div className="referral-tab">
            <h2>Refer a Company</h2>
            <div className="form-container">
              <form onSubmit={handleReferralSubmit}>
                <div className="form-group">
                  <label>Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={referralForm.companyName}
                    onChange={(e) => handleInputChange(setReferralForm, e)}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Person *</label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={referralForm.contactPerson}
                      onChange={(e) => handleInputChange(setReferralForm, e)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={referralForm.email}
                      onChange={(e) => handleInputChange(setReferralForm, e)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={referralForm.phone}
                      onChange={(e) => handleInputChange(setReferralForm, e)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Opportunity Type</label>
                    <select
                      name="jobType"
                      value={referralForm.jobType}
                      onChange={(e) => handleInputChange(setReferralForm, e)}
                    >
                      <option value="Internship">Internship</option>
                      <option value="Placement">Placement</option>
                      <option value="Hackathon">Hackathon</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Webinar">Webinar</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={referralForm.description}
                    onChange={(e) => handleInputChange(setReferralForm, e)}
                    rows="4"
                    placeholder="Provide details about the opportunity..."
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="primary-button"
                    disabled={isSubmitting}
                  >
                    <Send size={16} />
                    {isSubmitting ? "Submitting..." : "Submit Referral"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="events-tab">
            <h2>Propose an Event</h2>
            <div className="form-container">
              <form onSubmit={handleEventSubmit}>
                <div className="form-group">
                  <label>Event Type *</label>
                  <select
                    name="eventType"
                    value={eventForm.eventType}
                    onChange={(e) => handleInputChange(setEventForm, e)}
                    required
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Webinar">Webinar</option>
                    <option value="Guest Lecture">Guest Lecture</option>
                    <option value="Panel Discussion">Panel Discussion</option>
                    <option value="Career Fair">Career Fair</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Event Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={eventForm.title}
                    onChange={(e) => handleInputChange(setEventForm, e)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description *</label>
                  <textarea
                    name="description"
                    value={eventForm.description}
                    onChange={(e) => handleInputChange(setEventForm, e)}
                    rows="4"
                    placeholder="Describe the event and its objectives..."
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Proposed Date</label>
                    <input
                      type="date"
                      name="proposedDate"
                      value={eventForm.proposedDate}
                      onChange={(e) => handleInputChange(setEventForm, e)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      name="duration"
                      value={eventForm.duration}
                      onChange={(e) => handleInputChange(setEventForm, e)}
                      placeholder="e.g., 2 hours, Half day"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Requirements</label>
                  <textarea
                    name="requirements"
                    value={eventForm.requirements}
                    onChange={(e) => handleInputChange(setEventForm, e)}
                    rows="3"
                    placeholder="Special requirements like equipment, venue, etc."
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="primary-button"
                    disabled={isSubmitting}
                  >
                    <Plus size={16} />
                    {isSubmitting ? "Submitting..." : "Submit Proposal"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TpoAssistance;