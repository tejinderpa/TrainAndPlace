import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { LuMenu, LuBell, LuLogOut, LuX, LuCheckCircle, LuAlertCircle, LuInfo, LuBriefcase } from 'react-icons/lu';
import useAuthStore from '@/store/authStore';
import Avatar from '../common/Avatar';

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  // Mock notifications - replace with real API data later
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Application Accepted',
      message: 'Your application for Software Engineer at Google has been accepted',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: 2,
      type: 'info',
      title: 'New Job Posted',
      message: 'Amazon posted a new job opportunity: Backend Developer',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      type: 'warning',
      title: 'Application Deadline',
      message: 'Application deadline for Microsoft SDE role is tomorrow',
      time: '3 hours ago',
      read: true,
    },
    {
      id: 4,
      type: 'info',
      title: 'Profile Updated',
      message: 'Your profile has been successfully updated',
      time: '1 day ago',
      read: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = async () => {
    await logout();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <LuCheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <LuAlertCircle className="w-5 h-5 text-orange-500" />;
      case 'info':
        return <LuInfo className="w-5 h-5 text-blue-500" />;
      default:
        return <LuBriefcase className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <LuMenu className="w-6 h-6 text-gray-600" />
            </button>
            
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">CP</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                Campus Placement
              </span>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <LuBell className="w-6 h-6 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                  {/* Header */}
                  <div className="px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Notifications</h3>
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="p-1 hover:bg-white/20 rounded transition-colors"
                    >
                      <LuX className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-semibold text-gray-900">
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-gray-500">
                        <LuBell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>No notifications yet</p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                      <button className="text-sm text-primary-600 hover:text-primary-700 font-medium w-full text-center">
                        Mark all as read
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <Avatar 
                firstName={user?.firstName} 
                lastName={user?.lastName} 
                size="md"
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LuLogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
