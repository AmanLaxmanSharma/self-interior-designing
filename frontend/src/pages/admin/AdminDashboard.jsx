import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import {
  Users, Briefcase, Layers, Box, MessageSquare,
  ArrowUpRight, TrendingUp, Eye, Phone, Calendar,
  CheckCircle, Clock, Star, Image as ImageIcon,
  Sparkles, Activity, ChevronRight, Plus
} from 'lucide-react';
import apiClient from '../../api/apiClient';
import { Link } from 'react-router-dom';

const portfolioImages = [
  { src: '/portfolio/p1_living_ceiling.jpg', title: 'PVC False Ceiling – Living Room', tag: 'False Ceiling' },
  { src: '/portfolio/p2_bedroom_tv.jpg', title: 'Bedroom with TV Unit & Wall Panel', tag: 'Bedroom' },
  { src: '/portfolio/p3_dining_ceiling.jpg', title: 'Ornate Dining Ceiling Design', tag: 'Dining' },
  { src: '/portfolio/p4_home_office.jpg', title: 'Custom Home Office Setup', tag: 'Office' },
  { src: '/portfolio/p5_kitchen.jpg', title: 'White PVC Modular Kitchen', tag: 'Kitchen' },
  { src: '/portfolio/p6_wall_moulding.jpg', title: 'Decorative Wall Moulding', tag: 'Wall Panel' },
  { src: '/portfolio/p7_commercial.jpg', title: 'Commercial Office Interior', tag: 'Commercial' },
  { src: '/portfolio/p8_rafter_ceiling.jpg', title: 'Wooden Rafter Ceiling – Villa', tag: 'Rafter Ceiling' },
  { src: '/portfolio/p9_bathroom.jpg', title: 'PVC Bath Panel & False Ceiling', tag: 'Bathroom' },
  { src: '/portfolio/p10_kids_room.jpg', title: "Kids' Room – Themed Design", tag: 'Kids Room' },
];

