import { snowflakeTemplateHeight, snowflakeTemplateWidth } from "../data/initialData"
import Point from "../models/Point"

interface SnowflakeProps {
  points: Point[]
  size: "small" | "large"
}

const Snowflake = ({ size, points }: SnowflakeProps) => {
  return (
    <svg
      viewBox={`0 0 ${snowflakeTemplateHeight * 2} ${snowflakeTemplateHeight * 2}`}
      className={`max-w-full lg:max-w-1/2 max-h-full ${size === "large" ? "h-48 sm:h-64 lg:h-80" : "h-24 sm:h-32 lg:h-40"} mx-auto motion-safe:animate-spin-slow`}
    >
      {Array.from(Array(12)).map((_, index) => (
        <polygon
          key={index}
          points={points.map((point) => `${point.x},${point.y}`).join(" ")}
          transform={`translate(${snowflakeTemplateHeight - snowflakeTemplateWidth / 2}, 0) ${index % 2 === 0 ? "" : `scale(-1, 1) translate(-${snowflakeTemplateWidth}, 0)`} rotate(${index * 30} ${snowflakeTemplateWidth / 2} ${snowflakeTemplateHeight})`}
          fill="white"
        />
      ))}
    </svg>
  )
}

export default Snowflake
