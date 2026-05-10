import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { MapPin, Calendar, Compass, Star } from 'lucide-react'

export function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-900/40 via-background to-background" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-brand-500/30 backdrop-blur-md mb-8 text-brand-100 text-sm"
            >
              <Star className="w-4 h-4 text-brand-500" />
              <span>The #1 Intelligent Travel Companion</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-teal-200">Perfect Trip</span> with Traveloop
            </h1>
            
            <p className="text-xl text-slate-300 mb-10 font-light leading-relaxed">
              Experience the future of travel planning. Drag and drop itineraries, track your budget, and collaborate with friends in real-time.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Button>Start Planning For Free</Button>
              <Button variant="secondary">View Demo</Button>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-10 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -z-10" />
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Calendar className="w-6 h-6 text-brand-400" />}
              title="Smart Itineraries"
              description="Drag and drop stops on a visually stunning timeline. AI-assisted planning for optimal routes."
              delay={0.1}
            />
            <FeatureCard 
              icon={<MapPin className="w-6 h-6 text-brand-400" />}
              title="Interactive Maps"
              description="Visualize your journey with connected paths and live mapping tailored to your travel mood."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Compass className="w-6 h-6 text-brand-400" />}
              title="Budget & Tracking"
              description="Keep finances in check with beautiful charts, budget alerts, and category breakdowns."
              delay={0.3}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-surface/50 border border-slate-800 p-8 rounded-3xl hover:bg-surface transition-all duration-300 group"
    >
      <div className="w-12 h-12 bg-slate-800/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-slate-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}
