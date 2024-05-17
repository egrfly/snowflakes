import { ReactNode } from "react"
import { Link } from "react-router-dom"

interface LinkButtonProps {
  variant: "slate" | "transparent"
  to: string
  children: ReactNode
}

const LinkButton = ({ variant, to, children }: LinkButtonProps) => {
  return (
    <Link
      to={to}
      className={
        variant === "slate"
          ? "rounded-md bg-slate-700 px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700 transition-colors"
          : "text-sm font-semibold hover:text-white transition-colors"
      }
    >
      {children}
    </Link>
  )
}

export default LinkButton
