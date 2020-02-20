import {
  getNeighbors,
  getNewState,
  getNewCellState,
  createBoard,
  setMapDimensions,
} from '../src/lib/algorithms'

describe('Game of Life algorithms', () => {
  const mapDimensions = [10, 10]
  const board = createBoard({ dimensions: mapDimensions })

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

      expect(getNeighbors(0, 0, board)).toEqual(
        expect.arrayContaining(neighborsLeftBottom),
      )
      expect(getNeighbors(0, mapDimensions[1], board)).toEqual(
        expect.arrayContaining(neighborsLeftTop),
      )
      expect(getNeighbors(mapDimensions[0], 0, board)).toEqual(
        expect.arrayContaining(neighborsRightBottom),
      )
      expect(getNeighbors(mapDimensions[0], mapDimensions[1], board)).toEqual(
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
      expect(getNeighbors(0, 2, board)).toEqual(
        expect.arrayContaining(leftNeighbors),
      )
      expect(getNeighbors(99, 1, board)).toEqual(
        expect.arrayContaining(rightNeighbors),
      )
      expect(getNeighbors(1, 99, board)).toEqual(
        expect.arrayContaining(topNeighbors),
      )
      expect(getNeighbors(2, 0, board)).toEqual(
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
      expect(getNeighbors(50, 50, board)).toEqual(
        expect.arrayContaining(neighbors),
      )
    })
  })

  describe('getNewCellState', () => {
    it('switches from dead to alive it surrounded by 3 living cells', () => {
      const board = createBoard({ dimensions: mapDimensions })
      board[1][0] = 1
      board[2][0] = 0
      board[3][0] = 1
      board[2][1] = 1

      expect(getNewCellState([2, 0], board)).toEqual(1)
    })

    it('remains alive if surrounded by 2 or 3 living cells', () => {
      const board = createBoard({ dimensions: [10, 10] })
      board[0][0] = 1
      board[0][1] = 1
      board[1][0] = 1

      board[0][3] = 1
      board[0][4] = 1
      board[1][4] = 1
      board[1][3] = 1

      expect(getNewCellState([0, 0], board)).toEqual(1)
      expect(getNewCellState([0, 3], board)).toEqual(1)
    })

    it('switches from alive to dead if surrounded by more than 3 living cells due overpopulation', () => {
      const board = createBoard({ dimensions: [10, 10] })
      board[2][0] = 1
      board[3][0] = 1
      board[4][0] = 1
      board[3][1] = 1
      board[2][1] = 1

      expect(getNewCellState([3, 0], board)).toEqual(0)
    })

    it('switches from alive to dead if surrounded by less than 2 living cells due underpopulation', () => {
      const board = createBoard({ dimensions: [10, 10] })
      board[2][0] = 1
      board[3][0] = 1

      expect(getNewCellState([2, 0], board)).toEqual(0)
      expect(getNewCellState([3, 0], board)).toEqual(0)
    })
  })

  describe('getNewState', () => {
    it('returns a new state', () => {
      const currentState = createBoard({ dimensions: [10, 10] })
      currentState[0][0] = 1
      currentState[0][1] = 1
      currentState[0][2] = 1

      const expectedState = createBoard({ dimensions: [10, 10] })
      expectedState[0][0] = 0
      expectedState[0][2] = 0

      expect(getNewState(currentState)).toEqual(
        expect.arrayContaining(expectedState),
      )
    })
  })

  describe('createBoard', () => {
    it('creates a board', () => {
      const dimensions = [10, 10]
      const board = createBoard({ dimensions, random: false })
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
          expect(board[i][j]).toEqual(0)
        }
      }
    })
  })
})
