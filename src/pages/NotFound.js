import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-surface-variant flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="text-9xl font-black text-primary/20 mb-4 animate-pulse">404</div>
                <h1 className="text-4xl font-black text-secondary uppercase tracking-tighter mb-4">Page Not Found</h1>
                <p className="text-gray-500 mb-10 font-medium">The page you are looking for doesn't exist or has been moved.</p>
                <Link
                    to="/"
                    className="btn btn-primary px-10 py-4 uppercase tracking-[0.2em] shadow-xl inline-block"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
