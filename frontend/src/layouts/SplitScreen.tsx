import { ReactNode } from "react"

interface SplitScreen {
  firstPart?: ReactNode
  secondPart?: ReactNode
}

const SplitScreen = ({ firstPart, secondPart }: SplitScreen) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-full h-[37.5rem] text-white/90 text-center lg:text-start">
      <div className="relative z-10 basis-0 flex flex-col justify-center lg:min-w-[32rem] p-10 bg-sky-600">
        {firstPart}
      </div>
      <div className="relative z-0 basis-full bg-gradient-to-b from-slate-900 to-slate-700 overflow-hidden">
        {secondPart}
      </div>
    </div>
  )
}

export default SplitScreen
