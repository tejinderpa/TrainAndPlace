import { useState, useEffect } from 'react';
import { LuUser, LuMail, LuPhone, LuBriefcase, LuGraduationCap, LuPencil, LuSave, LuX, LuLinkedin, LuGithub, LuGlobe } from 'react-icons/lu';
import { Card, Badge, Spinner, Alert, Avatar } from '@/components/common';
import { userAPI } from '@/services/api';
import useAuthStore from '@/store/authStore';
import toast from 'react-hot-toast';

const AlumniProfile = () => {
  const { user: currentUser, setUser } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    alumniDetails: {
      currentCompany: '',
      designation: '',
      experience: 0,
      graduationYear: '',
      branch: '',
      expertise: [],
      availableForMentorship: false,
      linkedIn: '',
      github: '',
      portfolio: ''
    }
  });
  const [newExpertise, setNewExpertise] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getProfile();
      const data = response.data.data;
      setProfile(data);
      setFormData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        phone: data.phone || '',
        alumniDetails: {
          currentCompany: data.alumniDetails?.currentCompany || '',
          designation: data.alumniDetails?.designation || '',
          experience: data.alumniDetails?.experience || 0,
          graduationYear: data.alumniDetails?.graduationYear || '',
          branch: data.alumniDetails?.branch || '',
          expertise: data.alumniDetails?.expertise || [],
          availableForMentorship: data.alumniDetails?.availableForMentorship || false,
          linkedIn: data.alumniDetails?.linkedIn || '',
          github: data.alumniDetails?.github || '',
          portfolio: data.alumniDetails?.portfolio || ''
        }
      });
    } catch (error) {
      toast.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddExpertise = () => {
    if (newExpertise.trim() && !formData.alumniDetails.expertise.includes(newExpertise.trim())) {
      setFormData({
        ...formData,
        alumniDetails: {
          ...formData.alumniDetails,
          expertise: [...formData.alumniDetails.expertise, newExpertise.trim()]
        }
      });
      setNewExpertise('');
    }
  };

  const handleRemoveExpertise = (expertiseToRemove) => {
    setFormData({
      ...formData,
      alumniDetails: {
        ...formData.alumniDetails,
        expertise: formData.alumniDetails.expertise.filter(exp => exp !== expertiseToRemove)
      }
    });
  };

  const handleSave = async () => {
    try {
      const response = await userAPI.updateProfile(formData);
      const updatedUser = response.data.data.user;
      setUser(updatedUser);
      setProfile(updatedUser);
      toast.success('Profile updated successfully');
      setEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-64">
        <Alert variant="danger">Profile not found</Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white shadow-lg overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute top-0 right-0 opacity-10">
          <svg width="300" height="300" viewBox="0 0 300 300" fill="currentColor">
            <circle cx="150" cy="50" r="100" />
            <circle cx="250" cy="150" r="80" />
          </svg>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex items-start gap-6">
            {/* Large Avatar */}
            <div className="relative">
              <div className="w-28 h-28 rounded-2xl bg-white p-1 shadow-xl">
                <Avatar 
                  name={profile.firstName || profile.name} 
                  src={profile.avatar} 
                  size="2xl"
                  className="w-full h-full rounded-xl"
                />
              </div>
              {profile.alumniDetails?.availableForMentorship && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg border-2 border-white">
                  ✓ Available
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {profile.firstName} {profile.lastName}
              </h1>
              <div className="flex items-center gap-2 text-primary-100 mb-3">
                <LuBriefcase className="w-5 h-5" />
                <span className="text-lg font-medium">
                  {profile.alumniDetails?.designation || 'Alumni'} 
                  {profile.alumniDetails?.currentCompany && ` at ${profile.alumniDetails.currentCompany}`}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-primary-50">
                <span className="flex items-center gap-2">
                  <LuMail className="w-4 h-4" />
                  {profile.email}
                </span>
                {profile.phone && (
                  <span className="flex items-center gap-2">
                    <LuPhone className="w-4 h-4" />
                    {profile.phone}
                  </span>
                )}
                {profile.alumniDetails?.graduationYear && (
                  <span className="flex items-center gap-2">
                    <LuGraduationCap className="w-4 h-4" />
                    Class of {profile.alumniDetails.graduationYear}
                  </span>
                )}
              </div>
              
              {/* Quick Stats */}
              <div className="flex gap-4 mt-4">
                {profile.alumniDetails?.experience > 0 && (
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold">{profile.alumniDetails.experience}+</div>
                    <div className="text-xs text-primary-100">Years Experience</div>
                  </div>
                )}
                {profile.alumniDetails?.expertise?.length > 0 && (
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold">{profile.alumniDetails.expertise.length}</div>
                    <div className="text-xs text-primary-100">Expertise Areas</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {!editing ? (
            <button 
              onClick={() => setEditing(true)} 
              className="bg-white text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-lg font-medium shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <LuPencil className="w-5 h-5" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={handleSave} 
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all flex items-center gap-2"
              >
                <LuSave className="w-5 h-5" />
                Save
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  fetchProfile();
                }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
              >
                <LuX className="w-5 h-5" />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Mode Form */}
      {editing && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                  className="input-field bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Professional Information */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <LuBriefcase className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Professional Information</h2>
              <p className="text-sm text-gray-500">Your career details and experience</p>
            </div>
          </div>
        </div>

        {editing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Company</label>
                <input
                  type="text"
                  name="alumniDetails.currentCompany"
                  value={formData.alumniDetails.currentCompany}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Google, Microsoft, Amazon"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                <input
                  type="text"
                  name="alumniDetails.designation"
                  value={formData.alumniDetails.designation}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                <input
                  type="number"
                  name="alumniDetails.experience"
                  value={formData.alumniDetails.experience}
                  onChange={handleChange}
                  className="input-field"
                  min="0"
                  max="50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                <input
                  type="text"
                  name="alumniDetails.graduationYear"
                  value={formData.alumniDetails.graduationYear}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., 2020"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
              <select
                name="alumniDetails.branch"
                value={formData.alumniDetails.branch}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Branch</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Communication">Electronics & Communication</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
              <input
                type="checkbox"
                id="mentorship"
                name="alumniDetails.availableForMentorship"
                checked={formData.alumniDetails.availableForMentorship}
                onChange={handleChange}
                className="w-5 h-5 rounded text-green-600 focus:ring-green-500"
              />
              <label htmlFor="mentorship" className="text-sm text-gray-700 cursor-pointer flex items-center gap-2">
                <span className="font-medium">I'm available for mentorship</span>
                <span className="text-xs text-gray-500">- Help current students with guidance and career advice</span>
              </label>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-blue-600 font-medium mb-1">Current Company</p>
              <p className="font-semibold text-gray-900 text-lg">{profile.alumniDetails?.currentCompany || 'Not specified'}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-purple-600 font-medium mb-1">Designation</p>
              <p className="font-semibold text-gray-900 text-lg">{profile.alumniDetails?.designation || 'Not specified'}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-600 font-medium mb-1">Experience</p>
              <p className="font-semibold text-gray-900 text-lg">{profile.alumniDetails?.experience || 0} years</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
              <p className="text-sm text-orange-600 font-medium mb-1">Graduation Year</p>
              <p className="font-semibold text-gray-900 text-lg">{profile.alumniDetails?.graduationYear || 'Not specified'}</p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4 border border-pink-200">
              <p className="text-sm text-pink-600 font-medium mb-1">Branch</p>
              <p className="font-semibold text-gray-900 text-lg">{profile.alumniDetails?.branch || 'Not specified'}</p>
            </div>
            {profile.alumniDetails?.availableForMentorship && (
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200">
                <p className="text-sm text-emerald-600 font-medium mb-1">Mentorship Status</p>
                <p className="font-semibold text-emerald-700 text-lg flex items-center gap-2">
                  <span className="text-2xl">✓</span> Available
                </p>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Areas of Expertise */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Areas of Expertise</h2>
              <p className="text-sm text-gray-500">Your skills and specialized knowledge</p>
            </div>
          </div>
        </div>

        {editing ? (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newExpertise}
                onChange={(e) => setNewExpertise(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddExpertise())}
                className="input-field flex-1"
                placeholder="Add expertise (e.g., Machine Learning, Full Stack Development, Cloud Architecture)"
              />
              <button type="button" onClick={handleAddExpertise} className="btn-primary whitespace-nowrap px-6">
                Add Skill
              </button>
            </div>
            <div className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              {formData.alumniDetails.expertise.length > 0 ? (
                formData.alumniDetails.expertise.map((exp, index) => (
                  <span key={index} className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-lg font-medium border border-primary-200 hover:bg-primary-200 transition-colors">
                    {exp}
                    <button
                      onClick={() => handleRemoveExpertise(exp)}
                      className="hover:text-red-600 transition-colors"
                    >
                      <LuX className="w-4 h-4" />
                    </button>
                  </span>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No expertise added yet. Add your skills above.</p>
              )}
            </div>
          </div>
        ) : (
          <div>
            {profile.alumniDetails?.expertise && profile.alumniDetails.expertise.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {profile.alumniDetails.expertise.map((exp, index) => (
                  <span key={index} className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-shadow">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {exp}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="text-gray-500 font-medium">No expertise added yet</p>
                <p className="text-gray-400 text-sm mt-1">Click "Edit Profile" to add your areas of expertise</p>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Professional Links */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <LuGlobe className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Professional Links</h2>
              <p className="text-sm text-gray-500">Your online presence and portfolio</p>
            </div>
          </div>
        </div>

        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <LuLinkedin className="w-5 h-5 text-blue-600" />
                  <span>LinkedIn Profile</span>
                </div>
              </label>
              <input
                type="url"
                name="alumniDetails.linkedIn"
                value={formData.alumniDetails.linkedIn}
                onChange={handleChange}
                className="input-field"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <LuGithub className="w-5 h-5 text-gray-800" />
                  <span>GitHub Profile</span>
                </div>
              </label>
              <input
                type="url"
                name="alumniDetails.github"
                value={formData.alumniDetails.github}
                onChange={handleChange}
                className="input-field"
                placeholder="https://github.com/yourusername"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <LuGlobe className="w-5 h-5 text-green-600" />
                  <span>Portfolio Website</span>
                </div>
              </label>
              <input
                type="url"
                name="alumniDetails.portfolio"
                value={formData.alumniDetails.portfolio}
                onChange={handleChange}
                className="input-field"
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>
        ) : (
          <div>
            {(profile.alumniDetails?.linkedIn || profile.alumniDetails?.github || profile.alumniDetails?.portfolio) ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {profile.alumniDetails?.linkedIn && (
                  <a
                    href={profile.alumniDetails.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg border border-blue-200 transition-all group"
                  >
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <LuLinkedin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-600 font-medium">LinkedIn</p>
                      <p className="text-sm text-gray-700 font-semibold">View Profile</p>
                    </div>
                  </a>
                )}
                {profile.alumniDetails?.github && (
                  <a
                    href={profile.alumniDetails.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-lg border border-gray-300 transition-all group"
                  >
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <LuGithub className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-medium">GitHub</p>
                      <p className="text-sm text-gray-700 font-semibold">View Profile</p>
                    </div>
                  </a>
                )}
                {profile.alumniDetails?.portfolio && (
                  <a
                    href={profile.alumniDetails.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-lg border border-green-200 transition-all group"
                  >
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <LuGlobe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-green-600 font-medium">Portfolio</p>
                      <p className="text-sm text-gray-700 font-semibold">Visit Website</p>
                    </div>
                  </a>
                )}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <div className="flex justify-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <LuLinkedin className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <LuGithub className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <LuGlobe className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <p className="text-gray-500 font-medium">No professional links added yet</p>
                <p className="text-gray-400 text-sm mt-1">Add your LinkedIn, GitHub, and portfolio links to showcase your work</p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AlumniProfile;
