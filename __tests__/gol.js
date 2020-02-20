import {
  getNeighbors,
  getNewState,
  getNewCellState,
  setMapDimensions,
} from '../src/lib/gol'

describe('Game of Life algorithms', () => {
  const mapDimensions = [100, 100]
  setMapDimensions(mapDimensions)

  describe('getNeighbors', () => {
    it('corner cases', () => {
      const neighborsLeftBottom = [
        [0, 1],
        [1, 1],
        [1, 0],
      ]
      const neighborsLeftTop = [
        [0, mapDimensions[1] - 1],
        [1, mapDimensions[1] - 1],
        [1, mapDimensions[1]],
      ]
      const neighborsRightBottom = [
        [mapDimensions[0], 1],
        [mapDimensions[0] - 1, 1],
        [mapDimensions[0] - 1, 0],
      ]
      const neighborsRightTop = [
        [mapDimensions[0] - 1, mapDimensions[1]],
        [mapDimensions[0] - 1, mapDimensions[1] - 1],
        [mapDimensions[0], mapDimensions[1] - 1],
      ]

      expect(getNeighbors(0, 0)).toEqual(
        expect.arrayContaining(neighborsLeftBottom),
      )
      expect(getNeighbors(0, mapDimensions[1])).toEqual(
        expect.arrayContaining(neighborsLeftTop),
      )
      expect(getNeighbors(mapDimensions[0], 0)).toEqual(
        expect.arrayContaining(neighborsRightBottom),
      )
      expect(getNeighbors(mapDimensions[0], mapDimensions[1])).toEqual(
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
      expect(getNeighbors(0, 2)).toEqual(expect.arrayContaining(leftNeighbors))
      expect(getNeighbors(99, 1)).toEqual(
        expect.arrayContaining(rightNeighbors),
      )
      expect(getNeighbors(1, 99)).toEqual(expect.arrayContaining(topNeighbors))
      expect(getNeighbors(2, 0)).toEqual(
        expect.arrayContaining(bottomNeighbors),
      )
    })

    it('generic case', () => {
      const neighbors = [
        [49, 50],
        [49, 51],
        [49, 49],
        [51, 50],
        [51, 51],
        [51, 49],
        [50, 49],
        [50, 51],
      ]
      expect(getNeighbors(50, 50)).toEqual(expect.arrayContaining(neighbors))
    })
  })

  describe('getNewCellState', () => {
    it('switches from dead to alive it surrounded by 3 living cells', () => {
      const currentState = 0
      const neighbors = [1, 1, 1, 0, 0]

      expect(getNewCellState(currentState, neighbors)).toEqual(1)
    })

    it('remains alive if surrounded by 2 or 3 living cells', () => {
      const currentState = 1
      const neighbors1 = [1, 1, 0, 0, 0]
      const neighbors2 = [1, 1, 1, 0, 0]

      expect(getNewCellState(currentState, neighbors1)).toEqual(1)
      expect(getNewCellState(currentState, neighbors2)).toEqual(1)
    })

    it('switches from alive to dead if surrounded by more than 3 living cells due overpopulation', () => {
      const currentState = 1
      const neighbors = [1, 1, 1, 1, 0]

      expect(getNewCellState(currentState, neighbors)).toEqual(0)
    })

    it('switches from alive to dead if surrounded by less than 2 living cells due underpopulation', () => {
      const currentState = 1
      const neighbors = [1, 0, 0, 0, 0]

      expect(getNewCellState(currentState, neighbors)).toEqual(0)
    })
  })

  describe('getNewState', () => {
    it('should return a new state', () => {
      const currentState = Array(mapDimensions[0])
        .fill()
        .map(() => Array(mapDimensions[1]).fill(0))
      currentState[0][0] = 1
      currentState[0][1] = 1
      currentState[0][2] = 1

      const expectedState = Array(mapDimensions[0])
        .fill()
        .map(() => Array(mapDimensions[1]).fill(0))
      expectedState[0][0] = 0
      expectedState[0][2] = 0

      expect(getNewState(currentState)).toEqual(
        expect.arrayContaining(expectedState),
      )
    })
  })
})
