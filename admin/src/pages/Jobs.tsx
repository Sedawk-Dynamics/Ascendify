import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiXMark } from 'react-icons/hi2';

const emptyForm = { title: '', company: '', type: 'Full-time', location: '', url: '', isActive: true };

export default function Jobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => api.getJobs().then(setJobs).catch(() => {});
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (j: any) => {
    setEditing(j);
    setForm({ title: j.title, company: j.company, type: j.type, location: j.location, url: j.url, isActive: j.isActive });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.updateJob(editing.id, form);
        toast.success('Job updated');
      } else {
        await api.createJob(form);
        toast.success('Job created');
      }
      setShowModal(false);
      load();
    } catch (err: any) { toast.error(err.message); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this job?')) return;
    try { await api.deleteJob(id); toast.success('Deleted'); load(); } catch (err: any) { toast.error(err.message); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#1A0A4F]">Job Board</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4A2FBD] to-[#2ECEC6] text-white rounded-lg text-sm font-medium hover:opacity-90 transition">
          <HiPlus className="w-4 h-4" /> Add Job
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Title</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Company</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Type</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Location</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {jobs.map(j => (
              <tr key={j.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium text-[#1A0A4F]">{j.title}</td>
                <td className="p-4 text-sm text-gray-600">{j.company}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    j.type === 'Full-time' ? 'bg-blue-50 text-blue-600' :
                    j.type === 'Part-time' ? 'bg-orange-50 text-orange-600' :
                    'bg-purple-50 text-purple-600'
                  }`}>{j.type}</span>
                </td>
                <td className="p-4 text-sm text-gray-600">{j.location}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${j.isActive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {j.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(j)} className="p-1.5 text-gray-400 hover:text-[#4A2FBD] transition"><HiPencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(j.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition"><HiTrash className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-[#1A0A4F]">{editing ? 'Edit Job' : 'Add Job'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><HiXMark className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Financial Analyst" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="KPMG" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none">
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="Mumbai, India" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Application URL</label>
                <input value={form.url} onChange={e => setForm({...form, url: e.target.value})} placeholder="https://..." className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" required />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} id="isActive" className="rounded" />
                <label htmlFor="isActive" className="text-sm text-gray-700">Active (visible on website)</label>
              </div>
              <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-[#4A2FBD] to-[#2ECEC6] text-white font-semibold rounded-lg hover:opacity-90 transition">
                {editing ? 'Update Job' : 'Add Job'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
