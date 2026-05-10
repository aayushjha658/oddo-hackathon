import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export function GlowCard({ children, className = '', style, onClick }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [glowStyle, setGlowStyle] = useState({})
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setGlowStyle({
      background: `radial-gradient(280px circle at ${x}px ${y}px, rgba(201,143,30,0.10), transparent 70%)`,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative group ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setGlowStyle({}) }}
      onClick={onClick}
    >
      {/* Gold glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 transition-opacity duration-300"
        style={{ ...glowStyle, opacity: isHovered ? 1 : 0 }}
      />
      {/* Gold border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent group-hover:border-[rgba(201,143,30,0.25)] transition-all duration-300 z-0"
        style={{ boxShadow: isHovered ? '0 0 20px rgba(201,143,30,0.08)' : 'none' }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
