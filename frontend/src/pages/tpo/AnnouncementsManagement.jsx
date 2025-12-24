import { useState, useEffect } from 'react';
import { LuMegaphone, LuPlus, LuPencil, LuTrash2, LuEye } from 'react-icons/lu';
import { Card, Badge, Spinner, EmptyState, Alert } from '@/components/common';
import { announcementAPI } from '@/services/api';
import { formatDateShort } from '@/utils/helpers';
import toast from 'react-hot-toast';

const AnnouncementsManagement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'general',
    priority: 'medium',
    targetAudience: {
      roles: ['student']
    }
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await announcementAPI.getAll({});
      setAnnouncements(response.data.data.announcements);
    } catch (error) {
      toast.error('Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await announcementAPI.update(editingId, formData);
        toast.success('Announcement updated successfully');
      } else {
        await announcementAPI.create(formData);
        toast.success('Announcement created successfully');
      }
      resetForm();
      fetchAnnouncements();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title,
      description: announcement.description,
      type: announcement.type,
      priority: announcement.priority,
      targetAudience: announcement.targetAudience
    });
    setEditingId(announcement._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await announcementAPI.delete(id);
        toast.success('Announcement deleted successfully');
        fetchAnnouncements();
      } catch (error) {
        toast.error('Failed to delete announcement');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'general',
      priority: 'medium',
      targetAudience: {
        roles: ['student']
      }
    });
    setEditingId(null);
    setShowForm(false);
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
          <h1 className="text-3xl font-bold text-gray-900">Announcements Management</h1>
          <p className="text-gray-600 mt-2">Create and manage campus announcements</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
            <LuPlus className="w-4 h-4" />
            New Announcement
          </button>
        )}
      </div>

      {/* Create/Edit Form */}
      {showForm && (
        <Card title={editingId ? 'Edit Announcement' : 'Create New Announcement'}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="input-field"
                placeholder="Enter announcement title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={5}
                className="input-field"
                placeholder="Enter detailed description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="input-field"
                >
                  <option value="general">General</option>
                  <option value="placement_drive">Placement Drive</option>
                  <option value="workshop">Workshop</option>
                  <option value="deadline">Deadline</option>
                  <option value="result">Result</option>
                  <option value="important">Important</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="input-field"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {editingId ? 'Update' : 'Create'} Announcement
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* Announcements List */}
      {announcements.length === 0 ? (
        <EmptyState
          icon={LuMegaphone}
          title="No announcements yet"
          description="Create your first announcement to notify students"
          action={
            <button onClick={() => setShowForm(true)} className="btn-primary">
              Create Announcement
            </button>
          }
        />
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement._id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                    <Badge variant={announcement.priority === 'urgent' ? 'danger' : announcement.priority === 'high' ? 'warning' : 'info'}>
                      {announcement.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="gray">
                      {announcement.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{announcement.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Posted {formatDateShort(announcement.createdAt)}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <LuEye className="w-4 h-4" />
                      <span>{announcement.views} views</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(announcement)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <LuEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(announcement._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
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

export default AnnouncementsManagement;
