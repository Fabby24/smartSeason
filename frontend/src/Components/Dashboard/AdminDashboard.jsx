import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import api from '../../Services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import Sidebar from '../Layout/Sidebar';
import StatsCard from './StatsCard';
import FieldForm from '../Fields/FieldForm';
import FieldList from '../Fields/FieldList';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [fields, setFields] = useState([]);
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFieldForm, setShowFieldForm] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [fieldsRes, agentsRes] = await Promise.all([
                api.get('/fields'),
                api.get('/fields/agents')
            ]);
            setFields(fieldsRes.data);
            setAgents(agentsRes.data);
        } catch (error) {
            toast.error('Error fetching data');
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

    const statusData = [
        { name: 'Active', value: stats.active },
        { name: 'At Risk', value: stats.atRisk },
        { name: 'Completed', value: stats.completed }
    ];

    const COLORS = ['#10B981', '#EF4444', '#3B82F6'];

    const stageData = [
        { name: 'Planted', count: fields.filter(f => f.current_stage === 'planted').length },
        { name: 'Growing', count: fields.filter(f => f.current_stage === 'growing').length },
        { name: 'Ready', count: fields.filter(f => f.current_stage === 'ready').length },
        { name: 'Harvested', count: fields.filter(f => f.current_stage === 'harvested').length }
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Admin Dashboard</h1>
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
                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <StatsCard title="Total Fields" value={stats.total} color="bg-blue-500" />
                        <StatsCard title="Active Fields" value={stats.active} color="bg-green-500" />
                        <StatsCard title="At Risk" value={stats.atRisk} color="bg-red-500" />
                        <StatsCard title="Completed" value={stats.completed} color="bg-gray-500" />
                    </div>

                    {/* Charts - Responsive */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div className="card overflow-x-auto">
                            <h3 className="text-lg font-semibold mb-4">Field Status Distribution</h3>
                            <div className="flex justify-center min-w-[300px]">
                                <PieChart width={300} height={300}>
                                    <Pie
                                        data={statusData}
                                        cx={150}
                                        cy={150}
                                        innerRadius={60}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                        label
                                    >
                                        {statusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </div>
                        </div>

                        <div className="card overflow-x-auto">
                            <h3 className="text-lg font-semibold mb-4">Crop Growth Stages</h3>
                            <div className="min-w-[300px]">
                                <BarChart width={500} height={300} data={stageData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#10B981" />
                                </BarChart>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Field Management</h2>
                        <button onClick={() => setShowFieldForm(true)} className="btn-primary w-full sm:w-auto">
                            + Add New Field
                        </button>
                    </div>

                    {/* Fields List */}
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                        </div>
                    ) : (
                        <FieldList fields={fields} agents={agents} onUpdate={fetchData} isAdmin={true} />
                    )}

                    {/* Modals */}
                    {showFieldForm && (
                        <FieldForm
                            agents={agents}
                            onClose={() => setShowFieldForm(false)}
                            onSuccess={() => {
                                setShowFieldForm(false);
                                fetchData();
                            }}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
