import { useState, useEffect } from 'react';
import { LuBuilding2, LuMail, LuPhone, LuMapPin, LuGlobe, LuLinkedin, LuPencil, LuSave, LuX, LuUsers } from 'react-icons/lu';
import { Card, Badge, Spinner, Alert, Avatar } from '@/components/common';
import { userAPI } from '@/services/api';
import useAuthStore from '@/store/authStore';
import toast from 'react-hot-toast';

const CompanyProfile = () => {
  const { user: currentUser, setUser } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    companyDetails: {
      companyName: '',
      industry: '',
      companySize: '',
      website: '',
      linkedIn: '',
      address: '',
      city: '',
      state: '',
      country: '',
      description: ''
    }
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getProfile();
      const data = response.data.data.user;
      setProfile(data);
      setFormData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        phone: data.phone || '',
        companyDetails: {
          companyName: data.companyDetails?.companyName || '',
          industry: data.companyDetails?.industry || '',
          companySize: data.companyDetails?.companySize || '',
          website: data.companyDetails?.website || '',
          linkedIn: data.companyDetails?.linkedIn || '',
          address: data.companyDetails?.address || '',
          city: data.companyDetails?.city || '',
          state: data.companyDetails?.state || '',
          country: data.companyDetails?.country || '',
          description: data.companyDetails?.description || ''
        }
      });
    } catch (error) {
      toast.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

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
        
        {/* Verification Badge */}
        {profile.companyDetails?.isVerified && (
          <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg border-2 border-white flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified by TPO
          </div>
        )}
        
        {!profile.companyDetails?.isVerified && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg border-2 border-white flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Pending Verification
          </div>
        )}
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex items-start gap-6">
            {/* Large Company Logo */}
            <div className="relative">
              <div className="w-28 h-28 rounded-2xl bg-white p-1 shadow-xl">
                <Avatar 
                  name={profile.companyDetails?.companyName || 'Company'} 
                  src={profile.companyDetails?.logo}
                  size="2xl"
                  className="w-full h-full rounded-xl"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {profile.companyDetails?.companyName || 'Company Name'}
              </h1>
              <div className="flex items-center gap-2 text-primary-100 mb-3">
                <LuBuilding2 className="w-5 h-5" />
                <span className="text-lg font-medium">
                  {profile.companyDetails?.industry || 'Company Industry'}
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
                {profile.companyDetails?.companySize && (
                  <span className="flex items-center gap-2">
                    <LuUsers className="w-4 h-4" />
                    {profile.companyDetails.companySize} employees
                  </span>
                )}
              </div>
              
              {/* Contact Person */}
              {(profile.firstName || profile.lastName) && (
                <div className="mt-3 text-sm text-primary-100">
                  <span className="font-medium">Contact Person: </span>
                  {profile.firstName} {profile.lastName}
                </div>
              )}
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
              <input
                type="text"
                name="companyDetails.companyName"
                value={formData.companyDetails.companyName}
                onChange={handleChange}
                className="input-field"
                required
                placeholder="e.g., Google, Microsoft, Amazon"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person - First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person - Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
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
        </Card>
      )}

      {/* Company Information */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <LuBuilding2 className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">About {profile.companyDetails?.companyName || 'Company'}</h2>
              <p className="text-sm text-gray-500">Company details and description</p>
            </div>
          </div>
        </div>

        {editing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
                <select
                  name="companyDetails.industry"
                  value={formData.companyDetails.industry}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select Industry</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Finance & Banking">Finance & Banking</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Telecommunications">Telecommunications</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                <select
                  name="companyDetails.companySize"
                  value={formData.companyDetails.companySize}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1001-5000">1001-5000 employees</option>
                  <option value="5000+">5000+ employees</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
              <textarea
                name="companyDetails.description"
                value={formData.companyDetails.description}
                onChange={handleChange}
                rows="4"
                className="input-field"
                placeholder="Tell students about your company, culture, mission, and what makes it a great place to work..."
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-600 font-medium mb-1">Industry</p>
                <p className="font-semibold text-gray-900 text-lg">{profile.companyDetails?.industry || 'Not specified'}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-purple-600 font-medium mb-1">Company Size</p>
                <p className="font-semibold text-gray-900 text-lg">{profile.companyDetails?.companySize ? `${profile.companyDetails.companySize} employees` : 'Not specified'}</p>
              </div>
            </div>
            {profile.companyDetails?.description ? (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 font-medium mb-2">About the Company</p>
                <p className="text-gray-700 leading-relaxed">{profile.companyDetails.description}</p>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <LuBuilding2 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 font-medium">No company description added</p>
                <p className="text-gray-400 text-sm mt-1">Add a description to tell students about your company</p>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Location */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <LuMapPin className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{profile.companyDetails?.companyName || 'Company'} Headquarters</h2>
              <p className="text-sm text-gray-500">Office location and address</p>
            </div>
          </div>
        </div>

        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
              <input
                type="text"
                name="companyDetails.address"
                value={formData.companyDetails.address}
                onChange={handleChange}
                className="input-field"
                placeholder="123 Main Street, Suite 100"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  name="companyDetails.city"
                  value={formData.companyDetails.city}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="New York"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                <input
                  type="text"
                  name="companyDetails.state"
                  value={formData.companyDetails.state}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="NY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <input
                  type="text"
                  name="companyDetails.country"
                  value={formData.companyDetails.country}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="United States"
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            {profile.companyDetails?.address || profile.companyDetails?.city ? (
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                <div className="flex items-start gap-4">
                  <LuMapPin className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    {profile.companyDetails?.address && (
                      <p className="font-semibold text-gray-900 mb-1">{profile.companyDetails.address}</p>
                    )}
                    <p className="text-gray-700">
                      {[
                        profile.companyDetails?.city,
                        profile.companyDetails?.state,
                        profile.companyDetails?.country
                      ].filter(Boolean).join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <LuMapPin className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 font-medium">No location added yet</p>
                <p className="text-gray-400 text-sm mt-1">Add your company's headquarters location</p>
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
              <h2 className="text-xl font-semibold text-gray-900">{profile.companyDetails?.companyName || 'Company'} Online</h2>
              <p className="text-sm text-gray-500">Company website and social media</p>
            </div>
          </div>
        </div>

        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <LuGlobe className="w-5 h-5 text-green-600" />
                  <span>Company Website</span>
                </div>
              </label>
              <input
                type="url"
                name="companyDetails.website"
                value={formData.companyDetails.website}
                onChange={handleChange}
                className="input-field"
                placeholder="https://yourcompany.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <LuLinkedin className="w-5 h-5 text-blue-600" />
                  <span>LinkedIn Company Page</span>
                </div>
              </label>
              <input
                type="url"
                name="companyDetails.linkedIn"
                value={formData.companyDetails.linkedIn}
                onChange={handleChange}
                className="input-field"
                placeholder="https://linkedin.com/company/yourcompany"
              />
            </div>
          </div>
        ) : (
          <div>
            {(profile.companyDetails?.website || profile.companyDetails?.linkedIn) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.companyDetails?.website && (
                  <a
                    href={profile.companyDetails.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-lg border border-green-200 transition-all group"
                  >
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <LuGlobe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-green-600 font-medium">Company Website</p>
                      <p className="text-sm text-gray-700 font-semibold">Visit Website</p>
                    </div>
                  </a>
                )}
                {profile.companyDetails?.linkedIn && (
                  <a
                    href={profile.companyDetails.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg border border-blue-200 transition-all group"
                  >
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <LuLinkedin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-600 font-medium">LinkedIn</p>
                      <p className="text-sm text-gray-700 font-semibold">Company Page</p>
                    </div>
                  </a>
                )}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <div className="flex justify-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <LuGlobe className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                    <LuLinkedin className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <p className="text-gray-500 font-medium">No professional links added yet</p>
                <p className="text-gray-400 text-sm mt-1">Add your company website and LinkedIn page</p>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CompanyProfile;
