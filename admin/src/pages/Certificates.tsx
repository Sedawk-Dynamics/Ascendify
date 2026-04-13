import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import toast from 'react-hot-toast';
import { HiPlus, HiPencil, HiTrash, HiXMark } from 'react-icons/hi2';

const emptyForm = { certificateId: '', holderName: '', email: '', programTitle: '', issueDate: '', isValid: true };

export default function Certificates() {
  const [certs, setCerts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => api.getCertificates().then(setCerts).catch(() => {});
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (c: any) => {
    setEditing(c);
    setForm({ certificateId: c.certificateId, holderName: c.holderName, email: c.email, programTitle: c.programTitle, issueDate: c.issueDate?.split('T')[0] || '', isValid: c.isValid });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.updateCertificate(editing.id, form);
        toast.success('Certificate updated');
      } else {
        await api.createCertificate(form);
        toast.success('Certificate created');
      }
      setShowModal(false);
      load();
    } catch (err: any) { toast.error(err.message); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this certificate?')) return;
    try { await api.deleteCertificate(id); toast.success('Deleted'); load(); } catch (err: any) { toast.error(err.message); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#1A0A4F]">Certificates</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4A2FBD] to-[#2ECEC6] text-white rounded-lg text-sm font-medium hover:opacity-90 transition">
          <HiPlus className="w-4 h-4" /> Issue Certificate
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Certificate ID</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Holder</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Program</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Issue Date</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {certs.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="p-4 font-mono text-sm font-medium text-[#4A2FBD]">{c.certificateId}</td>
                <td className="p-4">
                  <p className="font-medium text-[#1A0A4F]">{c.holderName}</p>
                  <p className="text-xs text-gray-400">{c.email}</p>
                </td>
                <td className="p-4 text-sm text-gray-600">{c.programTitle}</td>
                <td className="p-4 text-sm text-gray-600">{new Date(c.issueDate).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${c.isValid ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {c.isValid ? 'Valid' : 'Revoked'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(c)} className="p-1.5 text-gray-400 hover:text-[#4A2FBD] transition"><HiPencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(c.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition"><HiTrash className="w-4 h-4" /></button>
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
              <h2 className="text-lg font-semibold text-[#1A0A4F]">{editing ? 'Edit Certificate' : 'Issue Certificate'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><HiXMark className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certificate ID</label>
                <input value={form.certificateId} onChange={e => setForm({...form, certificateId: e.target.value})} placeholder="ASC-2026-00001" className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Holder Name</label>
                  <input value={form.holderName} onChange={e => setForm({...form, holderName: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program Title</label>
                  <input value={form.programTitle} onChange={e => setForm({...form, programTitle: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                  <input type="date" value={form.issueDate} onChange={e => setForm({...form, issueDate: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#4A2FBD] outline-none" required />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={form.isValid} onChange={e => setForm({...form, isValid: e.target.checked})} id="isValid" className="rounded" />
                <label htmlFor="isValid" className="text-sm text-gray-700">Valid Certificate</label>
              </div>
              <button type="submit" className="w-full py-2.5 bg-gradient-to-r from-[#4A2FBD] to-[#2ECEC6] text-white font-semibold rounded-lg hover:opacity-90 transition">
                {editing ? 'Update Certificate' : 'Issue Certificate'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
