// components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'outline'
  className?: string
}

export default function Button({ children, onClick, href, variant = 'primary', className = '' }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer'
  const variants = {
    primary: 'bg-[var(--accent)] text-[var(--bg)] hover:bg-[var(--accent-hover)]',
    outline: 'border border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg-secondary)]',
  }

  if (href) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}
