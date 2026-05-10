import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Bell, Shield, MapPin, Settings } from 'lucide-react'

export function Profile() {
  const [activeTab, setActiveTab] = useState('General')

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <header>
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-slate-400">Manage your profile, preferences, and security.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-2">
          {['General', 'Travel Preferences', 'Notifications', 'Security'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium ${
                activeTab === tab
                  ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                  : 'text-slate-400 hover:bg-surface hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="md:col-span-3">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface/50 border border-slate-800 rounded-3xl p-8"
          >
            {activeTab === 'General' && (
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-brand-500 to-teal-200 p-1">
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-surface flex items-center justify-center">
                      <img src="https://ui-avatars.com/api/?name=Test+User&background=0D8ABC&color=fff&size=128" />
                    </div>
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-medium transition-colors mb-2 text-white">Change Avatar</button>
                    <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">First Name</label>
                    <input type="text" defaultValue="Test" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Last Name</label>
                    <input type="text" defaultValue="User" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand-500" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-medium text-slate-400">Email Address</label>
                    <input type="email" defaultValue="test@traveloop.com" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand-500" />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 flex justify-end">
                  <button className="px-6 py-2 bg-brand-500 hover:bg-brand-600 rounded-full font-medium transition-colors text-white">Save Changes</button>
                </div>
              </div>
            )}
            
            {activeTab !== 'General' && (
              <div className="py-12 flex flex-col items-center justify-center text-slate-500">
                <Settings className="w-12 h-12 mb-4 opacity-50" />
                <p>This settings pane is structurally ready for Phase 5.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
