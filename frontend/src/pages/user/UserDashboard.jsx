import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
  User, Phone, Mail, Clock, MessageSquare, LogOut,
  Sparkles, Home, ChevronRight, Calendar, Star,
  Image as ImageIcon, Box, Settings, ArrowUpRight, Bell
} from 'lucide-react';
import apiClient from '../../api/apiClient';

const portfolioImages = [
  { src: '/portfolio/p1_living_ceiling.jpg', title: 'PVC False Ceiling', tag: 'Living Room' },
  { src: '/portfolio/p2_bedroom_tv.jpg', title: 'Bedroom TV Unit', tag: 'Bedroom' },
  { src: '/portfolio/p3_dining_ceiling.jpg', title: 'Ornate Ceiling', tag: 'Dining' },
  { src: '/portfolio/p4_home_office.jpg', title: 'Home Office', tag: 'Office' },
  { src: '/portfolio/p5_kitchen.jpg', title: 'Modular Kitchen', tag: 'Kitchen' },
  { src: '/portfolio/p6_wall_moulding.jpg', title: 'Wall Moulding', tag: 'Wall Panel' },
  { src: '/portfolio/p7_commercial.jpg', title: 'Commercial Interior', tag: 'Commercial' },
  { src: '/portfolio/p8_rafter_ceiling.jpg', title: 'Wooden Rafter Ceiling', tag: 'Villa' },
  { src: '/portfolio/p9_bathroom.jpg', title: 'PVC Bathroom', tag: 'Bathroom' },
  { src: '/portfolio/p10_kids_room.jpg', title: "Kids' Room", tag: 'Kids' },
];

