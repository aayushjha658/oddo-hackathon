import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Calendar, MapPin, MoreHorizontal, Search, SlidersHorizontal } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { useTripStore } from '../store/useTripStore'
import { GlowCard } from '../components/ui/GlowCard'
import { useState } from 'react'

export function Trips() {
  const navigate = useNavigate()
  const { trips } = useTripStore()
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filters = ['All', 'Upcoming', 'Past']

  const filtered = trips.filter(trip => {
    const matchFilter = filter === 'All' || (filter === 'Upcoming' && trip.status === 'upcoming') || (filter === 'Past' && trip.status === 'past')
    const matchSearch = trip.name.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div className="space-y-8 pb-20">
      <header className="flex items-end justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-2"
          >
            My Trips
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400"
          >
            {trips.length} adventures, {trips.filter(t => t.status === 'upcoming').length} upcoming.
          </motion.p>
        </div>
        <Button onClick={() => navigate('/trips/create')} className="gap-2">
          <Plus className="w-5 h-5" />
          New Trip
        </Button>
      </header>

      {/* Search + Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-col sm:flex-row gap-4 items-center"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search trips..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-surface/50 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 bg-surface/50 border border-slate-800 rounded-xl p-1">
          <SlidersHorizontal className="w-4 h-4 text-slate-500 ml-2" />
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((trip, idx) => (
            <TripCard key={trip.id} trip={trip} delay={idx * 0.08} />
          ))}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-3 py-20 text-center text-slate-500"
            >
              <p className="text-lg">No trips found. Try a different search or filter.</p>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </div>
  )
}

function TripCard({ trip, delay }: { trip: any, delay: number }) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay, duration: 0.4 }}
      layout
    >
      <GlowCard
        className="bg-surface border border-slate-800 rounded-3xl overflow-hidden cursor-pointer flex flex-col h-full"
        onClick={() => navigate('/planning')}
      >
        <div className="relative h-52 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10" />
          <motion.img
            src={trip.image}
            alt={trip.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute top-4 right-4 z-20">
            <button
              className="w-8 h-8 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-500 transition-colors"
              onClick={e => e.stopPropagation()}
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <span className="px-3 py-1 bg-background/50 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-slate-200">
              {trip.mood}
            </span>
            {trip.status === 'upcoming' && (
              <span className="px-3 py-1 bg-brand-500/30 backdrop-blur-md rounded-full text-xs font-semibold text-brand-300 border border-brand-500/30">
                Upcoming
              </span>
            )}
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-2 group-hover:text-brand-400 transition-colors">{trip.name}</h3>
          <div className="flex items-center gap-4 text-slate-400 text-sm mb-4">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {trip.destinations} Stop{trip.destinations !== 1 ? 's' : ''}</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {trip.days} Days</span>
          </div>

          {/* Checklist progress bar */}
          {trip.checklist.length > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Trip prep</span>
                <span>{trip.checklist.filter((c: any) => c.done).length}/{trip.checklist.length} done</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-teal-400 rounded-full transition-all"
                  style={{ width: `${(trip.checklist.filter((c: any) => c.done).length / trip.checklist.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="mt-auto pt-4 border-t border-slate-800/50 flex items-center justify-between text-sm">
            <span className="text-slate-500">{trip.dates}</span>
            <span className="text-brand-400 font-semibold hover:text-brand-300 transition-colors">View Itinerary →</span>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  )
}
