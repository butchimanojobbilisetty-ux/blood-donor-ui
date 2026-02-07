import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService, authService } from '../services/api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await adminService.login(credentials);

      // Based on documentation success response structure
      if (response.data.success) {
        const userData = response.data.data;

        // Store auth data using the centralized authService
        authService.setAuthData(userData);
        localStorage.setItem('isAdmin', 'true');

        navigate('/admin/dashboard');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Invalid admin credentials. Access denied.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-md w-full relative z-10">
        <div className="glass-card bg-white/5 backdrop-blur-xl border border-white/10 p-10 lg:p-12 shadow-2xl">
          <div
            onClick={() => navigate('/')}
            className="text-center mb-12 cursor-pointer group"
          >
            <div className="w-20 h-20 bg-gradient-premium rounded-3xl flex items-center justify-center text-4xl shadow-xl mx-auto mb-8 rotate-12 group-hover:rotate-0 transition-transform">🔐</div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter group-hover:text-primary transition-colors">Admin Login</h1>
            <p className="text-gray-400 mt-3 font-medium tracking-wide uppercase text-xs">System Management</p>
          </div>

          {error && (
            <div className="mb-8 bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-xl text-center text-sm font-bold fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase px-1">Username</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter Username"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 tracking-widest uppercase px-1">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter Password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary w-full py-4 text-sm font-black uppercase tracking-[0.2em] shadow-2xl ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-all flex items-center justify-center gap-2 group"
            >
              <span className="text-sm transition-transform group-hover:-translate-x-1">←</span>
              Go Back Home
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 mt-10 text-xs font-bold uppercase tracking-widest opacity-40">
          Secured Administrative Interface v2.0
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
