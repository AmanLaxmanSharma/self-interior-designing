import React, { useState, useEffect, useContext } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Plus, Trash2, Box, X } from 'lucide-react';
import apiClient from '../../api/apiClient';
import { ToastContext } from '../../context/ToastContext';

const AdminModels3D = () => {
  const { showToast } = useContext(ToastContext);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    modelUrl: '',
    thumbnail: '',
    category: 'Living Room',
    published: true
  });

  const fetchModels = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/models');
      if (res.data.success) setModels(res.data.data);
    } catch (err) {
      showToast('Failed to load 3D models', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post('/models', formData);
      if (res.data.success) {
        showToast('3D Model added');
        setIsModalOpen(false);
        setFormData({ name: '', description: '', modelUrl: '', thumbnail: '', category: 'Living Room', published: true });
        fetchModels();
      }
    } catch (err) {
      showToast('Failed to add model', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete 3D model?')) return;
    try {
      const res = await apiClient.delete(`/models/${id}`);
      if (res.data.success) {
        showToast('3D Model deleted');
        fetchModels();
      }
    } catch (err) {
      showToast('Failed to delete model', 'error');
    }
  };

  return (
    <div className="flex min-h-screen bg-warm-ivory">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-taupe/20 pb-6">
          <div>
            <span className="text-xs font-bold text-deep-olive uppercase tracking-widest block">Interactive Studio</span>
            <h1 className="font-serif text-3xl font-bold text-charcoal">3D Models Management</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-deep-olive hover:bg-deep-olive/90 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Upload/Add 3D Model</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {models.map((mdl) => (
            <div key={mdl._id} className="bg-soft-beige/70 border border-warm-taupe/30 rounded-2xl p-6 shadow-luxury space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-deep-olive uppercase">{mdl.category}</span>
                <button onClick={() => handleDelete(mdl._id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="font-serif text-xl font-bold text-charcoal">{mdl.name}</h3>
              <p className="text-xs text-charcoal/70 leading-relaxed">{mdl.description}</p>
              <div className="text-[11px] font-mono text-warm-taupe truncate">URL: {mdl.modelUrl}</div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm">
            <div className="bg-warm-ivory border border-warm-taupe/30 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-warm-taupe/20 pb-3">
                <h3 className="font-serif text-xl font-bold text-charcoal">Add 3D Model Entry</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-warm-taupe hover:text-charcoal">&times;</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Model Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g. Master Bedroom Ceiling Setup"
                    className="w-full p-2.5 rounded-lg bg-soft-beige border border-warm-taupe/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">GLB / GLTF Model URL *</label>
                  <input
                    type="text"
                    value={formData.modelUrl}
                    onChange={(e) => setFormData({ ...formData, modelUrl: e.target.value })}
                    required
                    placeholder="/models/room.glb or https://..."
                    className="w-full p-2.5 rounded-lg bg-soft-beige border border-warm-taupe/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Description</label>
                  <textarea
                    rows="2"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-soft-beige border border-warm-taupe/40 focus:outline-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-warm-taupe/20">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-full border border-warm-taupe">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-full bg-deep-olive text-white font-semibold">Save 3D Model</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminModels3D;
