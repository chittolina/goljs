import {
  getNeighbors,
  getNewState,
  getNewCellState,
  createBoard,
} from '../src/lib/algorithms'

describe('Game of Life algorithms', () => {
  describe('getNeighbors', () => {
    it('corner cases', () => {
      const dimensions = [10, 10]
      const board = createBoard({ dimensions })

      const neighborsLeftBottom = [
        [0, 1],
        [1, 1],
        [1, 0],
      ]
      const neighborsLeftTop = [
        [0, dimensions[1] - 1],
        [1, dimensions[1] - 1],
        [1, dimensions[1]],
      ]
      const neighborsRightBottom = [
        [dimensions[0], 1],
        [dimensions[0] - 1, 1],
        [dimensions[0] - 1, 0],
      ]
      const neighborsRightTop = [
        [dimensions[0] - 1, dimensions[1]],
        [dimensions[0] - 1, dimensions[1] - 1],
        [dimensions[0], dimensions[1] - 1],
      ]

      expect(getNeighbors(0, 0, board)).toEqual(
        expect.arrayContaining(neighborsLeftBottom),
      )
      expect(getNeighbors(0, dimensions[1], board)).toEqual(
        expect.arrayContaining(neighborsLeftTop),
      )
      expect(getNeighbors(dimensions[0], 0, board)).toEqual(
        expect.arrayContaining(neighborsRightBottom),
      )
      expect(getNeighbors(dimensions[0], dimensions[1], board)).toEqual(
        expect.arrayContaining(neighborsRightTop),
      )
    })

    it('extreme left, right, top and bottom', () => {
      const dimensions = [10, 10]
      const board = createBoard({ dimensions })

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
      const dimensions = [10, 10]
      const board = createBoard({ dimensions })

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
      const dimensions = [10, 10]
      const board = createBoard({ dimensions })

      board[1][0] = 1
      board[2][0] = 0
      board[3][0] = 1
      board[2][1] = 1

      expect(getNewCellState([2, 0], board)).toEqual(1)
    })

    it('remains alive if surrounded by 2 or 3 living cells', () => {
      const dimensions = [10, 10]
      const board = createBoard({ dimensions })
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
      const dimensions = [10, 10]
      const board = createBoard({ dimensions })
      board[2][0] = 1
      board[3][0] = 1
      board[4][0] = 1
      board[3][1] = 1
      board[2][1] = 1

      expect(getNewCellState([3, 0], board)).toEqual(0)
    })

    it('switches from alive to dead if surrounded by less than 2 living cells due underpopulation', () => {
      const dimensions = [10, 10]
      const board = createBoard({ dimensions })
      board[2][0] = 1
      board[3][0] = 1

      expect(getNewCellState([2, 0], board)).toEqual(0)
      expect(getNewCellState([3, 0], board)).toEqual(0)
    })
  })

  describe('getNewState', () => {
    it('returns a new state', () => {
      const dimensions = [10, 10]
      const currentState = createBoard({ dimensions })
      currentState[0][0] = 1
      currentState[0][1] = 1
      currentState[0][2] = 1

      const expectedState = createBoard({ dimensions })
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
