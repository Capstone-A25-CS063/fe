import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  ChevronLeft,
  LogOut,
  LayoutDashboard,
  Users,
  Upload,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth.jsx';
import { useTheme } from '@/context/ThemeContext.jsx';

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { darkMode } = useTheme();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      roles: ['admin', 'sales'], // Both can access
    },
    {
      id: 'manage-profile',
      label: 'Manage Profile',
      icon: Users,
      path: '/manage-profile',
      roles: ['admin'], // Only admin
    },
    {
      id: 'data-input',
      label: 'Data Input',
      icon: Upload,
      path: '/data-input',
      roles: ['admin'], // Only admin
    },
  ];

  // Filter menu items by user role
  const userRole = user?.role?.toLowerCase() || 'sales';
  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen z-40 flex flex-col
        transition-colors duration-300
        ${darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-primary-500 border-primary-600'
        }
        border-r rounded-r-3xl shadow-xl
        transition-all duration-500 ease-in-out
        ${isOpen ? 'w-64 px-5 py-8' : 'w-20 px-3 py-6'}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-10 relative pt-2 mt-2">
        <div className="flex items-center gap-2 flex-1">
          <img 
            src="/LogoPRISM.png" 
            alt="PRISM Logo" 
            className={`object-contain transition-all duration-300 flex-shrink-0 ${
              isOpen ? 'w-8 h-8' : 'w-10 h-10'
            }`}
          />
          {isOpen && (
            <h2 className="text-white text-base font-bold tracking-wide truncate">
              PRISM
            </h2>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => onToggle(!isOpen)}
          className={`
            p-2 rounded-xl text-white flex-shrink-0
            transition-all duration-300 
            ${isOpen ? 'ml-2' : ''}
          `}
        >
          {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MENU */}
      <nav className="flex flex-col space-y-2 flex-1 mt-3">
        {menuItems
          .filter((item) => item.roles.includes(userRole))
          .map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.id}
                to={item.path}
                title={!isOpen ? item.label : ''}
                className={`
                  flex items-center w-full px-4 py-2 rounded-lg text-sm transition-all duration-300
                  ${
                    active
                      ? 'bg-primary-400 text-base-light shadow-sm'
                      : 'text-white hover:bg-primary-600/70'
                  }
                  ${!isOpen ? 'justify-center' : 'gap-3'}
                `}
              >
                <Icon size={20} />
                {isOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
      </nav>

      {/* FOOTER — USER INFO */}
      <div className="mt-6 flex flex-col items-center">
        <div
          className={`
            flex items-center text-white transition-all duration-300
            ${
              isOpen
                ? 'gap-3 bg-primary-600 p-3 rounded-lg w-full'
                : 'justify-center'
            }
          `}
        >
          <div className="h-10 w-10 rounded-full bg-white text-primary-800 flex items-center justify-center font-bold shadow">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>

          {isOpen && (
            <div>
              <h2 className="text-sm font-medium">{user?.name || 'User'}</h2>
              <p className="text-xs text-gray-200">{user?.role || 'Guest'}</p>
            </div>
          )}
        </div>

        {/* SIGN OUT */}
        <button
          onClick={handleLogout}
          className={`
            mt-4 w-full flex items-center 
            ${isOpen ? 'justify-center gap-2 px-4' : 'justify-center px-0'}
            text-white text-sm font-medium
            bg-primary-600 hover:bg-primary-700
            py-2 rounded-xl transition-all duration-300 shadow-md group
          `}
          title="Logout"
        >
          <LogOut
            size={isOpen ? 18 : 22}
            className="transition-all duration-300 group-hover:text-red-400"
          />

          {isOpen && (
            <span className="transition-all duration-300 group-hover:text-red-400">
              Sign Out
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
