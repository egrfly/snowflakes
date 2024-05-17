import { useState } from "react"
import Snowflake from "../components/Snowflake"
import SnowflakeTemplate from "../components/SnowflakeTemplate"
import { snowflakeTemplateTrianglePoints } from "../data/initialData"
import SplitScreen from "../layouts/SplitScreen"
import Point from "../models/Point"

const Workbench = () => {
  const [points, setPoints] = useState<Point[]>(snowflakeTemplateTrianglePoints)

  return (
    <SplitScreen
      firstPart={
        <>
          <h1 className="text-2xl font-bold tracking-tight lg:text-4xl text-center">Design your snowflake</h1>
          <p className="mt-4 mb-8 text-center">Each cut has to begin and end at an edge of the snowflake.</p>
          <SnowflakeTemplate points={points} setPoints={setPoints} />
        </>
      }
      secondPart={
        <div className="flex justify-center items-center w-full h-full">
          <Snowflake size="large" points={points} />
        </div>
      }
    />
  )
}

export default Workbench
