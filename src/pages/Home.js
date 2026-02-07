import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-20 pb-12 lg:pt-32 lg:pb-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider uppercase bg-primary/10 text-primary rounded-full fade-in">
              Every Drop Matters
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-secondary mb-8 tracking-tight fade-in" style={{ animationDelay: '0.1s' }}>
              Save Lives, <span className="text-primary">Donate Blood</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed fade-in" style={{ animationDelay: '0.2s' }}>
              Connect with blood donors in your area and help those in need. Join our community of heroes today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/search" className="btn btn-primary text-lg px-10">
                Find Donors
              </Link>
              <Link to="/register" className="btn btn-secondary text-lg px-10">
                Become a Donor
              </Link>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl"></div>
      </section>

      {/* Process Section */}
      <section className="pt-16 pb-24 bg-surface-variant relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">The Journey</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-secondary mt-4 mb-6">How it Works</h2>
            <div className="w-24 h-1.5 bg-gradient-premium mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-20 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute -top-6 -left-6 text-7xl font-black text-primary/5 select-none transition-transform group-hover:scale-110">01</div>
              <div className="glass-card bg-white p-10 relative z-10 border-none shadow-premium hover:translate-y-[-10px] transition-all duration-500">
                <div className="w-16 h-16 bg-gradient-premium rounded-2xl flex items-center justify-center text-3xl text-white mb-8 shadow-lg rotate-3 group-hover:rotate-12 transition-transform">📝</div>
                <h3 className="text-2xl font-black text-secondary mb-4 uppercase tracking-tighter">Registration</h3>
                <p className="text-gray-500 leading-relaxed font-medium">
                  Fill out our simple registration form with your blood group and location details.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-10 translate-y-[-50%] text-primary/20 text-4xl animate-pulse">→</div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute -top-6 -left-6 text-7xl font-black text-primary/5 select-none transition-transform group-hover:scale-110">02</div>
              <div className="glass-card bg-white p-10 relative z-10 border-none shadow-premium hover:translate-y-[-10px] transition-all duration-500 ring-2 ring-primary/5">
                <div className="w-16 h-16 bg-gradient-premium rounded-2xl flex items-center justify-center text-3xl text-white mb-8 shadow-lg -rotate-3 group-hover:rotate-0 transition-transform">🛡️</div>
                <h3 className="text-2xl font-black text-secondary mb-4 uppercase tracking-tighter">Verification</h3>
                <p className="text-gray-500 leading-relaxed font-medium">
                  Verify your account with a secure 6-digit OTP sent instantly to your email.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-10 translate-y-[-50%] text-primary/20 text-4xl animate-pulse">→</div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute -top-6 -left-6 text-7xl font-black text-primary/5 select-none transition-transform group-hover:scale-110">03</div>
              <div className="glass-card bg-white p-10 relative z-10 border-none shadow-premium hover:translate-y-[-10px] transition-all duration-500">
                <div className="w-16 h-16 bg-gradient-premium rounded-2xl flex items-center justify-center text-3xl text-white mb-8 shadow-lg rotate-6 group-hover:-rotate-6 transition-transform">🤝</div>
                <h3 className="text-2xl font-black text-secondary mb-4 uppercase tracking-tighter">Impact</h3>
                <p className="text-gray-500 leading-relaxed font-medium">
                  Be visible to those in need and start saving lives in your local community.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-50">
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
      </section>


    </div>
  );
};

export default Home;
