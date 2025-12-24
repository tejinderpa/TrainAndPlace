import { LuUsers, LuBriefcase, LuBuilding2, LuCheckCircle } from 'react-icons/lu';
import { Card } from '@/components/common';

const TPODashboard = () => {
  const stats = [
    { label: 'Total Students', value: '450', icon: LuUsers, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Jobs', value: '28', icon: LuBriefcase, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Registered Companies', value: '35', icon: LuBuilding2, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Placements', value: '156', icon: LuCheckCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">TPO Dashboard 📊</h1>
        <p className="text-gray-600 mt-2">Manage placement activities and track progress</p>
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

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Activities">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">New company registered</p>
                <p className="text-xs text-gray-600">Tech Solutions Inc. - 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Job posted</p>
                <p className="text-xs text-gray-600">Software Engineer - Google Inc.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Student placement confirmed</p>
                <p className="text-xs text-gray-600">John Doe - Microsoft</p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Upcoming Events">
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Campus Drive</h4>
                <span className="text-xs text-blue-600 font-medium">Tomorrow</span>
              </div>
              <p className="text-sm text-gray-600">Amazon - Software Development</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Mock Interview</h4>
                <span className="text-xs text-purple-600 font-medium">Dec 28</span>
              </div>
              <p className="text-sm text-gray-600">Batch 2025 - Final Year Students</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TPODashboard;
