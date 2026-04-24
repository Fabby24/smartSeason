import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Map, 
    Users, 
    LogOut, 
    Settings,
    Activity,
    Calendar,
    Menu,
    X
} from 'lucide-react';
import { useAuth } from '../../Context/AuthContext';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Get role from user object directly from auth context
    const role = user?.role || localStorage.getItem('userRole');

    const menuItems = {
        admin: [
            { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { path: '/fields', icon: Map, label: 'All Fields' },
            { path: '/agents', icon: Users, label: 'Agents' },
            { path: '/reports', icon: Activity, label: 'Reports' },
            { path: '/settings', icon: Settings, label: 'Settings' }
        ],
        agent: [
            { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { path: '/fields', icon: Map, label: 'My Fields' },
            { path: '/calendar', icon: Calendar, label: 'Schedule' }
        ]
    };

    const items = menuItems[role] || menuItems.agent;

    const handleLogout = () => {
        setIsMobileMenuOpen(false);
        logout();
    };

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const SidebarContent = () => (
        <>
            <div className="p-4 md:p-6 border-b border-green-700">
                <h1 className="text-xl md:text-2xl font-bold">SmartSeason</h1>
                <p className="text-xs md:text-sm text-green-300 mt-1">Field Monitoring</p>
                <div className="mt-2 text-xs text-green-400">
                    Logged in as: <span className="font-medium capitalize">{role}</span>
                </div>
            </div>
            
            <nav className="flex-1 p-3 md:p-4">
                <ul className="space-y-1 md:space-y-2">
                    {items.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `
                                    flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-200 text-sm md:text-base
                                    ${isActive 
                                        ? 'bg-green-700 text-white shadow-lg' 
                                        : 'text-green-100 hover:bg-green-700/50'
                                    }
                                `}
                            >
                                <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            
            <div className="p-3 md:p-4 border-t border-green-700">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 w-full rounded-lg text-green-100 hover:bg-red-600/20 hover:text-red-200 transition-all duration-200 text-sm md:text-base"
                >
                    <LogOut className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-green-600 text-white rounded-lg shadow-lg"
            >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 bg-gradient-to-b from-green-900 to-green-800 text-white flex-col">
                <SidebarContent />
            </aside>
            
            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
                <>
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <aside className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-green-900 to-green-800 text-white flex-col z-40 lg:hidden animate-slide-in">
                        <SidebarContent />
                    </aside>
                </>
            )}
        </>
    );
};

export default Sidebar;
