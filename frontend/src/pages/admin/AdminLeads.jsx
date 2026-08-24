import React, { useState, useEffect, useContext } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Search, Filter, Trash2, Edit3, MessageSquare, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import apiClient from '../../api/apiClient';
import { ToastContext } from '../../context/ToastContext';

const statuses = ['All', 'New', 'Contacted', 'Follow-up', 'Qualified', 'Converted', 'Closed'];

const AdminLeads = () => {
  const { showToast } = useContext(ToastContext);
  const [leads, setLeads] = useState([]);
  const [activeStatus, setActiveStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [noteText, setNoteText] = useState('');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      let url = '/leads';
      const params = new URLSearchParams();
      if (activeStatus !== 'All') params.append('status', activeStatus);
      if (search) params.append('search', search);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await apiClient.get(url);
      if (res.data.success) {
        setLeads(res.data.data);
      }
    } catch (err) {
      showToast('Failed to load leads', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [activeStatus, search]);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await apiClient.put(`/leads/${id}`, { status });
      if (res.data.success) {
        showToast(`Lead status updated to ${status}`);
        fetchLeads();
        if (selectedLead && selectedLead._id === id) {
          setSelectedLead(res.data.data);
        }
      }
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleSaveNotes = async (id) => {
    try {
      const res = await apiClient.put(`/leads/${id}`, { notes: noteText });
      if (res.data.success) {
        showToast('Admin note saved');
        fetchLeads();
        if (selectedLead && selectedLead._id === id) {
          setSelectedLead(res.data.data);
        }
      }
    } catch (err) {
      showToast('Failed to save note', 'error');
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await apiClient.delete(`/leads/${id}`);
      if (res.data.success) {
        showToast('Lead deleted');
        setSelectedLead(null);
        fetchLeads();
      }
    } catch (err) {
      showToast('Failed to delete lead', 'error');
    }
  };

  return (
    <div className="flex min-h-screen bg-warm-ivory">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-taupe/20 pb-6">
          <div>
            <span className="text-xs font-bold text-deep-olive uppercase tracking-widest block">Customer Relationship Management</span>
            <h1 className="font-serif text-3xl font-bold text-charcoal">Lead Management</h1>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-soft-beige/60 border border-warm-taupe/30 rounded-2xl p-4 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setActiveStatus(st)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeStatus === st
                    ? 'bg-deep-olive text-white shadow-sm'
                    : 'bg-warm-ivory text-charcoal/80 hover:bg-warm-taupe/30'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-warm-taupe absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads by name, phone, city..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-warm-ivory border border-warm-taupe/40 text-charcoal text-xs focus:outline-none focus:border-muted-sage"
            />
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-soft-beige/50 border border-warm-taupe/30 rounded-2xl overflow-hidden shadow-luxury">
          {loading ? (
            <div className="py-16 text-center">
              <div className="w-8 h-8 border-4 border-muted-sage border-t-deep-olive rounded-full animate-spin mx-auto" />
            </div>
          ) : leads.length === 0 ? (
            <div className="py-16 text-center text-xs text-charcoal/60">
              No leads found matching your criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-warm-taupe/20 text-charcoal text-xs font-bold uppercase tracking-wider border-b border-warm-taupe/30">
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Contact Details</th>
                    <th className="p-4">Project Type</th>
                    <th className="p-4">Budget</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-taupe/15 text-xs text-charcoal">
                  {leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-warm-ivory/60 transition-colors">
                      <td className="p-4 font-bold text-sm text-charcoal">{lead.name}</td>
                      <td className="p-4">
                        <div>
                          <a href={`tel:${lead.phone}`} className="font-semibold text-deep-olive hover:underline block">{lead.phone}</a>
                          <span className="text-charcoal/70 text-[11px]">{lead.email}</span>
                          <div className="text-[10px] text-muted-sage font-medium">{lead.city}</div>
                        </div>
                      </td>
                      <td className="p-4 font-medium">{lead.projectType}</td>
                      <td className="p-4">{lead.budget}</td>
                      <td className="p-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead._id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border border-warm-taupe/30 focus:outline-none ${
                            lead.status === 'New' ? 'bg-amber-100 text-amber-900' :
                            lead.status === 'Contacted' ? 'bg-blue-100 text-blue-900' :
                            lead.status === 'Converted' ? 'bg-emerald-100 text-emerald-900' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {statuses.filter(s => s !== 'All').map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-4 text-charcoal/60">{new Date(lead.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setNoteText(lead.notes || '');
                          }}
                          className="px-3 py-1 bg-deep-olive text-white rounded-lg text-xs font-medium hover:bg-deep-olive/90"
                        >
                          Details & Notes
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead._id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Lead Details Drawer / Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm">
            <div className="bg-warm-ivory border border-warm-taupe/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-warm-taupe/20 pb-3">
                <h3 className="font-serif text-xl font-bold text-charcoal">Lead Case Details</h3>
                <button onClick={() => setSelectedLead(null)} className="text-warm-taupe hover:text-charcoal">
                  &times;
                </button>
              </div>

              <div className="space-y-3 text-xs text-charcoal/90">
                <div><strong>Name:</strong> {selectedLead.name}</div>
                <div><strong>Phone:</strong> <a href={`tel:${selectedLead.phone}`} className="text-deep-olive underline">{selectedLead.phone}</a></div>
                <div><strong>Email:</strong> {selectedLead.email}</div>
                <div><strong>City:</strong> {selectedLead.city}</div>
                <div><strong>Project Type:</strong> {selectedLead.projectType}</div>
                <div><strong>Budget:</strong> {selectedLead.budget}</div>
                <div className="p-3 bg-soft-beige rounded-lg border border-warm-taupe/30">
                  <div className="font-bold mb-1">Customer Message:</div>
                  <p className="text-charcoal/80">{selectedLead.message || 'No additional message.'}</p>
                </div>

                <div className="space-y-1 pt-2">
                  <label className="font-bold block">Internal Admin Notes:</label>
                  <textarea
                    rows="3"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Add site inspection notes, client preferences..."
                    className="w-full p-2.5 rounded-lg bg-soft-beige border border-warm-taupe/40 text-xs focus:outline-none"
                  ></textarea>
                  <button
                    onClick={() => handleSaveNotes(selectedLead._id)}
                    className="bg-deep-olive text-white text-xs font-semibold px-4 py-2 rounded-lg"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminLeads;
