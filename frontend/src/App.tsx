import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Auth } from './pages/Auth'
import { Dashboard } from './pages/Dashboard'
import { Trips } from './pages/Trips'
import { CreateTrip } from './pages/CreateTrip'
import { Planning } from './pages/Planning'
import { Budget } from './pages/Budget'
import { Profile } from './pages/Profile'
import { Explore } from './pages/Explore'
import { Community } from './pages/Community'
import { Checklist } from './pages/Checklist'
import { TripNotes } from './pages/TripNotes'
import { AppLayout } from './components/layout/Navbar'

function App() {
  useEffect(() => {
    const lenis = new Lenis()
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  return (
    <BrowserRouter>
      <main className="bg-background min-h-screen text-white font-sans selection:bg-brand-500 selection:text-white">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />

          {/* ✅ INTERNAL APP ROUTES — Auth bypassed for frontend demo */}
          {/* Auth will be re-enabled when backend is wired up */}
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/trips" element={<AppLayout><Trips /></AppLayout>} />
          <Route path="/trips/create" element={<AppLayout><CreateTrip /></AppLayout>} />
          <Route path="/planning" element={<AppLayout><Planning /></AppLayout>} />
          <Route path="/budget" element={<AppLayout><Budget /></AppLayout>} />
          <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />

          {/* ✅ NEW SCREENS — Matching UML wireframes */}
          {/* Screen 8: Activity / City Search */}
          <Route path="/explore" element={<AppLayout><Explore /></AppLayout>} />
          {/* Screen 10: Community Tab */}
          <Route path="/community" element={<AppLayout><Community /></AppLayout>} />
          {/* Screen 11: Packing Checklist */}
          <Route path="/checklist" element={<AppLayout><Checklist /></AppLayout>} />
          {/* Screen 13: Trip Notes / Journal */}
          <Route path="/notes" element={<AppLayout><TripNotes /></AppLayout>} />

          {/* Admin Panel — Screen 12 (placeholder, ready for integration) */}
          <Route path="/admin" element={<AppLayout><Dashboard /></AppLayout>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
