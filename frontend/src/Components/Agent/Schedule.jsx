import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Calendar as CalendarIcon, CheckCircle, Clock, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';

const Schedule = () => {
    const { user, logout } = useAuth();
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const response = await api.get('/schedules');
            setSchedules(response.data);
        } catch (error) {
            console.error('Error fetching schedules');
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
            case 'cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
            default: return <Clock className="w-4 h-4 text-gray-600" />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar role="agent" onLogout={logout} />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="My Schedule" user={user} />
                
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Upcoming Tasks</h2>
                        <p className="text-gray-600 mt-1">Your scheduled field activities</p>
                    </div>
                    
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                        </div>
                    ) : schedules.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl">
                            <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No schedules yet</h3>
                            <p className="text-gray-500 mt-1">You don't have any scheduled tasks</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {schedules.map((schedule) => (
                                <div key={schedule.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                {getStatusIcon(schedule.status)}
                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                                    schedule.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    schedule.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {schedule.status.toUpperCase()}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-800">{schedule.task_type}</h3>
                                            <p className="text-sm text-gray-600 mt-1">Field: {schedule.field_name}</p>
                                            {schedule.notes && (
                                                <p className="text-sm text-gray-500 mt-1">{schedule.notes}</p>
                                            )}
                                        </div>
                                        <div className="text-left sm:text-right">
                                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                                <CalendarIcon className="w-4 h-4" />
                                                {format(new Date(schedule.scheduled_date), 'MMM dd, yyyy')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Schedule;