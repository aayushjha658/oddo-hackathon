import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Compass, Mail, Lock, User, ArrowRight } from 'lucide-react'

export function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    // For now, bypass real authentication and pretend it succeeded.
    // We navigate to /dashboard (which we will build next)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <motion.div 
          className="absolute top-8 left-8 flex items-center gap-2 cursor-pointer text-brand-400 hover:text-brand-300 transition-colors"
          onClick={() => navigate('/')}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Compass className="w-6 h-6" />
          <span className="font-bold text-xl tracking-tight text-white">Traveloop</span>
        </motion.div>

        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-4xl font-extrabold mb-2">
                {isLogin ? 'Welcome Back' : 'Join Traveloop'}
              </h2>
              <p className="text-slate-400 mb-8">
                {isLogin ? 'Sign in to jump back into your itineraries.' : 'Create an account to start planning your perfect trips.'}
              </p>

              <form onSubmit={handleAuth} className="space-y-4">
                {!isLogin && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <Input placeholder="Full Name" className="pl-12" required />
                    </div>
                  </motion.div>
                )}
                
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input type="email" placeholder="Email Address" className="pl-12" required />
                </div>
                
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input type="password" placeholder="Password" className="pl-12" required />
                </div>

                {isLogin && (
                  <div className="flex justify-end">
                    <a href="#" className="text-sm text-brand-400 hover:text-brand-300">Forgot password?</a>
                  </div>
                )}

                <Button type="submit" className="w-full mt-6 group">
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>

              <div className="mt-8 text-center text-slate-400 text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-brand-400 hover:text-brand-300 font-medium"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right Visual Section */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-surface">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-brand-900/60 to-surface z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        {/* Placeholder image that looks like a beautiful travel destination */}
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
          alt="Travel Destination"
          className="absolute inset-0 w-full h-full object-cover blur-[2px]"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center p-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="p-10 rounded-3xl bg-background/30 backdrop-blur-xl border border-white/10"
          >
            <h3 className="text-3xl font-bold mb-4 text-white">Your journey begins here.</h3>
            <p className="text-slate-200 text-lg">
              Unlock the full potential of your travel experiences with an intelligent planner tailored to your travel mood.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
