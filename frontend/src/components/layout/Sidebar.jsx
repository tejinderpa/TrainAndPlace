import { NavLink } from 'react-router-dom';
import { 
  LuLayoutDashboard, 
  LuBriefcase, 
  LuUsers, 
  LuCalendar,
  LuFileText,
  LuBuilding2,
  LuMegaphone,
  LuUserCheck,
  LuMessageSquare,
  LuSettings,
  LuX
} from 'react-icons/lu';
import useAuthStore from '@/store/authStore';
import { USER_ROLES } from '@/utils/constants';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuthStore();

  // Define navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Dashboard', path: '/dashboard', icon: LuLayoutDashboard },
    ];

    const roleSpecificItems = {
      [USER_ROLES.STUDENT]: [
        { name: 'Announcements', path: '/dashboard/announcements', icon: LuMegaphone },
        { name: 'Companies', path: '/dashboard/companies', icon: LuBuilding2 },
        { name: 'My Applications', path: '/dashboard/applications', icon: LuFileText },
        { name: 'Profile', path: '/dashboard/profile', icon: LuSettings },
      ],
      [USER_ROLES.TPO]: [
        { name: 'Students', path: '/dashboard/tpo/students', icon: LuUsers },
        { name: 'Companies', path: '/dashboard/tpo/companies', icon: LuBuilding2 },
        { name: 'Jobs', path: '/dashboard/tpo/jobs', icon: LuBriefcase },
        { name: 'Applications', path: '/dashboard/tpo/applications', icon: LuFileText },
        { name: 'Announcements', path: '/dashboard/tpo/announcements', icon: LuMegaphone },
      ],
      [USER_ROLES.COMPANY]: [
        { name: 'Post Job', path: '/dashboard/post-job', icon: LuBriefcase },
        { name: 'My Jobs', path: '/dashboard/my-jobs', icon: LuFileText },
        { name: 'Students', path: '/dashboard/students', icon: LuUsers },
        { name: 'Profile', path: '/dashboard/profile', icon: LuSettings },
      ],
      [USER_ROLES.ALUMNI]: [
        { name: 'Students', path: '/dashboard/alumni/students', icon: LuUsers },
        { name: 'Mentorship', path: '/dashboard/alumni/mentorship', icon: LuMessageSquare },
        { name: 'Events', path: '/dashboard/alumni/events', icon: LuCalendar },
        { name: 'Profile', path: '/dashboard/alumni/profile', icon: LuSettings },
      ],
    };

    return [...baseItems, ...(roleSpecificItems[user?.role] || [])];
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="h-full w-64 bg-white border-r border-gray-200 flex flex-col">
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 z-50"
          >
            <LuX className="w-6 h-6 text-gray-600" />
          </button>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              © 2025 Campus Placement Portal
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
