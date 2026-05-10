import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, MapPin, Utensils, Mountain, Landmark, Waves, ShoppingBag, Music, Camera, Filter } from 'lucide-react'
import { GlowCard } from '../components/ui/GlowCard'
// API: import { SearchAPI } from '../lib/api'
// Backend integration: SearchAPI.cities(query), SearchAPI.activities({ q, city, category })

const CATEGORIES = [
  { label: 'All', icon: Search },
  { label: 'Sightseeing', icon: Landmark },
  { label: 'Food', icon: Utensils },
  { label: 'Adventure', icon: Mountain },
  { label: 'Beaches', icon: Waves },
  { label: 'Shopping', icon: ShoppingBag },
  { label: 'Nightlife', icon: Music },
  { label: 'Photography', icon: Camera },
]

const MOCK_RESULTS = [
  { id: '1', title: 'Eiffel Tower', type: 'Landmark', city: 'Paris, France', rating: 4.8, image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=400&auto=format&fit=crop', price: '₹2,500' },
  { id: '2', title: 'Louvre Museum', type: 'Sightseeing', city: 'Paris, France', rating: 4.9, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=400&auto=format&fit=crop', price: '₹1,800' },
  { id: '3', title: 'Shibuya Crossing', type: 'Sightseeing', city: 'Tokyo, Japan', rating: 4.7, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400&auto=format&fit=crop', price: 'Free' },
  { id: '4', title: 'Ramen Street', type: 'Food', city: 'Tokyo, Japan', rating: 4.9, image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?q=80&w=400&auto=format&fit=crop', price: '₹600' },
  { id: '5', title: 'Bali Rice Terraces', type: 'Adventure', city: 'Bali, Indonesia', rating: 4.8, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=400&auto=format&fit=crop', price: 'Free' },
  { id: '6', title: 'Swiss Alps Skiing', type: 'Adventure', city: 'Swiss Alps', rating: 4.7, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop', price: '₹8,500' },
]

const POPULAR_CITIES = ['Paris', 'Tokyo', 'Bali', 'New York', 'Dubai', 'Rome', 'London', 'Singapore']

export function Explore() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('rating')

  const filtered = MOCK_RESULTS.filter(r => {
    const matchCat = category === 'All' || r.type === category
    const matchQ = query === '' || r.title.toLowerCase().includes(query.toLowerCase()) || r.city.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQ
  }).sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : 0)

  return (
    <div className="space-y-8 pb-20">
      <header>
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-2">Explore</motion.h1>
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-slate-400">
          Discover cities, activities, and places to add to your trips.
        </motion.p>
      </header>

      {/* Search Bar */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search cities, activities, or landmarks..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-surface/50 border border-slate-700 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 bg-surface/50 border border-slate-800 rounded-2xl px-4 py-4">
          <Filter className="w-4 h-4 text-slate-500" />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-transparent text-sm text-slate-300 focus:outline-none cursor-pointer">
            <option value="rating">Top Rated</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {/* Popular Cities Quick Pills */}
      <div>
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3">Popular Cities</p>
        <div className="flex flex-wrap gap-2">
          {POPULAR_CITIES.map(city => (
            <button
              key={city}
              onClick={() => setQuery(city)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-slate-700 text-slate-300 text-sm hover:border-brand-500/50 hover:text-brand-300 hover:bg-brand-500/5 transition-all"
            >
              <MapPin className="w-3 h-3" />{city}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => setCategory(label)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              category === label ? 'bg-brand-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.3)]' : 'bg-surface border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
            }`}
          >
            <Icon className="w-4 h-4" />{label}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      <div>
        <p className="text-sm text-slate-500 mb-4">{filtered.length} results found</p>
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((result, idx) => (
              <motion.div key={result.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: idx * 0.06 }} layout>
                <GlowCard className="bg-surface border border-slate-800 rounded-3xl overflow-hidden cursor-pointer group">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10" />
                    <motion.img src={result.image} alt={result.title} className="w-full h-full object-cover" whileHover={{ scale: 1.08 }} transition={{ duration: 0.4 }} />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-2 py-1 bg-background/60 backdrop-blur rounded-lg text-xs text-slate-200 font-medium">{result.type}</span>
                    </div>
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-2 py-1 bg-background/60 backdrop-blur rounded-lg text-xs text-emerald-400 font-bold">{result.price}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-brand-400 transition-colors">{result.title}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-slate-500 text-sm flex items-center gap-1"><MapPin className="w-3 h-3" />{result.city}</p>
                      <div className="flex items-center gap-1 text-amber-400">
                        <span className="text-sm">★</span>
                        <span className="text-sm font-semibold">{result.rating}</span>
                      </div>
                    </div>
                    <button className="mt-4 w-full py-2 rounded-xl text-sm font-medium bg-brand-500/10 border border-brand-500/20 text-brand-400 hover:bg-brand-500/20 transition-colors">
                      + Add to Trip
                    </button>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  )
}
