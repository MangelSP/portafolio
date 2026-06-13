// components/ui/Card.tsx
interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-2xl border p-6
        bg-[var(--card-bg)] border-[var(--card-border)]
        ${className}`}
    >
      {children}
    </div>
  )
}
