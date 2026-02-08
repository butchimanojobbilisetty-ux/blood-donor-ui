import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService, authService } from '../services/api';
import PulseLoading from '../components/PulseLoading';
import { BLOOD_GROUPS } from '../utils/constants';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('donors');
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [bloodFilter, setBloodFilter] = useState('All');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const bloodGroupOptions = ['All', ...BLOOD_GROUPS];

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (activeTab === 'donors') {
        const response = await adminService.getAllDonors();
        setDonors(response.data.data || []);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load data' });
    } finally {
      setLoading(false);
      setCurrentPage(1);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'AVAILABLE' ? 'NOT_AVAILABLE' : 'AVAILABLE';
    const monthsUnavailable = newStatus === 'NOT_AVAILABLE' ? 3 : null;

    try {
      await adminService.updateDonorStatus(id, newStatus, monthsUnavailable);
      setMessage({ type: 'success', text: 'Status updated successfully' });
      fetchData();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update status' });
    }
  };

  const handleDeleteDonor = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete donor ${name}? This action cannot be undone.`)) {
      try {
        await adminService.deleteDonor(id);
        setMessage({ type: 'success', text: 'Donor deleted successfully' });
        fetchData();
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to delete donor' });
      }
    }
  };

  // Filtering Logic
  const filteredDonors = donors.filter(donor => {
    const matchesSearch =
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBlood = bloodFilter === 'All' || donor.bloodGroup === bloodFilter;

    return matchesSearch && matchesBlood;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDonors = filteredDonors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDonors.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-surface-variant flex flex-col lg:flex-row">
      {/* Sidebar - Fixed on desktop */}
      <aside className="w-full lg:w-80 bg-secondary text-white p-8 lg:fixed lg:left-0 lg:top-0 lg:bottom-0 z-20 flex flex-col shadow-2xl overflow-y-auto">
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-4 mb-12 px-2 cursor-pointer group hover:opacity-80 transition-all"
        >
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-2xl shadow-lg rotate-12 group-hover:rotate-0 transition-transform">🏢</div>
          <h1 className="text-2xl font-black tracking-tighter uppercase">Admin Console</h1>
        </div>

        <nav className="space-y-3">
          {[
            { id: 'donors', label: 'Donor Network', icon: '👥' },
            { id: 'stats', label: 'System Analytics', icon: '📊' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.id
                ? 'bg-primary text-white shadow-premium'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
            >
              <span className="text-xl">{tab.icon}</span>
              {tab.label}
            </button>
          ))}

          <div className="pt-6 mt-6 border-t border-white/5">
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all"
            >
              <span className="text-xl">🏠</span>
              Home
            </button>
          </div>
        </nav>

        <div className="mt-8 pt-8">
          <button
            onClick={() => { authService.clearAuthData(); navigate('/admin-login'); }}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all text-white bg-rose-600 hover:bg-rose-700 shadow-lg group"
          >
            <span className="text-xl transition-transform group-hover:translate-x-1">🚪</span>
            Sign Out
          </button>
        </div>

        {/* Footer info in sidebar */}
        <div className="mt-12 text-[10px] text-gray-500 font-black uppercase tracking-widest px-6 opacity-40">
          Admin Portal v2.0
        </div>
      </aside>

      {/* Main Content - Pushed by sidebar width on desktop */}
      <main className="flex-1 p-6 lg:p-12 lg:ml-80 overflow-x-hidden">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-secondary uppercase tracking-tight mb-2">
              {activeTab === 'donors' ? 'Donor Network' : 'System Analytics'}
            </h2>
            <p className="text-gray-500 font-medium">Manage and monitor the donor database</p>
          </div>

          <button onClick={fetchData} className="btn btn-secondary flex items-center gap-2 self-start md:self-auto px-6 py-3 text-xs uppercase tracking-widest font-black">
            <span>🔄</span> Refresh
          </button>
        </header>

        {message.text && (
          <div className={`mb-10 p-6 rounded-2xl flex items-center justify-between gap-4 fade-in ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-rose-50 text-rose-800 border border-rose-100'
            }`}>
            <div className="flex items-center gap-4">
              <span className="text-xl">{message.type === 'success' ? '✨' : '⚠️'}</span>
              <span className="font-bold">{message.text}</span>
            </div>
            <button onClick={() => setMessage({ type: '', text: '' })} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>
        )}

        {loading ? <PulseLoading /> : (
          <div className="fade-in">
            {activeTab === 'donors' && (
              <div className="space-y-10">
                {/* Search and Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                    <input
                      type="text"
                      placeholder="Search by name, email or city..."
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                      className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border-none shadow-premium text-sm font-bold text-secondary uppercase tracking-tight focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <select
                      value={bloodFilter}
                      onChange={(e) => { setBloodFilter(e.target.value); setCurrentPage(1); }}
                      className="w-full px-6 py-4 rounded-2xl bg-white border-none shadow-premium text-sm font-black text-primary uppercase tracking-widest focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1.5rem_center] bg-no-repeat"
                    >
                      {bloodGroupOptions.map(bg => <option key={bg} value={bg}>{bg === 'All' ? 'All Blood Groups' : bg}</option>)}
                    </select>
                  </div>
                </div>

                <div className="glass-card bg-white border-none shadow-premium overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                          <th className="px-8 py-5">Donor Information</th>
                          <th className="px-8 py-5">Blood Group</th>
                          <th className="px-8 py-5">Location</th>
                          <th className="px-8 py-5">Current Status</th>
                          <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 font-medium">
                        {currentDonors.length > 0 ? currentDonors.map((donor) => (
                          <tr key={donor.id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="px-8 py-5">
                              <div className="text-secondary text-base font-bold mb-0.5">{donor.name}</div>
                              <div className="text-sm text-gray-500 truncate max-w-[200px]">{donor.email}</div>
                            </td>
                            <td className="px-8 py-5">
                              <span className="text-primary text-base font-bold">{donor.bloodGroup}</span>
                            </td>
                            <td className="px-8 py-5">
                              <div className="text-gray-700 text-sm font-bold">{donor.city}</div>
                              <div className="text-xs text-gray-400 mt-0.5">{donor.area}</div>
                            </td>
                            <td className="px-8 py-5">
                              <span className={`inline-flex px-4 py-1.5 rounded-lg text-xs font-bold ${donor.availabilityStatus === 'AVAILABLE' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                }`}>
                                {donor.availabilityStatus === 'AVAILABLE' ? 'Active' : 'Offline'}
                              </span>
                            </td>
                            <td className="px-8 py-5 text-right flex items-center justify-end gap-3">
                              <button
                                onClick={() => handleUpdateStatus(donor.id, donor.availabilityStatus)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${donor.availabilityStatus === 'AVAILABLE'
                                  ? 'text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white'
                                  : 'text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white'
                                  }`}
                                title={donor.availabilityStatus === 'AVAILABLE' ? "Mark as Offline" : "Mark as Active"}
                              >
                                {donor.availabilityStatus === 'AVAILABLE' ? 'Offline' : 'Active'}
                              </button>
                              <button
                                onClick={() => handleDeleteDonor(donor.id, donor.name)}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                title="Delete Donor"
                              >
                                🗑️
                              </button>
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan="5" className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest">
                              No donors match your search criteria
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Dashboard Pagination - Always rendered if filtered results exist */}
                {totalPages > 0 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/50 p-6 rounded-3xl border border-white">
                    <div className="text-xs font-bold text-gray-500">
                      {filteredDonors.length === 1 ? (
                        "1 Registered Donor"
                      ) : (
                        `Showing ${indexOfFirstItem + 1}–${Math.min(indexOfLastItem, filteredDonors.length)} of ${filteredDonors.length} Donors`
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-6 py-3 rounded-xl text-xs font-bold transition-all ${currentPage === 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-secondary text-white hover:bg-primary shadow-lg'
                          }`}
                      >
                        Previous
                      </button>

                      <div className="flex gap-2">
                        {[...Array(totalPages)].slice(0, 5).map((_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={`w-11 h-11 rounded-xl text-xs font-bold transition-all ${currentPage === i + 1
                              ? 'bg-primary text-white shadow-xl scale-110'
                              : 'bg-white text-secondary hover:bg-gray-100'
                              }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-6 py-3 rounded-xl text-xs font-bold transition-all ${currentPage === totalPages
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-secondary text-white hover:bg-primary shadow-lg'
                          }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { label: 'Total Network', val: donors.length, icon: '🌐', color: 'text-primary' },
                  { label: 'Operational', val: donors.filter(d => d.availabilityStatus === 'AVAILABLE').length, icon: '✅', color: 'text-emerald-500' },
                  { label: 'Offline', val: donors.filter(d => d.availabilityStatus !== 'AVAILABLE').length, icon: '💤', color: 'text-rose-500' }
                ].map((stat, i) => (
                  <div key={i} className="glass-card bg-white border-none shadow-premium p-10 text-center">
                    <div className="text-5xl mb-6">{stat.icon}</div>
                    <div className={`text-6xl font-black mb-4 ${stat.color}`}>{stat.val}</div>
                    <div className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
