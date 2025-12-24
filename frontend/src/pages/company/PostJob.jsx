import { useState } from 'react';
import { LuBriefcase, LuPlus } from 'react-icons/lu';
import { Card, Alert } from '@/components/common';
import { jobAPI } from '@/services/api';
import { BRANCHES } from '@/utils/constants';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'full_time',
    location: '',
    salary: {
      min: '',
      max: '',
      currency: 'INR'
    },
    eligibility: {
      branches: [],
      minCgpa: '',
      graduationYear: []
    },
    skills: [],
    deadline: '',
    positions: 1
  });
  const [newSkill, setNewSkill] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBranchToggle = (branch) => {
    const branches = formData.eligibility.branches.includes(branch)
      ? formData.eligibility.branches.filter(b => b !== branch)
      : [...formData.eligibility.branches, branch];
    
    setFormData({
      ...formData,
      eligibility: {
        ...formData.eligibility,
        branches
      }
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Transform data to match backend schema
      const jobData = {
        title: formData.title,
        description: formData.description,
        jobType: formData.type,
        location: formData.location,
        salary: {
          min: formData.salary.min ? Number(formData.salary.min) * 100000 : undefined,
          max: formData.salary.max ? Number(formData.salary.max) * 100000 : undefined,
          currency: formData.salary.currency
        },
        eligibility: {
          minCGPA: formData.eligibility.minCgpa ? Number(formData.eligibility.minCgpa) : undefined,
          branches: formData.eligibility.branches,
          skills: formData.skills
        },
        applicationDeadline: formData.deadline
      };
      
      await jobAPI.create(jobData);
      toast.success('Job posted successfully!');
      navigate('/dashboard/my-jobs');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Post New Job</h1>
        <p className="text-gray-600 mt-2">Create a new job opening for campus recruitment</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card title="Job Details">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="e.g., Software Engineer, Data Analyst"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="input-field"
                placeholder="Describe the role, responsibilities, and requirements"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="full_time">Full-time</option>
                  <option value="part_time">Part-time</option>
                  <option value="internship">Internship</option>
                  <option value="contract">Contract</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="e.g., Bangalore, Remote"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Positions *
                </label>
                <input
                  type="number"
                  name="positions"
                  value={formData.positions}
                  onChange={handleChange}
                  min="1"
                  required
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Salary */}
        <Card title="Compensation">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Salary (LPA)
              </label>
              <input
                type="number"
                name="salary.min"
                value={formData.salary.min}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="input-field"
                placeholder="e.g., 5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Salary (LPA)
              </label>
              <input
                type="number"
                name="salary.max"
                value={formData.salary.max}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="input-field"
                placeholder="e.g., 10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Deadline *
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="input-field"
              />
            </div>
          </div>
        </Card>

        {/* Eligibility */}
        <Card title="Eligibility Criteria">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Eligible Branches *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {BRANCHES.map((branch) => (
                  <label key={branch} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.eligibility.branches.includes(branch)}
                      onChange={() => handleBranchToggle(branch)}
                      className="rounded text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{branch}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum CGPA Required
              </label>
              <input
                type="number"
                name="eligibility.minCgpa"
                value={formData.eligibility.minCgpa}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                className="input-field"
                placeholder="e.g., 7.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Skills
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  className="input-field flex-1"
                  placeholder="Add a skill (e.g., React, Python)"
                />
                <button type="button" onClick={handleAddSkill} className="btn-primary">
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="badge badge-info">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Posting...' : 'Post Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
