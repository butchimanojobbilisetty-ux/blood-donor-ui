import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/search', label: 'Find Donors' },
    { path: '/register', label: 'Become Donor' },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-premium rounded-xl flex items-center justify-center text-white text-xl shadow-lg transition-transform group-hover:rotate-12">
              🩸
            </div>
            <span className="text-xl font-black text-secondary uppercase tracking-tighter">
              Life<span className="text-primary">Drop</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${location.pathname === link.path
                  ? 'text-primary'
                  : 'text-gray-500 hover:text-secondary'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {isAdmin ? (
              <Link
                to="/admin/dashboard"
                className="btn btn-primary px-6 py-2.5 text-xs uppercase tracking-widest"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/admin-login"
                className="btn btn-secondary px-6 py-2.5 text-xs uppercase tracking-widest border-2"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-secondary text-3xl focus:outline-none transition-transform active:scale-95"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out transform ${isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
          }`}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={`text-lg font-black uppercase tracking-widest ${location.pathname === link.path
                ? 'text-primary'
                : 'text-secondary hover:text-primary'
                }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-6 border-t border-gray-100">
            {isAdmin ? (
              <Link
                to="/admin/dashboard"
                onClick={closeMenu}
                className="btn btn-primary w-full py-4 text-center text-sm font-black uppercase tracking-widest"
              >
                Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/admin-login"
                onClick={closeMenu}
                className="btn btn-secondary w-full py-4 text-center text-sm font-black uppercase tracking-widest border-2"
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
