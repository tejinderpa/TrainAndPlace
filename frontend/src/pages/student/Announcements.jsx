import { useState, useEffect } from 'react';
import { LuMegaphone, LuCalendar, LuEye, LuFilter, LuAlertCircle } from 'react-icons/lu';
import { Card, Badge, Spinner, EmptyState, Alert } from '@/components/common';
import { announcementAPI } from '@/services/api';
import { formatDateShort, formatRelativeTime } from '@/utils/helpers';
import toast from 'react-hot-toast';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ type: '', priority: '' });
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, [filter]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await announcementAPI.getAll(filter);
      setAnnouncements(response.data.data.announcements);
    } catch (error) {
      toast.error('Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'danger',
      high: 'warning',
      medium: 'info',
      low: 'gray'
    };
    return colors[priority] || 'gray';
  };

  const getTypeIcon = (type) => {
    return type === 'important' ? LuAlertCircle : LuMegaphone;
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-600 mt-2">Stay updated with latest news and events</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <LuFilter className="text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
          </div>
          
          <select
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Types</option>
            <option value="general">General</option>
            <option value="placement_drive">Placement Drive</option>
            <option value="workshop">Workshop</option>
            <option value="deadline">Deadline</option>
            <option value="result">Result</option>
            <option value="important">Important</option>
          </select>

          <select
            value={filter.priority}
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </Card>

      {/* Announcements List */}
      {announcements.length === 0 ? (
        <EmptyState
          icon={LuMegaphone}
          title="No announcements found"
          description="There are no announcements at the moment. Check back later!"
        />
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {announcements.map((announcement) => {
            const TypeIcon = getTypeIcon(announcement.type);
            return (
              <Card
                key={announcement._id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedAnnouncement(announcement)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${announcement.priority === 'urgent' ? 'bg-red-100' : announcement.priority === 'high' ? 'bg-orange-100' : 'bg-blue-100'}`}>
                    <TypeIcon className={`w-6 h-6 ${announcement.priority === 'urgent' ? 'text-red-600' : announcement.priority === 'high' ? 'text-orange-600' : 'text-blue-600'}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {announcement.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant={getPriorityColor(announcement.priority)}>
                            {announcement.priority.toUpperCase()}
                          </Badge>
                          <Badge variant="gray">
                            {announcement.type.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">{announcement.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <LuCalendar className="w-4 h-4" />
                        <span>{formatRelativeTime(announcement.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <LuEye className="w-4 h-4" />
                        <span>{announcement.views} views</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span>By {announcement.createdBy?.firstName} {announcement.createdBy?.lastName}</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedAnnouncement.title}
                  </h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={getPriorityColor(selectedAnnouncement.priority)}>
                      {selectedAnnouncement.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="gray">
                      {selectedAnnouncement.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAnnouncement(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span>Posted {formatDateShort(selectedAnnouncement.createdAt)}</span>
                  <span>•</span>
                  <span>By {selectedAnnouncement.createdBy?.firstName} {selectedAnnouncement.createdBy?.lastName}</span>
                  <span>•</span>
                  <span>{selectedAnnouncement.views} views</span>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{selectedAnnouncement.description}</p>
              </div>

              {selectedAnnouncement.attachments && selectedAnnouncement.attachments.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Attachments</h3>
                  <div className="space-y-2">
                    {selectedAnnouncement.attachments.map((attachment, index) => (
                      <a
                        key={index}
                        href={attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-sm text-gray-700">{attachment.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {selectedAnnouncement.expiresAt && (
                <Alert type="warning" className="mt-6">
                  <span className="font-medium">Expires on: </span>
                  {formatDateShort(selectedAnnouncement.expiresAt)}
                </Alert>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedAnnouncement(null)}
                  className="btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
