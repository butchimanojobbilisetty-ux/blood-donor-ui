import React from 'react';
import './PulseLoading.css';

const PulseLoading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/75 backdrop-blur-sm">
            <div className="pulse-container relative">
                <div className="pulse-ring absolute"></div>
                <div className="pulse-ring absolute" style={{ animationDelay: '1s' }}></div>
                <div className="pulse-ring absolute" style={{ animationDelay: '2s' }}></div>
                <div className="pulse-center relative flex items-center justify-center">
                </div>

                <div className="absolute top-[60%] text-center space-y-2">
                    <h3 className="text-xl font-bold text-blue-600 tracking-wider uppercase animate-pulse">Initializing System</h3>
                    <p className="text-sm text-gray-500 font-medium tracking-wide">Secure Connection...</p>
                </div>
            </div>
        </div>
    );
};

export default PulseLoading;
