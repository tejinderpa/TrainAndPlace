import { useState, useEffect } from 'react';
import { LuBriefcase, LuSearch, LuBuilding2, LuMapPin, LuCalendar, LuUsers, LuEye } from 'react-icons/lu';
import { Card, Badge, Spinner, EmptyState } from '@/components/common';
import { jobAPI } from '@/services/api';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    jobType: '',
    status: 'all'
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobAPI.getAll();
      setJobs(response.data.data.jobs || []);
    } catch (error) {
      toast.error('Failed to load jobs');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = Array.isArray(jobs) ? jobs.filter(job => {
    const matchesSearch = job.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
                         job.location?.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = !filters.jobType || job.jobType === filters.jobType;
    const matchesStatus = filters.status === 'all' || 
                         (filters.status === 'active' && job.isActive && new Date(job.applicationDeadline) > new Date()) ||
                         (filters.status === 'expired' && new Date(job.applicationDeadline) < new Date());
    return matchesSearch && matchesType && matchesStatus;
  }) : [];

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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Job Postings</h1>
        <p className="text-gray-600 mt-2">Monitor all job postings and applications</p>
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
              <LuCalendar className="w-6 h-6 text-green-600" />
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
              <LuCalendar className="w-6 h-6 text-red-600" />
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
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="input-field pl-10"
            />
          </div>
          <select
            value={filters.jobType}
            onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
            className="input-field"
          >
            <option value="">All Job Types</option>
            <option value="full_time">Full Time</option>
            <option value="part_time">Part Time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="input-field"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </Card>

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <EmptyState
          icon={LuBriefcase}
          title="No jobs found"
          description="No job postings match your filters"
        />
      ) : (
        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <Card key={job._id}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    {job.isActive && new Date(job.applicationDeadline) > new Date() ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="danger">Expired</Badge>
                    )}
                    {job.jobType && <Badge variant="info">{job.jobType.replace('_', ' ')}</Badge>}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <LuBuilding2 className="w-4 h-4" />
                      {job.companyId?.companyDetails?.companyName || 'Company'}
                    </span>
                    <span className="flex items-center gap-1">
                      <LuMapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <LuUsers className="w-4 h-4" />
                      {job.totalApplications || 0} Applications
                    </span>
                    <span className="flex items-center gap-1">
                      <LuCalendar className="w-4 h-4" />
                      Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>

                  {job.salary?.min && job.salary?.max && (
                    <p className="text-sm font-medium text-primary-600">
                      ₹{(job.salary.min / 100000).toFixed(1)} - ₹{(job.salary.max / 100000).toFixed(1)} LPA
                    </p>
                  )}

                  {job.eligibility?.branches?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.eligibility.branches.slice(0, 5).map((branch) => (
                        <span key={branch} className="badge badge-secondary">{branch}</span>
                      ))}
                      {job.eligibility.branches.length > 5 && (
                        <span className="badge badge-secondary">+{job.eligibility.branches.length - 5} more</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="ml-4">
                  <Link
                    to={`/dashboard/job/${job._id}`}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <LuEye className="w-4 h-4" />
                    View Details
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
