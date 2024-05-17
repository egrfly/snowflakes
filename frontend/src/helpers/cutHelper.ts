import Edge from "../models/Edge"
import Point from "../models/Point"
import SnowflakeData from "../models/SnowflakeData"
import { computeDistance } from "./distanceHelper"

const cutStartsAndEndsOnSameEdge = (firstPointEdgeIndex: number, lastPointEdgeIndex: number) =>
  firstPointEdgeIndex === lastPointEdgeIndex

const cutTravelsInSameDirectionAsEdge = (edge: Edge, firstNewPoint: Point, lastNewPoint: Point) =>
  computeDistance(edge.a, firstNewPoint) < computeDistance(edge.a, lastNewPoint)

const getNewEdges = (
  firstPointEdge: Edge,
  lastPointEdge: Edge,
  closestNewPointToStartOfFirstEdge: Point,
  closestNewPointToEndOfLastEdge: Point,
  newPoints: Point[],
  newPointsWithoutLastNewPoint: Point[],
) => [
  {
    a: firstPointEdge.a,
    b: closestNewPointToStartOfFirstEdge,
    isLeftFoldEdge: firstPointEdge.isLeftFoldEdge,
    isRightFoldEdge: firstPointEdge.isRightFoldEdge,
  },
  ...newPointsWithoutLastNewPoint.map((point, pointIndex) => ({
    a: point,
    b: newPoints[pointIndex + 1],
    isLeftFoldEdge: false,
    isRightFoldEdge: false,
  })),
  {
    a: closestNewPointToEndOfLastEdge,
    b: lastPointEdge.b,
    isLeftFoldEdge: lastPointEdge.isLeftFoldEdge,
    isRightFoldEdge: lastPointEdge.isRightFoldEdge,
  },
]

const getNewEdgesForCutThatStartsAndEndsOnSameEdge = (
  originalEdge: Edge,
  closestNewPointToStartOfEdge: Point,
  closestNewPointToEndOfEdge: Point,
  newPoints: Point[],
  newPointsWithoutLastNewPoint: Point[],
) =>
  getNewEdges(
    originalEdge,
    originalEdge,
    closestNewPointToStartOfEdge,
    closestNewPointToEndOfEdge,
    newPoints,
    newPointsWithoutLastNewPoint,
  )

const getSnowflakeDataForCutThatStartsAndEndsOnSameEdge = (
  points: Point[],
  currentCutPointSequence: Point[],
  firstNewPoint: Point,
  lastNewPoint: Point,
  edges: Edge[],
  edgeIndex: number,
) => {
  let newPoints: Point[]
  let newEdges: Edge[]
  if (cutTravelsInSameDirectionAsEdge(edges[edgeIndex], firstNewPoint, lastNewPoint)) {
    newPoints = [...currentCutPointSequence, lastNewPoint]
    newEdges = getNewEdgesForCutThatStartsAndEndsOnSameEdge(
      edges[edgeIndex],
      firstNewPoint,
      lastNewPoint,
      newPoints,
      currentCutPointSequence,
    )
  } else {
    newPoints = [...currentCutPointSequence, lastNewPoint].reverse()
    newEdges = getNewEdgesForCutThatStartsAndEndsOnSameEdge(
      edges[edgeIndex],
      lastNewPoint,
      firstNewPoint,
      newPoints,
      currentCutPointSequence.slice().reverse(),
    )
  }
  return {
    points: [...points.slice(0, edgeIndex + 1), ...newPoints, ...points.slice(edgeIndex + 1)],
    edges: [...edges.slice(0, edgeIndex), ...newEdges, ...edges.slice(edgeIndex + 1)],
  }
}

