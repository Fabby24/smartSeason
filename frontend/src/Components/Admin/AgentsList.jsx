import React, { useState, useEffect } from 'react';
import api from '../../Services/api';
import toast from 'react-hot-toast';
import { User, Mail, Calendar, UserPlus, Trash2, Shield } from 'lucide-react';
import Sidebar from '../Layout/Sidebar';
import Header from '../Layout/Header';
import { useAuth } from '../../Context/AuthContext';

const AgentsList = () => {
    const { user, logout } = useAuth();
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newAgent, setNewAgent] = useState({
        username: '',
        email: '',
        full_name: '',
        password: ''
    });

    useEffect(() => {
        fetchAgents();
    }, []);

    const fetchAgents = async () => {
        try {
            const response = await api.get('/auth/users');
            const allUsers = response.data;
            const agentUsers = allUsers.filter(u => u.role === 'agent');
            setAgents(agentUsers);
        } catch (error) {
            toast.error('Error fetching agents');
        } finally {
            setLoading(false);
        }
    };

    const handleAddAgent = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/signup', {
                ...newAgent,
                role: 'agent'
            });
            toast.success('Agent added successfully');
            setShowAddModal(false);
            setNewAgent({ username: '', email: '', full_name: '', password: '' });
            fetchAgents();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error adding agent');
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar role="admin" onLogout={logout} />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="Manage Agents" user={user} />
                
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Field Agents</h2>
                        <button 
                            onClick={() => setShowAddModal(true)}
                            className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
                        >
                            <UserPlus className="w-4 h-4" />
                            Add New Agent
                        </button>
                    </div>
                    
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {agents.map((agent) => (
                                <div key={agent.id} className="card hover:shadow-lg transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                                            <User className="w-6 h-6 text-white" />
                                        </div>
                                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                            Agent
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{agent.full_name}</h3>
                                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                                        <User className="w-4 h-4" /> @{agent.username}
                                    </p>
                                    <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                                        <Mail className="w-4 h-4" /> {agent.email}
                                    </p>
                                    <p className="text-xs text-gray-500 flex items-center gap-2">
                                        <Calendar className="w-3 h-3" /> 
                                        Joined: {new Date(agent.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {/* Add Agent Modal */}
                    {showAddModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                                <div className="p-6 border-b border-gray-200">
                                    <h3 className="text-xl font-bold text-gray-800">Add New Agent</h3>
                                </div>
                                <form onSubmit={handleAddAgent} className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={newAgent.full_name}
                                            onChange={(e) => setNewAgent({...newAgent, full_name: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Username *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={newAgent.username}
                                            onChange={(e) => setNewAgent({...newAgent, username: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                            placeholder="johndoe"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={newAgent.email}
                                            onChange={(e) => setNewAgent({...newAgent, email: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Password *
                                        </label>
                                        <input
                                            type="password"
                                            required
                                            value={newAgent.password}
                                            onChange={(e) => setNewAgent({...newAgent, password: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                            placeholder="Minimum 6 characters"
                                        />
                                    </div>
                                    
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowAddModal(false)}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                                        >
                                            Add Agent
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AgentsList;
