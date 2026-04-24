import React, { useState } from 'react';
import api from '../../Services/api';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

const FieldForm = ({ agents, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        crop_type: '',
        planting_date: '',
        assigned_agent_id: '',
        current_stage: 'planted'
    });
    const [loading, setLoading] = useState(false);

    const cropTypes = ['Maize', 'Wheat', 'Rice', 'Soybeans', 'Coffee', 'Tea', 'Vegetables', 'Fruits'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await api.post('/fields', formData);
            toast.success('Field created successfully!');
            onSuccess();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error creating field');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Add New Field</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Field Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="e.g., North Field A"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Crop Type *
                        </label>
                        <select
                            required
                            value={formData.crop_type}
                            onChange={(e) => setFormData({ ...formData, crop_type: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Select crop type</option>
                            {cropTypes.map(crop => (
                                <option key={crop} value={crop}>{crop}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Planting Date *
                        </label>
                        <input
                            type="date"
                            required
                            value={formData.planting_date}
                            onChange={(e) => setFormData({ ...formData, planting_date: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Assign Agent
                        </label>
                        <select
                            value={formData.assigned_agent_id}
                            onChange={(e) => setFormData({ ...formData, assigned_agent_id: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Unassigned</option>
                            {agents.map(agent => (
                                <option key={agent.id} value={agent.id}>{agent.full_name}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Initial Stage
                        </label>
                        <select
                            value={formData.current_stage}
                            onChange={(e) => setFormData({ ...formData, current_stage: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        >
                            <option value="planted">Planted</option>
                            <option value="growing">Growing</option>
                            <option value="ready">Ready</option>
                            <option value="harvested">Harvested</option>
                        </select>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Field'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FieldForm;
