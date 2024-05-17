import Edge from "../models/Edge"
import Point from "../models/Point"

export const snowflakeTemplateWidth = 100

export const snowflakeTemplateHeight = snowflakeTemplateWidth * (1 + Math.sqrt(3) / 2)

export const snowflakeTemplateTrianglePoints: Point[] = [
  { x: 0, y: 0 },
  { x: snowflakeTemplateWidth / 2, y: snowflakeTemplateHeight },
  { x: snowflakeTemplateWidth, y: 0 },
]

export const snowflakeTemplateTriangleEdges: Edge[] = [
  {
    a: snowflakeTemplateTrianglePoints[0],
    b: snowflakeTemplateTrianglePoints[1],
    isLeftFoldEdge: true,
    isRightFoldEdge: false,
  },
  {
    a: snowflakeTemplateTrianglePoints[1],
    b: snowflakeTemplateTrianglePoints[2],
    isLeftFoldEdge: false,
    isRightFoldEdge: true,
  },
  {
    a: snowflakeTemplateTrianglePoints[2],
    b: snowflakeTemplateTrianglePoints[0],
    isLeftFoldEdge: false,
    isRightFoldEdge: false,
  },
]
