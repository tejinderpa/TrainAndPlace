import { LuBriefcase, LuUsers, LuFileText, LuEye } from 'react-icons/lu';
import { Card } from '@/components/common';

const CompanyDashboard = () => {
  const stats = [
    { label: 'Active Jobs', value: '5', icon: LuBriefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Applications', value: '124', icon: LuFileText, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Shortlisted', value: '28', icon: LuUsers, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Profile Views', value: '342', icon: LuEye, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Company Dashboard 🏢</h1>
        <p className="text-gray-600 mt-2">Recruit talented students for your organization</p>
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
        <Card title="Recent Applications">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-medium">
                  JD
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">John Doe</h4>
                  <p className="text-sm text-gray-600">Software Engineer</p>
                </div>
              </div>
              <span className="badge badge-warning">Pending</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                  AS
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Alice Smith</h4>
                  <p className="text-sm text-gray-600">Data Analyst</p>
                </div>
              </div>
              <span className="badge badge-info">Reviewed</span>
            </div>
          </div>
        </Card>

        <Card title="Posted Jobs">
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Software Engineer</h4>
                <span className="badge badge-success">Active</span>
              </div>
              <p className="text-sm text-gray-600">45 applications • Posted 5 days ago</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">Product Manager</h4>
                <span className="badge badge-success">Active</span>
              </div>
              <p className="text-sm text-gray-600">23 applications • Posted 2 days ago</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CompanyDashboard;
