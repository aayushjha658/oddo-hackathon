import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Activity {
  id: string
  title: string
  category: string
  time: string
  cost: string
  duration: string
  iconType: string // Store string reference for icon instead of component
}

export interface ChecklistItem {
  id: string
  title: string
  done: boolean
}

export interface Trip {
  id: string
  name: string
  destinations: number
  days: number
  dates: string
  image: string
  mood: string
  status: 'upcoming' | 'past'
  activities: Activity[]
  checklist: ChecklistItem[]
}

interface TripState {
  trips: Trip[]
  addTrip: (trip: Omit<Trip, 'id'>) => void
  addActivity: (tripId: string, activity: Activity) => void
  reorderActivities: (tripId: string, activities: Activity[]) => void
  toggleChecklistItem: (tripId: string, itemId: string) => void
}

const DEFAULT_TRIPS: Trip[] = [
  {
    id: "1",
    name: "Summer in Paris & Alps",
    destinations: 3,
    days: 14,
    dates: "Aug 15 - Aug 28, 2026",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop",
    mood: "Romantic",
    status: 'upcoming',
    activities: [
      { id: '1', title: 'Breakfast at Café de Flore', category: 'Food', time: '09:00 AM', cost: '₹3,200', duration: '1.5h', iconType: 'Coffee' },
      { id: '2', title: 'Eiffel Tower Visit', category: 'Sightseeing', time: '11:00 AM', cost: '₹2,800', duration: '2h', iconType: 'MapIcon' },
      { id: '3', title: 'Louvre Museum Tour', category: 'Sightseeing', time: '02:00 PM', cost: '₹2,000', duration: '3h', iconType: 'Palmtree' },
      { id: '4', title: 'Shopping at Champs-Élysées', category: 'Shopping', time: '05:30 PM', cost: '₹16,500', duration: '2h', iconType: 'ShoppingBag' },
    ],
    checklist: [
      { id: 'c1', title: 'Book Eiffel Tower Tickets', done: true },
      { id: 'c2', title: 'Reserve Rental Car', done: false },
      { id: 'c3', title: 'Pack Winter Gear', done: false },
    ]
  },
  {
    id: "2",
    name: "Tokyo Adventure",
    destinations: 2,
    days: 10,
    dates: "Nov 5 - Nov 15, 2026",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1994&auto=format&fit=crop",
    mood: "Adventure",
    status: 'upcoming',
    activities: [],
    checklist: [
      { id: 'c4', title: 'Buy Travel Insurance', done: false }
    ]
  }
]

export const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      trips: DEFAULT_TRIPS,
      addTrip: (trip) => set((state) => ({
        trips: [...state.trips, { ...trip, id: Math.random().toString(36).substring(7) }]
      })),
      addActivity: (tripId, activity) => set((state) => ({
        trips: state.trips.map(t => 
          t.id === tripId ? { ...t, activities: [...t.activities, activity] } : t
        )
      })),
      reorderActivities: (tripId, activities) => set((state) => ({
        trips: state.trips.map(t => 
          t.id === tripId ? { ...t, activities } : t
        )
      })),
      toggleChecklistItem: (tripId, itemId) => set((state) => ({
        trips: state.trips.map(t => 
          t.id === tripId ? {
            ...t,
            checklist: t.checklist.map(c => c.id === itemId ? { ...c, done: !c.done } : c)
          } : t
        )
      }))
    }),
    {
      name: 'traveloop-storage',
    }
  )
)
