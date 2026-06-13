// components/ui/Tag.tsx
interface TagProps {
  label: string
  className?: string
}

export default function Tag({ label, className = '' }: TagProps) {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-medium rounded-full border
        bg-[var(--bg-secondary)] text-[var(--text-muted)] border-[var(--border)]
        ${className}`}
    >
      {label}
    </span>
  )
}
