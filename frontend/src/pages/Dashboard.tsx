import { motion } from 'framer-motion'
import { MapPin, Calendar, ArrowRight, Wallet, Check, TrendingUp, Globe2, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTripStore } from '../store/useTripStore'
import { GlowCard } from '../components/ui/GlowCard'

// Luxury palette tokens
const G = {
  gold:     '#c98f1e',
  goldLt:   '#e4a82c',
  goldPale: '#f3d996',
  cream:    '#ede2c5',
  creamLt:  '#fdf8ec',
  navy:     '#07080f',
  navyMid:  '#0d1020',
  navyEdge: '#111827',
  border:   'rgba(201,143,30,0.14)',
  muted:    'rgba(237,226,197,0.45)',
}

export function Dashboard() {
  const navigate = useNavigate()
  const { trips, toggleChecklistItem } = useTripStore()
  const upcomingTrips = trips.filter(t => t.status === 'upcoming')
  const nextTrip = upcomingTrips[0]

  return (
    <div className="space-y-8 pb-20" style={{ color: G.cream }}>
      {/* Header */}
      <header className="flex items-end justify-between">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: 'rgba(201,143,30,0.08)', border: `1px solid ${G.border}`, color: G.goldLt, fontFamily: 'Inter, sans-serif' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: G.gold }} />
            Offline Mode — Ready for Takeoff
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="font-display text-5xl font-light mb-2" style={{ color: G.creamLt }}
          >
            Welcome back,{' '}
            <em className="not-italic text-gold-shimmer">Explorer.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ color: G.muted, fontFamily: 'Inter, sans-serif' }}
          >
            Here is what's happening with your upcoming adventures.
          </motion.p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/trips')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
            style={{ border: `1px solid ${G.border}`, color: G.goldLt, background: 'rgba(201,143,30,0.04)', fontFamily: 'Inter, sans-serif' }}
          >
            <Globe2 className="w-4 h-4" /> Explore Trips
          </button>
          <button
            onClick={() => navigate('/trips/create')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #a97218, #c98f1e, #e4a82c)', color: G.navy, boxShadow: '0 0 25px rgba(201,143,30,0.35)', fontFamily: 'Inter, sans-serif' }}
          >
            <Sparkles className="w-4 h-4" /> Plan with Magic
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: 'Upcoming Trips', value: upcomingTrips.length.toString(), icon: Calendar },
          { label: 'Countries Visited', value: '14', icon: MapPin },
          { label: 'Estimated Budget', value: '₹3,50,000', icon: Wallet },
        ].map(({ label, value, icon: Icon }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
            <GlowCard className="rounded-2xl p-6" style={{ background: G.navyMid, border: `1px solid ${G.border}` } as any}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl" style={{ background: 'rgba(201,143,30,0.1)', border: `1px solid ${G.border}` }}>
                  <Icon className="w-5 h-5" style={{ color: G.gold }} />
                </div>
                <p className="text-sm" style={{ color: G.muted, fontFamily: 'Inter, sans-serif' }}>{label}</p>
              </div>
              <p className="font-display text-4xl font-light" style={{ color: G.creamLt }}>{value}</p>
            </GlowCard>
          </motion.div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {nextTrip ? (
          <GlowCard
            className="lg:col-span-2 relative rounded-3xl overflow-hidden cursor-pointer group"
            style={{ border: `1px solid ${G.border}` } as any}
            onClick={() => navigate('/planning')}
          >
            <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, #07080f 0%, rgba(7,8,15,0.5) 50%, transparent 100%)' }} />
            <img src={nextTrip.image} alt={nextTrip.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="relative z-20 p-8 h-80 flex flex-col justify-end">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3 w-max"
                style={{ background: 'rgba(201,143,30,0.2)', border: `1px solid rgba(201,143,30,0.35)`, color: G.goldPale, fontFamily: 'Inter, sans-serif' }}>
                Upcoming Next
              </div>
              <h2 className="font-display text-4xl font-light mb-2" style={{ color: G.creamLt }}>{nextTrip.name}</h2>
              <div className="flex items-center gap-4 text-sm mb-5" style={{ color: 'rgba(237,226,197,0.6)', fontFamily: 'Inter, sans-serif' }}>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {nextTrip.dates}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {nextTrip.mood}</span>
              </div>
              <div className="flex items-center font-medium text-sm group-hover:gap-3 transition-all gap-2" style={{ color: G.goldLt, fontFamily: 'Inter, sans-serif' }}>
                Continue Planning <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </GlowCard>
        ) : (
          <GlowCard
            className="lg:col-span-2 relative rounded-3xl flex items-center justify-center p-8 h-80 cursor-pointer group"
            style={{ border: `1px dashed rgba(201,143,30,0.2)`, background: G.navyMid } as any}
            onClick={() => navigate('/trips/create')}
          >
            <div className="text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-4" style={{ color: 'rgba(201,143,30,0.3)' }} />
              <p className="font-medium" style={{ color: G.muted, fontFamily: 'Inter, sans-serif' }}>No upcoming trips. Generate one with Magic!</p>
            </div>
          </GlowCard>
        )}

        {/* Checklist */}
        <GlowCard className="rounded-3xl p-6" style={{ background: G.navyMid, border: `1px solid ${G.border}` } as any}>
          <h3 className="font-display text-2xl font-light mb-6 flex items-center gap-2" style={{ color: G.creamLt }}>
            ✦ Global Checklist
          </h3>
          <div className="space-y-4">
            {upcomingTrips.flatMap(trip =>
              trip.checklist.map(item => (
                <div key={item.id} className="flex items-start gap-3 cursor-pointer group/check" onClick={() => toggleChecklistItem(trip.id, item.id)}>
                  <div className="mt-0.5 shrink-0 w-5 h-5 rounded-md flex items-center justify-center transition-all"
                    style={{ background: item.done ? G.gold : 'transparent', border: item.done ? `2px solid ${G.gold}` : `2px solid rgba(201,143,30,0.3)` }}>
                    {item.done && <Check className="w-3 h-3" style={{ color: G.navy }} />}
                  </div>
                  <div>
                    <p className="text-sm select-none transition-all" style={{ color: item.done ? 'rgba(237,226,197,0.35)' : G.cream, textDecoration: item.done ? 'line-through' : 'none', fontFamily: 'Inter, sans-serif' }}>{item.title}</p>
                    <p className="text-xs select-none" style={{ color: 'rgba(201,143,30,0.45)', fontFamily: 'Inter, sans-serif' }}>{trip.name}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </GlowCard>
      </div>

      {/* Bottom analytics row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Spending pulse */}
        <GlowCard className="rounded-3xl p-6" style={{ background: G.navyMid, border: `1px solid ${G.border}` } as any}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-2xl font-light flex items-center gap-2" style={{ color: G.creamLt }}>
              <TrendingUp className="w-5 h-5" style={{ color: G.gold }} /> Spending Pulse
            </h3>
            <span className="text-xs px-3 py-1 rounded-full" style={{ color: G.muted, background: 'rgba(201,143,30,0.07)', border: `1px solid ${G.border}`, fontFamily: 'Inter, sans-serif' }}>This Month</span>
          </div>
          <div className="flex items-end gap-1 h-16">
            {[40, 60, 45, 80, 65, 90, 55, 75, 85, 50, 70, 95].map((h, i) => (
              <motion.div key={i}
                initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.04, duration: 0.5 }}
                className="flex-1 rounded-t-sm"
                style={{ background: i === 11 ? `linear-gradient(to top, ${G.gold}, ${G.goldLt})` : 'rgba(201,143,30,0.15)' }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-3 text-xs" style={{ color: G.muted, fontFamily: 'Inter, sans-serif' }}>
            <span>May 1</span>
            <span style={{ color: G.goldLt, fontWeight: 600 }}>₹24,000 spent</span>
            <span>May 10</span>
          </div>
        </GlowCard>

        {/* Trip progress */}
        <GlowCard className="rounded-3xl p-6" style={{ background: G.navyMid, border: `1px solid ${G.border}` } as any}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-2xl font-light flex items-center gap-2" style={{ color: G.creamLt }}>
              <Globe2 className="w-5 h-5" style={{ color: G.gold }} /> Trip Progress
            </h3>
          </div>
          <div className="space-y-5">
            {upcomingTrips.map(trip => {
              const total = trip.checklist.length || 1
              const done  = trip.checklist.filter(c => c.done).length
              const pct   = Math.round((done / total) * 100)
              return (
                <div key={trip.id}>
                  <div className="flex justify-between text-sm mb-2">
                    <span style={{ color: G.cream, fontFamily: 'Inter, sans-serif' }}>{trip.name}</span>
                    <span style={{ color: G.muted, fontFamily: 'Inter, sans-serif' }}>{done}/{total} tasks</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(201,143,30,0.1)' }}>
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${G.gold}, ${G.goldLt})` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </GlowCard>
      </div>
    </div>
  )
}
