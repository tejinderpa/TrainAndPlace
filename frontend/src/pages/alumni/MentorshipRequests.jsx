import { useState, useEffect } from 'react';
import { LuMessageSquare, LuCheckCircle, LuXCircle, LuClock, LuUser } from 'react-icons/lu';
import { Card, Badge, Spinner, EmptyState, Avatar, Alert } from '@/components/common';
import { userAPI } from '@/services/api';
import toast from 'react-hot-toast';

const MentorshipRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with actual API call
      const mockRequests = [
        {
          _id: '1',
          student: {
            _id: 's1',
            name: 'Rahul Sharma',
            email: 'rahul@student.com',
            avatar: null,
            studentDetails: {
              branch: 'Computer Science',
              batch: '2025',
              cgpa: 8.5,
              enrollmentNumber: '2021CSE001'
            }
          },
          message: 'Hi, I am interested in learning about career opportunities in AI/ML. Would love to connect with you for guidance.',
          status: 'pending',
          requestedAt: new Date('2024-01-15'),
          interestedAreas: ['Machine Learning', 'Career Guidance']
        },
        {
          _id: '2',
          student: {
            _id: 's2',
            name: 'Priya Singh',
            email: 'priya@student.com',
            avatar: null,
            studentDetails: {
              branch: 'Information Technology',
              batch: '2026',
              cgpa: 9.0,
              enrollmentNumber: '2022IT045'
            }
          },
          message: 'Looking for guidance on transitioning from college to industry. Your experience would be invaluable.',
          status: 'accepted',
          requestedAt: new Date('2024-01-10'),
          acceptedAt: new Date('2024-01-12'),
          interestedAreas: ['Web Development', 'Interview Preparation']
        }
      ];
      setRequests(mockRequests);
    } catch (error) {
      toast.error('Failed to fetch mentorship requests');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (requestId, status, response = '') => {
    try {
      // API call would go here
      toast.success(`Request ${status} successfully`);
      fetchRequests();
      setSelectedRequest(null);
    } catch (error) {
      toast.error('Failed to update request');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      accepted: 'success',
      rejected: 'danger'
    };
    return colors[status] || 'secondary';
  };

  const filteredRequests = requests.filter(req => {
    if (filter === 'all') return true;
    return req.status === filter;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    accepted: requests.filter(r => r.status === 'accepted').length,
    rejected: requests.filter(r => r.status === 'rejected').length
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
        <h1 className="text-3xl font-bold text-gray-900">Mentorship Requests</h1>
        <p className="text-gray-600 mt-2">Manage mentorship requests from students</p>
      </div>

      {/* Alert for Beta Feature */}
      <Alert variant="info">
        <p className="font-semibold">Beta Feature</p>
        <p className="text-sm mt-1">This is a simplified version of the mentorship system. Full features coming soon!</p>
      </Alert>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <LuMessageSquare className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <LuClock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
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
              <p className="text-sm text-gray-600">Accepted</p>
              <p className="text-2xl font-bold text-gray-900">{stats.accepted}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <LuXCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { label: 'All', value: 'all', count: stats.total },
          { label: 'Pending', value: 'pending', count: stats.pending },
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

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <EmptyState
          icon={LuMessageSquare}
          title="No requests"
          description={filter === 'all' ? 'No mentorship requests yet' : `No ${filter} requests`}
        />
      ) : (
        <div className="grid gap-4">
          {filteredRequests.map((request) => (
            <Card key={request._id}>
              <div className="flex justify-between items-start">
                <div className="flex gap-4 flex-1">
                  <Avatar name={request.student.name} src={request.student.avatar} size="lg" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{request.student.name}</h3>
                      <Badge variant={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{request.student.email}</p>
                    
                    <div className="flex gap-2 mb-3">
                      <Badge variant="info">{request.student.studentDetails.branch}</Badge>
                      <Badge variant="secondary">Batch {request.student.studentDetails.batch}</Badge>
                      <Badge variant="secondary">CGPA: {request.student.studentDetails.cgpa}</Badge>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <p className="text-sm text-gray-700">{request.message}</p>
                    </div>

                    {request.interestedAreas && request.interestedAreas.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-gray-600">Interested in:</span>
                        {request.interestedAreas.map((area, idx) => (
                          <span key={idx} className="badge badge-info text-xs">{area}</span>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-gray-500 mt-2">
                      Requested on {new Date(request.requestedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedRequest(request)}
                    className="btn-secondary text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Request Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Mentorship Request</h2>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Student Info */}
                <div className="flex items-center gap-4 pb-6 border-b">
                  <Avatar name={selectedRequest.student.name} src={selectedRequest.student.avatar} size="xl" />
                  <div>
                    <h3 className="text-xl font-semibold">{selectedRequest.student.name}</h3>
                    <p className="text-gray-600">{selectedRequest.student.email}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="info">{selectedRequest.student.studentDetails.branch}</Badge>
                      <Badge variant="secondary">Batch {selectedRequest.student.studentDetails.batch}</Badge>
                    </div>
                  </div>
                </div>

                {/* Academic Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">CGPA</p>
                    <p className="font-semibold">{selectedRequest.student.studentDetails.cgpa}/10</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Enrollment</p>
                    <p className="font-semibold">{selectedRequest.student.studentDetails.enrollmentNumber}</p>
                  </div>
                </div>

                {/* Request Message */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Message from Student</p>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedRequest.message}</p>
                </div>

                {/* Areas of Interest */}
                {selectedRequest.interestedAreas && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Areas of Interest</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedRequest.interestedAreas.map((area, idx) => (
                        <span key={idx} className="badge badge-info">{area}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Status and Actions */}
                <div className="pt-6 border-t">
                  <p className="text-sm text-gray-600 mb-3">
                    Current Status: <Badge variant={getStatusColor(selectedRequest.status)}>{selectedRequest.status}</Badge>
                  </p>
                  
                  {selectedRequest.status === 'pending' && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleStatusChange(selectedRequest._id, 'accepted')}
                        className="btn-primary flex items-center gap-2"
                      >
                        <LuCheckCircle className="w-4 h-4" />
                        Accept Request
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedRequest._id, 'rejected')}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                      >
                        <LuXCircle className="w-4 h-4" />
                        Decline
                      </button>
                    </div>
                  )}

                  {selectedRequest.status === 'accepted' && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-green-800 font-medium mb-2">✓ Request Accepted</p>
                      <p className="text-sm text-green-700">
                        You can now connect with {selectedRequest.student.name} via email: {selectedRequest.student.email}
                      </p>
                      <a
                        href={`mailto:${selectedRequest.student.email}`}
                        className="btn-primary mt-3 inline-flex items-center gap-2"
                      >
                        Send Email
                      </a>
                    </div>
                  )}

                  {selectedRequest.status === 'rejected' && (
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-red-800 font-medium">Request Declined</p>
                      <p className="text-sm text-red-700 mt-1">
                        This request was declined on {new Date().toLocaleDateString()}
                      </p>
                    </div>
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

export default MentorshipRequests;
