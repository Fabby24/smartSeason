import React from 'react';

const StatsCard = ({ title, value, color, icon: Icon }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-gray-600 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-800">{value}</p>
                </div>
                {Icon && (
                    <div className={`p-3 rounded-lg bg-${color}-100`}>
                        <Icon className={`w-6 h-6 text-${color}-600`} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsCard;