import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Share2, RotateCcw, CheckSquare, Briefcase, Shirt, Pill, BookOpen, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTripStore } from '../store/useTripStore'
import { GlowCard } from '../components/ui/GlowCard'
// API: import { ChecklistAPI } from '../lib/api'
// Backend: ChecklistAPI.get(tripId), ChecklistAPI.addItem(), ChecklistAPI.update(), ChecklistAPI.reset(), ChecklistAPI.share()

const CATEGORIES = [
  { label: 'Documents', icon: BookOpen, color: 'text-sky-400', defaultItems: ['Passport', 'Flight Tickets (printed)', 'Travel Insurance', 'Hotel Booking Confirmation', 'Visa Documents'] },
  { label: 'Clothing', icon: Shirt, color: 'text-purple-400', defaultItems: ['Casual Shirts', 'Trousers / Pants', 'Walking Shoes', 'Light Jacket / Windbreaker', 'Swimwear'] },
  { label: 'Electronics', icon: Briefcase, color: 'text-amber-400', defaultItems: ['Phone Charger', 'Universal Power Adapter', 'Earphones / Headphones', 'Power Bank'] },
  { label: 'Health', icon: Pill, color: 'text-red-400', defaultItems: ['First Aid Kit', 'Prescription Medicines', 'Sunscreen (SPF 50+)', 'Hand Sanitizer', 'Insect Repellent'] },
]

type CheckItem = { id: string; text: string; done: boolean }
type CategoryState = Record<string, CheckItem[]>

const buildDefault = (): CategoryState => {
  const state: CategoryState = {}
  CATEGORIES.forEach(cat => {
    state[cat.label] = cat.defaultItems.map((text, i) => ({ id: `${cat.label}-${i}`, text, done: false }))
  })
  return state
}

export function Checklist() {
  const navigate = useNavigate()
  const { trips } = useTripStore()
  const [selected, setSelected] = useState(trips[0]?.id || '')
  const [items, setItems] = useState<CategoryState>(buildDefault())
  const [newItemText, setNewItemText] = useState<Record<string, string>>({})
  const [addingTo, setAddingTo] = useState<string | null>(null)

  const toggle = (cat: string, id: string) =>
    setItems(prev => ({ ...prev, [cat]: prev[cat].map(i => i.id === id ? { ...i, done: !i.done } : i) }))

  const addItem = (cat: string) => {
    const text = newItemText[cat]?.trim()
    if (!text) return
    setItems(prev => ({ ...prev, [cat]: [...prev[cat], { id: `${cat}-${Date.now()}`, text, done: false }] }))
    setNewItemText(prev => ({ ...prev, [cat]: '' }))
    setAddingTo(null)
  }

  const removeItem = (cat: string, id: string) =>
    setItems(prev => ({ ...prev, [cat]: prev[cat].filter(i => i.id !== id) }))

  const reset = () => setItems(buildDefault())

  const totalItems = Object.values(items).flat().length
  const doneItems = Object.values(items).flat().filter(i => i.done).length
  const progress = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0

  const selectedTrip = trips.find(t => t.id === selected)

  return (
    <div className="space-y-8 pb-20">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full bg-surface border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Packing Checklist</h1>
            <p className="text-slate-400">Never forget anything again.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={reset} className="flex items-center gap-2 px-4 py-2 bg-surface border border-slate-700 rounded-xl text-sm text-slate-400 hover:text-white hover:border-slate-500 transition-colors">
            <RotateCcw className="w-4 h-4" /> Reset All
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-slate-700 rounded-xl text-sm text-slate-400 hover:text-brand-400 hover:border-brand-500/40 transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </header>

      {/* Trip Selector + Progress */}
      <GlowCard className="bg-surface/50 border border-slate-800 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <label className="text-sm text-slate-500 font-medium uppercase tracking-widest mb-1 block">Trip</label>
            <select
              value={selected}
              onChange={e => setSelected(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand-500 font-medium"
            >
              {trips.filter(t => t.status === 'upcoming').map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-brand-400">{progress}%</p>
            <p className="text-slate-500 text-sm">{doneItems} / {totalItems} packed</p>
          </div>
        </div>
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-500 to-teal-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </GlowCard>

      {/* Category Sections */}
      <div className="space-y-6">
        {CATEGORIES.map(cat => {
          const CatIcon = cat.icon
          const catDone = items[cat.label].filter(i => i.done).length
          const catTotal = items[cat.label].length

          return (
            <GlowCard key={cat.label} className="bg-surface/50 border border-slate-800 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800 rounded-xl">
                    <CatIcon className={`w-5 h-5 ${cat.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{cat.label}</h3>
                    <p className="text-xs text-slate-500">{catDone}/{catTotal} done</p>
                  </div>
                </div>
                <button
                  onClick={() => setAddingTo(addingTo === cat.label ? null : cat.label)}
                  className="flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-300 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Item
                </button>
              </div>

              <div className="space-y-2">
                <AnimatePresence>
                  {items[cat.label].map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex items-center gap-3 group p-2 rounded-xl hover:bg-slate-800/50 transition-colors"
                    >
                      <button
                        onClick={() => toggle(cat.label, item.id)}
                        className={`shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${item.done ? 'bg-brand-500 border-brand-500' : 'border-slate-600 hover:border-brand-500/50'}`}
                      >
                        {item.done && <CheckSquare className="w-3 h-3 text-white" />}
                      </button>
                      <span className={`flex-1 text-sm select-none transition-all ${item.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>{item.text}</span>
                      <button onClick={() => removeItem(cat.label, item.id)} className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <AnimatePresence>
                  {addingTo === cat.label && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex gap-2 mt-2">
                      <input
                        autoFocus
                        value={newItemText[cat.label] || ''}
                        onChange={e => setNewItemText(p => ({ ...p, [cat.label]: e.target.value }))}
                        onKeyDown={e => e.key === 'Enter' && addItem(cat.label)}
                        placeholder="Add item name..."
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
                      />
                      <button onClick={() => addItem(cat.label)} className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-sm font-medium">Add</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </GlowCard>
          )
        })}
      </div>
    </div>
  )
}
