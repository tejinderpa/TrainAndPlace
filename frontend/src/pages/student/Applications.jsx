import { useState, useEffect } from 'react';
import { LuFileText, LuBuilding2, LuCalendar, LuFilter, LuSearch } from 'react-icons/lu';
import { Card, Badge, Spinner, EmptyState } from '@/components/common';
import { applicationAPI } from '@/services/api';
import { formatDateShort, getStatusColor } from '@/utils/helpers';
import toast from 'react-hot-toast';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', search: '' });

  useEffect(() => {
    fetchApplications();
  }, [filter.status]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await applicationAPI.getAll(filter);
      setApplications(response.data.data?.applications || []);
    } catch (error) {
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = applications.filter(app =>
    app.job?.title?.toLowerCase().includes(filter.search.toLowerCase()) ||
    app.job?.company?.companyDetails?.companyName?.toLowerCase().includes(filter.search.toLowerCase())
  );

  const getStatusStats = () => {
    return {
      total: applications.length,
      pending: applications.filter(a => a.status === 'pending').length,
      shortlisted: applications.filter(a => a.status === 'shortlisted').length,
      rejected: applications.filter(a => a.status === 'rejected').length,
      accepted: applications.filter(a => a.status === 'accepted').length,
    };
  };

  const stats = getStatusStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-600 mt-2">Track your job applications and their status</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="text-center">
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-600">Total</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          <p className="text-sm text-gray-600">Pending</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.shortlisted}</p>
          <p className="text-sm text-gray-600">Shortlisted</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
          <p className="text-sm text-gray-600">Accepted</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
          <p className="text-sm text-gray-600">Rejected</p>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <LuFilter className="text-gray-400" />
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
              <option value="accepted">Accepted</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Applications Table */}
      {filteredApplications.length === 0 ? (
        <EmptyState
          icon={LuFileText}
          title="No applications found"
          description={filter.status || filter.search ? "No applications match your filters. Try adjusting them." : "You haven't applied to any jobs yet. Start exploring companies!"}
        />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Company</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Position</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Applied On</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((application) => (
                  <tr key={application._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                          <LuBuilding2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {application.job?.company?.companyDetails?.companyName || 'Company Name'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {application.job?.company?.companyDetails?.location || 'Location'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900">{application.job?.title || 'Job Title'}</p>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={application.job?.type === 'internship' ? 'info' : 'success'}>
                        {application.job?.type === 'internship' ? 'Internship' : 'Full-time'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <LuCalendar className="w-4 h-4" />
                        <span>{formatDateShort(application.createdAt)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={getStatusColor(application.status).replace('badge-', '')}>
                        {application.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Applications;
