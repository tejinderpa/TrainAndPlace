import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users, Calendar, FileText, Search, Filter } from 'lucide-react';
import '../../App.css';

const TrainingProgramManagement = () => {
  const [programs, setPrograms] = useState([
    {
      id: 1,
      title: "Advanced Data Structures & Algorithms",
      provider: "Google",
      duration: "8 weeks",
      startDate: "2025-10-15",
      endDate: "2025-12-10",
      participants: 120,
      status: "Active"
    },
    {
      id: 2,
      title: "Cloud Computing Fundamentals",
      provider: "Amazon Web Services",
      duration: "6 weeks",
      startDate: "2025-11-01",
      endDate: "2025-12-15",
      participants: 85,
      status: "Upcoming"
    },
    {
      id: 3,
      title: "Machine Learning with Python",
      provider: "Microsoft",
      duration: "10 weeks",
      startDate: "2025-09-20",
      endDate: "2025-11-30",
      participants: 95,
      status: "Completed"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const handleAddProgram = () => {
    setCurrentProgram(null);
    setShowModal(true);
  };

  const handleEditProgram = (program) => {
    setCurrentProgram(program);
    setShowModal(true);
  };

  const handleDeleteProgram = (id) => {
    if (window.confirm('Are you sure you want to delete this training program?')) {
      setPrograms(programs.filter(program => program.id !== id));
    }
  };

  const handleSaveProgram = (programData) => {
    if (currentProgram) {
      // Update existing program
      setPrograms(programs.map(program => 
        program.id === currentProgram.id 
          ? { ...program, ...programData } 
          : program
      ));
    } else {
      // Add new program
      const newProgram = {
        id: programs.length + 1,
        ...programData
      };
      setPrograms([...programs, newProgram]);
    }
    setShowModal(false);
  };

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          program.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || program.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="training-programs">
      <div className="page-header">
        <h1>Training Program Management</h1>
        <p>Manage training programs and track student participation</p>
      </div>

      {/* Controls */}
      <div className="controls-section">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-controls">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
          </select>
          
          <button className="primary-button" onClick={handleAddProgram}>
            <Plus size={16} />
            Add Program
          </button>
        </div>
      </div>

      {/* Programs List */}
      <div className="programs-list">
        {filteredPrograms.map(program => (
          <div key={program.id} className="program-card">
            <div className="program-header">
              <h3>{program.title}</h3>
              <div className="program-actions">
                <button 
                  className="icon-button"
                  onClick={() => handleEditProgram(program)}
                >
                  <Edit size={16} />
                </button>
                <button 
                  className="icon-button"
                  onClick={() => handleDeleteProgram(program.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="program-details">
              <div className="program-info">
                <p><strong>Provider:</strong> {program.provider}</p>
                <p><strong>Duration:</strong> {program.duration}</p>
                <p><strong>Dates:</strong> {program.startDate} to {program.endDate}</p>
              </div>
              
              <div className="program-stats">
                <div className="stat-item">
                  <Users size={16} />
                  <span>{program.participants} participants</span>
                </div>
                <div className={`status-badge ${program.status.toLowerCase()}`}>
                  {program.status}
                </div>
              </div>
            </div>
            
            <div className="program-actions-bottom">
              <button className="secondary-button">
                <FileText size={16} />
                View Details
              </button>
              <button className="secondary-button">
                <Calendar size={16} />
                Schedule Workshop
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Program Modal */}
      {showModal && (
        <ProgramModal 
          program={currentProgram}
          onSave={handleSaveProgram}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const ProgramModal = ({ program, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: program?.title || '',
    provider: program?.provider || '',
    duration: program?.duration || '',
    startDate: program?.startDate || '',
    endDate: program?.endDate || '',
    status: program?.status || 'Upcoming'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{program ? 'Edit Training Program' : 'Add Training Program'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Program Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Provider</label>
            <input
              type="text"
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 8 weeks"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              {program ? 'Update Program' : 'Add Program'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrainingProgramManagement;