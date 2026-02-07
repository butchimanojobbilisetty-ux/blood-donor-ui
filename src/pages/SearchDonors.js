import React, { useState } from 'react';
import { donorService } from '../services/api';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import { BLOOD_GROUPS } from '../utils/constants';

const SearchDonors = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    bloodGroup: '',
    city: '',
    availabilityStatus: ''
  });

  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = React.useCallback(async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);
    setMessage('');
    setSearched(true);

    try {
      const criteria = {};
      if (searchCriteria.bloodGroup) criteria.bloodGroup = searchCriteria.bloodGroup;
      if (searchCriteria.city) criteria.city = searchCriteria.city;
      if (searchCriteria.availabilityStatus) criteria.availabilityStatus = searchCriteria.availabilityStatus;

      const response = await donorService.searchDonors(criteria);
      let results = response.data.data || [];

      // Extra safety: Filter results locally in case backend returns all records
      if (searchCriteria.availabilityStatus) {
        results = results.filter(donor => donor.availabilityStatus === searchCriteria.availabilityStatus);
      }

      setDonors(results);
      if (results.length === 0) {
        setMessage('No donors found matching your criteria.');
      }
    } catch (error) {
      setMessage('Failed to search donors. Please try again.');
      setDonors([]);
    } finally {
      setLoading(false);
      setCurrentPage(1);
    }
  }, [searchCriteria]);

  React.useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDonors = donors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(donors.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChange = (e) => {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-surface-variant py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-secondary mb-3">
            Find <span className="text-primary">Donors</span>
          </h1>
          <p className="text-lg text-gray-600">
            Search for blood donors near you and save lives instantly.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-5xl mx-auto glass-card border-none bg-white p-6 lg:p-10 mb-10 shadow-xl">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-secondary tracking-widest uppercase px-1">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={searchCriteria.bloodGroup}
                  onChange={handleChange}
                  className="input-field appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat py-3"
                >
                  <option value="">All Groups</option>
                  {BLOOD_GROUPS.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-secondary tracking-widest uppercase px-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={searchCriteria.city}
                  onChange={handleChange}
                  className="input-field py-3"
                  placeholder="e.g. Hyderabad"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-secondary tracking-widest uppercase px-1">Availability</label>
                <select
                  name="availabilityStatus"
                  value={searchCriteria.availabilityStatus}
                  onChange={handleChange}
                  className="input-field appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:18px] bg-[right_1rem_center] bg-no-repeat py-3"
                >
                  <option value="">All Statuses</option>
                  <option value="AVAILABLE">Available Now</option>
                  <option value="NOT_AVAILABLE">Not Available</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full py-3.5 text-sm uppercase tracking-widest font-black shadow-lg"
            >
              Search Donors
            </button>
          </form>
        </div>

        {/* Loading */}
        {loading && <Loading />}

        {/* Message */}
        {message && !loading && (
          <div className="max-w-xl mx-auto mb-12 fade-in">
            <div className="glass-card bg-white p-12 text-center shadow-premium border-none">
              <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-2xl font-black text-secondary uppercase mb-2">No Donors Found</h3>
              <p className="text-gray-500 font-medium max-w-xs mx-auto">
                We couldn't find any donors matching your current filters. Try broadening your search or checking different areas.
              </p>
              <button
                onClick={() => setSearchCriteria({ bloodGroup: '', city: '', availabilityStatus: '' })}
                className="mt-8 text-xs font-black text-primary uppercase tracking-widest hover:underline"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && searched && donors.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 lg:px-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="hidden md:block w-2 h-10 bg-primary rounded-full shadow-[0_0_15px_rgba(239,68,68,0.3)]"></div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-secondary">
                    Donor Network
                  </h2>
                  <p className="text-gray-500 font-medium">
                    {donors.length} Available {donors.length === 1 ? 'Donor' : 'Donors'} Found
                  </p>
                </div>
              </div>

              {/* Filter Bagdes/Summary */}
              <div className="flex flex-wrap gap-2">
                {searchCriteria.bloodGroup && (
                  <span className="inline-flex items-center px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-100 shadow-sm">
                    {searchCriteria.bloodGroup} Group
                  </span>
                )}
                {searchCriteria.city && (
                  <span className="inline-flex items-center px-4 py-2 bg-gray-50 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-100 shadow-sm">
                    <span className="mr-2">📍</span> {searchCriteria.city}
                  </span>
                )}
                {searchCriteria.availabilityStatus && (
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${searchCriteria.availabilityStatus === 'AVAILABLE'
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                    : 'bg-orange-50 text-orange-600 border-orange-100'
                    }`}>
                    {searchCriteria.availabilityStatus === 'AVAILABLE' ? 'Available Only' : 'Inc. Resting'}
                  </span>
                )}
              </div>
            </div>

            {/* Desktop View Table */}
            <div className="hidden md:block overflow-hidden glass-card bg-white border-none shadow-premium">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400">Blood Group</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400">Donor Name</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400">Availability</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400">Location</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-medium">
                  {currentDonors.map((donor) => (
                    <tr key={donor.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-4">
                        <div className="w-10 h-10 bg-gradient-premium rounded-xl flex items-center justify-center text-white font-black text-base shadow-sm">
                          {donor.bloodGroup}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-lg font-bold text-secondary">{donor.name}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`inline-flex px-4 py-1.5 rounded-lg text-xs font-bold ${donor.availabilityStatus === 'AVAILABLE'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-rose-50 text-rose-600'
                          }`}>
                          {donor.availabilityStatus === 'AVAILABLE' ? 'Available' : 'Resting'}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-gray-600">
                        <div className="flex items-center gap-2 text-base font-medium">
                          <span>📍</span> {donor.area}, {donor.city}
                        </div>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <a
                          href={`tel:${donor.phone}`}
                          className="inline-flex items-center gap-3 text-lg font-black text-secondary hover:text-primary transition-all hover:scale-105"
                        >
                          <span className="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center text-sm group-hover:bg-primary/10 group-hover:text-primary transition-colors">📱</span>
                          {donor.phone}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View - Cards */}
            <div className="md:hidden flex flex-col gap-4">
              {currentDonors.map((donor) => (
                <div key={donor.id} className="glass-card bg-white p-6 shadow-premium border-none">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-gradient-premium rounded-xl flex items-center justify-center text-white font-black text-lg">
                      {donor.bloodGroup}
                    </div>
                    <span className={`px-4 py-1.5 rounded-lg text-sm font-bold ${donor.availabilityStatus === 'AVAILABLE'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-rose-50 text-rose-600'
                      }`}>
                      {donor.availabilityStatus === 'AVAILABLE' ? 'Available' : 'Resting'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-secondary mb-1">{donor.name}</h3>
                  <p className="text-gray-600 text-base mb-5 font-medium flex items-center gap-2">
                    <span>📍</span> {donor.area}, {donor.city}
                  </p>
                  <a
                    href={`tel:${donor.phone}`}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-gray-50 rounded-xl text-lg font-black text-secondary"
                  >
                    <span>📱</span> {donor.phone}
                  </a>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-4">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`btn px-6 py-3 text-xs uppercase tracking-widest font-black transition-all ${currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'btn-secondary hover:translate-x-[-4px]'
                    }`}
                >
                  Previous
                </button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${currentPage === i + 1
                        ? 'bg-gradient-premium text-white shadow-lg'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`btn px-6 py-3 text-xs uppercase tracking-widest font-black transition-all ${currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'btn-secondary hover:translate-x-[4px]'
                    }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDonors;
