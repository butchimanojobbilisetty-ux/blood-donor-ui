import React from 'react';
import './HeartLoading.css';

const HeartLoading = () => {
    // Generate random positions, durations, and delays for hearts
    const hearts = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100 + '%',
        animationDuration: Math.random() * 3 + 2 + 's',
        animationDelay: Math.random() * 3 + 's',
        scale: Math.random() * 0.5 + 0.5
    }));

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/50 backdrop-blur-sm">
            <div className="heart-container">
                {hearts.map((heart) => (
                    <div
                        key={heart.id}
                        className="heart-particle absolute"
                        style={{
                            left: heart.left,
                            animationDuration: heart.animationDuration,
                            animationDelay: heart.animationDelay,
                            width: `${heart.scale * 24}px`,
                            height: `${heart.scale * 24}px`
                        }}
                    />
                ))}
            </div>

            {/* Central Loading Message */}
            <div className="relative z-50 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-rose-500 to-pink-500 rounded-full animate-bounce shadow-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-white drop-shadow-md">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
                <div className="text-xl font-bold text-rose-600 animate-pulse tracking-widest uppercase bg-white/80 px-4 py-2 rounded-full shadow-sm">
                    Processing...
                </div>
            </div>
        </div>
    );
};

export default HeartLoading;
