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
    <nav className="fixed top-0 left-0 h-screen w-64 flex flex-col z-50 overflow-y-auto scrollbar-none" style={{ background: 'rgba(7,8,15,0.95)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(201,143,30,0.12)' }}>
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 px-6 py-7 group shrink-0">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #c98f1e, #e4a82c)' }}>
          <Compass className="w-4.5 h-4.5 text-[#07080f]" />
        </div>
        <span className="font-display font-semibold text-xl tracking-widest uppercase" style={{ color: '#f3d996', letterSpacing: '0.15em' }}>
          Traveloop
        </span>
      </Link>

      {/* Gold divider */}
      <div className="divider-gold mx-5 mb-4" />

      <div className="flex-1 flex flex-col gap-0.5 px-3">
        {NAV_GROUPS.map(group => {
          const isCollapsed = collapsed.includes(group.label)
          return (
            <div key={group.label} className="mb-3">
              <button
                onClick={() => toggleGroup(group.label)}
                className="flex items-center justify-between w-full px-3 py-1.5 mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors"
                style={{ color: 'rgba(201,143,30,0.5)', fontFamily: 'Inter, sans-serif' }}
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
                      className="relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 mb-0.5 group/nav"
                      style={{
                        background: isActive ? 'rgba(201,143,30,0.1)' : 'transparent',
                        color: isActive ? '#e4a82c' : 'rgba(237,226,197,0.55)',
                        border: isActive ? '1px solid rgba(201,143,30,0.2)' : '1px solid transparent',
                      }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavTab"
                          className="absolute inset-0 rounded-xl"
                          style={{ background: 'rgba(201,143,30,0.06)' }}
                          initial={false}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                      <Icon className="w-4 h-4 relative z-10 shrink-0" />
                      <span className="relative z-10 text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.02em' }}>{link.name}</span>
                    </Link>
                  )
                })}
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* Gold divider */}
      <div className="divider-gold mx-5 mt-2 mb-4" />

      {/* User card */}
      <div className="px-4 pb-6">
        <div className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: 'rgba(201,143,30,0.06)', border: '1px solid rgba(201,143,30,0.15)' }}>
          <div className="w-9 h-9 rounded-full shrink-0 overflow-hidden" style={{ border: '2px solid rgba(201,143,30,0.4)' }}>
            <img src="https://ui-avatars.com/api/?name=Explorer&background=c98f1e&color=07080f&bold=true" alt="avatar" className="w-full h-full" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: '#f3d996', fontFamily: 'Inter, sans-serif' }}>Explorer</p>
            <p className="text-xs truncate" style={{ color: 'rgba(201,143,30,0.5)', fontFamily: 'Inter, sans-serif' }}>Premium Member</p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: '#07080f' }}>
      <Navbar />
      <main className="flex-1 ml-64 p-8 relative">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
