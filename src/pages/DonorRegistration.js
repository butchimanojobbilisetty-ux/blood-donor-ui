import React, { useState, useEffect } from 'react';

import { donorService } from '../services/api';
import HeartLoading from '../components/HeartLoading';
import SearchableSelect from '../components/SearchableSelect';
import { BLOOD_GROUPS, STATES, getCitiesForState, getAreasForCity } from '../utils/constants';

const DonorRegistration = () => {
  const [step, setStep] = useState(1); // 1: Form, 2: OTP
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    state: '',
    city: '',
    area: ''
  });

  const [availableCities, setAvailableCities] = useState([]);
  const [availableAreas, setAvailableAreas] = useState([]);

  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'state') {
      const cities = getCitiesForState(value);
      setAvailableCities(cities);
      setAvailableAreas([]); // Reset areas when state changes
      setFormData({ ...formData, state: value, city: '', area: '' });
    }
    // Handle city change - update available areas
    else if (name === 'city') {
      const areas = getAreasForCity(value);
      setAvailableAreas(areas);
      setFormData({ ...formData, city: value, area: '' });
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await donorService.initiateRegistration(formData);
      setMessage({ type: 'success', text: response.data.message });
      setStep(2);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Registration failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        window.location.href = '/search';
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleVerifyOtp = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await donorService.completeRegistration(formData, otp);
      setOtp('');
      setIsSuccess(true); // This will trigger the useEffect and hide the form
      setMessage({
        type: 'success',
        text: 'Registration completed successfully! Redirecting to donor list...'
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'OTP verification failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  // If successful, show a dedicated success view
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-surface-variant py-20 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto glass-card bg-white border-none shadow-premium p-12 lg:p-20 text-center fade-in">
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white text-5xl shadow-lg mx-auto mb-8 animate-bounce">
              ✓
            </div>
            <h1 className="text-4xl font-black text-secondary mb-4 uppercase tracking-tighter">Registration Successful!</h1>
            <p className="text-xl text-gray-500 mb-10 font-medium">Thank you for joining our community of heroes.</p>
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <p className="text-sm font-black text-primary uppercase tracking-[0.2em]">Redirecting to Donor List...</p>
            </div>
            <button
              onClick={() => window.location.href = '/search'}
              className="mt-12 btn btn-primary px-12 py-4 uppercase tracking-widest text-sm"
            >
              Go Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-variant py-8 md:py-20">
      {loading && <HeartLoading />}
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card bg-white border-none shadow-premium p-4 sm:p-6 lg:p-12">
            <div className="text-center mb-6 md:mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-secondary mb-2 md:mb-3">Join the <span className="text-primary">Cause</span></h1>
              <p className="text-gray-500 font-medium">
                {step === 1 ? 'Save lives by sharing your gift of life.' : 'Verify your identity to complete registration.'}
              </p>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-center mb-8 md:mb-16 px-2 md:px-4">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg text-sm md:text-base ${step >= 1 ? 'bg-gradient-premium text-white rotate-12 scale-110' : 'bg-gray-100 text-gray-400'}`}>
                  {step > 1 ? '✓' : '1'}
                </div>
                <span className={`mt-2 md:mt-3 text-[10px] md:text-xs font-black uppercase tracking-wider md:tracking-widest ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>Profile</span>
              </div>
              <div className={`flex-1 h-1 mx-2 md:mx-4 rounded-full transition-all duration-700 ${step >= 2 ? 'bg-primary' : 'bg-gray-100'}`}></div>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg text-sm md:text-base ${step >= 2 ? 'bg-gradient-premium text-white rotate-12 scale-110' : 'bg-gray-100 text-gray-400'}`}>
                  2
                </div>
                <span className={`mt-2 md:mt-3 text-[10px] md:text-xs font-black uppercase tracking-wider md:tracking-widest ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>Verify</span>
              </div>
            </div>

            {/* Notifications */}
            {message.text && (
              <div className={`mb-6 md:mb-10 p-4 md:p-6 rounded-2xl flex items-center justify-between gap-3 md:gap-4 fade-in ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                }`}>
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="text-xl md:text-2xl">{message.type === 'success' ? '✨' : '⚠️'}</span>
                  <p className="font-semibold text-sm md:text-base">{message.text}</p>
                </div>
              </div>
            )}

            {step === 1 && !loading && (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-secondary tracking-wide uppercase px-1">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-field" placeholder="John Doe" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary tracking-wide uppercase px-1">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input-field" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary tracking-wide uppercase px-1">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required pattern="[0-9]{10,15}" className="input-field" placeholder="10-15 digits" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary tracking-wide uppercase px-1">Blood Group</label>
                  <div className="relative">
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      required
                      className="input-field appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat w-full"
                    >
                      <option value="">Select Group</option>
                      {BLOOD_GROUPS.map(group => <option key={group} value={group}>{group}</option>)}
                    </select>
                  </div>
                </div>

                <SearchableSelect
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  options={STATES}
                  placeholder="Select or type state"
                  required
                />

                <SearchableSelect
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  options={availableCities}
                  placeholder={!formData.state ? "Select state first" : "Select or type city"}
                  disabled={!formData.state}
                  required
                />

                <SearchableSelect
                  label="Specific Area / Locality"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  options={availableAreas}
                  placeholder={!formData.city ? "Select city first" : "Select or type area"}
                  disabled={!formData.city}
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className={`md:col-span-2 btn btn-primary py-3 md:py-4 text-base md:text-lg mt-4 flex items-center justify-center gap-3 transition-all ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : 'Send Verification Code'}
                </button>
              </form>
            )}

            {step === 2 && !loading && (
              <form onSubmit={handleVerifyOtp} className="space-y-6 md:space-y-10 py-4">
                <div className="text-center space-y-4">
                  <label className="text-sm font-black text-secondary tracking-widest uppercase">Verification Code</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    pattern="[0-9]{6}"
                    maxLength="6"
                    className="w-full max-w-md mx-auto bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl py-3 md:py-4 text-center text-2xl md:text-3xl font-black text-primary tracking-[0.3rem] md:tracking-[0.5rem] focus:outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
                    placeholder="000000"
                  />
                  <p className="text-sm text-gray-500">
                    A code was sent to <span className="font-bold text-secondary">{formData.email}</span>
                  </p>
                </div>

                <div className="flex gap-3 md:gap-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={loading}
                    className="flex-1 btn btn-secondary py-3 md:py-4 text-sm md:text-base uppercase disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-[2] btn btn-primary py-3 md:py-4 text-sm md:text-base uppercase shadow-xl flex items-center justify-center gap-3"
                  >
                    Finalize Registration
                  </button>
                </div>
              </form>
            )}

            {loading && (
              <div className="py-20 text-center">
                <HeartLoading />
                <p className="mt-8 text-gray-400 font-bold uppercase tracking-widest animate-pulse">Communicating with Secure Server...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorRegistration;
