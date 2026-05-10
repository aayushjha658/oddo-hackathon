import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing } from './pages/Landing'

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
          <Route path="/" element={<Landing />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
