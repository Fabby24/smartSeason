import React from 'react';
import { Bell, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Header = ({ title, user }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                
                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-700">{user?.full_name || 'User'}</span>
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        </button>
                        
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                <div className="px-4 py-2 border-b border-gray-200">
                                    <p className="text-sm font-medium text-gray-900">{user?.full_name}</p>
                                    <p className="text-xs text-gray-500">{user?.email}</p>
                                    <p className="text-xs text-green-600 capitalize mt-1">{user?.role}</p>
                                </div>
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Profile Settings
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;