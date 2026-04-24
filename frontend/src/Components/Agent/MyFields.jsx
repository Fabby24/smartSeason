import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import api from '../../Services/api';
import toast from 'react-hot-toast';
import { MapPin, Calendar, User, AlertCircle, CheckCircle, PlayCircle } from 'lucide-react';
import { format } from 'date-fns';
import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';
import UpdateFieldModal from '../Fields/UpdateFieldModal';

const MyFields = () => {
    const { user, logout } = useAuth();
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedField, setSelectedField] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

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

    const getStatusIcon = (status) => {
        switch(status) {
            case 'active': return <PlayCircle className="w-4 h-4 text-green-600" />;
            case 'at_risk': return <AlertCircle className="w-4 h-4 text-red-600" />;
            case 'completed': return <CheckCircle className="w-4 h-4 text-blue-600" />;
            default: return null;
        }
    };

    const getStageColor = (stage) => {
        const colors = {
            planted: 'bg-purple-100 text-purple-800',
            growing: 'bg-yellow-100 text-yellow-800',
            ready: 'bg-orange-100 text-orange-800',
            harvested: 'bg-blue-100 text-blue-800'
        };
        return colors[stage] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar role="agent" onLogout={logout} />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="My Fields" user={user} />
                
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Assigned Fields</h2>
                        <p className="text-gray-600 mt-1">Manage and update your assigned fields</p>
                    </div>
                    
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                        </div>
                    ) : fields.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl">
                            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No fields assigned</h3>
                            <p className="text-gray-500 mt-1">You haven't been assigned any fields yet</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {fields.map((field) => (
                                <div key={field.id} className="card hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-semibold text-gray-800">{field.name}</h3>
                                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium status-${field.status}`}>
                                            {getStatusIcon(field.status)}
                                            <span>{field.status?.replace('_', ' ').toUpperCase()}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <MapPin className="w-4 h-4" />
                                            <span className="text-sm">{field.crop_type}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm">Planted: {format(new Date(field.planting_date), 'MMM dd, yyyy')}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(field.current_stage)}`}>
                                            {field.current_stage.toUpperCase()}
                                        </span>
                                        
                                        <button
                                            onClick={() => {
                                                setSelectedField(field);
                                                setShowUpdateModal(true);
                                            }}
                                            className="text-green-600 hover:text-green-700 text-sm font-medium"
                                        >
                                            Update Stage →
                                        </button>
                                    </div>
                                    
                                    {field.latest_note && (
                                        <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                                            <p className="text-xs text-gray-600">Latest note: {field.latest_note}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {showUpdateModal && selectedField && (
                        <UpdateFieldModal
                            field={selectedField}
                            onClose={() => setShowUpdateModal(false)}
                            onSuccess={fetchFields}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

export default MyFields;
