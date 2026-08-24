import React, { useState, useEffect, useContext } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Plus, Trash2, Image as ImageIcon, X } from 'lucide-react';
import apiClient from '../../api/apiClient';
import { ToastContext } from '../../context/ToastContext';

const AdminGallery = () => {
  const { showToast } = useContext(ToastContext);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    imageUrl: '',
    title: '',
    category: 'Wall Design',
    type: 'Inspiration',
    alt: 'Karoli Interior Hub Design'
  });

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/gallery');
      if (res.data.success) setGallery(res.data.data);
    } catch (err) {
      showToast('Failed to load gallery assets', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post('/gallery', formData);
      if (res.data.success) {
        showToast('Gallery asset added');
        setIsModalOpen(false);
        setFormData({ imageUrl: '', title: '', category: 'Wall Design', type: 'Inspiration', alt: '' });
        fetchGallery();
      }
    } catch (err) {
      showToast('Failed to add image', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete image asset?')) return;
    try {
      const res = await apiClient.delete(`/gallery/${id}`);
      if (res.data.success) {
        showToast('Image deleted');
        fetchGallery();
      }
    } catch (err) {
      showToast('Failed to delete image', 'error');
    }
  };

  return (
    <div className="flex min-h-screen bg-warm-ivory">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-taupe/20 pb-6">
          <div>
            <span className="text-xs font-bold text-deep-olive uppercase tracking-widest block">Media Library</span>
            <h1 className="font-serif text-3xl font-bold text-charcoal">Gallery Asset Manager</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-deep-olive hover:bg-deep-olive/90 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Gallery Asset</span>
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <div key={item._id} className="relative group bg-soft-beige rounded-xl overflow-hidden border border-warm-taupe/30 shadow-md">
              <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-3 space-y-1">
                <span className="text-[10px] font-bold text-deep-olive uppercase">{item.type} &bull; {item.category}</span>
                <h4 className="text-xs font-bold text-charcoal truncate">{item.title}</h4>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm">
            <div className="bg-warm-ivory border border-warm-taupe/30 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-warm-taupe/20 pb-3">
                <h3 className="font-serif text-xl font-bold text-charcoal">Add Gallery Asset</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-warm-taupe hover:text-charcoal">&times;</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Image URL *</label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    required
                    placeholder="https://image-url.jpg"
                    className="w-full p-2.5 rounded-lg bg-soft-beige border border-warm-taupe/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Classical French Moulding Frame"
                    className="w-full p-2.5 rounded-lg bg-soft-beige border border-warm-taupe/40 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Asset Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-soft-beige border border-warm-taupe/40 focus:outline-none"
                    >
                      <option value="Inspiration">Design Inspiration</option>
                      <option value="Project">Completed Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g. Wall Design"
                      className="w-full p-2.5 rounded-lg bg-soft-beige border border-warm-taupe/40 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-warm-taupe/20">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-full border border-warm-taupe">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-full bg-deep-olive text-white font-semibold">Add Image</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminGallery;
