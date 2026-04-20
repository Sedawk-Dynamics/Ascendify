import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineHome, HiOutlineAcademicCap, HiOutlineDocumentCheck, HiOutlineChatBubbleLeft, HiOutlineBuildingOffice2, HiOutlineBriefcase, HiOutlinePencilSquare, HiArrowRightOnRectangle } from 'react-icons/hi2';

const navItems = [
  { to: '/', icon: HiOutlineHome, label: 'Dashboard', end: true },
  { to: '/programs', icon: HiOutlineAcademicCap, label: 'Programs' },
  { to: '/certificates', icon: HiOutlineDocumentCheck, label: 'Certificates' },
  { to: '/contacts', icon: HiOutlineChatBubbleLeft, label: 'Contacts' },
  { to: '/corporate', icon: HiOutlineBuildingOffice2, label: 'Corporate' },
  { to: '/jobs', icon: HiOutlineBriefcase, label: 'Job Board' },
  { to: '/blogs', icon: HiOutlinePencilSquare, label: 'Blogs' },
];

export default function Layout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F0A2E] text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#4A2FBD] to-[#2ECEC6] bg-clip-text text-transparent">
            Ascendify Admin
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-[#4A2FBD] to-[#2ECEC6] text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <p className="font-medium text-white">{admin?.name}</p>
              <p className="text-gray-400 text-xs">{admin?.email}</p>
            </div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-white transition-colors" title="Logout">
              <HiArrowRightOnRectangle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
