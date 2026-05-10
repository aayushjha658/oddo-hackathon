import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, ArrowLeft, BookOpen, MapPin, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTripStore } from '../store/useTripStore'
import { GlowCard } from '../components/ui/GlowCard'
// API: import { NotesAPI } from '../lib/api'
// Backend: NotesAPI.getAll(tripId, {groupBy}), NotesAPI.add(), NotesAPI.update(), NotesAPI.delete()

const MOCK_NOTES = [
  { id: '1', title: 'Hotel check-in details — Rome stop', content: 'Check-in after 2pm, room 303, breakfast included (7-10am)', day: 1, date: 'Aug 15 2026', tags: ['Hotel', 'Logistics'] },
  { id: '2', title: 'Emergency contact — Paris', content: 'Hotel concierge: +33 1 234 5678. Nearest hospital: Hôpital Lariboisière', day: 2, date: 'Aug 16 2026', tags: ['Safety', 'Emergency'] },
  { id: '3', title: 'Local food reco from hotel staff', content: 'Try "Chez Paul" on Rue de Charonne — best duck confit in Paris. Cash only!', day: 2, date: 'Aug 16 2026', tags: ['Food', 'Local Tip'] },
  { id: '4', title: 'Eiffel Tower ticket strategy', content: 'Book summit tickets 2 months ahead. Avoid 11am-3pm. Best photos from Trocadéro.', day: 3, date: 'Aug 17 2026', tags: ['Sightseeing', 'Tip'] },
]

const VIEW_MODES = ['All', 'By Day', 'By Stop']

export function TripNotes() {
  const navigate = useNavigate()
  const { trips } = useTripStore()
  const [selected, setSelected] = useState(trips[0]?.id || '')
  const [viewMode, setViewMode] = useState('All')
  const [notes, setNotes] = useState(MOCK_NOTES)
  const [showAdd, setShowAdd] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [newNote, setNewNote] = useState({ title: '', content: '', day: 1 })

  const addNote = () => {
    if (!newNote.title) return
    setNotes(prev => [...prev, {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      day: newNote.day,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      tags: []
    }])
    setNewNote({ title: '', content: '', day: 1 })
    setShowAdd(false)
  }

  const deleteNote = (id: string) => setNotes(prev => prev.filter(n => n.id !== id))

  const groupedByDay = notes.reduce((acc, note) => {
    const key = `Day ${note.day}`
    if (!acc[key]) acc[key] = []
    acc[key].push(note)
    return acc
  }, {} as Record<string, typeof notes>)

  const TagColors: Record<string, string> = {
    Hotel: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    Logistics: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Safety: 'bg-red-500/10 text-red-400 border-red-500/20',
    Emergency: 'bg-red-500/10 text-red-400 border-red-500/20',
    Food: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Local Tip': 'bg-green-500/10 text-green-400 border-green-500/20',
    Sightseeing: 'bg-brand-500/10 text-brand-400 border-brand-500/20',
    Tip: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  }

  return (
    <div className="space-y-8 pb-20">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full bg-surface border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Trip Notes</h1>
            <p className="text-slate-400">Your personal travel journal and reminders.</p>
          </div>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-medium transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Note
        </button>
      </header>

      {/* Trip Selector */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-slate-500" />
          <select value={selected} onChange={e => setSelected(e.target.value)} className="bg-surface border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500">
            {trips.filter(t => t.status === 'upcoming').map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>

        {/* View Mode */}
        <div className="flex items-center bg-surface/50 border border-slate-800 rounded-xl p-1">
          {VIEW_MODES.map(mode => (
            <button key={mode} onClick={() => setViewMode(mode)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${viewMode === mode ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white'}`}>
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Notes List */}
      {viewMode === 'All' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {notes.map((note, idx) => (
              <NoteCard key={note.id} note={note} idx={idx} onDelete={deleteNote} onEdit={setEditId} TagColors={TagColors} />
            ))}
          </AnimatePresence>
        </div>
      )}

      {viewMode === 'By Day' && (
        <div className="space-y-8">
          {Object.entries(groupedByDay).map(([day, dayNotes]) => (
            <div key={day}>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-brand-400" />
                <h2 className="text-xl font-bold">{day}</h2>
                <div className="h-px flex-1 bg-slate-800" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {dayNotes.map((note, idx) => (
                  <NoteCard key={note.id} note={note} idx={idx} onDelete={deleteNote} onEdit={setEditId} TagColors={TagColors} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'By Stop' && (
        <div className="py-12 text-center text-slate-500">
          <MapPin className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p>Stop-based grouping is ready for backend data integration.</p>
        </div>
      )}

      {/* Add Note Modal */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-background/80 backdrop-blur-xl z-50 flex items-center justify-center p-8" onClick={() => setShowAdd(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }} className="bg-surface border border-slate-700 rounded-3xl p-8 w-full max-w-lg" onClick={e => e.stopPropagation()}>
              <h3 className="text-xl font-bold mb-6">Add Trip Note</h3>
              <div className="space-y-4">
                <input value={newNote.title} onChange={e => setNewNote(p => ({ ...p, title: e.target.value }))} placeholder="Note title..." className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 text-sm" />
                <textarea value={newNote.content} onChange={e => setNewNote(p => ({ ...p, content: e.target.value }))} rows={4} placeholder="Write your note..." className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 text-sm resize-none" />
                <div className="flex items-center gap-3">
                  <label className="text-sm text-slate-400">Day:</label>
                  <input type="number" min={1} max={30} value={newNote.day} onChange={e => setNewNote(p => ({ ...p, day: parseInt(e.target.value) }))} className="w-20 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-800">
                <button onClick={() => setShowAdd(false)} className="px-4 py-2 text-sm text-slate-400 hover:text-white">Cancel</button>
                <button onClick={addNote} className="px-6 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-sm font-medium">Save Note</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function NoteCard({ note, idx, onDelete, onEdit, TagColors }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: idx * 0.06 }} layout>
      <GlowCard className="bg-surface border border-slate-800 rounded-2xl p-5 group h-full">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-white leading-snug flex-1">{note.title}</h3>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0">
            <button className="text-slate-500 hover:text-brand-400 transition-colors"><Pencil className="w-4 h-4" /></button>
            <button onClick={() => onDelete(note.id)} className="text-slate-500 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">{note.content}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {note.tags.map((tag: string) => (
              <span key={tag} className={`text-xs px-2 py-0.5 rounded-full border ${TagColors[tag] || 'bg-slate-800 text-slate-400 border-slate-700'}`}>{tag}</span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <Calendar className="w-3 h-3" /> Day {note.day}
          </div>
        </div>
      </GlowCard>
    </motion.div>
  )
}
