import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiXMark } from 'react-icons/hi2';

const emptyForm = { title: '', description: '', duration: '', students: '', rating: '', badge: '', category: '', isActive: true };

export default function Programs() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => api.getPrograms().then(setPrograms).catch(() => {});
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (p: any) => {
    setEditing(p);
    setForm({ title: p.title, description: p.description, duration: p.duration, students: String(p.students), rating: String(p.rating), badge: p.badge || '', category: p.category, isActive: p.isActive });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...form, students: parseInt(form.students), rating: parseFloat(form.rating), badge: form.badge || null };
    try {
      if (editing) {
        await api.updateProgram(editing.id, data);
        toast.success('Program updated');
      } else {
        await api.createProgram(data);
        toast.success('Program created');
      }
      setShowModal(false);
      load();
    } catch (err: any) { toast.error(err.message); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this program?')) return;
    try { await api.deleteProgram(id); toast.success('Deleted'); load(); } catch (err: any) { toast.error(err.message); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#1A0A4F]">Programs</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4A2FBD] to-[#2ECEC6] text-white rounded-lg text-sm font-medium hover:opacity-90 transition">
          <HiPlus className="w-4 h-4" /> Add Program
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Title</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Category</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Duration</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Students</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Rating</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {programs.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <p className="font-medium text-[#1A0A4F]">{p.title}</p>
                  {p.badge && <span className="text-xs bg-[#2ECEC6]/10 text-[#2ECEC6] px-2 py-0.5 rounded-full">{p.badge}</span>}
                </td>
                <td className="p-4 text-sm text-gray-600">{p.category}</td>
                <td className="p-4 text-sm text-gray-600">{p.duration}</td>
                <td className="p-4 text-sm text-gray-600">{p.students}</td>
                <td className="p-4 text-sm text-gray-600">{p.rating}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${p.isActive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {p.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-[#4A2FBD] transition"><HiPencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition"><HiTrash className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-[#1A0A4F]">{editing ? 'Edit Program' : 'New Program'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><HiXMark className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} placeholder="12 Weeks" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="Technology" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" required />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Students</label>
                  <input type="number" value={form.students} onChange={e => setForm({...form, students: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <input type="number" step="0.1" max="5" value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                  <input value={form.badge} onChange={e => setForm({...form, badge: e.target.value})} placeholder="Popular" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} id="isActive" className="rounded" />
                <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
              </div>
              <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-[#4A2FBD] to-[#2ECEC6] text-white font-semibold rounded-lg hover:opacity-90 transition">
                {editing ? 'Update Program' : 'Create Program'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
