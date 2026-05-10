import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Compass, LayoutDashboard, Map, ListTodo, Wallet, UserCircle, Search, Users, PackageCheck, BookOpen, ShieldCheck, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const NAV_GROUPS = [
  {
    label: 'Main',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { name: 'My Trips', path: '/trips', icon: Map },
      { name: 'Explore', path: '/explore', icon: Search },
    ]
  },
  {
    label: 'Trip Tools',
    items: [
      { name: 'Planning', path: '/planning', icon: ListTodo },
      { name: 'Budget', path: '/budget', icon: Wallet },
      { name: 'Checklist', path: '/checklist', icon: PackageCheck },
      { name: 'Trip Notes', path: '/notes', icon: BookOpen },
    ]
  },
  {
    label: 'Social',
    items: [
      { name: 'Community', path: '/community', icon: Users },
    ]
  },
  {
    label: 'Account',
    items: [
      { name: 'Profile', path: '/profile', icon: UserCircle },
      { name: 'Admin', path: '/admin', icon: ShieldCheck },
    ]
  },
]

export function Navbar() {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState<string[]>([])

  const toggleGroup = (label: string) => {
    setCollapsed(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label])
  }

  return (
    <nav className="fixed top-0 left-0 h-screen w-64 bg-surface/50 backdrop-blur-xl border-r border-slate-800 p-5 flex flex-col z-50 overflow-y-auto scrollbar-none">
      <Link to="/" className="flex items-center gap-2 text-brand-400 hover:text-brand-300 transition-colors mb-8">
        <Compass className="w-7 h-7" />
        <span className="font-extrabold text-xl tracking-tight text-white">Traveloop</span>
      </Link>

      <div className="flex-1 flex flex-col gap-1">
        {NAV_GROUPS.map(group => {
          const isCollapsed = collapsed.includes(group.label)
          return (
            <div key={group.label} className="mb-2">
              <button
                onClick={() => toggleGroup(group.label)}
                className="flex items-center justify-between w-full px-2 py-1.5 mb-1 text-xs font-semibold text-slate-600 uppercase tracking-widest hover:text-slate-400 transition-colors"
              >
                <span>{group.label}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isCollapsed ? '-rotate-90' : ''}`} />
              </button>

              <motion.div
                initial={false}
                animate={{ height: isCollapsed ? 0 : 'auto', opacity: isCollapsed ? 0 : 1 }}
                className="overflow-hidden"
                transition={{ duration: 0.2 }}
              >
                {group.items.map(link => {
                  const isActive = location.pathname === link.path || (link.path !== '/dashboard' && location.pathname.startsWith(link.path))
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 mb-0.5 ${
                        isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavTab"
                          className="absolute inset-0 bg-brand-500/10 border border-brand-500/20 rounded-xl"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                      <div className="relative z-10 flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : ''}`} />
                        <span className="font-medium text-sm">{link.name}</span>
                      </div>
                    </Link>
                  )
                })}
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* User Box */}
      <div className="mt-4 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-500 to-teal-200 p-[2px] shrink-0">
            <div className="w-full h-full rounded-full bg-surface flex items-center justify-center overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff" alt="avatar" />
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">Test User</p>
            <p className="text-xs text-slate-400 truncate">Offline Mode</p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-background min-h-screen">
      <Navbar />
      <main className="flex-1 ml-64 p-8 relative">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
