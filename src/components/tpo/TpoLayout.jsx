import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Building2, 
  BarChart3, 
  FileText, 
  Settings, 
  Bell, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import '../../App.css';

const TpoLayout = () => {
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
        { path: "/tpo/dashboard", icon: Home, label: "Dashboard" },
        { path: "/tpo/students", icon: Users, label: "Students" },
        { path: "/tpo/companies", icon: Building2, label: "Companies" },
        { path: "/tpo/analytics", icon: BarChart3, label: "Analytics" }
      ]
    },
    {
      category: "Resources",
      items: [
        { path: "/tpo/reports", icon: FileText, label: "Reports" },
        { path: "/tpo/settings", icon: Settings, label: "Settings" },
        { path: "/tpo/notifications", icon: Bell, label: "Notifications" }
      ]
    }
  ];

  return (
    <div className="layout">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-header">
          <h2>TPO Portal</h2>
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

export default TpoLayout;