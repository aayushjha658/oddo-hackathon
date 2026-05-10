import { create } from 'zustand'

interface AuthState {
  token: string | null
  user: any | null
  setCreds: (token: string, user: any) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: null, // Depending on persistence strategy, you might hydrate this too
  setCreds: (token, user) => {
    localStorage.setItem('token', token)
    set({ token, user })
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, user: null })
  }
}))
