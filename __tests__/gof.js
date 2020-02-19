import { getNeighbors, MAP_DIMENSIONS } from '../src/lib/gof'

describe('getNeighbors', () => {
  it('corner cases', () => {
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

  it('extreme left, right, top and bottom', () => {
    const leftNeighbors = [
      [0, 1],
      [1, 1],
      [1, 2],
      [1, 3],
      [0, 3],
    ]
    const rightNeighbors = [
      [99, 0],
      [98, 0],
      [98, 1],
      [98, 2],
      [99, 2],
    ]
    const topNeighbors = [
      [2, 99],
      [2, 98],
      [1, 98],
      [0, 98],
      [0, 99],
    ]
    const bottomNeighbors = [
      [1, 0],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 0],
    ]
    expect(getNeighbors([0, 2])).toEqual(expect.arrayContaining(leftNeighbors))
    expect(getNeighbors([99, 1])).toEqual(
      expect.arrayContaining(rightNeighbors),
    )
    expect(getNeighbors([1, 99])).toEqual(expect.arrayContaining(topNeighbors))
    expect(getNeighbors([2, 0])).toEqual(
      expect.arrayContaining(bottomNeighbors),
    )
  })

  describe('generic case', () => {
    const neighbors = [
      [49, 50],
      [49, 51],
      [49, 49],
      [51, 50],
      [51, 51],
      [51, 49],
    ]
    expect(getNeighbors([50, 50])).toEqual(expect.arrayContaining(neighbors))
  })
})
