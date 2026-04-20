const API_BASE = 'http://localhost:5001/api';

function getToken(): string | null {
  return localStorage.getItem('admin_token');
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request<{ token: string; admin: { id: string; name: string; email: string } }>('/auth/login', {
      method: 'POST', body: JSON.stringify({ email, password })
    }),
  getMe: () => request<{ id: string; name: string; email: string }>('/auth/me'),

  // Programs
  getPrograms: () => request<any[]>('/programs'),
  createProgram: (data: any) => request('/programs', { method: 'POST', body: JSON.stringify(data) }),
  updateProgram: (id: string, data: any) => request(`/programs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProgram: (id: string) => request(`/programs/${id}`, { method: 'DELETE' }),

  // Certificates
  getCertificates: () => request<any[]>('/certificates'),
  createCertificate: (data: any) => request('/certificates', { method: 'POST', body: JSON.stringify(data) }),
  updateCertificate: (id: string, data: any) => request(`/certificates/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCertificate: (id: string) => request(`/certificates/${id}`, { method: 'DELETE' }),

  // Contacts
  getContacts: () => request<any[]>('/contact'),
  markContactRead: (id: string) => request(`/contact/${id}/read`, { method: 'PUT' }),
  deleteContact: (id: string) => request(`/contact/${id}`, { method: 'DELETE' }),

  // Corporate
  getCorporate: () => request<any[]>('/corporate'),
  markCorporateRead: (id: string) => request(`/corporate/${id}/read`, { method: 'PUT' }),
  deleteCorporate: (id: string) => request(`/corporate/${id}`, { method: 'DELETE' }),

  // Jobs
  getJobs: () => request<any[]>('/jobs/all'),
  createJob: (data: any) => request('/jobs', { method: 'POST', body: JSON.stringify(data) }),
  updateJob: (id: string, data: any) => request(`/jobs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteJob: (id: string) => request(`/jobs/${id}`, { method: 'DELETE' }),

  // Blogs
  getBlogs: () => request<any[]>('/blogs/admin/all'),
  createBlog: (data: any) => request('/blogs', { method: 'POST', body: JSON.stringify(data) }),
  updateBlog: (id: string, data: any) => request(`/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBlog: (id: string) => request(`/blogs/${id}`, { method: 'DELETE' }),
};
