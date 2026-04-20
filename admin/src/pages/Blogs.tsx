import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiXMark } from 'react-icons/hi2';

const emptyForm = { title: '', content: '', excerpt: '', author: '', coverImage: '', category: '', isPublished: false };

export default function Blogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => api.getBlogs().then(setBlogs).catch(() => {});
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (b: any) => {
    setEditing(b);
    setForm({ title: b.title, content: b.content, excerpt: b.excerpt, author: b.author, coverImage: b.coverImage || '', category: b.category, isPublished: b.isPublished });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.updateBlog(editing.id, form);
        toast.success('Blog updated');
      } else {
        await api.createBlog(form);
        toast.success('Blog created');
      }
      setShowModal(false);
      load();
    } catch (err: any) { toast.error(err.message); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    try { await api.deleteBlog(id); toast.success('Deleted'); load(); } catch (err: any) { toast.error(err.message); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#1A0A4F]">Blogs</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4A2FBD] to-[#2ECEC6] text-white rounded-lg text-sm font-medium hover:opacity-90 transition">
          <HiPlus className="w-4 h-4" /> Write Blog
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Title</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Author</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Category</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Created</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {blogs.map(b => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <p className="font-medium text-[#1A0A4F]">{b.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">/blog/{b.slug}</p>
                </td>
                <td className="p-4 text-sm text-gray-600">{b.author}</td>
                <td className="p-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-600">{b.category}</span>
                </td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${b.isPublished ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                    {b.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-600">{new Date(b.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(b)} className="p-1.5 text-gray-400 hover:text-[#4A2FBD] transition"><HiPencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(b.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition"><HiTrash className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-[#1A0A4F]">{editing ? 'Edit Blog' : 'Write Blog'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><HiXMark className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Blog post title" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                <textarea value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} placeholder="Short summary..." rows={2} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} placeholder="Write your blog content here..." rows={10} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none font-mono" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input value={form.author} onChange={e => setForm({...form, author: e.target.value})} placeholder="Author name" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="Finance, Career, etc." className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                <input value={form.coverImage} onChange={e => setForm({...form, coverImage: e.target.value})} placeholder="https://..." className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={form.isPublished} onChange={e => setForm({...form, isPublished: e.target.checked})} id="isPublished" className="rounded" />
                <label htmlFor="isPublished" className="text-sm text-gray-700">Publish immediately</label>
              </div>
              <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-[#4A2FBD] to-[#2ECEC6] text-white font-semibold rounded-lg hover:opacity-90 transition">
                {editing ? 'Update Blog' : 'Publish Blog'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
