import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import api from '../../Services/api';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { CheckCircle, AlertCircle, Clock, Sprout } from 'lucide-react';
import Sidebar from '../Layout/Sidebar';
import StatsCard from './StatsCard';
import FieldList from '../Fields/FieldList';

const AgentDashboard = () => {
    const { user } = useAuth();
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFields();
    }, []);

    const fetchFields = async () => {
        try {
            const response = await api.get('/fields');
            setFields(response.data);
        } catch (error) {
            toast.error('Error fetching fields');
        } finally {
            setLoading(false);
        }
    };

    const stats = {
        total: fields.length,
        active: fields.filter(f => f.status === 'active').length,
        atRisk: fields.filter(f => f.status === 'at_risk').length,
        completed: fields.filter(f => f.status === 'completed').length
    };

    const recentUpdates = fields
        .filter(f => f.last_update_date)
        .sort((a, b) => new Date(b.last_update_date) - new Date(a.last_update_date))
        .slice(0, 5);

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Agent Dashboard</h1>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 hidden sm:inline">Welcome, {user?.full_name}</span>
                            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">
                                    {user?.full_name?.charAt(0) || 'A'}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>
                
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-4 md:p-6 mb-6 text-white">
                        <h2 className="text-xl md:text-2xl font-bold mb-2">Welcome back, {user?.full_name}!</h2>
                        <p className="text-green-100 text-sm md:text-base">Here's what's happening with your fields today.</p>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <StatsCard title="Assigned Fields" value={stats.total} color="blue" icon={Sprout} />
                        <StatsCard title="Active" value={stats.active} color="green" icon={CheckCircle} />
                        <StatsCard title="At Risk" value={stats.atRisk} color="red" icon={AlertCircle} />
                        <StatsCard title="Completed" value={stats.completed} color="gray" icon={Clock} />
                    </div>
                    
                    {/* Recent Activity */}
                    <div className="card mb-6">
                        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            {recentUpdates.map((field) => (
                                <div key={field.id} className="flex flex-col sm:flex-row justify-between p-3 bg-gray-50 rounded-lg gap-2">
                                    <div>
                                        <p className="font-medium text-gray-800">{field.name}</p>
                                        <p className="text-sm text-gray-600">Updated to {field.current_stage}</p>
                                    </div>
                                    <div className="text-left sm:text-right">
                                        <p className="text-xs text-gray-500">
                                            {format(new Date(field.last_update_date), 'MMM dd, h:mm a')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {recentUpdates.length === 0 && (
                                <p className="text-gray-500 text-center py-4">No recent updates</p>
                            )}
                        </div>
                    </div>
                    
                    {/* My Fields */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">My Assigned Fields</h2>
                        {loading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                            </div>
                        ) : (
                            <FieldList fields={fields} onUpdate={fetchFields} isAdmin={false} />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AgentDashboard;
