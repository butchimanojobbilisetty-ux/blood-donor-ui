import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-premium rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                🩸
              </div>
              <span className="text-xl font-black text-white uppercase tracking-tighter">
                Life<span className="text-primary-light">Drop</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Connecting heroes with those in need. Join our global network of blood donors and help save lives every single day.
            </p>
            <div className="space-y-4 text-sm font-bold tracking-tight">
              <a href="mailto:manoj262671@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors">
                <span className="text-lg opacity-60">📧</span> manoj262671@gmail.com
              </a>
              <a href="tel:7799179197" className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors">
                <span className="text-lg opacity-60">📱</span> 7799179197
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-primary-light">Platform</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><Link to="/search" className="hover:text-white transition-colors">Find Donors</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Become Donor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-primary-light">Support</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-primary-light">Admin Access</h4>
            <Link to="/admin-login" className="inline-block px-6 py-3 rounded-xl border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all">
              Initialize Console
            </Link>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs font-black uppercase tracking-widest">
            © 2026 LifeDrop. Engineered for Humanity.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
