import Point from "./Point"

interface Edge {
  a: Point
  b: Point
  isLeftFoldEdge: boolean
  isRightFoldEdge: boolean
}

export default Edge
