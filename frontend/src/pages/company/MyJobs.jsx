import { useState, useEffect } from 'react';
import { LuBriefcase, LuPlus, LuPencil, LuTrash2, LuEye, LuClock, LuUsers } from 'react-icons/lu';
import { Card, Badge, Spinner, EmptyState } from '@/components/common';
import { jobAPI } from '@/services/api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobAPI.getMyJobs();
      setJobs(response.data.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return;

    try {
      await jobAPI.delete(id);
      toast.success('Job deleted successfully');
      fetchJobs();
    } catch (error) {
      toast.error('Failed to delete job');
    }
  };

  const getStatusBadge = (job) => {
    const now = new Date();
    const deadline = new Date(job.applicationDeadline);
    
    if (!job.isActive) return <Badge variant="secondary">Inactive</Badge>;
    if (deadline < now) return <Badge variant="danger">Expired</Badge>;
    return <Badge variant="success">Active</Badge>;
  };

  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true;
    if (filter === 'active') return job.isActive && new Date(job.applicationDeadline) > new Date();
    if (filter === 'expired') return new Date(job.applicationDeadline) < new Date();
    if (filter === 'inactive') return !job.isActive;
    return true;
  });

  const stats = {
    total: jobs.length,
    active: jobs.filter(j => j.isActive && new Date(j.applicationDeadline) > new Date()).length,
    expired: jobs.filter(j => new Date(j.applicationDeadline) < new Date()).length,
    totalApplications: jobs.reduce((sum, j) => sum + (j.totalApplications || 0), 0)
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
          <h1 className="text-3xl font-bold text-gray-900">My Job Postings</h1>
          <p className="text-gray-600 mt-2">Manage your job openings and applications</p>
        </div>
        <Link to="/dashboard/post-job" className="btn-primary flex items-center gap-2">
          <LuPlus className="w-5 h-5" />
          Post New Job
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <LuBriefcase className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <LuClock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <LuClock className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Expired</p>
              <p className="text-2xl font-bold text-gray-900">{stats.expired}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <LuUsers className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { label: 'All', value: 'all' },
          { label: 'Active', value: 'active' },
          { label: 'Expired', value: 'expired' },
          { label: 'Inactive', value: 'inactive' }
        ].map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === value
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <EmptyState
          icon={LuBriefcase}
          title="No jobs found"
          description={filter === 'all' ? "You haven't posted any jobs yet" : `No ${filter} jobs found`}
        />
      ) : (
        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <Card key={job._id}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    {getStatusBadge(job)}
                    {job.jobType && <Badge variant="info">{job.jobType.replace('_', ' ')}</Badge>}
                  </div>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>📍 {job.location}</span>
                    {job.salary?.min && job.salary?.max && (
                      <span>💰 ₹{(job.salary.min / 100000).toFixed(1)} - ₹{(job.salary.max / 100000).toFixed(1)} LPA</span>
                    )}
                    <span>👥 {job.totalApplications || 0} Applications</span>
                    <span>📅 Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</span>
                  </div>

                  {job.eligibility?.branches?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.eligibility.branches.slice(0, 3).map((branch) => (
                        <span key={branch} className="badge badge-secondary">{branch}</span>
                      ))}
                      {job.eligibility.branches.length > 3 && (
                        <span className="badge badge-secondary">+{job.eligibility.branches.length - 3} more</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <Link
                    to={`/dashboard/job/${job._id}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Applications"
                  >
                    <LuEye className="w-5 h-5" />
                  </Link>
                  <Link
                    to={`/dashboard/edit-job/${job._id}`}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit Job"
                  >
                    <LuPencil className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Job"
                  >
                    <LuTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
