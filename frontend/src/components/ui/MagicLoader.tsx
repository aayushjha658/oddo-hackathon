import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Compass, MapPin, Zap, Star } from 'lucide-react'

const STEPS = [
  { icon: Compass, text: 'Analyzing your travel mood...' },
  { icon: MapPin, text: 'Finding perfect destinations...' },
  { icon: Zap, text: 'Building your itinerary...' },
  { icon: Star, text: 'Adding local recommendations...' },
  { icon: Sparkles, text: 'Finalizing your magic trip...' },
]

interface MagicLoaderProps {
  tripName: string
  mood: string
  onComplete: () => void
}

export function MagicLoader({ tripName, mood, onComplete }: MagicLoaderProps) {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStep(prev => {
        if (prev >= STEPS.length - 1) {
          clearInterval(stepInterval)
          return prev
        }
        return prev + 1
      })
    }, 700)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => {
            setDone(true)
            setTimeout(onComplete, 800)
          }, 300)
          return 100
        }
        return prev + 2
      })
    }, 70)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  const CurrentIcon = STEPS[step].icon

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -80, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -120, 0], y: [0, 60, 0], scale: [1, 0.8, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, 100, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-teal-500/8 rounded-full blur-3xl"
        />
      </div>

      <div className="relative text-center max-w-lg px-8">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
            >
              {/* Animated Icon Ring */}
              <div className="relative w-32 h-32 mx-auto mb-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-brand-500/30 border-t-brand-500"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-3 rounded-full border-2 border-purple-500/20 border-t-purple-400"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ scale: 0, rotate: -90, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0, rotate: 90, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-500 to-teal-300 flex items-center justify-center"
                    >
                      <CurrentIcon className="w-7 h-7 text-background" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-3">
                Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-teal-300">{tripName || 'Your Trip'}</span>
              </h2>
              <div className="text-slate-400 mb-2 text-sm font-medium uppercase tracking-widest">{mood} Mode</div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-slate-300 text-lg mt-6 mb-10"
                >
                  {STEPS[step].text}
                </motion.p>
              </AnimatePresence>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-500 to-teal-300 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
              <p className="text-slate-500 text-sm">{progress}% complete</p>

              {/* Step dots */}
              <div className="flex justify-center gap-2 mt-6">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i <= step ? 'bg-brand-400 scale-125' : 'bg-slate-700'}`}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-500 to-teal-300 flex items-center justify-center mx-auto mb-6"
              >
                <Sparkles className="w-12 h-12 text-background" />
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-3">Trip Created!</h2>
              <p className="text-slate-400 text-lg">Your adventure awaits...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
