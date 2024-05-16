import { ReactNode } from "react"
import { SparklesIcon } from "@heroicons/react/24/solid"

interface ButtonProps {
  children: ReactNode
}

const SourceCodeLink = () => {
  return (
    <div className="relative rounded-full px-3 py-1 text-sm hover:text-white leading-6 ring-1 ring-white/80 hover:ring-white transition">
      This project is on GitHub.{" "}
      <a href="#" className="whitespace-nowrap font-bold">
        <span className="absolute inset-0" aria-hidden="true" />
        View code <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
  )
}

const SlateButton = ({ children }: ButtonProps) => {
  return (
    <a
      href="#"
      className="rounded-md bg-slate-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700 transition-colors"
    >
      {children}
    </a>
  )
}

const TransparentButton = ({ children }: ButtonProps) => {
  return (
    <a href="#" className="text-sm font-semibold hover:text-white leading-10 transition-colors">
      {children}
    </a>
  )
}

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-full h-[45rem] bg-sky-600 text-white/75 text-center lg:text-start">
      <div className="basis-0 flex flex-col justify-center min-w-[32rem] p-10">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <SparklesIcon width={32} height={32} />
          <SourceCodeLink />
        </div>
        <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl">Make a snowflake</h1>
        <p className="mt-6 text-lg leading-8">
          Perhaps it's winter where you are, or perhaps you wish it was. Either way, embrace the seasonal spirit and
          devise your best snowflake design.
        </p>
        <div className="mt-10 flex justify-center lg:justify-start items-center gap-x-6">
          <SlateButton>Get started</SlateButton>
          <TransparentButton>
            Get inspiration <span aria-hidden="true">→</span>
          </TransparentButton>
        </div>
      </div>
      <div className="basis-full bg-gradient-to-b from-slate-900 to-slate-700" />
    </div>
  )
}

export default Home
