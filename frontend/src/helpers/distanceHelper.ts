import Point from "../models/Point"

export const computeDistance = (pointA: Point, pointB: Point) => {
  return Math.sqrt((pointA.x - pointB.x) * (pointA.x - pointB.x) + (pointA.y - pointB.y) * (pointA.y - pointB.y))
}