const getSnowflakeDataForCutThatStartsAndEndsOnDifferentEdges = (
  points: Point[],
  newPoints: Point[],
  firstNewPoint: Point,
  lastNewPoint: Point,
  edges: Edge[],
  firstPointEdgeIndex: number,
  lastPointEdgeIndex: number,
): SnowflakeData => {
  const newEdges: Edge[] = getNewEdges(
    edges[firstPointEdgeIndex],
    edges[lastPointEdgeIndex],
    firstNewPoint,
    lastNewPoint,
    newPoints,
    newPoints.slice(0, -1),
  )
  const newAndOldPoints = [
    ...points.slice(0, firstPointEdgeIndex < lastPointEdgeIndex ? firstPointEdgeIndex + 1 : 0),
    ...newPoints,
    ...points.slice(
      lastPointEdgeIndex + 1,
      firstPointEdgeIndex < lastPointEdgeIndex ? undefined : firstPointEdgeIndex + 1,
    ),
  ]
  const newAndOldEdges = [
    ...edges.slice(0, firstPointEdgeIndex < lastPointEdgeIndex ? firstPointEdgeIndex : 0),
    ...newEdges,
    ...edges.slice(lastPointEdgeIndex + 1, firstPointEdgeIndex < lastPointEdgeIndex ? undefined : firstPointEdgeIndex),
  ]
  // Realign points and edges if they are now out of sync
  if (newAndOldEdges[0].a.x !== newAndOldPoints[0].x || newAndOldEdges[0].a.y !== newAndOldPoints[0].y) {
    newAndOldPoints.unshift(newAndOldPoints.pop()!)
  }
  return {
    points: newAndOldPoints,
    edges: newAndOldEdges,
  }
}

const snowflakeWouldDisintegrate = (edges: Edge[]) =>
  !(edges.some((edge) => edge.isLeftFoldEdge) && edges.some((edge) => edge.isRightFoldEdge))

const getOuterSnowflake = (option1SnowflakeData: SnowflakeData, option2SnowflakeData: SnowflakeData) => {
  const option1LeastYOffset = Math.min(...option1SnowflakeData.points.map((point) => point.y))
  const option2LeastYOffset = Math.min(...option2SnowflakeData.points.map((point) => point.y))
  if (option1LeastYOffset < option2LeastYOffset) {
    return option1SnowflakeData
  } else {
    return option2SnowflakeData
  }
}

export const getSnowflakeDataAtEndOfCut = (
  points: Point[],
  currentCutPointSequence: Point[],
  firstNewPoint: Point,
  lastNewPoint: Point,
  edges: Edge[],
  firstPointEdgeIndex: number,
  edgeIndex: number,
): SnowflakeData => {
  const lastPointEdgeIndex = edgeIndex
  if (cutStartsAndEndsOnSameEdge(firstPointEdgeIndex, lastPointEdgeIndex)) {
    return getSnowflakeDataForCutThatStartsAndEndsOnSameEdge(
      points,
      currentCutPointSequence,
      firstNewPoint,
      lastNewPoint,
      edges,
      edgeIndex,
    )
  } else {
    const option1NewPoints = [...currentCutPointSequence, lastNewPoint]
    const option1SnowflakeData = getSnowflakeDataForCutThatStartsAndEndsOnDifferentEdges(
      points,
      option1NewPoints,
      firstNewPoint,
      lastNewPoint,
      edges,
      firstPointEdgeIndex,
      lastPointEdgeIndex,
    )
    const option2NewPoints = [...currentCutPointSequence, lastNewPoint].reverse()
    const option2SnowflakeData = getSnowflakeDataForCutThatStartsAndEndsOnDifferentEdges(
      points,
      option2NewPoints,
      lastNewPoint,
      firstNewPoint,
      edges,
      lastPointEdgeIndex,
      firstPointEdgeIndex,
    )
    if (snowflakeWouldDisintegrate(option1SnowflakeData.edges)) {
      return option2SnowflakeData
    } else if (snowflakeWouldDisintegrate(option2SnowflakeData.edges)) {
      return option1SnowflakeData
    } else {
      return getOuterSnowflake(option1SnowflakeData, option2SnowflakeData)
    }
  }
}
