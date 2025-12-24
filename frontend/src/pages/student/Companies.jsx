import { useState, useEffect } from 'react';
import { LuBuilding2, LuMapPin, LuGlobe, LuBriefcase, LuUsers, LuFilter, LuSearch } from 'react-icons/lu';
import { Card, Badge, Spinner, EmptyState } from '@/components/common';
import { userAPI, jobAPI } from '@/services/api';
import toast from 'react-hot-toast';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch companies and their jobs
      const [companiesRes, jobsRes] = await Promise.all([
        userAPI.getCompanies(),
        jobAPI.getAll()
      ]);
      setCompanies(companiesRes.data.data.companies || []);
      setJobs(jobsRes.data.data?.jobs || []);
    } catch (error) {
      toast.error('Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  const getCompanyJobs = (companyId) => {
    return jobs.filter(job => job.company === companyId);
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.companyDetails?.companyName?.toLowerCase().includes(searchTerm.toLowerCase());
    const companyJobs = getCompanyJobs(company._id);
    
    if (filter === 'internship') {
      return matchesSearch && companyJobs.some(job => job.type === 'internship');
    } else if (filter === 'placement') {
      return matchesSearch && companyJobs.some(job => job.type === 'full_time');
    }
    
    return matchesSearch;
  });

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
        <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
        <p className="text-gray-600 mt-2">Explore companies hiring from campus</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <LuFilter className="text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Companies</option>
              <option value="internship">Internship</option>
              <option value="placement">Full-time</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Companies Grid */}
      {filteredCompanies.length === 0 ? (
        <EmptyState
          icon={LuBuilding2}
          title="No companies found"
          description="No companies match your search criteria. Try adjusting your filters."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => {
            const companyJobs = getCompanyJobs(company._id);
            return (
              <Card
                key={company._id}
                className="hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedCompany(company)}
              >
                <div className="flex flex-col h-full">
                  {/* Company Logo/Icon */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      {company.companyDetails?.logo ? (
                        <img src={company.companyDetails.logo} alt={company.companyDetails.companyName} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <LuBuilding2 className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">
                        {company.companyDetails?.companyName || 'Company Name'}
                      </h3>
                      <p className="text-sm text-gray-500">{company.companyDetails?.industry || 'Technology'}</p>
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="space-y-2 mb-4 flex-1">
                    {company.companyDetails?.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <LuMapPin className="w-4 h-4 text-gray-400" />
                        <span>{company.companyDetails.location}</span>
                      </div>
                    )}
                    {company.companyDetails?.companySize && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <LuUsers className="w-4 h-4 text-gray-400" />
                        <span>{company.companyDetails.companySize} employees</span>
                      </div>
                    )}
                    {company.companyDetails?.website && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <LuGlobe className="w-4 h-4 text-gray-400" />
                        <a
                          href={company.companyDetails.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-primary-600 hover:underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Active Jobs */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <LuBriefcase className="w-4 h-4" />
                        <span>{companyJobs.length} Active {companyJobs.length === 1 ? 'Job' : 'Jobs'}</span>
                      </div>
                      {company.companyDetails?.isVerified && (
                        <Badge variant="success">Verified</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Company Detail Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                    {selectedCompany.companyDetails?.logo ? (
                      <img src={selectedCompany.companyDetails.logo} alt={selectedCompany.companyDetails.companyName} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <LuBuilding2 className="w-10 h-10 text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedCompany.companyDetails?.companyName}
                    </h2>
                    <p className="text-gray-600">{selectedCompany.companyDetails?.industry}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Company Details */}
              <div className="space-y-6">
                {selectedCompany.companyDetails?.description && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">About Company</h3>
                    <p className="text-gray-600">{selectedCompany.companyDetails.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Location</h4>
                    <p className="text-gray-900">{selectedCompany.companyDetails?.location || 'N/A'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Company Size</h4>
                    <p className="text-gray-900">{selectedCompany.companyDetails?.companySize || 'N/A'}</p>
                  </div>
                </div>

                {/* Active Jobs */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Active Job Openings</h3>
                  {getCompanyJobs(selectedCompany._id).length === 0 ? (
                    <p className="text-gray-500">No active job openings at the moment.</p>
                  ) : (
                    <div className="space-y-3">
                      {getCompanyJobs(selectedCompany._id).map((job) => (
                        <div key={job._id} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{job.title}</h4>
                            <Badge variant={job.type === 'internship' ? 'info' : 'success'}>
                              {job.type === 'internship' ? 'Internship' : 'Full-time'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{job.description}</p>
                          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                            View Details →
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setSelectedCompany(null)} className="btn-secondary">
                  Close
                </button>
                <button className="btn-primary">
                  View All Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;
