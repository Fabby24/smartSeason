import React, { useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

const UpdateFieldModal = ({ field, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        stage: field.current_stage,
        notes: ''
    });
    const [loading, setLoading] = useState(false);

    const stages = [
        { value: 'planted', label: 'Planted', color: 'purple' },
        { value: 'growing', label: 'Growing', color: 'yellow' },
        { value: 'ready', label: 'Ready', color: 'orange' },
        { value: 'harvested', label: 'Harvested', color: 'blue' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await api.put(`/fields/${field.id}/stage`, formData);
            toast.success('Field updated successfully!');
            onSuccess();
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating field');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Update Field: {field.name}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Status
                        </label>
                        <div className="px-3 py-2 bg-gray-50 rounded-lg">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium status-${field.status}`}>
                                {field.status?.replace('_', ' ').toUpperCase()}
                            </span>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Update Stage *
                        </label>
                        <select
                            required
                            value={formData.stage}
                            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                        >
                            {stages.map(stage => (
                                <option key={stage.value} value={stage.value}>
                                    {stage.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notes / Observations
                        </label>
                        <textarea
                            rows="4"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            placeholder="Add any observations about the field..."
                        />
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
                            {loading ? 'Updating...' : 'Update Field'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateFieldModal;