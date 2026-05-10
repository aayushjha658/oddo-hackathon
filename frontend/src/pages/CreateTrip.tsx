import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Image as ImageIcon, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useNavigate } from 'react-router-dom'
import { useTripStore } from '../store/useTripStore'
import { MagicLoader } from '../components/ui/MagicLoader'

const MOOD_IMAGES: Record<string, string> = {
  Adventure: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
  Relaxation: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
  Luxury: 'https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920&auto=format&fit=crop',
  Backpacking: 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?q=80&w=2073&auto=format&fit=crop',
  Nature: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop',
  Romantic: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop',
}

const MOODS = ['Adventure', 'Relaxation', 'Luxury', 'Backpacking', 'Nature', 'Romantic']

export function CreateTrip() {
  const navigate = useNavigate()
  const { addTrip } = useTripStore()

  const [name, setName] = useState('')
  const [mood, setMood] = useState('Adventure')
  const [startDate, setStartDate] = useState('')
  const [showMagic, setShowMagic] = useState(false)

  const handleCreate = (useMagic: boolean) => {
    if (!name) return
    if (useMagic) {
      setShowMagic(true)
    } else {
      createTrip()
      navigate('/trips')
    }
  }

  const createTrip = () => {
    addTrip({
      name,
      destinations: 1,
      days: 7,
      dates: startDate || 'TBD',
      image: MOOD_IMAGES[mood],
      mood,
      status: 'upcoming',
      activities: [],
      checklist: [
        { id: Math.random().toString(36), title: `Book flights for ${name}`, done: false },
        { id: Math.random().toString(36), title: `Research visa requirements`, done: false },
        { id: Math.random().toString(36), title: `Book accommodation`, done: false },
      ]
    })
  }

  const onMagicComplete = () => {
    createTrip()
    navigate('/planning')
  }

  return (
    <>
      <AnimatePresence>
        {showMagic && (
          <MagicLoader tripName={name} mood={mood} onComplete={onMagicComplete} />
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto space-y-8 pb-20">
        <header className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-10 h-10 rounded-full bg-surface border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Plan a New Adventure</h1>
            <p className="text-slate-400">Where is your next destination?</p>
          </div>
        </header>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-surface/50 border border-slate-800 rounded-3xl p-8 space-y-8"
        >
          {/* Live Cover Image Preview (changes with mood) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mood}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4 }}
              className="w-full h-52 rounded-2xl overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent z-10" />
              <img
                src={MOOD_IMAGES[mood]}
                alt={mood}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-background/40 backdrop-blur text-white border border-white/10">
                  {mood} Vibes
                </span>
              </div>
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-background/40 backdrop-blur text-slate-300 text-xs border border-white/10">
                <ImageIcon className="w-3 h-3" /> Cover updates with mood
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="grid gap-6">
            <Input label="Trip Name" placeholder="e.g. Summer in Tokyo" value={name} onChange={e => setName(e.target.value)} />

            <div className="grid grid-cols-2 gap-6">
              <Input label="Start Date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              <Input label="End Date" type="date" />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-3 block">Travel Mood</label>
              <div className="flex flex-wrap gap-3">
                {MOODS.map(m => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      mood === m
                        ? 'bg-brand-500 text-white shadow-[0_0_20px_rgba(20,184,166,0.4)]'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-3 block">Description</label>
              <textarea
                rows={3}
                className="flex w-full rounded-xl border border-slate-700 bg-surface/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-all resize-none"
                placeholder="What's the main goal of this trip?"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-end gap-4">
            <Button variant="secondary" onClick={() => navigate('/dashboard')}>Cancel</Button>
            <Button variant="outline" onClick={() => handleCreate(false)} className="gap-2">
              <ArrowRight className="w-4 h-4" /> Save Trip
            </Button>
            <Button
              onClick={() => handleCreate(true)}
              className="gap-2 relative overflow-hidden bg-gradient-to-r from-brand-500 to-teal-400 hover:from-brand-600 hover:to-teal-500 shadow-[0_0_25px_rgba(20,184,166,0.35)]"
              disabled={!name}
            >
              <Sparkles className="w-5 h-5" />
              Generate Magic Itinerary
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  )
}
