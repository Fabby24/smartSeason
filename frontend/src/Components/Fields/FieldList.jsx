import React, { useState } from 'react';
import { format } from 'date-fns';
import { MapPin, Calendar, User, AlertCircle, CheckCircle, PlayCircle } from 'lucide-react';
import UpdateFieldModal from './UpdateFieldModal';

const FieldList = ({ fields, agents, onUpdate, isAdmin }) => {
  const [selectedField, setSelectedField] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {fields.map((field) => (
        <div key={field.id} className="card hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold text-gray-800">{field.name}</h3>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium status-${field.status}`}>
              {getStatusIcon(field.status)}
              <span>{field.status.replace('_', ' ').toUpperCase()}</span>
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
            
            {field.assigned_agent_name && (
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                <span className="text-sm">Agent: {field.assigned_agent_name}</span>
              </div>
            )}
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
      
      {showUpdateModal && selectedField && (
        <UpdateFieldModal
          field={selectedField}
          onClose={() => setShowUpdateModal(false)}
          onSuccess={onUpdate}
        />
      )}
    </div>
  );
};

export default FieldList;