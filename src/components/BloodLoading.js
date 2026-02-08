import React from 'react';
import './BloodDrops.css';

const BloodLoading = () => {
    // Generate random positions and delays for drops
    const drops = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100 + '%',
        animationDuration: Math.random() * 2 + 1 + 's',
        animationDelay: Math.random() * 2 + 's'
    }));

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/50 backdrop-blur-sm">
            <div className="blood-container">
                {drops.map((drop) => (
                    <div
                        key={drop.id}
                        className="blood-drop"
                        style={{
                            left: drop.left,
                            animationDuration: drop.animationDuration,
                            animationDelay: drop.animationDelay
                        }}
                    />
                ))}
            </div>

            {/* Central Loading Pulse */}
            <div className="relative z-50 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary rounded-full animate-bounce shadow-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-md">
                        <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.8-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                        <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.35"></path>
                    </svg>
                </div>
                <div className="text-xl font-bold text-primary animate-pulse tracking-widest uppercase">
                    Searching Donors...
                </div>
            </div>
        </div>
    );
};

export default BloodLoading;
