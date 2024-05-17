import { ReactNode } from "react"

interface LinkButtonProps {
  onClick: () => void
  disabled: boolean
  children: ReactNode
}

const Button = ({ onClick, disabled, children }: LinkButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-md bg-slate-700 px-3.5 py-2.5 text-sm font-semibold shadow-sm enabled:hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700 transition-colors"
    >
      {children}
    </button>
  )
}

export default Button
