import { MouseEvent, useRef, useState } from "react"
import { snowflakeTemplateHeight, snowflakeTemplateTriangleEdges, snowflakeTemplateWidth } from "../data/initialData"
import { getSnowflakeDataAtEndOfCut } from "../helpers/cutHelper"
import Edge from "../models/Edge"
import Point from "../models/Point"

interface SnowflakeTemplateProps {
  points: Point[]
  setPoints: (points: Point[]) => void
  submitted: boolean
}

const SnowflakeTemplate = ({ points, setPoints, submitted }: SnowflakeTemplateProps) => {
  const shape = useRef<SVGSVGElement>(null)

  const [edges, setEdges] = useState<Edge[]>(snowflakeTemplateTriangleEdges)
  const [currentCutPointSequence, setCurrentCutPointSequence] = useState<Point[]>([])
  const [firstPointEdgeIndex, setFirstPointEdgeIndex] = useState<number>()

  const getPointFromEvent = (event: MouseEvent<SVGElement>) => {
    const clientRect = shape.current!.getBoundingClientRect()
    const point: Point = {
      x: Math.round((10 * (event.clientX - clientRect.left) * snowflakeTemplateWidth) / clientRect.width) / 10,
      y: Math.round((10 * (event.clientY - clientRect.top) * snowflakeTemplateHeight) / clientRect.height) / 10,
    }
    return point
  }

  return (
    <svg
      ref={shape}
      viewBox={`0 0 ${snowflakeTemplateWidth} ${snowflakeTemplateHeight}`}
      className="max-w-full lg:max-w-1/2 h-56 sm:h-72 lg:h-80 mx-auto"
    >
      <defs>
        <polygon id="shape" points={points.map((point) => `${point.x},${point.y}`).join(" ")} />
        <clipPath id="clip">
          <use xlinkHref="#shape" />
        </clipPath>
      </defs>
      <use
        xlinkHref="#shape"
        fill="white"
        className={submitted || currentCutPointSequence.length === 0 ? "" : "hover:cursor-snowflake-interior"}
        onClick={
          submitted || currentCutPointSequence.length === 0
            ? undefined
            : (event) => {
                setCurrentCutPointSequence([...currentCutPointSequence, getPointFromEvent(event)])
              }
        }
      />
      {edges.map((edge, edgeIndex) => (
        <line
          key={`(${edge.a.x},${edge.a.y}),(${edge.b.x},${edge.b.y})`}
          x1={edge.a.x}
          y1={edge.a.y}
          x2={edge.b.x}
          y2={edge.b.y}
          stroke="transparent"
          strokeWidth={4}
          clipPath="url(#clip)"
          className={submitted ? "" : "hover:cursor-snowflake-edge"}
          onClick={
            submitted
              ? undefined
              : (event) => {
                  if (currentCutPointSequence.length === 0) {
                    setFirstPointEdgeIndex(edgeIndex)
                    setCurrentCutPointSequence([...currentCutPointSequence, getPointFromEvent(event)])
                  } else {
                    const firstNewPoint = currentCutPointSequence[0]
                    const lastNewPoint = getPointFromEvent(event)
                    const snowflakeData = getSnowflakeDataAtEndOfCut(
                      points,
                      currentCutPointSequence,
                      firstNewPoint,
                      lastNewPoint,
                      edges,
                      firstPointEdgeIndex!,
                      edgeIndex,
                    )
                    console.log(snowflakeData)
                    setEdges(snowflakeData.edges)
                    setPoints(snowflakeData.points)
                    setCurrentCutPointSequence([])
                    setFirstPointEdgeIndex(undefined)
                  }
                }
          }
        />
      ))}
    </svg>
  )
}

export default SnowflakeTemplate
