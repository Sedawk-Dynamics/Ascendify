import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import toast from 'react-hot-toast';
import { HiTrash, HiCheck, HiEnvelope, HiXMark } from 'react-icons/hi2';

export default function Contacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  const load = () => api.getContacts().then(setContacts).catch(() => {});
  useEffect(() => { load(); }, []);

  const markRead = async (id: string) => {
    try { await api.markContactRead(id); load(); } catch (err: any) { toast.error(err.message); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    try { await api.deleteContact(id); toast.success('Deleted'); setSelected(null); load(); } catch (err: any) { toast.error(err.message); }
  };

  const unread = contacts.filter(c => !c.isRead).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1A0A4F]">Contact Messages</h1>
          {unread > 0 && <p className="text-sm text-[#2ECEC6] mt-1">{unread} unread message{unread > 1 ? 's' : ''}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
            {contacts.length === 0 ? (
              <p className="p-6 text-gray-400 text-sm text-center">No messages</p>
            ) : (
              contacts.map(c => (
                <button
                  key={c.id}
                  onClick={() => { setSelected(c); if (!c.isRead) markRead(c.id); }}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition ${selected?.id === c.id ? 'bg-[#F8F9FF]' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    {!c.isRead && <span className="w-2 h-2 rounded-full bg-[#2ECEC6] flex-shrink-0" />}
                    <p className={`text-sm truncate ${!c.isRead ? 'font-semibold text-[#1A0A4F]' : 'text-gray-700'}`}>{c.fullName}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 truncate">{c.message}</p>
                  <p className="text-xs text-gray-300 mt-1">{new Date(c.createdAt).toLocaleDateString()}</p>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          {selected ? (
            <div>
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-semibold text-[#1A0A4F]">{selected.fullName}</h2>
                  <p className="text-sm text-gray-400">{selected.email}</p>
                </div>
                <div className="flex gap-2">
                  {!selected.isRead && (
                    <button onClick={() => markRead(selected.id)} className="p-2 text-[#2ECEC6] hover:bg-[#2ECEC6]/10 rounded-lg transition" title="Mark as read">
                      <HiCheck className="w-5 h-5" />
                    </button>
                  )}
                  <button onClick={() => handleDelete(selected.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition" title="Delete">
                    <HiTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Phone</p>
                    <p className="text-sm text-[#1A0A4F]">{selected.phone || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">City</p>
                    <p className="text-sm text-[#1A0A4F]">{selected.city || '-'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Message</p>
                  <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">{selected.message}</p>
                </div>
                <p className="text-xs text-gray-300">Received: {new Date(selected.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-300">
              <HiEnvelope className="w-12 h-12 mb-3" />
              <p className="text-sm">Select a message to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
