import { useState, useEffect } from 'react';
import { LuFileText, LuSearch, LuFilter, LuDownload, LuEye, LuCheck, LuX } from 'react-icons/lu';
import { Card, Badge, Spinner, EmptyState, Avatar } from '@/components/common';
import { applicationAPI } from '@/services/api';
import toast from 'react-hot-toast';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all'
  });
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await applicationAPI.getAll();
      setApplications(response.data.data || []);
    } catch (error) {
      toast.error('Failed to load applications');
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'secondary',
      reviewed: 'info',
      shortlisted: 'warning',
      accepted: 'success',
      rejected: 'danger'
    };
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const filteredApplications = Array.isArray(applications) ? applications.filter(app => {
    const matchesSearch = app.studentId?.firstName?.toLowerCase().includes(filters.search.toLowerCase()) ||
                         app.studentId?.lastName?.toLowerCase().includes(filters.search.toLowerCase()) ||
                         app.jobId?.title?.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' || app.status === filters.status;
    return matchesSearch && matchesStatus;
  }) : [];

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    shortlisted: applications.filter(a => a.status === 'shortlisted').length,
    accepted: applications.filter(a => a.status === 'accepted').length
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600 mt-2">Track all student applications and placements</p>
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <LuDownload className="w-5 h-5" />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <LuFileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <LuFileText className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <LuFileText className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Shortlisted</p>
              <p className="text-2xl font-bold text-gray-900">{stats.shortlisted}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <LuCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Placed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.accepted}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by student or job..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="input-field pl-10"
            />
          </div>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="input-field"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </Card>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <EmptyState
          icon={LuFileText}
          title="No applications found"
          description="No applications match your filters"
        />
      ) : (
        <div className="grid gap-4">
          {filteredApplications.map((application) => (
            <Card key={application._id}>
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <Avatar 
                    name={`${application.studentId?.firstName} ${application.studentId?.lastName}`}
                    size="lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {application.studentId?.firstName} {application.studentId?.lastName}
                      </h3>
                      {getStatusBadge(application.status)}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Job:</span> {application.jobId?.title}
                    </p>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Company:</span> {application.companyId?.companyDetails?.companyName}
                    </p>

                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>
                        <span className="font-medium">CGPA:</span> {application.studentId?.studentDetails?.cgpa}/10
                      </span>
                      <span>
                        <span className="font-medium">Branch:</span> {application.studentId?.studentDetails?.branch}
                      </span>
                      <span>
                        <span className="font-medium">Applied:</span> {new Date(application.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedApplication(application)}
                  className="btn-secondary flex items-center gap-2"
                >
                  <LuEye className="w-4 h-4" />
                  View
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Student Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Name</p>
                      <p className="font-medium">
                        {selectedApplication.studentId?.firstName} {selectedApplication.studentId?.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p className="font-medium">{selectedApplication.studentId?.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Branch</p>
                      <p className="font-medium">{selectedApplication.studentId?.studentDetails?.branch}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">CGPA</p>
                      <p className="font-medium">{selectedApplication.studentId?.studentDetails?.cgpa}/10</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Job Information</h3>
                  <div className="text-sm">
                    <p className="text-gray-600">Position</p>
                    <p className="font-medium mb-2">{selectedApplication.jobId?.title}</p>
                    <p className="text-gray-600">Company</p>
                    <p className="font-medium">{selectedApplication.companyId?.companyDetails?.companyName}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cover Letter</h3>
                  <p className="text-sm text-gray-600">{selectedApplication.coverLetter || 'No cover letter provided'}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Status</h3>
                  {getStatusBadge(selectedApplication.status)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
