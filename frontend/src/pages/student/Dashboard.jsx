import { LuGraduationCap, LuBriefcase, LuFileText, LuTrendingUp } from 'react-icons/lu';
import { Card } from '@/components/common';

const StudentDashboard = () => {
  // Mock data - will be replaced with API calls
  const stats = [
    { label: 'Applications Submitted', value: '12', icon: LuFileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Interviews Scheduled', value: '3', icon: LuBriefcase, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Companies Applied', value: '8', icon: LuGraduationCap, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Profile Views', value: '45', icon: LuTrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back, Student! 👋</h1>
        <p className="text-gray-600 mt-2">Here's an overview of your placement journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Announcements">
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="font-medium text-gray-900 mb-1">Campus Drive: Tech Corp</h4>
              <p className="text-sm text-gray-600">Registration open until Dec 30, 2025</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-100">
              <h4 className="font-medium text-gray-900 mb-1">Workshop: Resume Building</h4>
              <p className="text-sm text-gray-600">Join us on Dec 28, 2025 at 2:00 PM</p>
            </div>
          </div>
        </Card>

        <Card title="Application Status">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Google Inc.</h4>
                <p className="text-sm text-gray-600">Software Engineer</p>
              </div>
              <span className="badge badge-success">Shortlisted</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Microsoft</h4>
                <p className="text-sm text-gray-600">Product Manager</p>
              </div>
              <span className="badge badge-warning">Under Review</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
