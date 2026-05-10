import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Compass, Sparkles, ArrowRight, Users, Globe2, PackageCheck, BookOpen, LayoutDashboard, Search } from 'lucide-react'
import { GlowCard } from '../components/ui/GlowCard'

const NAV_LINKS = [
  { label: 'Dashboard',        path: '/dashboard', icon: LayoutDashboard },
  { label: 'My Trips',         path: '/trips',     icon: Globe2 },
  { label: 'Itinerary Builder',path: '/planning',  icon: Calendar },
  { label: 'Explore',          path: '/explore',   icon: Search },
  { label: 'Community',        path: '/community', icon: Users },
  { label: 'Checklist',        path: '/checklist', icon: PackageCheck },
  { label: 'Trip Notes',       path: '/notes',     icon: BookOpen },
  { label: 'Budget',           path: '/budget',    icon: Compass },
]

export function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ background: '#07080f', color: '#ede2c5' }}>

      {/* ── Top Navbar ───────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(7,8,15,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(201,143,30,0.12)' }}>
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#c98f1e,#e4a82c)' }}>
              <Compass className="w-4 h-4" style={{ color: '#07080f' }} />
            </div>
            <span className="font-display font-semibold tracking-widest uppercase text-lg" style={{ color: '#f3d996', letterSpacing: '0.2em' }}>Traveloop</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/auth')} className="text-sm transition-colors" style={{ color: 'rgba(237,226,197,0.5)', fontFamily: 'Inter, sans-serif' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e4a82c')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,226,197,0.5)')}
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'linear-gradient(135deg,#c98f1e,#e4a82c)', color: '#07080f', fontFamily: 'Inter, sans-serif', boxShadow: '0 0 20px rgba(201,143,30,0.35)' }}
            >
              <Sparkles className="w-4 h-4" /> Open App
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pt-44 pb-28 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,143,30,0.07) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,143,30,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute top-20 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,143,30,0.03) 0%, transparent 70%)', filter: 'blur(80px)' }} />

        <div className="max-w-6xl mx-auto px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10 text-xs font-semibold uppercase tracking-widest"
              style={{ background: 'rgba(201,143,30,0.08)', border: '1px solid rgba(201,143,30,0.2)', color: '#e4a82c', fontFamily: 'Inter, sans-serif' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#c98f1e' }} />
              The Premier Luxury Travel Companion
            </motion.div>

            <h1 className="font-display font-light mb-6 leading-none" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', color: '#fdf8ec' }}>
              Your World.{' '}
              <em className="not-italic text-gold-shimmer">Curated.</em>
            </h1>

            <p className="max-w-2xl mx-auto mb-12 leading-relaxed font-light text-xl" style={{ color: 'rgba(237,226,197,0.6)', fontFamily: 'Inter, sans-serif' }}>
              Design bespoke journeys with drag-and-drop precision. From boutique hideaways to exotic resorts — every detail, exquisitely planned.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <button
                onClick={() => navigate('/dashboard')}
                className="group flex items-center gap-3 px-10 py-4 rounded-xl text-base font-semibold transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg,#a97218,#c98f1e,#e4a82c)', color: '#07080f', boxShadow: '0 0 40px rgba(201,143,30,0.4)', fontFamily: 'Inter, sans-serif' }}
              >
                <Sparkles className="w-5 h-5" />
                Begin Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/explore')}
                className="flex items-center gap-2 px-10 py-4 rounded-xl text-base transition-all hover:scale-105"
                style={{ border: '1px solid rgba(201,143,30,0.25)', color: '#e4a82c', background: 'rgba(201,143,30,0.04)', fontFamily: 'Inter, sans-serif' }}
              >
                Explore Destinations
              </button>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ── Feature quick-nav grid ──────────────────────────────── */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: '#c98f1e', fontFamily: 'Inter, sans-serif' }}>Full Suite</p>
            <h2 className="font-display text-4xl font-light" style={{ color: '#fdf8ec' }}>Everything You Need</h2>
            <div className="divider-gold w-32 mx-auto mt-5" />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {NAV_LINKS.map(({ label, path, icon: Icon }, i) => (
              <motion.div
                key={path}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <GlowCard
                  className="rounded-2xl p-6 cursor-pointer group transition-all duration-300"
                  style={{ background: 'rgba(13,16,32,0.8)', border: '1px solid rgba(201,143,30,0.12)' } as any}
                  onClick={() => navigate(path)}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ background: 'rgba(201,143,30,0.1)', border: '1px solid rgba(201,143,30,0.2)' }}>
                    <Icon className="w-5 h-5" style={{ color: '#c98f1e' }} />
                  </div>
                  <p className="font-semibold text-sm mb-1" style={{ color: '#f3d996', fontFamily: 'Inter, sans-serif' }}>{label}</p>
                  <p className="text-xs flex items-center gap-1 transition-colors" style={{ color: 'rgba(201,143,30,0.5)', fontFamily: 'Inter, sans-serif' }}>
                    Open <ArrowRight className="w-3 h-3" />
                  </p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Traveloop ──────────────────────────────────────── */}
      <section className="py-20 px-8" style={{ background: 'rgba(13,16,32,0.5)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: '#c98f1e', fontFamily: 'Inter, sans-serif' }}>The Difference</p>
            <h2 className="font-display text-4xl font-light" style={{ color: '#fdf8ec' }}>Why Traveloop?</h2>
            <div className="divider-gold w-32 mx-auto mt-5" />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Calendar, title: 'Bespoke Itineraries', desc: 'Craft day-by-day journeys with drag-and-drop precision. Weather insights, local tips, and expense tracking built in.', },
              { icon: MapPin, title: 'Budget Intelligence', desc: 'Elegant budget dashboards in ₹. Real-time category breakdowns and spending pulse charts styled for discerning travelers.', },
              { icon: Users, title: 'Exclusive Community', desc: 'Connect with fellow connoisseurs of travel. Share hidden gems, boutique finds, and curated local experiences.', },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 rounded-3xl group hover:bg-[rgba(201,143,30,0.04)] transition-all"
                style={{ border: '1px solid rgba(201,143,30,0.12)' }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ background: 'rgba(201,143,30,0.08)', border: '1px solid rgba(201,143,30,0.18)' }}>
                  <Icon className="w-6 h-6" style={{ color: '#c98f1e' }} />
                </div>
                <h3 className="font-display text-2xl font-normal mb-3" style={{ color: '#f3d996' }}>{title}</h3>
                <p className="leading-relaxed" style={{ color: 'rgba(237,226,197,0.55)', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem' }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="py-28 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(201,143,30,0.06) 0%, transparent 70%)' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10">
          <p className="text-xs uppercase tracking-[0.25em] mb-4" style={{ color: '#c98f1e', fontFamily: 'Inter, sans-serif' }}>Get Started</p>
          <h2 className="font-display text-5xl md:text-6xl font-light mb-6 leading-tight" style={{ color: '#fdf8ec' }}>
            Ready to Explore the<br />
            <span className="text-gold-shimmer">World in Style?</span>
          </h2>
          <p className="text-lg mb-12 max-w-lg mx-auto" style={{ color: 'rgba(237,226,197,0.5)', fontFamily: 'Inter, sans-serif' }}>
            No sign-up required to explore. Step inside and begin crafting your perfect escape.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-3 px-12 py-4 rounded-xl text-base font-semibold hover:scale-105 transition-all"
            style={{ background: 'linear-gradient(135deg,#a97218,#c98f1e,#e4a82c)', color: '#07080f', boxShadow: '0 0 50px rgba(201,143,30,0.4)', fontFamily: 'Inter, sans-serif' }}
          >
            <Sparkles className="w-5 h-5" />
            Open Traveloop
          </button>
        </motion.div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid rgba(201,143,30,0.1)', padding: '2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-2.5">
            <Compass className="w-4 h-4" style={{ color: '#c98f1e' }} />
            <span className="font-display text-sm tracking-widest uppercase" style={{ color: '#e4a82c' }}>Traveloop</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
