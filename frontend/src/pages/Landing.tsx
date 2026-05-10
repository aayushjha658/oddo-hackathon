import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Compass, Star, Sparkles, ArrowRight, Users, Globe2, PackageCheck, BookOpen, LayoutDashboard, Search } from 'lucide-react'
import { GlowCard } from '../components/ui/GlowCard'

export function Landing() {
  const navigate = useNavigate()

  const NAV_LINKS = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, color: 'text-brand-400' },
    { label: 'My Trips', path: '/trips', icon: Globe2, color: 'text-purple-400' },
    { label: 'Itinerary Builder', path: '/planning', icon: Calendar, color: 'text-teal-400' },
    { label: 'Explore', path: '/explore', icon: Search, color: 'text-sky-400' },
    { label: 'Community', path: '/community', icon: Users, color: 'text-pink-400' },
    { label: 'Checklist', path: '/checklist', icon: PackageCheck, color: 'text-amber-400' },
    { label: 'Trip Notes', path: '/notes', icon: BookOpen, color: 'text-emerald-400' },
    { label: 'Budget', path: '/budget', icon: Compass, color: 'text-orange-400' },
  ]

  return (
    <div className="min-h-screen">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-extrabold text-xl">
            <Compass className="w-6 h-6 text-brand-400" />
            Traveloop
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/auth')}
              className="text-sm text-slate-400 hover:text-white transition-colors px-4 py-2"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 transition-colors text-white text-sm font-semibold shadow-[0_0_20px_rgba(20,184,166,0.3)]"
            >
              <Sparkles className="w-4 h-4" />
              Open App
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-900/40 via-background to-background" />
        <div className="absolute top-1/2 left-10 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-brand-500/30 backdrop-blur-md mb-8 text-brand-100 text-sm"
            >
              <Star className="w-4 h-4 text-brand-500" />
              <span>The #1 Intelligent Travel Companion</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              Design Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
                Perfect Trip
              </span>{' '}
              with Traveloop
            </h1>

            <p className="text-xl text-slate-300 mb-10 font-light leading-relaxed max-w-2xl mx-auto">
              Experience the future of travel planning. Drag-and-drop itineraries, intelligent budget tracking, a travel community, and packing checklists — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-teal-400 hover:from-brand-600 hover:to-teal-500 text-white font-bold text-lg transition-all shadow-[0_0_30px_rgba(20,184,166,0.4)] hover:shadow-[0_0_50px_rgba(20,184,166,0.5)] hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                Start Planning For Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/explore')}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-slate-700 text-slate-300 hover:border-brand-500/50 hover:text-white hover:bg-brand-500/5 transition-all text-lg font-medium"
              >
                Explore Destinations
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold mb-3">Everything You Need</h2>
            <p className="text-slate-400">Jump to any feature directly from the home page.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {NAV_LINKS.map(({ label, path, icon: Icon, color }, i) => (
              <motion.div
                key={path}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <GlowCard
                  className="bg-surface/50 border border-slate-800 rounded-2xl p-5 cursor-pointer group"
                  onClick={() => navigate(path)}
                >
                  <div className={`w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <p className="font-semibold text-white text-sm">{label}</p>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1 group-hover:text-brand-400 transition-colors">
                    Open <ArrowRight className="w-3 h-3" />
                  </p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-3">Why Traveloop?</h2>
            <p className="text-slate-400">Built for modern explorers who want more than a notes app.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Calendar className="w-6 h-6 text-brand-400" />}
              title="Smart Itineraries"
              description="Drag and drop stops on a visually stunning timeline. Day-by-day planning with weather insights baked in."
              delay={0.1}
            />
            <FeatureCard
              icon={<MapPin className="w-6 h-6 text-teal-400" />}
              title="Budget Analytics"
              description="Keep finances in check with beautiful charts, real-time budget alerts, and per-category breakdowns in ₹."
              delay={0.2}
            />
            <FeatureCard
              icon={<Users className="w-6 h-6 text-purple-400" />}
              title="Travel Community"
              description="Share your experiences, discover hidden gems from real travelers, and get inspired for your next adventure."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Ready to plan your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-teal-300">next adventure?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10">No sign-up required to explore. Jump right in.</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-brand-500 to-teal-400 hover:from-brand-600 hover:to-teal-500 text-white font-bold text-lg transition-all shadow-[0_0_30px_rgba(20,184,166,0.4)] mx-auto hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              Open Traveloop
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-brand-400" />
            <span className="font-semibold text-white">Traveloop</span>
            <span>— Built for Hackathon 2026</span>
          </div>
          <span>Frontend · React · Vite · TypeScript</span>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-surface/50 border border-slate-800 p-8 rounded-3xl hover:bg-surface transition-all duration-300 group"
    >
      <div className="w-12 h-12 bg-slate-800/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  )
}
