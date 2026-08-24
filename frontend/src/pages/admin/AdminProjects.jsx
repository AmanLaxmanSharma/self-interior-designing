import React, { useState, useEffect, useContext } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Plus, Edit, Trash2, Check, X, Star, Eye } from 'lucide-react';
import apiClient from '../../api/apiClient';
import { ToastContext } from '../../context/ToastContext';

const projectCategories = [
  'Living Room',
  'Bedroom',
  'False Ceiling',
  'PVC Panel',
  'Wall Panel',
  'TV Unit',
  'Lighting',
  'Commercial',
  'Full Interior'
];

const AdminProjects = () => {
  const { showToast } = useContext(ToastContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'False Ceiling',
    description: '',
    thumbnail: '',
    images: '',
    tags: '',
    materialsUsed: '',
    location: 'Lucknow',
    completionDate: '2026',
    featured: false,
    published: true
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get('/projects');
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      showToast('Failed to load projects', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (proj = null) => {
    if (proj) {
      setEditingProject(proj);
      setFormData({
        title: proj.title || '',
        category: proj.category || 'False Ceiling',
        description: proj.description || '',
        thumbnail: proj.thumbnail || '',
        images: proj.images ? proj.images.join(', ') : '',
        tags: proj.tags ? proj.tags.join(', ') : '',
        materialsUsed: proj.materialsUsed ? proj.materialsUsed.join(', ') : '',
        location: proj.location || 'Lucknow',
        completionDate: proj.completionDate || '2026',
        featured: proj.featured || false,
        published: proj.published !== undefined ? proj.published : true
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        category: 'False Ceiling',
        description: '',
        thumbnail: '',
        images: '',
        tags: '',
        materialsUsed: '',
        location: 'Lucknow',
        completionDate: '2026',
        featured: false,
        published: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      images: formData.images.split(',').map(s => s.trim()).filter(Boolean),
      tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean),
      materialsUsed: formData.materialsUsed.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      if (editingProject) {
        const res = await apiClient.put(`/projects/${editingProject._id}`, payload);
        if (res.data.success) {
          showToast('Project updated successfully');
        }
      } else {
        const res = await apiClient.post('/projects', payload);
        if (res.data.success) {
          showToast('Project created successfully');
        }
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      showToast(err.response?.data?.error || 'Operation failed', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      const res = await apiClient.delete(`/projects/${id}`);
      if (res.data.success) {
        showToast('Project deleted');
        fetchProjects();
      }
    } catch (err) {
      showToast('Failed to delete project', 'error');
    }
  };

  return (
    <div className="flex min-h-screen bg-warm-ivory">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-warm-taupe/20 pb-6">
          <div>
            <span className="text-xs font-bold text-deep-olive uppercase tracking-widest block">Portfolio Content Management</span>
            <h1 className="font-serif text-3xl font-bold text-charcoal">Projects Showcase</h1>
          </div>
          <button
            onClick={() => handleOpenModal(null)}
            className="bg-deep-olive hover:bg-deep-olive/90 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Completed Project</span>
          </button>
        </div>

        {/* Projects Table */}
        <div className="bg-soft-beige/50 border border-warm-taupe/30 rounded-2xl overflow-hidden shadow-luxury">
          {loading ? (
            <div className="py-16 text-center">
              <div className="w-8 h-8 border-4 border-muted-sage border-t-deep-olive rounded-full animate-spin mx-auto" />
            </div>
          ) : projects.length === 0 ? (
            <div className="py-16 text-center text-xs text-charcoal/60">
              No projects created yet. Click Add New Completed Project to create one.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-warm-taupe/20 text-charcoal text-xs font-bold uppercase tracking-wider border-b border-warm-taupe/30">
                    <th className="p-4">Thumbnail</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Featured</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-taupe/15 text-xs text-charcoal">
                  {projects.map((proj) => (
                    <tr key={proj._id} className="hover:bg-warm-ivory/60 transition-colors">
                      <td className="p-4">
                        <img
                          src={proj.thumbnail || proj.images?.[0]}
                          alt={proj.title}
                          className="w-12 h-12 rounded-lg object-cover border border-warm-taupe/30"
                        />
                      </td>
                      <td className="p-4 font-bold text-charcoal">{proj.title}</td>
                      <td className="p-4 font-medium text-deep-olive">{proj.category}</td>
                      <td className="p-4">
                        {proj.featured ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                            <Star className="w-3 h-3 fill-amber-500" /> Featured
                          </span>
                        ) : (
                          <span className="text-charcoal/40 text-[11px]">Standard</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          proj.published ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {proj.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenModal(proj)}
                          className="p-2 text-deep-olive hover:bg-soft-beige rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(proj._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
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

        {/* Modal for Add / Edit */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-warm-ivory border border-warm-taupe/30 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 space-y-4">
              <div className="flex items-center justify-between border-b border-warm-taupe/20 pb-3">
                <h3 className="font-serif text-xl font-bold text-charcoal">
                  {editingProject ? 'Edit Completed Project' : 'Add New Completed Project'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-warm-taupe hover:text-charcoal">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs text-charcoal">
                <div>
                  <label className="block font-semibold mb-1">Project Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="e.g. Modern Geometric PVC Ceiling & Ambient Lighting"
                    className="w-full p-2.5 rounded-lg bg-soft-beige border border-warm-taupe/40 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-soft-beige border border-warm-taupe/40 focus:outline-none"
                    >
                      {projectCategories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Lucknow / Kanpur"
                      className="w-full p-2.5 rounded-lg bg-soft-beige border border-warm-taupe/40 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Description *</label>
                  <textarea
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    placeholder="Describe architectural features, materials, lighting details..."
                    className="w-full p-2.5 rounded-lg bg-soft-beige border border-warm-taupe/40 focus:outline-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Image URLs (comma separated)</label>
                  <input
                    type="text"
                    value={formData.images}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                    placeholder="https://image1.jpg, https://image2.jpg"
                    className="w-full p-2.5 rounded-lg bg-soft-beige border border-warm-taupe/40 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="PVC Ceiling, LED Lighting, Wood Finish"
                      className="w-full p-2.5 rounded-lg bg-soft-beige border border-warm-taupe/40 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Materials Used (comma separated)</label>
                    <input
                      type="text"
                      value={formData.materialsUsed}
                      onChange={(e) => setFormData({ ...formData, materialsUsed: e.target.value })}
                      placeholder="PVC Panels, LED Strip, HDMR Beading"
                      className="w-full p-2.5 rounded-lg bg-soft-beige border border-warm-taupe/40 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded text-deep-olive"
                    />
                    <span className="font-semibold">Feature on Homepage</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="rounded text-deep-olive"
                    />
                    <span className="font-semibold">Publish Project</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-warm-taupe/20">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2 rounded-full border border-warm-taupe text-charcoal font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-deep-olive text-white font-semibold"
                  >
                    {editingProject ? 'Save Changes' : 'Create Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminProjects;