const STATUS_COLORS = {
  New: 'bg-amber-100 text-amber-800',
  Contacted: 'bg-blue-100 text-blue-800',
  'Follow-up': 'bg-purple-100 text-purple-800',
  Qualified: 'bg-cyan-100 text-cyan-800',
  Converted: 'bg-emerald-100 text-emerald-800',
  Closed: 'bg-gray-100 text-gray-600',
};

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await apiClient.get('/leads');
        if (res.data.success) {
          setInquiries(res.data.data.filter(l => l.email?.toLowerCase() === user?.email?.toLowerCase()));
        }
      } catch { /* silently skip */ }
      finally { setLoading(false); }
    };
    if (user?.email) fetchInquiries();
  }, [user]);

  const handleLogout = () => { logout(); navigate('/login'); };

  const navItems = [
    { key: 'overview', label: 'Overview', icon: Home },
    { key: 'inquiries', label: 'My Requests', icon: MessageSquare, badge: inquiries.length },
    { key: 'portfolio', label: 'Our Work', icon: ImageIcon },
    { key: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      {/* Top Nav */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-[#E8DDCC] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#3F5036] text-white font-serif font-bold text-lg flex items-center justify-center shadow-sm">K</div>
            <div className="hidden sm:block">
              <p className="font-serif text-sm font-bold text-[#292A26] leading-tight">Karoli Interior Hub</p>
              <p className="text-[10px] text-[#3F5036] uppercase tracking-widest font-semibold">Customer Portal</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-[#F5F0E6] rounded-xl p-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeSection === item.key
                      ? 'bg-[#3F5036] text-white shadow-md'
                      : 'text-[#292A26]/60 hover:text-[#3F5036] hover:bg-white/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" /> {item.label}
                  {item.badge > 0 && (
                    <span className={`ml-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${activeSection === item.key ? 'bg-white/30 text-white' : 'bg-[#3F5036] text-white'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-[#292A26]">{user?.name}</p>
              <p className="text-[10px] text-[#292A26]/50">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#B9A895]/40 bg-white hover:bg-red-50 text-red-600 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden flex border-t border-[#E8DDCC] overflow-x-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`flex-1 min-w-max flex flex-col items-center gap-0.5 px-4 py-2.5 text-[10px] font-bold transition-all border-b-2 ${
                  activeSection === item.key
                    ? 'border-[#3F5036] text-[#3F5036]'
                    : 'border-transparent text-[#292A26]/50'
                }`}
              >
                <Icon className="w-4 h-4" /> {item.label}
              </button>
            );
          })}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Overview ────────────────────────────── */}
        {activeSection === 'overview' && (
          <>
            {/* Welcome Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3F5036] to-[#5a7050] p-8 sm:p-10 text-white shadow-xl">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-15"
                style={{ backgroundImage: "url('/portfolio/p1_living_ceiling.jpg')" }}
              />
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Customer Dashboard</p>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold">Welcome, {user?.name?.split(' ')[0]}! 👋</h1>
                  <p className="text-white/70 text-sm mt-2">Your interior design journey starts here.</p>
                </div>
                <div className="flex gap-3">
                  <Link
                    to="/contact"
                    className="bg-white text-[#3F5036] font-bold text-xs px-5 py-3 rounded-full shadow hover:shadow-md transition-all hover:scale-105"
                  >
                    Book Consultation
                  </Link>
                  <Link
                    to="/3d-studio"
                    className="bg-white/20 text-white border border-white/30 font-semibold text-xs px-4 py-3 rounded-full hover:bg-white/30 transition-all"
                  >
                    3D Studio
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Requests Sent', value: inquiries.length, icon: MessageSquare, color: 'text-[#3F5036]' },
                { label: 'Converted', value: inquiries.filter(i => i.status === 'Converted').length, icon: Star, color: 'text-amber-500' },
                { label: 'In Progress', value: inquiries.filter(i => ['Contacted', 'Follow-up', 'Qualified'].includes(i.status)).length, icon: Clock, color: 'text-blue-500' },
                { label: 'New', value: inquiries.filter(i => i.status === 'New').length, icon: Bell, color: 'text-purple-500' },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="bg-white border border-[#E8DDCC] rounded-2xl p-5 shadow-sm">
                    <Icon className={`w-5 h-5 ${s.color} mb-2`} />
                    <p className="font-serif text-3xl font-bold text-[#292A26]">{s.value}</p>
                    <p className="text-[11px] text-[#292A26]/50 font-medium mt-0.5">{s.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Recent Request Preview */}
            {inquiries.length > 0 && (
              <div className="bg-white border border-[#E8DDCC] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-xl font-bold text-[#292A26]">Latest Request</h3>
                  <button onClick={() => setActiveSection('inquiries')} className="text-xs text-[#3F5036] font-bold hover:underline flex items-center gap-1">
                    View All <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#F5F0E6] rounded-xl">
                  <div>
                    <p className="font-bold text-sm text-[#292A26]">{inquiries[0].projectType}</p>
                    <p className="text-xs text-[#292A26]/60 mt-0.5">{inquiries[0].message?.slice(0, 80) || 'No message added.'}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full shrink-0 ${STATUS_COLORS[inquiries[0].status]}`}>
                    {inquiries[0].status}
                  </span>
                </div>
              </div>
            )}

            {/* Quick Links */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Browse Portfolio', icon: ImageIcon, path: '/projects', color: 'bg-[#3F5036] text-white' },
                { label: '3D Design Studio', icon: Box, path: '/3d-studio', color: 'bg-[#292A26] text-white' },
                { label: 'Our Services', icon: Sparkles, path: '/services', color: 'bg-[#9BAA91] text-white' },
                { label: 'Contact Us', icon: Phone, path: '/contact', color: 'bg-[#E8DDCC] text-[#292A26]' },
              ].map((q, i) => {
                const Icon = q.icon;
                return (
                  <Link
                    key={i} to={q.path}
                    className={`flex flex-col items-center justify-center gap-2.5 rounded-2xl p-4 sm:p-5 ${q.color} hover:opacity-90 active:scale-95 transition-all shadow-sm`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-[11px] font-bold text-center leading-tight">{q.label}</span>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* ── My Requests ─────────────────────────── */}
        {activeSection === 'inquiries' && (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-bold text-[#3F5036] uppercase tracking-widest">CRM</span>
              <h2 className="font-serif text-2xl font-bold text-[#292A26]">My Consultation Requests</h2>
            </div>

            {loading ? (
              <div className="py-16 text-center text-sm text-[#292A26]/50 animate-pulse">Loading your requests…</div>
            ) : inquiries.length === 0 ? (
              <div className="py-16 text-center bg-white border border-[#E8DDCC] rounded-2xl shadow-sm">
                <MessageSquare className="w-12 h-12 text-[#B9A895] mx-auto mb-3" />
                <p className="font-serif text-lg font-bold text-[#292A26]">No requests yet</p>
                <p className="text-sm text-[#292A26]/50 mt-1">Submit a consultation request and we'll be in touch.</p>
                <Link to="/contact" className="mt-4 inline-flex items-center gap-2 bg-[#3F5036] text-white text-xs font-bold px-5 py-3 rounded-full shadow hover:opacity-90 transition-all">
                  Book a Consultation <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((req, i) => (
                  <div key={req._id || i} className="bg-white border border-[#E8DDCC] rounded-2xl p-5 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-[#292A26]">{req.projectType}</span>
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_COLORS[req.status]}`}>{req.status}</span>
                        </div>
                        <p className="text-xs text-[#292A26]/60 mt-1.5">{req.message || 'No additional notes.'}</p>
                      </div>
                      <div className="text-[11px] text-[#292A26]/40 shrink-0 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(req.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Our Work (Portfolio) ──────────────────── */}
        {activeSection === 'portfolio' && (
          <div className="space-y-5">
            <div>
              <span className="text-[11px] font-bold text-[#3F5036] uppercase tracking-widest">Portfolio</span>
              <h2 className="font-serif text-2xl font-bold text-[#292A26]">Our Work</h2>
              <p className="text-sm text-[#292A26]/55 mt-1">10 handpicked projects from our completed interiors</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {portfolioImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxImg(img)}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md hover:shadow-xl transition-all hover:scale-[1.02] focus:outline-none"
                >
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <span className="text-white text-[11px] font-bold leading-tight">{img.title}</span>
                    <span className="text-white/60 text-[10px]">{img.tag}</span>
                  </div>
                  <span className="absolute top-2 left-2 bg-[#3F5036]/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.tag}
                  </span>
                </button>
              ))}
            </div>

            <div className="text-center pt-2">
              <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-bold text-[#3F5036] border border-[#3F5036]/30 hover:bg-[#3F5036] hover:text-white px-5 py-2.5 rounded-full transition-all">
                View Full Portfolio <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* ── Profile ──────────────────────────────── */}
        {activeSection === 'profile' && (
          <div className="space-y-5 max-w-xl">
            <div>
              <span className="text-[11px] font-bold text-[#3F5036] uppercase tracking-widest">Account</span>
              <h2 className="font-serif text-2xl font-bold text-[#292A26]">My Profile</h2>
            </div>

            <div className="bg-white border border-[#E8DDCC] rounded-2xl p-6 shadow-sm space-y-5">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3F5036] to-[#9BAA91] text-white font-serif font-bold text-2xl flex items-center justify-center shadow-lg">
                  {user?.name?.[0] || 'U'}
                </div>
                <div>
                  <p className="font-serif text-xl font-bold text-[#292A26]">{user?.name}</p>
                  <span className="text-[10px] bg-[#3F5036]/10 text-[#3F5036] font-bold px-3 py-1 rounded-full">
                    {user?.role || 'Customer'}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="divide-y divide-[#E8DDCC]">
                {[
                  { icon: Mail, label: 'Email', value: user?.email },
                  { icon: Phone, label: 'Phone', value: user?.phone || 'Not added' },
                  { icon: User, label: 'Account Role', value: user?.role || 'Customer' },
                  { icon: Calendar, label: 'Member Since', value: 'Karoli Interior Hub' },
                ].map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 py-3">
                      <div className="w-8 h-8 rounded-lg bg-[#F5F0E6] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#3F5036]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#292A26]/50 uppercase tracking-wider">{row.label}</p>
                        <p className="text-sm font-semibold text-[#292A26]">{row.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-200 bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Sign Out from Portal
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img src={lightboxImg.src} alt={lightboxImg.title} className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl" />
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="inline-block bg-black/60 backdrop-blur text-white text-xs font-semibold px-4 py-2 rounded-full">
                {lightboxImg.title} · {lightboxImg.tag}
              </span>
            </div>
            <button onClick={() => setLightboxImg(null)} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center text-xl font-bold transition-colors">
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
