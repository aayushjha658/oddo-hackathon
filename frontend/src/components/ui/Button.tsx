export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary'|'outline' }) {
  
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none"
  const variants = {
    primary: "bg-brand-500 text-white hover:bg-brand-600 px-6 py-3",
    secondary: "bg-surface text-white hover:bg-slate-700 px-6 py-3",
    outline: "border border-brand-500 text-brand-500 hover:bg-brand-500/10 px-6 py-3"
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
