import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  GraduationCap, 
  Trophy, 
  Building, 
  Users, 
  Globe, 
  MessageCircle, 
  Bell, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import '../../App.css';

const AlumniLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    // In a real app, you would clear user session here
    console.log("Logout initiated");
  };

  const navItems = [
    {
      category: "Main",
      items: [
        { path: "/alumni/dashboard", icon: Home, label: "Dashboard" },
        { path: "/alumni/mentorship", icon: GraduationCap, label: "Mentorship" },
        { path: "/alumni/rewards", icon: Trophy, label: "Rewards" },
        { path: "/alumni/tpo", icon: Building, label: "TPO Support" }
      ]
    },
    {
      category: "Community",
      items: [
        { path: "/alumni/network", icon: Globe, label: "Network" },
        { path: "/alumni/forum", icon: MessageCircle, label: "Forum" },
        { path: "/alumni/notifications", icon: Bell, label: "Notifications" }
      ]
    }
  ];

  return (
    <div className="layout">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-header">
          <h2>Alumni Portal</h2>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((section, index) => (
            <div key={index} className="nav-section">
              <h3 className="nav-category">{section.category}</h3>
              {section.items.map((item, itemIndex) => {
                const IconComponent = item.icon;
                return (
                  <Link 
                    key={itemIndex}
                    to={item.path}
                    className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  >
                    <IconComponent size={20} />
                    {isSidebarOpen && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
          
          <div className="nav-section">
            <button onClick={handleLogout} className="nav-item logout">
              <LogOut size={20} />
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? '' : 'sidebar-collapsed'}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default AlumniLayout;