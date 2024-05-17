import { SparklesIcon } from "@heroicons/react/24/solid"
import Snowflake from "../components/Snowflake"
import { homepageSnowflakes } from "../data/sampleData"
import SplitScreen from "../layouts/SplitScreen"
import LinkButton from "../components/LinkButton"

const SourceCodeLink = () => {
  return (
    <div className="relative rounded-full px-3 py-1 text-sm hover:text-white leading-6 ring-1 ring-white/80 hover:ring-white transition text-center">
      This project is on GitHub.{" "}
      <a href="#" className="whitespace-nowrap font-bold">
        <span className="absolute inset-0" aria-hidden="true" />
        View code <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
  )
}

const Home = () => {
  return (
    <SplitScreen
      firstPart={
        <>
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
            <LinkButton variant="slate" to="/workbench">
              Get started
            </LinkButton>
            <LinkButton variant="transparent" to="/gallery">
              Get inspiration <span aria-hidden="true">→</span>
            </LinkButton>
          </div>
        </>
      }
      secondPart={
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-16 sm:gap-12 lg:gap-16 p-8 sm:p-12 lg:p-16">
          {homepageSnowflakes.map((points, index) => (
            <div
              key={index}
              className="relative animate-fall"
              style={{ left: 64 * (Math.random() - 0.5), animationDuration: `${15 + Math.random() * 10}s` }}
            >
              <Snowflake size="small" points={points} />
            </div>
          ))}
        </div>
      }
    />
  )
}

export default Home
