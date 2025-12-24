import { useState, useEffect } from 'react';
import { LuUser, LuMail, LuPhone, LuGraduationCap, LuBriefcase, LuGithub, LuLinkedin, LuGlobe, LuUpload, LuX } from 'react-icons/lu';
import { Card, Badge, Spinner, Alert } from '@/components/common';
import { userAPI } from '@/services/api';
import useAuthStore from '@/store/authStore';
import { BRANCHES, BATCHES } from '@/utils/constants';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    studentDetails: {
      collegeName: '',
      degree: '',
      branch: '',
      yearOfStudy: '',
      enrollmentNumber: '',
      cgpa: '',
      skills: [],
      resume: '',
      portfolio: '',
      githubProfile: '',
      linkedinProfile: ''
    }
  });
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        studentDetails: {
          collegeName: user.studentDetails?.collegeName || '',
          degree: user.studentDetails?.degree || '',
          branch: user.studentDetails?.branch || '',
          yearOfStudy: user.studentDetails?.yearOfStudy || '',
          enrollmentNumber: user.studentDetails?.enrollmentNumber || '',
          cgpa: user.studentDetails?.cgpa || '',
          skills: user.studentDetails?.skills || [],
          resume: user.studentDetails?.resume || '',
          portfolio: user.studentDetails?.portfolio || '',
          githubProfile: user.studentDetails?.githubProfile || '',
          linkedinProfile: user.studentDetails?.linkedinProfile || ''
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('studentDetails.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        studentDetails: {
          ...formData.studentDetails,
          [field]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.studentDetails.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        studentDetails: {
          ...formData.studentDetails,
          skills: [...formData.studentDetails.skills, newSkill.trim()]
        }
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      studentDetails: {
        ...formData.studentDetails,
        skills: formData.studentDetails.skills.filter(skill => skill !== skillToRemove)
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await userAPI.updateProfile(formData);
      setUser(response.data.data.user);
      toast.success('Profile updated successfully');
      setEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and preferences</p>
        </div>
        {!editing && (
          <button onClick={() => setEditing(true)} className="btn-primary">
            Edit Profile
          </button>
        )}
      </div>

      {editing ? (
        /* Edit Mode */
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            </div>
          </Card>

          {/* Academic Information */}
          <Card title="Academic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  College Name
                </label>
                <input
                  type="text"
                  name="studentDetails.collegeName"
                  value={formData.studentDetails.collegeName}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree
                </label>
                <input
                  type="text"
                  name="studentDetails.degree"
                  value={formData.studentDetails.degree}
                  onChange={handleChange}
                  placeholder="e.g., B.Tech, M.Tech"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch
                </label>
                <select
                  name="studentDetails.branch"
                  value={formData.studentDetails.branch}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select Branch</option>
                  {BRANCHES.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year of Study
                </label>
                <select
                  name="studentDetails.yearOfStudy"
                  value={formData.studentDetails.yearOfStudy}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enrollment Number
                </label>
                <input
                  type="text"
                  name="studentDetails.enrollmentNumber"
                  value={formData.studentDetails.enrollmentNumber}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CGPA
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  name="studentDetails.cgpa"
                  value={formData.studentDetails.cgpa}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>
          </Card>

          {/* Skills */}
          <Card title="Skills">
            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  placeholder="Add a skill (e.g., React, Python)"
                  className="input-field flex-1"
                />
                <button type="button" onClick={handleAddSkill} className="btn-primary">
                  Add
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.studentDetails.skills.map((skill, index) => (
                <div key={index} className="badge badge-info flex items-center gap-2">
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-red-600"
                  >
                    <LuX className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Links */}
          <Card title="Professional Links">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <LuGithub className="w-4 h-4" />
                    <span>GitHub Profile</span>
                  </div>
                </label>
                <input
                  type="url"
                  name="studentDetails.githubProfile"
                  value={formData.studentDetails.githubProfile}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <LuLinkedin className="w-4 h-4" />
                    <span>LinkedIn Profile</span>
                  </div>
                </label>
                <input
                  type="url"
                  name="studentDetails.linkedinProfile"
                  value={formData.studentDetails.linkedinProfile}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <LuGlobe className="w-4 h-4" />
                    <span>Portfolio Website</span>
                  </div>
                </label>
                <input
                  type="url"
                  name="studentDetails.portfolio"
                  value={formData.studentDetails.portfolio}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                  className="input-field"
                />
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      ) : (
        /* View Mode */
        <div className="space-y-6">
          {/* Personal Information */}
          <Card title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Full Name</p>
                <p className="text-gray-900 font-medium">{user?.firstName} {user?.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-gray-900">{user?.email}</p>
              </div>
            </div>
          </Card>

          {/* Academic Information */}
          <Card title="Academic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">College</p>
                <p className="text-gray-900">{user?.studentDetails?.collegeName || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Degree</p>
                <p className="text-gray-900">{user?.studentDetails?.degree || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Branch</p>
                <p className="text-gray-900">{user?.studentDetails?.branch || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Year</p>
                <p className="text-gray-900">{user?.studentDetails?.yearOfStudy ? `${user.studentDetails.yearOfStudy}th Year` : 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Enrollment Number</p>
                <p className="text-gray-900">{user?.studentDetails?.enrollmentNumber || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">CGPA</p>
                <p className="text-gray-900">{user?.studentDetails?.cgpa || 'Not provided'}</p>
              </div>
            </div>
          </Card>

          {/* Skills */}
          <Card title="Skills">
            {user?.studentDetails?.skills?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.studentDetails.skills.map((skill, index) => (
                  <Badge key={index} variant="info">{skill}</Badge>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No skills added yet</p>
            )}
          </Card>

          {/* Links */}
          <Card title="Professional Links">
            <div className="space-y-3">
              {user?.studentDetails?.githubProfile && (
                <a href={user.studentDetails.githubProfile} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-600 hover:text-primary-700">
                  <LuGithub className="w-5 h-5" />
                  <span>GitHub Profile</span>
                </a>
              )}
              {user?.studentDetails?.linkedinProfile && (
                <a href={user.studentDetails.linkedinProfile} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-600 hover:text-primary-700">
                  <LuLinkedin className="w-5 h-5" />
                  <span>LinkedIn Profile</span>
                </a>
              )}
              {user?.studentDetails?.portfolio && (
                <a href={user.studentDetails.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-600 hover:text-primary-700">
                  <LuGlobe className="w-5 h-5" />
                  <span>Portfolio Website</span>
                </a>
              )}
              {!user?.studentDetails?.githubProfile && !user?.studentDetails?.linkedinProfile && !user?.studentDetails?.portfolio && (
                <p className="text-gray-500">No links added yet</p>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Profile;
