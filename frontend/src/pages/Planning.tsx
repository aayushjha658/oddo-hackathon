import { Plus, Coffee, Map as MapIcon, ShoppingBag, Palmtree, ArrowLeft, Clock, IndianRupee, Cloud, Sun, CloudRain, Wind, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { useTripStore } from '../store/useTripStore'
import { GlowCard } from '../components/ui/GlowCard'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// Mock weather data per day
const DAY_DATA = [
  { label: 'Day 1', location: 'Paris, France', weather: { icon: Sun, temp: '24°C', desc: 'Clear & Sunny', wind: '12 km/h' }, insight: 'Best time to visit Eiffel Tower — low crowds in the morning.', insightType: 'tip' },
  { label: 'Day 2', location: 'Paris, France', weather: { icon: Cloud, temp: '19°C', desc: 'Partly Cloudy', wind: '18 km/h' }, insight: 'High tourist footfall expected. Book Louvre tickets in advance.', insightType: 'warning' },
  { label: 'Day 3', location: 'Swiss Alps', weather: { icon: CloudRain, temp: '10°C', desc: 'Light Rain', wind: '25 km/h' }, insight: 'Pack a waterproof jacket. Indoor cafes recommended in the afternoon.', insightType: 'warning' },
  { label: 'Day 4', location: 'Swiss Alps', weather: { icon: Wind, temp: '14°C', desc: 'Windy & Cool', wind: '35 km/h' }, insight: 'Cable car rides may have limited visibility. Check local forecast.', insightType: 'caution' },
]

export function Planning() {
  const navigate = useNavigate()
  const { trips, reorderActivities } = useTripStore()
  const [activeDay, setActiveDay] = useState(0)

  const trip = trips.find(t => t.status === 'upcoming')

  if (!trip) {
    return <div className="p-8 text-center text-slate-400">Loading trip details...</div>
  }

  const activities = trip.activities
  const currentDayData = DAY_DATA[activeDay]
  const WeatherIcon = currentDayData.weather.icon

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = activities.findIndex((i) => i.id === active.id)
      const newIndex = activities.findIndex((i) => i.id === over.id)
      reorderActivities(trip.id, arrayMove(activities, oldIndex, newIndex))
    }
  }

  return (
    <div className="space-y-8 pb-20">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-10 h-10 rounded-full bg-surface border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </button>
          <div>
            <h1 className="text-3xl font-bold">{trip.name}</h1>
            <p className="text-slate-400">{currentDayData.label} • {currentDayData.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <MapIcon className="w-4 h-4" /> View Map
          </Button>
          <Button className="gap-2">
            <Plus className="w-5 h-5" /> Add Activity
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Days Sidebar */}
        <div className="space-y-3">
          <div className="bg-surface/50 border border-slate-800 rounded-3xl p-4 space-y-2">
            {DAY_DATA.map((day, idx) => (
              <button
                key={day.label}
                onClick={() => setActiveDay(idx)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium border ${
                  idx === activeDay
                    ? 'bg-brand-500/10 border-brand-500/20 text-brand-400'
                    : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                {day.label}
                <span className="block text-xs font-normal text-slate-500 mt-0.5">{day.location}</span>
              </button>
            ))}
          </div>

          {/* Weather Widget */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <GlowCard className="bg-surface/50 border border-slate-800 rounded-3xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-widest">Weather</span>
                  <WeatherIcon className="w-5 h-5 text-sky-400" />
                </div>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-bold">{currentDayData.weather.temp}</span>
                </div>
                <p className="text-slate-400 text-sm mb-1">{currentDayData.weather.desc}</p>
                <p className="text-slate-500 text-xs flex items-center gap-1"><Wind className="w-3 h-3" /> {currentDayData.weather.wind}</p>
              </GlowCard>
            </motion.div>
          </AnimatePresence>

          {/* Insight Widget */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`insight-${activeDay}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl p-4 border text-sm flex gap-3 items-start ${
                currentDayData.insightType === 'tip'
                  ? 'bg-brand-500/5 border-brand-500/20 text-brand-300'
                  : currentDayData.insightType === 'caution'
                  ? 'bg-amber-500/5 border-amber-500/20 text-amber-300'
                  : 'bg-orange-500/5 border-orange-500/20 text-orange-300'
              }`}
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <p>{currentDayData.insight}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Timeline Builder */}
        <div className="lg:col-span-3">
          <GlowCard className="bg-surface/30 border border-slate-800 rounded-3xl p-8 relative">
            <div className="absolute top-12 bottom-12 left-[3.25rem] w-[2px] bg-slate-800" />

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={activities} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                  {activities.length === 0 ? (
                    <div className="py-16 text-center text-slate-500">
                      <Plus className="w-8 h-8 mx-auto mb-3 opacity-40" />
                      <p>No activities yet. Click "Add Activity" to get started.</p>
                    </div>
                  ) : (
                    activities.map((activity) => (
                      <SortableActivityCard key={activity.id} activity={activity} />
                    ))
                  )}
                </div>
              </SortableContext>
            </DndContext>
          </GlowCard>
        </div>
      </div>
    </div>
  )
}

function SortableActivityCard({ activity }: { activity: any }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: activity.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  }

  const IconMap: Record<string, any> = { Coffee, MapIcon, Palmtree, ShoppingBag }
  const Icon = IconMap[activity.iconType] || Coffee

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative z-10 flex gap-6 items-center group cursor-grab active:cursor-grabbing">
      {/* Timeline Node */}
      <div className="w-10 h-10 rounded-full bg-surface border-4 border-slate-900 flex items-center justify-center shrink-0 z-20 group-hover:border-brand-500/40 transition-colors">
        <div className="w-3 h-3 rounded-full bg-brand-500 group-hover:scale-125 transition-transform" />
      </div>

      {/* Card */}
      <div className={`flex-1 bg-surface border border-slate-800 p-5 rounded-2xl flex items-center justify-between transition-all ${isDragging ? 'shadow-2xl shadow-brand-500/20 border-brand-500/50 bg-slate-800 scale-[1.02]' : 'hover:bg-slate-800/50 hover:border-slate-700'}`}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-brand-400 border border-slate-700">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">{activity.title}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">{activity.category}</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{activity.time} <span className="text-slate-600">({activity.duration})</span></span>
          </div>
          <div className="flex items-center gap-1 font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <IndianRupee className="w-3 h-3" />
            {activity.cost}
          </div>
        </div>
      </div>
    </div>
  )
}
