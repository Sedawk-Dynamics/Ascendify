import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { HiOutlineAcademicCap, HiOutlineDocumentCheck, HiOutlineChatBubbleLeft, HiOutlineBuildingOffice2 } from 'react-icons/hi2';

export default function Dashboard() {
  const [stats, setStats] = useState({ programs: 0, certificates: 0, contacts: 0, corporate: 0 });
  const [recentContacts, setRecentContacts] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      api.getPrograms().catch(() => []),
      api.getCertificates().catch(() => []),
      api.getContacts().catch(() => []),
      api.getCorporate().catch(() => []),
    ]).then(([programs, certificates, contacts, corporate]) => {
      setStats({
        programs: programs.length,
        certificates: certificates.length,
        contacts: contacts.length,
        corporate: corporate.length,
      });
      setRecentContacts(contacts.slice(0, 5));
    });
  }, []);

  const cards = [
    { label: 'Programs', value: stats.programs, icon: HiOutlineAcademicCap, color: 'from-[#4A2FBD] to-[#6B4FD8]' },
    { label: 'Certificates', value: stats.certificates, icon: HiOutlineDocumentCheck, color: 'from-[#2ECEC6] to-[#4AE0D8]' },
    { label: 'Contact Messages', value: stats.contacts, icon: HiOutlineChatBubbleLeft, color: 'from-[#F59E0B] to-[#FBBF24]' },
    { label: 'Corporate Inquiries', value: stats.corporate, icon: HiOutlineBuildingOffice2, color: 'from-[#EF4444] to-[#F87171]' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1A0A4F] mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-3xl font-bold text-[#1A0A4F] mt-1">{value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-[#1A0A4F]">Recent Contact Messages</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {recentContacts.length === 0 ? (
            <p className="p-6 text-gray-400 text-sm">No messages yet</p>
          ) : (
            recentContacts.map((c: any) => (
              <div key={c.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#1A0A4F]">{c.fullName}</p>
                  <p className="text-sm text-gray-500">{c.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</p>
                  {!c.isRead && <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-[#2ECEC6]/10 text-[#2ECEC6] rounded-full font-medium">New</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
