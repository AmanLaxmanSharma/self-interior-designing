import React, { useState, useEffect, useContext } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Plus, Edit, Trash2, X, Layers } from 'lucide-react';
import apiClient from '../../api/apiClient';
import { ToastContext } from '../../context/ToastContext';

const AdminServices = () => {
  const { showToast } = useContext(ToastContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    image: '',
    features: '',
    order: 1,
    published: true
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/services');
      if (res.data.success) setServices(res.data.data);
    } catch (err) {
      showToast('Failed to load services', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenModal = (srv = null) => {
    if (srv) {
      setEditingService(srv);
      setFormData({
        title: srv.title || '',
        description: srv.description || '',
        longDescription: srv.longDescription || '',
        image: srv.image || '',
        features: srv.features ? srv.features.join(', ') : '',
        order: srv.order || 1,
        published: srv.published !== undefined ? srv.published : true
      });
    } else {
      setEditingService(null);
      setFormData({
        title: '',
        description: '',
        longDescription: '',
        image: '',
        features: '',
        order: services.length + 1,
        published: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      features: formData.features.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      if (editingService) {
        const res = await apiClient.put(`/services/${editingService._id}`, payload);
        if (res.data.success) showToast('Service updated');
      } else {
        const res = await apiClient.post('/services', payload);
        if (res.data.success) showToast('Service created');
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (err) {
      showToast('Operation failed', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete service?')) return;
    try {
      const res = await apiClient.delete(`/services/${id}`);
      if (res.data.success) {
        showToast('Service deleted');
        fetchServices();
      }
    } catch (err) {
      showToast('Failed to delete service', 'error');
    }
  };

  return (
    <div className="flex min-h-screen bg-warm-ivory">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-taupe/20 pb-6">
          <div>
            <span className="text-xs font-bold text-deep-olive uppercase tracking-widest block">Specializations</span>
            <h1 className="font-serif text-3xl font-bold text-charcoal">Interior Services</h1>
          </div>
          <button
            onClick={() => handleOpenModal(null)}
            className="bg-deep-olive hover:bg-deep-olive/90 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>

        <div className="bg-soft-beige/50 border border-warm-taupe/30 rounded-2xl overflow-hidden shadow-luxury">
          {loading ? (
            <div className="py-16 text-center">
              <div className="w-8 h-8 border-4 border-muted-sage border-t-deep-olive rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-warm-taupe/20 text-charcoal text-xs font-bold uppercase tracking-wider border-b border-warm-taupe/30">
                    <th className="p-4">Image</th>
                    <th className="p-4">Order</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-taupe/15 text-xs text-charcoal">
                  {services.map((srv) => (
                    <tr key={srv._id} className="hover:bg-warm-ivory/60 transition-colors">
                      <td className="p-4">
                        <img src={srv.image} alt={srv.title} className="w-12 h-12 rounded-lg object-cover" />
                      </td>
                      <td className="p-4 font-bold">{srv.order}</td>
                      <td className="p-4 font-bold text-charcoal">{srv.title}</td>
                      <td className="p-4 max-w-xs truncate text-charcoal/70">{srv.description}</td>
                      <td className="p-4">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          srv.published ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {srv.published ? 'Active' : 'Hidden'}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button onClick={() => handleOpenModal(srv)} className="p-2 text-deep-olive hover:bg-soft-beige rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(srv._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
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

        {/* Add/Edit Service Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-warm-ivory border border-warm-taupe/30 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 my-8">
              <div className="flex items-center justify-between border-b border-warm-taupe/20 pb-3">
                <h3 className="font-serif text-xl font-bold text-charcoal">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-warm-taupe hover:text-charcoal">&times;</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Service Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="e.g. False Ceiling Design"
                    className="w-full p-2.5 rounded-lg bg-soft-beige border border-warm-taupe/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Short Description *</label>
                  <textarea
                    rows="2"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="w-full p-2.5 rounded-lg bg-soft-beige border border-warm-taupe/40 focus:outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Image URL *</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                    placeholder="https://image-url.jpg"
                    className="w-full p-2.5 rounded-lg bg-soft-beige border border-warm-taupe/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Features (comma separated)</label>
                  <input
                    type="text"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder="Perimeter Cove Lighting, Wood Finish PVC Beams"
                    className="w-full p-2.5 rounded-lg bg-soft-beige border border-warm-taupe/40 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-warm-taupe/20">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-full border border-warm-taupe">Cancel</button>
                  <button type="submit" className="px-6 py-2 rounded-full bg-deep-olive text-white font-semibold">Save Service</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminServices;
