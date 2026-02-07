import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { donorService } from '../services/api';
import Loading from '../components/Loading';
import { BLOOD_GROUPS } from '../utils/constants';

const DonorRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Form, 2: OTP
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    area: '',
    city: ''
  });

  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
    <div className="min-h-screen bg-surface-variant py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card bg-white border-none shadow-premium p-8 lg:p-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold text-secondary mb-3">Join the <span className="text-primary">Cause</span></h1>
              <p className="text-gray-500 font-medium">
                {step === 1 ? 'Save lives by sharing your gift of life.' : 'Verify your identity to complete registration.'}
              </p>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-center mb-16 px-4">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${step >= 1 ? 'bg-gradient-premium text-white rotate-12 scale-110' : 'bg-gray-100 text-gray-400'}`}>
                  {step > 1 ? '✓' : '1'}
                </div>
                <span className={`mt-3 text-xs font-black uppercase tracking-widest ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>Profile</span>
              </div>
              <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-700 ${step >= 2 ? 'bg-primary' : 'bg-gray-100'}`}></div>
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${step >= 2 ? 'bg-gradient-premium text-white rotate-12 scale-110' : 'bg-gray-100 text-gray-400'}`}>
                  2
                </div>
                <span className={`mt-3 text-xs font-black uppercase tracking-widest ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>Verify</span>
              </div>
            </div>

            {/* Notifications */}
            {message.text && (
              <div className={`mb-10 p-6 rounded-2xl flex items-center justify-between gap-4 fade-in ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                }`}>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{message.type === 'success' ? '✨' : '⚠️'}</span>
                  <p className="font-semibold">{message.text}</p>
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
                  <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required className="input-field appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat">
                    <option value="">Select Group</option>
                    {BLOOD_GROUPS.map(group => <option key={group} value={group}>{group}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary tracking-wide uppercase px-1">City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required className="input-field" placeholder="Hyderabad" />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-secondary tracking-wide uppercase px-1">Specific Area</label>
                  <input type="text" name="area" value={formData.area} onChange={handleChange} required className="input-field" placeholder="e.g. Banjara Hills, Street No 4" />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`md:col-span-2 btn btn-primary py-4 text-lg mt-4 flex items-center justify-center gap-3 transition-all ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Processing...' : 'Send Verification Code'}
                </button>
              </form>
            )}

            {step === 2 && !loading && (
              <form onSubmit={handleVerifyOtp} className="space-y-10 py-4">
                <div className="text-center space-y-4">
                  <label className="text-sm font-black text-secondary tracking-widest uppercase">Verification Code</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    pattern="[0-9]{6}"
                    maxLength="6"
                    className="w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl py-8 text-center text-5xl font-black text-primary tracking-[1.5rem] focus:outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
                    placeholder="000000"
                  />
                  <p className="text-sm text-gray-500">
                    A code was sent to <span className="font-bold text-secondary">{formData.email}</span>
                  </p>
                </div>

                <div className="flex gap-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={loading}
                    className="flex-1 btn btn-secondary py-4 uppercase disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-[2] btn btn-primary py-4 uppercase shadow-xl flex items-center justify-center gap-3"
                  >
                    Finalize Registration
                  </button>
                </div>
              </form>
            )}

            {loading && (
              <div className="py-20 text-center">
                <Loading />
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
