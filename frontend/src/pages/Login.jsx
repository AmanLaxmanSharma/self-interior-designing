import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import {
  LogIn, Lock, Mail, ArrowRight, User, Phone,
  UserPlus, Eye, EyeOff, Home, Sparkles, Star
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
      navigate(res.user.role === 'ADMIN' ? '/admin' : '/dashboard');
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

/* ─── Register Form ──────────────────────────── */
const RegisterForm = ({ onSwitch }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { showToast('Passwords do not match.', 'error'); return; }
    setLoading(true);
    const res = await register(form.name, form.email, form.phone, form.password);
    setLoading(false);
    if (res.success) {
      showToast('Account created! Welcome to Karoli.', 'success');
      navigate('/dashboard');
    } else {
      showToast(res.error || 'Registration failed.', 'error');
    }
  };

  const fields = [
    { key: 'name',     label: 'Full Name',       icon: User,        type: 'text',  ph: 'Rahul Sharma' },
    { key: 'email',    label: 'Email Address',   icon: Mail,        type: 'email', ph: 'you@example.com' },
    { key: 'phone',    label: 'Phone Number',    icon: Phone,       type: 'tel',   ph: '7347733581' },
    { key: 'password', label: 'Password',        icon: Lock,        type: showPwd ? 'text' : 'password', ph: 'Min 6 characters' },
    { key: 'confirm',  label: 'Confirm Password',icon: Lock,        type: showPwd ? 'text' : 'password', ph: '••••••••' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(f => {
        const Icon = f.icon;
        return (
          <div key={f.key} className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#292A26] uppercase tracking-wider">{f.label}</label>
            <div className="relative">
              <Icon className="w-4 h-4 text-[#B9A895] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={f.type} value={form[f.key]} onChange={e => set(f.key, e.target.value)}
                required={f.key !== 'phone'} placeholder={f.ph} minLength={['password','confirm'].includes(f.key) ? 6 : undefined}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F5F0E6] border border-[#B9A895]/40 text-[#292A26] text-sm focus:outline-none focus:border-[#3F5036] focus:ring-2 focus:ring-[#3F5036]/10 transition-all placeholder:text-[#B9A895]"
              />
              {f.key === 'password' && (
                <button type="button" onClick={() => setShowPwd(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B9A895] hover:text-[#3F5036]">
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        );
      })}

      <button
        type="submit" disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-[#3F5036] hover:bg-[#3F5036]/90 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.01] disabled:opacity-60"
      >
        {loading
          ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          : <><UserPlus className="w-4 h-4" /> Create My Account</>
        }
      </button>

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
