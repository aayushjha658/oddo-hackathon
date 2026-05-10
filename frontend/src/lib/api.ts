import axios from 'axios'

// ============================================================
// API CONFIGURATION
// This file is ready for backend team to wire up.
// All calls use mock data when backend is offline.
// ============================================================

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// JWT Interceptor — auto-attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Error Interceptor
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/auth'
    }
    return Promise.reject(err)
  }
)

// ============================================================
// AUTH ENDPOINTS — Screen 1 & Screen 2
// ============================================================
export const AuthAPI = {
  /** POST /api/auth/login  — Body: { username, password } */
  login: (data: { username: string; password: string }) =>
    api.post('/auth/login', data),

  /** POST /api/auth/register  — Body: { firstName, lastName, email, phone, city, country, password, additionalInfo, profilePhoto } */
  register: (data: {
    firstName: string; lastName: string; email: string; phone: string
    city: string; country: string; password: string; additionalInfo?: string; profilePhoto?: File
  }) => api.post('/auth/register', data),

  /** POST /api/auth/logout */
  logout: () => api.post('/auth/logout'),

  /** GET /api/auth/me  — Returns current authenticated user */
  me: () => api.get('/auth/me'),
}

// ============================================================
// USER / PROFILE ENDPOINTS — Screen 7
// ============================================================
export const UserAPI = {
  /** GET /api/users/:id */
  getById: (id: string) => api.get(`/users/${id}`),

  /** PUT /api/users/:id  — Update profile details */
  update: (id: string, data: {
    firstName?: string; lastName?: string; email?: string;
    phone?: string; city?: string; country?: string; additionalInfo?: string
  }) => api.put(`/users/${id}`, data),

  /** POST /api/users/:id/photo  — Upload profile photo */
  uploadPhoto: (id: string, file: File) => {
    const form = new FormData(); form.append('photo', file)
    return api.post(`/users/${id}/photo`, form, { headers: { 'Content-Type': 'multipart/form-data' } })
  },

  /** GET /api/users/:id/trips  — Returns all trips for user */
  getTrips: (id: string) => api.get(`/users/${id}/trips`),
}

// ============================================================
// TRIP ENDPOINTS — Screen 3, 4, 6
// ============================================================
export const TripAPI = {
  /** GET /api/trips  — All trips for current user, optional ?status=upcoming|ongoing|completed */
  getAll: (params?: { status?: string; search?: string; groupBy?: string; sortBy?: string }) =>
    api.get('/trips', { params }),

  /** GET /api/trips/:id */
  getById: (id: string) => api.get(`/trips/${id}`),

  /** POST /api/trips  — Create a new trip */
  create: (data: {
    name: string; startDate: string; endDate: string; place: string;
    mood: string; coverImage?: string; description?: string
  }) => api.post('/trips', data),

  /** PUT /api/trips/:id  — Update trip details */
  update: (id: string, data: Partial<{
    name: string; startDate: string; endDate: string; place: string;
    mood: string; coverImage: string; description: string; status: string
  }>) => api.put(`/trips/${id}`, data),

  /** DELETE /api/trips/:id */
  delete: (id: string) => api.delete(`/trips/${id}`),

  /** GET /api/trips/top-regional  — Top regional suggestions for landing page */
  getTopRegional: () => api.get('/trips/top-regional'),

  /** GET /api/trips/suggestions?mood=&place=  — AI-style suggestions for Screen 4 */
  getSuggestions: (params: { mood?: string; place?: string }) =>
    api.get('/trips/suggestions', { params }),
}

// ============================================================
// ITINERARY / SECTIONS ENDPOINTS — Screen 5 & 9
// ============================================================
export const ItineraryAPI = {
  /** GET /api/trips/:tripId/itinerary */
  get: (tripId: string) => api.get(`/trips/${tripId}/itinerary`),

  /** POST /api/trips/:tripId/sections  — Add a section (day/stop) */
  addSection: (tripId: string, data: {
    title: string; description: string; dateRangeFrom: string;
    dateRangeTo: string; budget: number
  }) => api.post(`/trips/${tripId}/sections`, data),

  /** PUT /api/sections/:sectionId */
  updateSection: (sectionId: string, data: Partial<{ title: string; description: string; dateRangeFrom: string; dateRangeTo: string; budget: number }>) =>
    api.put(`/sections/${sectionId}`, data),

  /** DELETE /api/sections/:sectionId */
  deleteSection: (sectionId: string) => api.delete(`/sections/${sectionId}`),

  /** POST /api/sections/:sectionId/activities  — Add activity to a section */
  addActivity: (sectionId: string, data: {
    title: string; category: string; time: string; duration: string; cost: number; iconType: string
  }) => api.post(`/sections/${sectionId}/activities`, data),

  /** PUT /api/activities/:activityId */
  updateActivity: (activityId: string, data: Partial<{ title: string; time: string; duration: string; cost: number }>) =>
    api.put(`/activities/${activityId}`, data),

  /** DELETE /api/activities/:activityId */
  deleteActivity: (activityId: string) => api.delete(`/activities/${activityId}`),

  /** PUT /api/trips/:tripId/activities/reorder  — Body: { orderedIds: string[] } */
  reorder: (tripId: string, orderedIds: string[]) =>
    api.put(`/trips/${tripId}/activities/reorder`, { orderedIds }),
}

