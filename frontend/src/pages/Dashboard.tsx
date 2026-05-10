import { motion } from 'framer-motion'
import { Plus, MapPin, Calendar, ArrowRight, Activity, Wallet, Check, TrendingUp, Globe2, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { useTripStore } from '../store/useTripStore'
import { GlowCard } from '../components/ui/GlowCard'

export function Dashboard() {
  const navigate = useNavigate()
  const { trips, toggleChecklistItem } = useTripStore()

  const upcomingTrips = trips.filter(t => t.status === 'upcoming')
  const nextTrip = upcomingTrips[0]

  return (
    <div className="space-y-8 pb-20">
      <header className="flex items-end justify-between">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
            OFFLINE MODE — READY FOR TAKEOFF
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl font-bold mb-2"
          >
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-teal-300">Explorer.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400"
          >
            Here is what's happening with your upcoming adventures.
          </motion.p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/trips')} className="gap-2">
            <Globe2 className="w-4 h-4" /> Explore Trips
          </Button>
          <Button onClick={() => navigate('/trips/create')} className="gap-2">
            <Sparkles className="w-5 h-5" />
            Plan with Magic
          </Button>
        </div>
      </header>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Upcoming Trips" value={upcomingTrips.length.toString()} icon={<Calendar className="w-5 h-5 text-brand-400" />} delay={0.2} color="brand" />
        <StatCard title="Countries Visited" value="14" icon={<MapPin className="w-5 h-5 text-purple-400" />} delay={0.3} color="purple" />
        <StatCard title="Estimated Budget" value="₹3,50,000" icon={<Wallet className="w-5 h-5 text-emerald-400" />} delay={0.4} color="emerald" />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Next Trip Highlight */}
        {nextTrip ? (
          <GlowCard
            className="lg:col-span-2 relative rounded-3xl overflow-hidden cursor-pointer border border-slate-800"
            onClick={() => navigate('/planning')}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
            <img
              src={nextTrip.image}
              alt={nextTrip.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="relative z-20 p-8 h-80 flex flex-col justify-end">
              <div className="inline-block px-3 py-1 bg-brand-500/20 border border-brand-500/30 rounded-full text-brand-300 text-xs font-semibold mb-3 w-max backdrop-blur-sm">
                UPCOMING NEXT
              </div>
              <h2 className="text-3xl font-bold mb-2">{nextTrip.name}</h2>
              <div className="flex items-center gap-4 text-slate-300 text-sm mb-6">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {nextTrip.dates}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {nextTrip.mood}</span>
              </div>
              <div className="flex items-center text-brand-400 font-medium group-hover:text-brand-300 transition-colors">
                Continue Planning <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </GlowCard>
        ) : (
          <GlowCard
            className="lg:col-span-2 relative rounded-3xl bg-surface/50 border border-slate-800 border-dashed flex items-center justify-center p-8 h-80 text-slate-500 hover:border-brand-500/50 transition-colors cursor-pointer"
            onClick={() => navigate('/trips/create')}
          >
            <div className="text-center">
              <Sparkles className="w-8 h-8 mx-auto mb-4 opacity-50" />
              <p className="font-medium">No upcoming trips. Generate one with Magic!</p>
            </div>
          </GlowCard>
        )}

        {/* Checklist */}
        <GlowCard className="bg-surface/50 border border-slate-800 rounded-3xl p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-500" />
            Global Checklist
          </h3>
          <div className="space-y-4">
            {upcomingTrips.flatMap(trip =>
              trip.checklist.map(item => (
                <div key={item.id} className="flex items-start gap-3 group cursor-pointer" onClick={() => toggleChecklistItem(trip.id, item.id)}>
                  <div className={`mt-1 shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${item.done ? 'bg-brand-500 border-brand-500 text-white scale-110' : 'border-slate-600 bg-slate-800 group-hover:border-brand-500/50'}`}>
                    {item.done && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <p className={`text-sm select-none transition-all ${item.done ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{item.title}</p>
                    <p className="text-xs text-slate-500 select-none">{trip.name}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </GlowCard>
      </div>

      {/* Bottom Insights Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlowCard className="bg-surface/50 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg flex items-center gap-2"><TrendingUp className="w-5 h-5 text-emerald-400" /> Spending Pulse</h3>
            <span className="text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded-full">This Month</span>
          </div>
          <div className="flex items-end gap-1 h-16">
            {[40, 60, 45, 80, 65, 90, 55, 75, 85, 50, 70, 95].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className={`flex-1 rounded-t-sm ${i === 11 ? 'bg-brand-500' : 'bg-slate-700'}`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-3 text-xs text-slate-500">
            <span>May 1</span><span className="text-brand-400 font-semibold">₹24,000 spent</span><span>May 10</span>
          </div>
        </GlowCard>

        <GlowCard className="bg-surface/50 border border-slate-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-lg flex items-center gap-2"><Globe2 className="w-5 h-5 text-sky-400" /> Trip Progress</h3>
          </div>
          <div className="space-y-4">
            {upcomingTrips.map(trip => {
              const total = trip.checklist.length || 1
              const done = trip.checklist.filter(c => c.done).length
              const pct = Math.round((done / total) * 100)
              return (
                <div key={trip.id}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-300 font-medium">{trip.name}</span>
                    <span className="text-slate-500">{done}/{total} tasks</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-brand-500 to-teal-400 rounded-full"
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

function StatCard({ title, value, icon, delay, color }: { title: string, value: string, icon: React.ReactNode, delay: number, color: string }) {
  const colorMap: Record<string, string> = {
    brand: 'from-brand-500/10 to-transparent border-brand-500/10',
    purple: 'from-purple-500/10 to-transparent border-purple-500/10',
    emerald: 'from-emerald-500/10 to-transparent border-emerald-500/10',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <GlowCard className={`bg-gradient-to-br ${colorMap[color]} border p-6 rounded-3xl bg-surface/50`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-slate-800/80 rounded-2xl">
            {icon}
          </div>
          <h3 className="text-slate-400 font-medium">{title}</h3>
        </div>
        <p className="text-3xl font-bold">{value}</p>
      </GlowCard>
    </motion.div>
  )
}
