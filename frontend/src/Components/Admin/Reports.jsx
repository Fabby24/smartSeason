import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import api from '../../Services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, FileText, Calendar } from 'lucide-react';
import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';

const Reports = () => {
    const { user, logout } = useAuth();
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState('week');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get('/fields');
            setFields(response.data);
        } catch (error) {
            console.error('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    const statusData = [
        { name: 'Active', value: fields.filter(f => f.status === 'active').length },
        { name: 'At Risk', value: fields.filter(f => f.status === 'at_risk').length },
        { name: 'Completed', value: fields.filter(f => f.status === 'completed').length }
    ];

    const COLORS = ['#10B981', '#EF4444', '#3B82F6'];

    const stageData = [
        { name: 'Planted', count: fields.filter(f => f.current_stage === 'planted').length },
        { name: 'Growing', count: fields.filter(f => f.current_stage === 'growing').length },
        { name: 'Ready', count: fields.filter(f => f.current_stage === 'ready').length },
        { name: 'Harvested', count: fields.filter(f => f.current_stage === 'harvested').length }
    ];

    const cropDistribution = {};
    fields.forEach(field => {
        cropDistribution[field.crop_type] = (cropDistribution[field.crop_type] || 0) + 1;
    });
    const cropData = Object.entries(cropDistribution).map(([name, value]) => ({ name, value })).slice(0, 6);

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar role="admin" onLogout={logout} />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Reports & Analytics" user={user} />
                
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {/* Date Range Selector */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Field Analytics</h2>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                                <Download className="w-4 h-4 inline mr-2" />
                                Export Report
                            </button>
                        </div>
                    </div>
                    
                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-gray-600">Total Fields</p>
                            <p className="text-2xl font-bold text-gray-800">{fields.length}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-gray-600">Active Fields</p>
                            <p className="text-2xl font-bold text-green-600">{statusData[0].value}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-gray-600">At Risk</p>
                            <p className="text-2xl font-bold text-red-600">{statusData[1].value}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-gray-600">Completion Rate</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {Math.round((statusData[2].value / fields.length) * 100)}%
                            </p>
                        </div>
                    </div>
                    
                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">Field Status Distribution</h3>
                            <div className="flex justify-center">
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
                        
                        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">Growth Stages Overview</h3>
                            <BarChart width={500} height={300} data={stageData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#10B981" />
                            </BarChart>
                        </div>
                    </div>
                    
                    {/* Crop Distribution */}
                    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4">Crop Distribution</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Crop Type</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Field Count</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Percentage</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {cropData.map((crop, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2 text-sm text-gray-800">{crop.name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-600">{crop.value}</td>
                                            <td className="px-4 py-2 text-sm text-gray-600">
                                                {Math.round((crop.value / fields.length) * 100)}%
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Reports;
