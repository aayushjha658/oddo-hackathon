import { motion } from 'framer-motion'
import { Wallet, TrendingUp, TrendingDown, DollarSign, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export function Budget() {
  const navigate = useNavigate()

  const data = [
    { name: 'Flights', amount: 60000 },
    { name: 'Hotels', amount: 90000 },
    { name: 'Food', amount: 40000 },
    { name: 'Activities', amount: 30000 },
    { name: 'Transport', amount: 12000 },
    { name: 'Misc', amount: 8000 },
  ]
  const colors = ['#0ea5e9', '#8b5cf6', '#14b8a6', '#f59e0b', '#ec4899', '#64748b']

  return (
    <div className="space-y-8 pb-20">
      <header className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/dashboard')}
          className="w-10 h-10 rounded-full bg-surface border border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-400" />
        </button>
        <div>
          <h1 className="text-3xl font-bold">Budget Analytics</h1>
          <p className="text-slate-400">Track and optimize your travel expenses.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-surface/50 border border-slate-800 rounded-3xl col-span-2">
          <div className="flex items-start justify-between mb-8 cursor-default">
            <div>
              <p className="text-slate-400 font-medium mb-1">Total Spent</p>
              <h2 className="text-4xl font-bold text-white flex items-baseline gap-2">
                ₹2,40,000 <span className="text-sm font-normal text-slate-500">of ₹3,00,000 budget</span>
              </h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Wallet className="w-6 h-6" />
            </div>
          </div>

          <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-brand-500 rounded-full" style={{ width: '80%' }} />
          </div>
          <p className="text-right text-sm text-slate-400">80.0% used</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 bg-surface/50 border border-slate-800 rounded-3xl flex flex-col justify-center">
           <div className="flex items-center gap-4 mb-4 text-emerald-400">
             <div className="p-2 bg-emerald-500/20 rounded-lg"><TrendingDown className="w-5 h-5" /></div>
             <div>
               <p className="text-sm text-slate-400 text-left">Under daily limit</p>
               <p className="font-bold text-xl">₹3,500 / day left</p>
             </div>
           </div>
           <div className="flex items-center gap-4 text-rose-400">
             <div className="p-2 bg-rose-500/20 rounded-lg"><TrendingUp className="w-5 h-5" /></div>
             <div>
               <p className="text-sm text-slate-400 text-left">Over budget warning</p>
               <p className="font-bold text-xl">Shopping (+12%)</p>
             </div>
           </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-surface/50 border border-slate-800 rounded-3xl p-8">
        <h3 className="text-xl font-bold mb-8">Expenses by Category</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val}`} />
              <Tooltip 
                cursor={{ fill: '#1e293b' }} 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} 
              />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}
