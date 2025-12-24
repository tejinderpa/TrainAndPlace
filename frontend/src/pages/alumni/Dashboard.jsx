import { LuUsers, LuMessageSquare, LuCalendar, LuAward } from 'react-icons/lu';
import { Card } from '@/components/common';

const AlumniDashboard = () => {
  const stats = [
    { label: 'Students Connected', value: '23', icon: LuUsers, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Mentorship Sessions', value: '15', icon: LuMessageSquare, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Upcoming Events', value: '4', icon: LuCalendar, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Contributions', value: '8', icon: LuAward, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Alumni Dashboard 🎓</h1>
        <p className="text-gray-600 mt-2">Connect with students and share your expertise</p>
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

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Mentorship Requests">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-medium">
                  RP
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Rahul Patel</h4>
                  <p className="text-sm text-gray-600">Computer Science • Batch 2025</p>
                </div>
              </div>
              <button className="btn-primary text-sm py-1 px-3">Accept</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                  SK
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Sneha Kumar</h4>
                  <p className="text-sm text-gray-600">IT • Batch 2026</p>
                </div>
              </div>
              <button className="btn-primary text-sm py-1 px-3">Accept</button>
            </div>
          </div>
        </Card>

        <Card title="Upcoming Sessions">
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Career Guidance Session</h4>
                <span className="text-xs text-blue-600 font-medium">Tomorrow</span>
              </div>
              <p className="text-sm text-gray-600">With Ankit Sharma • 3:00 PM</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Technical Interview Prep</h4>
                <span className="text-xs text-green-600 font-medium">Dec 28</span>
              </div>
              <p className="text-sm text-gray-600">With Priya Verma • 5:00 PM</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AlumniDashboard;
