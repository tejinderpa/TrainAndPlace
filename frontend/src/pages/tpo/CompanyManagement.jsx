import { useState, useEffect } from 'react';
import { LuBuilding2, LuSearch, LuCheckCircle, LuXCircle, LuEye, LuMail, LuPhone } from 'react-icons/lu';
import { Card, Badge, Spinner, EmptyState, Avatar, Alert } from '@/components/common';
import { userAPI } from '@/services/api';
import toast from 'react-hot-toast';

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getCompanies();
      setCompanies(response.data.data.companies || []);
    } catch (error) {
      toast.error('Failed to fetch companies');
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (companyId, isApproved) => {
    try {
      await userAPI.updateCompanyStatus(companyId, { isApproved });
      toast.success(`Company ${isApproved ? 'approved' : 'rejected'} successfully`);
      fetchCompanies();
      setSelectedCompany(null);
    } catch (error) {
      toast.error('Failed to update company status');
    }
  };

  const handleVerification = async (companyId, isVerified) => {
    try {
      await userAPI.updateCompanyStatus(companyId, { isVerified });
      toast.success(`Company ${isVerified ? 'verified' : 'unverified'} successfully`);
      fetchCompanies();
    } catch (error) {
      toast.error('Failed to update verification status');
    }
  };

  const filteredCompanies = Array.isArray(companies) ? companies.filter(company => {
    const matchesSearch = (company.firstName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (company.lastName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (company.companyDetails?.companyName?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'pending') return matchesSearch && !company.isApproved;
    if (filter === 'approved') return matchesSearch && company.isApproved;
    if (filter === 'verified') return matchesSearch && company.companyDetails?.isVerified;
    return matchesSearch;
  }) : [];

  const stats = {
    total: companies.length,
    pending: companies.filter(c => !c.isApproved).length,
    approved: companies.filter(c => c.isApproved).length,
    verified: companies.filter(c => c.companyDetails?.isVerified).length
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
        <h1 className="text-3xl font-bold text-gray-900">Company Management</h1>
        <p className="text-gray-600 mt-2">Approve and manage company registrations</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <LuBuilding2 className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Companies</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <LuBuilding2 className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Approval</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <LuCheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <LuCheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Verified</p>
              <p className="text-2xl font-bold text-gray-900">{stats.verified}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex gap-2">
            {[
              { label: 'All', value: 'all' },
              { label: 'Pending', value: 'pending' },
              { label: 'Approved', value: 'approved' },
              { label: 'Verified', value: 'verified' }
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
        </div>
      </Card>

      {/* Companies List */}
      {filteredCompanies.length === 0 ? (
        <EmptyState
          icon={LuBuilding2}
          title="No companies found"
          description="Try adjusting your filters"
        />
      ) : (
        <div className="grid gap-4">
          {filteredCompanies.map((company) => (
            <Card key={company._id}>
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4 flex-1">
                  <Avatar
                    name={company.companyDetails?.companyName || company.name}
                    src={company.avatar}
                    size="lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {company.companyDetails?.companyName || company.name}
                      </h3>
                      {company.isApproved && (
                        <Badge variant="success">Approved</Badge>
                      )}
                      {!company.isApproved && (
                        <Badge variant="warning">Pending</Badge>
                      )}
                      {company.companyDetails?.isVerified && (
                        <Badge variant="info">Verified</Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <LuMail className="w-4 h-4" />
                        {company.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <LuPhone className="w-4 h-4" />
                        {company.phone}
                      </p>
                      {company.companyDetails?.industry && (
                        <p>Industry: {company.companyDetails.industry}</p>
                      )}
                      {company.companyDetails?.size && (
                        <p>Size: {company.companyDetails.size} employees</p>
                      )}
                      {company.companyDetails?.website && (
                        <a
                          href={company.companyDetails.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:underline"
                        >
                          {company.companyDetails.website}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedCompany(company)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <LuEye className="w-5 h-5" />
                  </button>
                  {!company.isApproved && (
                    <button
                      onClick={() => handleApproval(company._id, true)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Approve"
                    >
                      <LuCheckCircle className="w-5 h-5" />
                    </button>
                  )}
                  {company.isApproved && !company.companyDetails?.isVerified && (
                    <button
                      onClick={() => handleVerification(company._id, true)}
                      className="btn-primary text-sm"
                    >
                      Mark as Verified
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Company Detail Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Company Details</h2>
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b">
                  <Avatar
                    name={selectedCompany.companyDetails?.companyName || selectedCompany.name}
                    src={selectedCompany.avatar}
                    size="xl"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">
                      {selectedCompany.companyDetails?.companyName || selectedCompany.name}
                    </h3>
                    <div className="flex gap-2 mt-2">
                      {selectedCompany.isApproved ? (
                        <Badge variant="success">Approved</Badge>
                      ) : (
                        <Badge variant="warning">Pending Approval</Badge>
                      )}
                      {selectedCompany.companyDetails?.isVerified && (
                        <Badge variant="info">Verified</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{selectedCompany.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold">{selectedCompany.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Industry</p>
                    <p className="font-semibold">{selectedCompany.companyDetails?.industry || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Company Size</p>
                    <p className="font-semibold">{selectedCompany.companyDetails?.size || 'N/A'}</p>
                  </div>
                </div>

                {selectedCompany.companyDetails?.website && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Website</p>
                    <a
                      href={selectedCompany.companyDetails.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      {selectedCompany.companyDetails.website}
                    </a>
                  </div>
                )}

                {selectedCompany.companyDetails?.description && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Description</p>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                      {selectedCompany.companyDetails.description}
                    </p>
                  </div>
                )}

                <div className="pt-6 border-t flex gap-3">
                  {!selectedCompany.isApproved ? (
                    <>
                      <button
                        onClick={() => handleApproval(selectedCompany._id, true)}
                        className="btn-primary flex items-center gap-2"
                      >
                        <LuCheckCircle className="w-4 h-4" />
                        Approve Company
                      </button>
                      <button
                        onClick={() => handleApproval(selectedCompany._id, false)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                      >
                        <LuXCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </>
                  ) : (
                    <>
                      {!selectedCompany.companyDetails?.isVerified && (
                        <button
                          onClick={() => handleVerification(selectedCompany._id, true)}
                          className="btn-primary flex items-center gap-2"
                        >
                          <LuCheckCircle className="w-4 h-4" />
                          Mark as Verified
                        </button>
                      )}
                      <button
                        onClick={() => handleApproval(selectedCompany._id, false)}
                        className="btn-secondary"
                      >
                        Revoke Approval
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement;
