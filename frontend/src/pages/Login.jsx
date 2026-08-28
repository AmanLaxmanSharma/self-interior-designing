import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import apiClient from '../api/apiClient';
import {
  LogIn, Lock, Mail, ArrowRight, User, Phone,
  UserPlus, Eye, EyeOff, Home, Sparkles, Star,
  CheckCircle2, KeyRound
} from 'lucide-react';

/* Feature badges */
const FEATURES = [
  '✔ Track Consultation Requests',
  '✔ Save 3D Room Designs',
  '✔ View Project Status',
  '✔ Personalized Dashboard',
];

/* ─── Login Form ─────────────────────────────── */
const LoginForm = ({ onSwitch }) => {
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
    if (res.success) {
      showToast('Welcome back! Logged in successfully.', 'success');
      navigate(res.user.role === 'ADMIN' ? '/admin' : '/');
    } else {
      showToast(res.error || 'Login failed. Check your credentials.', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#292A26] uppercase tracking-wider">Email Address</label>
        <div className="relative">
          <Mail className="w-4 h-4 text-[#B9A895] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            required placeholder="you@example.com"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F5F0E6] border border-[#B9A895]/40 text-[#292A26] text-sm focus:outline-none focus:border-[#3F5036] focus:ring-2 focus:ring-[#3F5036]/10 transition-all placeholder:text-[#B9A895]"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#292A26] uppercase tracking-wider">Password</label>
        <div className="relative">
          <Lock className="w-4 h-4 text-[#B9A895] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
            required placeholder="••••••••"
            className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#F5F0E6] border border-[#B9A895]/40 text-[#292A26] text-sm focus:outline-none focus:border-[#3F5036] focus:ring-2 focus:ring-[#3F5036]/10 transition-all placeholder:text-[#B9A895]"
          />
          <button type="button" onClick={() => setShowPwd(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B9A895] hover:text-[#3F5036]">
            {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <button
        type="submit" disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-[#3F5036] hover:bg-[#3F5036]/90 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
      >
        {loading
          ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          : <><LogIn className="w-4 h-4" /> Sign In to Dashboard</>
        }
      </button>

      <p className="text-center text-xs text-[#292A26]/60">
        Don't have an account?{' '}
        <button type="button" onClick={onSwitch} className="text-[#3F5036] font-bold hover:underline">
          Create Account
        </button>
      </p>
    </form>
  );
};

/* ─── Register Form (With Email OTP Verification) ──────────────────────────── */
const RegisterForm = ({ onSwitch }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const set = (k, v) => {
    // If user changes email after verification, reset verification status
    if (k === 'email' && isEmailVerified) {
      setIsEmailVerified(false);
      setVerifiedEmail('');
      setOtpSent(false);
      setOtp('');
    }
    setForm(f => ({ ...f, [k]: v }));
  };

  // Resend Countdown Timer
  React.useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => setResendTimer(t => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleSendOtp = async () => {
    const trimmedEmail = form.email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      showToast('Please enter a valid email address first.', 'error');
      return;
    }

    setOtpSending(true);
    try {
      const res = await apiClient.post('/auth/send-otp', { email: trimmedEmail });
      if (res.data.success) {
        setOtpSent(true);
        setResendTimer(60);
        showToast(res.data.message || 'Verification code sent to your email!', 'success');
      } else {
        showToast(res.data.error || 'Failed to send OTP code.', 'error');
      }
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed to send OTP. Please check email address.', 'error');
    } finally {
      setOtpSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.trim().length < 6) {
      showToast('Please enter the 6-digit verification code.', 'error');
      return;
    }

    setOtpVerifying(true);
    try {
      const res = await apiClient.post('/auth/verify-otp', {
        email: form.email.trim().toLowerCase(),
        otp: otp.trim()
      });
      if (res.data.success) {
        setIsEmailVerified(true);
        setVerifiedEmail(form.email.trim().toLowerCase());
        showToast('Email verified successfully! You can now complete your registration.', 'success');
      } else {
        showToast(res.data.error || 'Invalid verification code.', 'error');
      }
    } catch (err) {
      showToast(err.response?.data?.error || 'Invalid or expired OTP code.', 'error');
    } finally {
      setOtpVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailVerified || verifiedEmail !== form.email.trim().toLowerCase()) {
      showToast('Please verify your email address with the OTP code first.', 'error');
      return;
    }

    if (form.password !== form.confirm) {
      showToast('Passwords do not match.', 'error');
      return;
    }

    if (form.password.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }

    setLoading(true);
    const res = await register(form.name, form.email.trim().toLowerCase(), form.phone, form.password);
    setLoading(false);
    if (res.success) {
      showToast('Account created successfully! Welcome to Karoli.', 'success');
      navigate('/');
    } else {
      showToast(res.error || 'Registration failed.', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#292A26] uppercase tracking-wider">Full Name</label>
        <div className="relative">
          <User className="w-4 h-4 text-[#B9A895] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={form.name}
            onChange={e => set('name', e.target.value)}
            required
            placeholder="Rahul Sharma"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F5F0E6] border border-[#B9A895]/40 text-[#292A26] text-sm focus:outline-none focus:border-[#3F5036] focus:ring-2 focus:ring-[#3F5036]/10 transition-all placeholder:text-[#B9A895]"
          />
        </div>
      </div>

      {/* Email + OTP Verification Action */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-[#292A26] uppercase tracking-wider">Email Address</label>
          {isEmailVerified ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified
            </span>
          ) : (
            <span className="text-[11px] text-[#3F5036]/70">Verification required</span>
          )}
        </div>
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <Mail className="w-4 h-4 text-[#B9A895] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              required
              disabled={isEmailVerified}
              placeholder="you@example.com"
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#F5F0E6] border border-[#B9A895]/40 text-[#292A26] text-sm focus:outline-none focus:border-[#3F5036] focus:ring-2 focus:ring-[#3F5036]/10 transition-all placeholder:text-[#B9A895] ${
                isEmailVerified ? 'opacity-80 bg-emerald-50/60 border-emerald-300' : ''
              }`}
            />
          </div>

          {!isEmailVerified && (
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={otpSending || resendTimer > 0 || !form.email}
              className="px-3.5 py-2.5 rounded-xl bg-[#3F5036] hover:bg-[#3F5036]/90 disabled:bg-[#B9A895]/40 text-white text-xs font-bold whitespace-nowrap transition-all shadow-sm flex items-center gap-1.5"
            >
              {otpSending ? (
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : resendTimer > 0 ? (
                `Resend (${resendTimer}s)`
              ) : otpSent ? (
                'Resend OTP'
              ) : (
                'Send OTP'
              )}
            </button>
          )}
        </div>
      </div>

      {/* OTP Code Input Box (Visible once OTP is sent and not yet verified) */}
      {otpSent && !isEmailVerified && (
        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2.5 animate-fade-in">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-amber-900 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5" /> Enter 6-Digit Email OTP
            </span>
            <span className="text-[11px] text-amber-700">Valid for 10 min</span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="123456"
              className="flex-1 px-4 py-2.5 rounded-lg bg-white border border-amber-300 text-center font-mono font-bold text-lg tracking-widest text-[#292A26] focus:outline-none focus:border-[#3F5036]"
            />
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={otpVerifying || otp.length < 6}
              className="px-4 py-2.5 rounded-lg bg-[#3F5036] hover:bg-[#3F5036]/90 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              {otpVerifying ? (
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Verify OTP <ArrowRight className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>
          <p className="text-[11px] text-amber-800/80">
            Check your inbox (or spam) for the verification code sent from Karoli Interior Hub.
          </p>
        </div>
      )}

      {/* Phone Number */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#292A26] uppercase tracking-wider">Phone Number</label>
        <div className="relative">
          <Phone className="w-4 h-4 text-[#B9A895] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="tel"
            value={form.phone}
            onChange={e => set('phone', e.target.value)}
            placeholder="7347733581"
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
            value={form.password}
            onChange={e => set('password', e.target.value)}
            required
            minLength={6}
            placeholder="Min 6 characters"
            className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#F5F0E6] border border-[#B9A895]/40 text-[#292A26] text-sm focus:outline-none focus:border-[#3F5036] focus:ring-2 focus:ring-[#3F5036]/10 transition-all placeholder:text-[#B9A895]"
          />
          <button
            type="button"
            onClick={() => setShowPwd(s => !s)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B9A895] hover:text-[#3F5036]"
          >
            {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-[#292A26] uppercase tracking-wider">Confirm Password</label>
        <div className="relative">
          <Lock className="w-4 h-4 text-[#B9A895] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type={showPwd ? 'text' : 'password'}
            value={form.confirm}
            onChange={e => set('confirm', e.target.value)}
            required
            minLength={6}
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F5F0E6] border border-[#B9A895]/40 text-[#292A26] text-sm focus:outline-none focus:border-[#3F5036] focus:ring-2 focus:ring-[#3F5036]/10 transition-all placeholder:text-[#B9A895]"
          />
        </div>
      </div>

      {/* Create Account Submit Button */}
      <button
        type="submit"
        disabled={loading || !isEmailVerified}
        className="w-full flex items-center justify-center gap-2 bg-[#3F5036] hover:bg-[#3F5036]/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <><UserPlus className="w-4 h-4" /> Create My Account</>
        )}
      </button>

      {!isEmailVerified && (
        <p className="text-center text-[11px] text-[#292A26]/50">
          * Email OTP verification is required to enable account creation.
        </p>
      )}

      <p className="text-center text-xs text-[#292A26]/60">
        Already have an account?{' '}
        <button type="button" onClick={onSwitch} className="text-[#3F5036] font-bold hover:underline">
          Sign In
        </button>
      </p>
    </form>
  );
};

/* ─── Main Auth Page ─────────────────────────── */
const Login = () => {
  const [mode, setMode] = useState('login'); // 'login' | 'register'

  return (
    <div className="min-h-screen flex bg-[#F5F0E6]">
      {/* Left – decorative */}
      <div className="hidden lg:flex lg:w-[42%] flex-col justify-between p-12 relative overflow-hidden bg-[#292A26]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 scale-105"
          style={{ backgroundImage: "url('/portfolio/p8_rafter_ceiling.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#292A26]/70 to-[#3F5036]/80" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 group mb-10">
            <div className="w-11 h-11 rounded-full bg-white text-[#3F5036] font-serif font-bold text-xl flex items-center justify-center shadow-lg">K</div>
            <div>
              <p className="font-serif font-bold text-white text-lg leading-tight">Karoli Interior Hub</p>
              <p className="text-[10px] text-white/50 uppercase tracking-widest">Customer Portal</p>
            </div>
          </Link>

          <h2 className="font-serif text-4xl font-bold text-white leading-snug">
            Your dream<br />interior awaits.
          </h2>
          <p className="text-white/60 text-sm mt-4 max-w-xs">
            Sign in to track your design journey, manage consultation requests, and preview your custom 3D room.
          </p>

          <div className="mt-8 space-y-2.5">
            {FEATURES.map(f => (
              <p key={f} className="text-white/80 text-sm font-medium">{f}</p>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5">
          <div className="flex gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
          </div>
          <p className="text-white/90 text-xs leading-relaxed italic">
            "Karoli Interior Hub transformed our 2BHK into a luxury home. The false ceiling with LED coves is breathtaking!"
          </p>
          <p className="text-white/50 text-[10px] mt-2 font-medium">— Priya Sharma, Indore</p>
        </div>
      </div>

      {/* Right – form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 overflow-y-auto">
        <div className="w-full max-w-md space-y-6 py-8">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 justify-center mb-2">
            <div className="w-11 h-11 rounded-full bg-[#3F5036] text-white font-serif font-bold text-xl flex items-center justify-center shadow">K</div>
            <p className="font-serif font-bold text-[#292A26] text-lg">Karoli Interior Hub</p>
          </div>

          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold text-[#292A26]">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-xs text-[#292A26]/55 mt-1">
              {mode === 'login' ? 'Sign in to your customer portal' : 'Join Karoli Interior Hub today'}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex rounded-xl overflow-hidden border border-[#B9A895]/40 bg-[#E8DDCC]/50 p-1 gap-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 rounded-lg transition-all ${
                mode === 'login' ? 'bg-[#3F5036] text-white shadow-md' : 'text-[#292A26]/60 hover:text-[#3F5036]'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" /> Sign In
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 rounded-lg transition-all ${
                mode === 'register' ? 'bg-[#3F5036] text-white shadow-md' : 'text-[#292A26]/60 hover:text-[#3F5036]'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" /> Register
            </button>
          </div>

          {/* Form card */}
          <div className="bg-white border border-[#E8DDCC] rounded-2xl p-6 sm:p-7 shadow-lg">
            {mode === 'login'
              ? <LoginForm onSwitch={() => setMode('register')} />
              : <RegisterForm onSwitch={() => setMode('login')} />
            }
          </div>

          {/* Footer */}
          <div className="text-center space-y-2.5">
            <Link to="/admin/login" className="block text-xs text-[#292A26]/40 hover:text-[#3F5036] transition-colors">
              Admin Portal Login →
            </Link>
            <Link to="/" className="flex items-center justify-center gap-1.5 text-xs text-[#292A26]/40 hover:text-[#3F5036] transition-colors">
              <Home className="w-3.5 h-3.5" /> Back to Karoli Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
