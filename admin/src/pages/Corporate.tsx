import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import toast from 'react-hot-toast';
import { HiTrash, HiCheck, HiBuildingOffice2 } from 'react-icons/hi2';

export default function Corporate() {
  const [inquiries, setInquiries] = useState<any[]>([]);

  const load = () => api.getCorporate().then(setInquiries).catch(() => {});
  useEffect(() => { load(); }, []);

  const markRead = async (id: string) => {
    try { await api.markCorporateRead(id); load(); } catch (err: any) { toast.error(err.message); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    try { await api.deleteCorporate(id); toast.success('Deleted'); setSelected(null); load(); } catch (err: any) { toast.error(err.message); }
  };

  const unread = inquiries.filter(c => !c.isRead).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1A0A4F]">Corporate Inquiries</h1>
          {unread > 0 && <p className="text-sm text-[#2ECEC6] mt-1">{unread} unread inquir{unread > 1 ? 'ies' : 'y'}</p>}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Company</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Contact Person</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Email</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Interest</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Date</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {inquiries.map(inq => (
              <tr key={inq.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {!inq.isRead && <span className="w-2 h-2 rounded-full bg-[#2ECEC6] flex-shrink-0" />}
                    <span className="font-medium text-[#1A0A4F]">{inq.companyName}</span>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-600">{inq.contactPerson}</td>
                <td className="p-4 text-sm text-gray-600">{inq.workEmail}</td>
                <td className="p-4">
                  <span className="text-xs bg-[#4A2FBD]/10 text-[#4A2FBD] px-2 py-1 rounded-full">{inq.partnershipInterest}</span>
                </td>
                <td className="p-4 text-sm text-gray-400">{new Date(inq.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${inq.isRead ? 'bg-gray-50 text-gray-400' : 'bg-[#2ECEC6]/10 text-[#2ECEC6]'}`}>
                    {inq.isRead ? 'Read' : 'New'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {!inq.isRead && (
                      <button onClick={() => markRead(inq.id)} className="p-1.5 text-[#2ECEC6] hover:bg-[#2ECEC6]/10 rounded transition" title="Mark read">
                        <HiCheck className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => handleDelete(inq.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition" title="Delete">
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {inquiries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-300">
            <HiBuildingOffice2 className="w-12 h-12 mb-3" />
            <p className="text-sm">No corporate inquiries yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
