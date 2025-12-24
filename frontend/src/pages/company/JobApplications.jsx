import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LuArrowLeft, LuUsers, LuDownload, LuEye, LuCheckCircle, LuXCircle, LuClock } from 'react-icons/lu';
import { Card, Badge, Spinner, EmptyState, Avatar, Alert } from '@/components/common';
import { jobAPI, applicationAPI } from '@/services/api';
import toast from 'react-hot-toast';

const JobApplications = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchJobAndApplications();
  }, [id]);

  const fetchJobAndApplications = async () => {
    try {
      setLoading(true);
      const [jobRes, appsRes] = await Promise.all([
        jobAPI.getById(id),
        applicationAPI.getAll({ job: id })
      ]);
      setJob(jobRes.data.data.job);
      setApplications(appsRes.data.data.applications);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, status) => {
    try {
      await applicationAPI.updateStatus(applicationId, status);
      toast.success(`Application ${status} successfully`);
      fetchJobAndApplications();
      setSelectedApp(null);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      reviewed: 'info',
      shortlisted: 'success',
      rejected: 'danger',
      accepted: 'success'
    };
    return colors[status] || 'secondary';
  };

  const filteredApps = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    shortlisted: applications.filter(a => a.status === 'shortlisted').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    accepted: applications.filter(a => a.status === 'accepted').length
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex justify-center items-center h-64">
        <Alert variant="danger">Job not found</Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/my-jobs" className="p-2 hover:bg-gray-100 rounded-lg">
            <LuArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-gray-600 mt-1">Applications Management</p>
          </div>
        </div>
        <Badge variant={job.isActive ? 'success' : 'secondary'}>
          {job.isActive ? 'Active' : 'Closed'}
        </Badge>
      </div>

      {/* Job Info */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Type</p>
            <p className="font-semibold capitalize">{job.type.replace('_', ' ')}</p>
          </div>
          <div>
            <p className="text-gray-600">Location</p>
            <p className="font-semibold">{job.location}</p>
          </div>
          <div>
            <p className="text-gray-600">Positions</p>
            <p className="font-semibold">{job.positions}</p>
          </div>
          <div>
            <p className="text-gray-600">Deadline</p>
            <p className="font-semibold">{new Date(job.deadline).toLocaleDateString()}</p>
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600 mt-1">Total</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-sm text-gray-600 mt-1">Pending</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">{stats.shortlisted}</p>
            <p className="text-sm text-gray-600 mt-1">Shortlisted</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{stats.accepted}</p>
            <p className="text-sm text-gray-600 mt-1">Accepted</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
            <p className="text-sm text-gray-600 mt-1">Rejected</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {[
          { label: 'All', value: 'all', count: stats.total },
          { label: 'Pending', value: 'pending', count: stats.pending },
          { label: 'Shortlisted', value: 'shortlisted', count: stats.shortlisted },
          { label: 'Accepted', value: 'accepted', count: stats.accepted },
          { label: 'Rejected', value: 'rejected', count: stats.rejected }
        ].map(({ label, value, count }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === value
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <EmptyState
          icon={LuUsers}
          title="No applications"
          description={filter === 'all' ? 'No applications received yet' : `No ${filter} applications`}
        />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Branch</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CGPA</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApps.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={app.student?.name} src={app.student?.avatar} />
                        <div>
                          <p className="font-medium text-gray-900">{app.student?.name}</p>
                          <p className="text-sm text-gray-600">{app.student?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="badge badge-secondary">
                        {app.student?.studentDetails?.branch}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold">{app.student?.studentDetails?.cgpa}/10</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
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

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* Student Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b">
                  <Avatar name={selectedApp.student?.name} src={selectedApp.student?.avatar} size="xl" />
                  <div>
                    <h3 className="text-xl font-semibold">{selectedApp.student?.name}</h3>
                    <p className="text-gray-600">{selectedApp.student?.email}</p>
                    <p className="text-sm text-gray-500">{selectedApp.student?.phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Branch</p>
                    <p className="font-semibold">{selectedApp.student?.studentDetails?.branch}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Batch</p>
                    <p className="font-semibold">{selectedApp.student?.studentDetails?.batch}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">CGPA</p>
                    <p className="font-semibold">{selectedApp.student?.studentDetails?.cgpa}/10</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Enrollment</p>
                    <p className="font-semibold">{selectedApp.student?.studentDetails?.enrollmentNumber}</p>
                  </div>
                </div>

                {selectedApp.student?.studentDetails?.skills && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedApp.student.studentDetails.skills.map((skill, idx) => (
                        <span key={idx} className="badge badge-info">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedApp.coverLetter && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Cover Letter</p>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedApp.coverLetter}</p>
                  </div>
                )}

                {selectedApp.student?.studentDetails?.resume && (
                  <div>
                    <a
                      href={selectedApp.student.studentDetails.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary inline-flex items-center gap-2"
                    >
                      <LuDownload className="w-4 h-4" />
                      Download Resume
                    </a>
                  </div>
                )}

                <div className="pt-6 border-t">
                  <p className="text-sm text-gray-600 mb-3">Current Status: <Badge variant={getStatusColor(selectedApp.status)}>{selectedApp.status}</Badge></p>
                  <div className="flex gap-3">
                    {selectedApp.status !== 'shortlisted' && selectedApp.status !== 'accepted' && (
                      <button
                        onClick={() => handleStatusChange(selectedApp._id, 'shortlisted')}
                        className="btn-primary flex items-center gap-2"
                      >
                        <LuCheckCircle className="w-4 h-4" />
                        Shortlist
                      </button>
                    )}
                    {selectedApp.status === 'shortlisted' && (
                      <button
                        onClick={() => handleStatusChange(selectedApp._id, 'accepted')}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                      >
                        <LuCheckCircle className="w-4 h-4" />
                        Accept
                      </button>
                    )}
                    {selectedApp.status !== 'rejected' && (
                      <button
                        onClick={() => handleStatusChange(selectedApp._id, 'rejected')}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                      >
                        <LuXCircle className="w-4 h-4" />
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplications;