// ============================================================
// SEARCH ENDPOINTS — Screen 8
// ============================================================
export const SearchAPI = {
  /** GET /api/search/cities?q=  — City search */
  cities: (q: string) => api.get('/search/cities', { params: { q } }),

  /** GET /api/search/activities?q=&city= */
  activities: (params: { q: string; city?: string; category?: string }) =>
    api.get('/search/activities', { params }),

  /** GET /api/search/places?q= */
  places: (q: string) => api.get('/search/places', { params: { q } }),
}

// ============================================================
// BUDGET ENDPOINTS — Screen 9
// ============================================================
export const BudgetAPI = {
  /** GET /api/trips/:tripId/budget */
  get: (tripId: string) => api.get(`/trips/${tripId}/budget`),

  /** PUT /api/trips/:tripId/budget  — Update total budget */
  update: (tripId: string, data: { totalBudget: number; currency: string }) =>
    api.put(`/trips/${tripId}/budget`, data),

  /** GET /api/trips/:tripId/budget/breakdown  — Returns by-category breakdown */
  breakdown: (tripId: string) => api.get(`/trips/${tripId}/budget/breakdown`),
}

// ============================================================
// CHECKLIST ENDPOINTS — Screen 11
// ============================================================
export const ChecklistAPI = {
  /** GET /api/trips/:tripId/checklist */
  get: (tripId: string) => api.get(`/trips/${tripId}/checklist`),

  /** POST /api/trips/:tripId/checklist  — Add item */
  addItem: (tripId: string, data: { title: string; category: string }) =>
    api.post(`/trips/${tripId}/checklist`, data),

  /** PUT /api/checklist/:itemId  — Toggle done / rename */
  update: (itemId: string, data: { done?: boolean; title?: string }) =>
    api.put(`/checklist/${itemId}`, data),

  /** DELETE /api/checklist/:itemId */
  delete: (itemId: string) => api.delete(`/checklist/${itemId}`),

  /** POST /api/trips/:tripId/checklist/reset  — Reset all items to undone */
  reset: (tripId: string) => api.post(`/trips/${tripId}/checklist/reset`),

  /** GET /api/trips/:tripId/checklist/share  — Returns a shareable link */
  share: (tripId: string) => api.get(`/trips/${tripId}/checklist/share`),
}

// ============================================================
// COMMUNITY ENDPOINTS — Screen 10
// ============================================================
export const CommunityAPI = {
  /** GET /api/community/posts?q=&groupBy=&sortBy= */
  getPosts: (params?: { q?: string; groupBy?: string; sortBy?: string; page?: number }) =>
    api.get('/community/posts', { params }),

  /** POST /api/community/posts  — Create a post/share experience */
  createPost: (data: { tripId?: string; content: string; images?: string[]; tags?: string[] }) =>
    api.post('/community/posts', data),

  /** POST /api/community/posts/:postId/like */
  like: (postId: string) => api.post(`/community/posts/${postId}/like`),

  /** POST /api/community/posts/:postId/comments */
  comment: (postId: string, content: string) =>
    api.post(`/community/posts/${postId}/comments`, { content }),

  /** GET /api/community/posts/:postId/comments */
  getComments: (postId: string) => api.get(`/community/posts/${postId}/comments`),
}

// ============================================================
// TRIP NOTES / JOURNAL ENDPOINTS — Screen 13
// ============================================================
export const NotesAPI = {
  /** GET /api/trips/:tripId/notes?groupBy=all|day|stop */
  getAll: (tripId: string, params?: { groupBy?: string }) =>
    api.get(`/trips/${tripId}/notes`, { params }),

  /** POST /api/trips/:tripId/notes  — Add a note */
  add: (tripId: string, data: { title: string; content: string; day?: number; stopId?: string; tags?: string[] }) =>
    api.post(`/trips/${tripId}/notes`, data),

  /** PUT /api/notes/:noteId */
  update: (noteId: string, data: { title?: string; content?: string }) =>
    api.put(`/notes/${noteId}`, data),

  /** DELETE /api/notes/:noteId */
  delete: (noteId: string) => api.delete(`/notes/${noteId}`),
}

// ============================================================
// ADMIN PANEL ENDPOINTS — Screen 12
// ============================================================
export const AdminAPI = {
  /** GET /api/admin/stats  — Overall platform analytics */
  getStats: () => api.get('/admin/stats'),

  /** GET /api/admin/users?page=&limit= */
  getUsers: (params?: { page?: number; limit?: number; search?: string }) =>
    api.get('/admin/users', { params }),

  /** GET /api/admin/popular-cities */
  getPopularCities: () => api.get('/admin/popular-cities'),

  /** GET /api/admin/popular-activities */
  getPopularActivities: () => api.get('/admin/popular-activities'),

  /** GET /api/admin/trends?period=weekly|monthly */
  getTrends: (period: 'weekly' | 'monthly') =>
    api.get('/admin/trends', { params: { period } }),

  /** PUT /api/admin/users/:id/ban */
  banUser: (userId: string) => api.put(`/admin/users/${userId}/ban`),

  /** DELETE /api/admin/trips/:id */
  deleteTrip: (tripId: string) => api.delete(`/admin/trips/${tripId}`),
}

// ============================================================
// WEATHER ENDPOINTS — Planning Page Enhancement
// ============================================================
export const WeatherAPI = {
  /** GET /api/weather?city=&date=  — Returns weather for trip day */
  get: (city: string, date: string) => api.get('/weather', { params: { city, date } }),
}
