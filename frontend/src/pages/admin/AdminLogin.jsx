import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ToastContext } from '../../context/ToastContext';
import {
  ShieldCheck, Lock, Mail, ArrowRight,
  Eye, EyeOff, Home
} from 'lucide-react';

/* ─────────────────────────────────────────────
   AdminLogin  –  email+password form
───────────────────────────────────────────── */
const AdminLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success && res.user.role === 'ADMIN') {
      showToast('Admin authenticated! Welcome back.');
      navigate('/admin');
    } else if (res.success) {
      showToast('This account is not authorized for Admin access.', 'error');
    } else {
      showToast(res.error || 'Login failed. Check your credentials.', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#292A26] uppercase tracking-wider">Admin Email</label>
        <div className="relative">
          <Mail className="w-4 h-4 text-[#B9A895] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="admin@karoliinterior.com"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F5F0E6] border border-[#B9A895]/40 text-[#292A26] text-sm focus:outline-none focus:border-[#3F5036] focus:ring-2 focus:ring-[#3F5036]/10 transition-all placeholder:text-[#B9A895]"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#292A26] uppercase tracking-wider">Password</label>
        <div className="relative">
          <Lock className="w-4 h-4 text-[#B9A895] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type={showPwd ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#F5F0E6] border border-[#B9A895]/40 text-[#292A26] text-sm focus:outline-none focus:border-[#3F5036] focus:ring-2 focus:ring-[#3F5036]/10 transition-all placeholder:text-[#B9A895]"
          />
          <button
            type="button"
            onClick={() => setShowPwd(s => !s)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B9A895] hover:text-[#3F5036] transition-colors"
          >
            {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-[#3F5036] hover:bg-[#3F5036]/90 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Verifying…
          </span>
        ) : (
          <>Access Admin Dashboard <ArrowRight className="w-4 h-4" /></>
        )}
      </button>
    </form>
  );
};


/* ─────────────────────────────────────────────
   Main Admin Auth Page (shell)
───────────────────────────────────────────── */
const AdminLogin = () => {

  return (
    <div className="min-h-screen flex bg-[#3F5036]">
      {/* Left panel – decorative */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 bg-gradient-to-br from-[#3F5036] via-[#4d6143] to-[#2e3b28] relative overflow-hidden">
        {/* Background imagery */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/portfolio/p1_living_ceiling.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3F5036]/60 to-[#292A26]/80" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-white text-[#3F5036] font-serif font-bold text-2xl flex items-center justify-center shadow-lg">K</div>
            <div>
              <p className="font-serif text-xl font-bold text-white leading-tight">Karoli Interior Hub</p>
              <p className="text-[11px] text-white/60 uppercase tracking-widest">Admin Control Portal</p>
            </div>
          </div>
          <h2 className="font-serif text-4xl font-bold text-white leading-tight">
            Where beautiful<br />spaces are born.
          </h2>
          <p className="text-white/60 text-sm mt-4 max-w-sm">
            Manage your portfolio, track client leads, control services and site settings — all in one secure dashboard.
          </p>
        </div>

        {/* Stat pills */}
        <div className="relative z-10 flex flex-wrap gap-3">
          {['PVC Ceilings', 'False Ceilings', 'Wall Moulding', 'TV Units', 'LED Lighting', 'Renovation'].map(tag => (
            <span key={tag} className="bg-white/15 text-white/80 text-[11px] font-medium px-3 py-1.5 rounded-full border border-white/20">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right panel – auth form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 bg-[#F5F0E6]">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-[#3F5036] text-white font-serif font-bold text-2xl flex items-center justify-center mx-auto shadow-lg lg:hidden">K</div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3F5036] uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" /> Secure Admin Access
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#292A26]">
              Admin Sign In
            </h1>
          </div>

          {/* Form */}
          <div className="bg-white border border-[#E8DDCC] rounded-2xl p-6 shadow-lg">
            <AdminLoginForm />
          </div>

          {/* Footer links */}
          <div className="text-center text-xs text-[#292A26]/50 space-y-2">
            <Link to="/login" className="block hover:text-[#3F5036] transition-colors">
              Not an admin? <span className="font-bold text-[#3F5036]">User Login →</span>
            </Link>
            <Link to="/" className="flex items-center justify-center gap-1.5 hover:text-[#3F5036] transition-colors">
              <Home className="w-3.5 h-3.5" /> Back to Karoli Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
