import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAdmin = localStorage.getItem('isAdmin');
    const location = useLocation();

    if (!isAdmin) {
        // Redirect them to the login page, but save the current location they were
        // trying to go to. This allows us to send them back to that page after they login.
        return <Navigate to="/admin-login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
