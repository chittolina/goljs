import { getNeighbors, MAP_DIMENSIONS } from '../src/lib/gof'

it('getNeighbors corner cases', () => {
  const neighborsLeftBottom = [
    [0, 1],
    [1, 1],
    [1, 0],
  ]
  const neighborsLeftTop = [
    [0, MAP_DIMENSIONS[1] - 1],
    [1, MAP_DIMENSIONS[1] - 1],
    [1, MAP_DIMENSIONS[1]],
  ]
  const neighborsRightBottom = [
    [MAP_DIMENSIONS[0], 1],
    [MAP_DIMENSIONS[0] - 1, 1],
    [MAP_DIMENSIONS[0] - 1, 0],
  ]
  const neighborsRightTop = [
    [MAP_DIMENSIONS[0] - 1, MAP_DIMENSIONS[1]],
    [MAP_DIMENSIONS[0] - 1, MAP_DIMENSIONS[1] - 1],
    [MAP_DIMENSIONS[0], MAP_DIMENSIONS[1] - 1],
  ]

  expect(getNeighbors([0, 0])).toEqual(
    expect.arrayContaining(neighborsLeftBottom),
  )
  expect(getNeighbors([0, MAP_DIMENSIONS[1]])).toEqual(
    expect.arrayContaining(neighborsLeftTop),
  )
  expect(getNeighbors([MAP_DIMENSIONS[0], 0])).toEqual(
    expect.arrayContaining(neighborsRightBottom),
  )
  expect(getNeighbors([MAP_DIMENSIONS[0], MAP_DIMENSIONS[1]])).toEqual(
    expect.arrayContaining(neighborsRightTop),
  )
})