const STATUS_COLORS = {
  New: 'bg-amber-100 text-amber-800',
  Contacted: 'bg-blue-100 text-blue-800',
  'Follow-up': 'bg-purple-100 text-purple-800',
  Qualified: 'bg-cyan-100 text-cyan-800',
  Converted: 'bg-emerald-100 text-emerald-800',
  Closed: 'bg-gray-100 text-gray-700',
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalLeads: 0, newLeads: 0, totalProjects: 0,
    totalServices: 0, totalModels: 0, recentLeads: [], convertedLeads: 0
  });
  const [loading, setLoading] = useState(true);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadRes, projRes, srvRes, mdlRes] = await Promise.all([
          apiClient.get('/leads'),
          apiClient.get('/projects'),
          apiClient.get('/services'),
          apiClient.get('/models'),
        ]);
        const leads = leadRes.data.success ? leadRes.data.data : [];
        setStats({
          totalLeads: leads.length,
          newLeads: leads.filter(l => l.status === 'New').length,
          convertedLeads: leads.filter(l => l.status === 'Converted').length,
          totalProjects: projRes.data.success ? projRes.data.count : 0,
          totalServices: srvRes.data.success ? srvRes.data.count : 0,
          totalModels: mdlRes.data.success ? mdlRes.data.count : 0,
          recentLeads: leads.slice(0, 6),
        });
      } catch {
        console.warn('Dashboard metrics fetch error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    {
      title: 'Total Leads',
      value: stats.totalLeads,
      sub: `${stats.newLeads} New • ${stats.convertedLeads} Converted`,
      icon: Users,
      gradient: 'from-[#3F5036] to-[#5a7050]',
      link: '/admin/leads',
    },
    {
      title: 'Portfolio Projects',
      value: stats.totalProjects,
      sub: 'Published case studies',
      icon: Briefcase,
      gradient: 'from-[#9BAA91] to-[#b5c4b1]',
      link: '/admin/projects',
    },
    {
      title: 'Active Services',
      value: stats.totalServices,
      sub: 'All specializations',
      icon: Layers,
      gradient: 'from-[#B9A895] to-[#d4c5b4]',
      link: '/admin/services',
    },
    {
      title: '3D Studio Models',
      value: stats.totalModels,
      sub: 'Procedural & GLTF scenes',
      icon: Box,
      gradient: 'from-[#292A26] to-[#4a4b46]',
      link: '/admin/models',
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F0E6]">
      {/* Sidebar */}
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-[#F5F0E6]/90 backdrop-blur border-b border-[#B9A895]/30 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold text-[#3F5036] uppercase tracking-widest">Executive Dashboard</p>
            <h1 className="font-serif text-2xl font-bold text-[#292A26] leading-tight">Karoli Interior Hub</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/leads"
              className="hidden sm:flex items-center gap-2 bg-[#3F5036] hover:bg-[#3F5036]/90 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Manage Leads</span>
              {stats.newLeads > 0 && (
                <span className="bg-amber-400 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {stats.newLeads}
                </span>
              )}
            </Link>
            <Link to="/" target="_blank" className="flex items-center gap-1.5 text-xs text-[#292A26]/70 hover:text-[#3F5036] font-medium border border-[#B9A895]/50 px-3 py-2 rounded-full transition-colors">
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Live Site</span>
            </Link>
          </div>
        </header>

        <div className="p-6 sm:p-8 space-y-10">

          {/* Stats Grid */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {statCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={i}
                    to={card.link}
                    className="group relative overflow-hidden rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 bg-white border border-[#E8DDCC]"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-[0.06] group-hover:opacity-10 transition-opacity`} />
                    <div className="relative z-10 flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <p className="text-xs font-semibold text-[#292A26]/60 uppercase tracking-wider">{card.title}</p>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br ${card.gradient} shadow-sm`}>
                          <Icon className="w-4.5 h-4.5 text-white" />
                        </div>
                      </div>
                      <p className="font-serif text-4xl font-bold text-[#292A26]">
                        {loading ? <span className="animate-pulse text-[#B9A895]">—</span> : card.value}
                      </p>
                      <p className="text-[11px] text-[#3F5036] font-medium">{card.sub}</p>
                    </div>
                    <ArrowUpRight className="absolute bottom-4 right-4 w-4 h-4 text-[#B9A895] group-hover:text-[#3F5036] transition-colors" />
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Our Work – Portfolio Gallery */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-[11px] font-bold text-[#3F5036] uppercase tracking-widest block">Portfolio</span>
                <h2 className="font-serif text-2xl font-bold text-[#292A26]">Our Work</h2>
              </div>
              <Link
                to="/admin/gallery"
                className="flex items-center gap-1.5 text-xs font-bold text-[#3F5036] border border-[#3F5036]/30 hover:bg-[#3F5036] hover:text-white px-4 py-2 rounded-full transition-all"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Manage Gallery
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {portfolioImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxImg(img)}
                  className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-md hover:shadow-xl transition-all hover:scale-[1.02] focus:outline-none"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <span className="text-white text-[10px] font-bold leading-tight line-clamp-2">{img.title}</span>
                    <span className="text-white/70 text-[9px] mt-0.5">{img.tag}</span>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white/90 text-[#3F5036] text-[9px] font-bold px-2 py-0.5 rounded-full">{img.tag}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Recent Leads */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-[11px] font-bold text-[#3F5036] uppercase tracking-widest block">CRM</span>
                <h2 className="font-serif text-2xl font-bold text-[#292A26]">Recent Leads</h2>
              </div>
              <Link to="/admin/leads" className="flex items-center gap-1 text-xs font-bold text-[#3F5036] hover:underline">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white border border-[#E8DDCC] rounded-2xl shadow-md overflow-hidden">
              {loading ? (
                <div className="p-10 text-center text-sm text-[#292A26]/50 animate-pulse">Loading leads...</div>
              ) : stats.recentLeads.length === 0 ? (
                <div className="p-12 text-center">
                  <MessageSquare className="w-10 h-10 text-[#B9A895] mx-auto mb-3" />
                  <p className="text-sm text-[#292A26]/50">No consultation leads recorded yet.</p>
                  <p className="text-xs text-[#292A26]/40 mt-1">Leads from the website consultation form will appear here.</p>
                </div>
              ) : (
                <div className="divide-y divide-[#E8DDCC]">
                  {stats.recentLeads.map((lead, i) => (
                    <div key={lead._id || i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 hover:bg-[#F5F0E6]/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#3F5036]/10 text-[#3F5036] font-serif font-bold text-sm flex items-center justify-center shrink-0">
                          {lead.name?.[0] || 'L'}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-[#292A26]">{lead.name}</p>
                          <p className="text-[11px] text-[#292A26]/60 flex items-center gap-2 flex-wrap">
                            <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="font-medium text-[#3F5036]">{lead.projectType}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pl-12 sm:pl-0">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_COLORS[lead.status] || 'bg-gray-100 text-gray-600'}`}>
                          {lead.status}
                        </span>
                        <span className="text-[11px] text-[#292A26]/40 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-[#292A26] mb-5">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: 'Add Project', icon: Briefcase, path: '/admin/projects', color: 'bg-[#3F5036] text-white' },
                { label: 'View Leads', icon: Users, path: '/admin/leads', color: 'bg-[#9BAA91] text-white' },
                { label: 'Edit Services', icon: Layers, path: '/admin/services', color: 'bg-[#B9A895] text-white' },
                { label: 'Gallery', icon: ImageIcon, path: '/admin/gallery', color: 'bg-[#E8DDCC] text-[#292A26]' },
                { label: '3D Models', icon: Box, path: '/admin/models', color: 'bg-[#292A26] text-white' },
                { label: 'Settings', icon: Activity, path: '/admin/settings', color: 'bg-[#3F5036]/70 text-white' },
              ].map((action, i) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={i}
                    to={action.path}
                    className={`flex flex-col items-center justify-center gap-2.5 rounded-2xl p-4 ${action.color} hover:opacity-90 active:scale-95 transition-all shadow-sm`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-[11px] font-bold text-center leading-tight">{action.label}</span>
                  </Link>
                );
              })}
            </div>
          </section>

        </div>
      </main>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img
              src={lightboxImg.src}
              alt={lightboxImg.title}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="inline-block bg-black/60 backdrop-blur text-white text-xs font-semibold px-4 py-2 rounded-full">
                {lightboxImg.title} • {lightboxImg.tag}
              </span>
            </div>
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center text-lg font-bold transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
