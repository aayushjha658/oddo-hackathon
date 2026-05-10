import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function GlowCard({ children, className = '', onClick }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [glowStyle, setGlowStyle] = useState({})
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setGlowStyle({
      background: `radial-gradient(300px circle at ${x}px ${y}px, rgba(20, 184, 166, 0.12), transparent 70%)`,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setGlowStyle({}) }}
      onClick={onClick}
    >
      {/* Glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-0"
        style={{ ...glowStyle, opacity: isHovered ? 1 : 0 }}
      />
      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-brand-500/0 group-hover:border-brand-500/20 transition-all duration-300 z-0"
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
