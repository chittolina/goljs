/**
 *  Algorithms module. Contains algorithms used to implement the game created by John Horton Conway.
 * @module src/lib/algorithms
 */

/** @const {Array<number>} */
let mapDimensions = []

/** @const {Array<number>} */
let mapConstraints = []

/**
 * Gets the neighbors for the given x and y position
 * @param {number} x The x coordinate
 * @param {number} y The y coordinate
 * @return {Array<Array<number>>} An array with the found neighbors positions
 */
const getNeighbors = (x, y) => {
  // 1. Corner cases
  // 1.1 Bottom left corner
  if (x == 0 && y == 0) {
    return [
      [0, 1],
      [1, 1],
      [1, 0],
    ]
  }
  // 1.2 Bottom right corner
  if (x == mapConstraints[0] && y == 0) {
    return [
      [mapConstraints[0] - 1, 0],
      [mapConstraints[0] - 1, 1],
      [mapConstraints[0], 1],
    ]
  }
  // 1.3 Top left corner
  if (x == 0 && y == mapConstraints[1]) {
    return [
      [0, mapConstraints[1] - 1],
      [1, mapConstraints[1] - 1],
      [1, mapConstraints[1]],
    ]
  }
  // 1.4 Top right corner
  if (x == mapConstraints[0] && y == mapConstraints[1]) {
    return [
      [mapConstraints[0] - 1, mapConstraints[1]],
      [mapConstraints[0] - 1, mapConstraints[1] - 1],
      [mapConstraints[0], mapConstraints[1] - 1],
    ]
  }

  // 2. Handle extreme left, right, top and bottom cells
  // 2.1 Left
  if (x == 0) {
    return [
      [x, y - 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
      [x, y + 1],
    ]
  }
  // 2.2 Right
  if (x == mapConstraints[0]) {
    return [
      [x, y - 1],
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x, y + 1],
    ]
  }
  // 2.3 Top
  if (y == mapConstraints[1]) {
    return [
      [x + 1, y],
      [x + 1, y - 1],
      [x, y - 1],
      [x - 1, y - 1],
      [x - 1, y],
    ]
  }
  // 2.4 Bottom
  if (y == 0) {
    return [
      [x - 1, 0],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
      [x + 1, y],
    ]
  }

  // 3. Generic case
  return [
    [x - 1, y],
    [x - 1, y + 1],
    [x - 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
    [x + 1, y - 1],
    [x, y + 1],
    [x, y - 1],
  ]
}

/**
 * Gets the new cell state
 * @param {number} currentState The current cell state. "0" for dead and "1" for alive
 * @param {Array<number>} neighbors An array with the current neighbors states
 * @return {number} The new cell state.
 */
const getNewCellState = (currentState, neighbors = []) => {
  const nearbyLivingCells = neighbors.filter(neighbor => neighbor === 1).length
  let newState = currentState

  if (currentState == 0 && nearbyLivingCells === 3) {
    newState = 1
  }
  if (currentState === 1) {
    if (nearbyLivingCells === 2 || nearbyLivingCells === 3) {
      newState = 1
    }
    if (nearbyLivingCells < 2 || nearbyLivingCells > 3) {
      newState = 0
    }
  }

  return newState
}

/**
 * Gets the new map state
 * @param {Array<Array<number>>} currentMapState The current map state
 * @return {Array<Array<number>>} The new map state
 */
const getNewState = currentMapState => {
  const newState = Array(mapDimensions[0])
    .fill()
    .map(() => Array(mapDimensions[1]).fill(0))

  for (let i = 0; i < newState.length; i++) {
    for (let j = 0; j < newState[0].length; j++) {
      const neighbors = getNeighbors(i, j).map(
        ([x, y]) => currentMapState[x][y],
      )
      const currentCellState = currentMapState[i][j]
      const newCellState = getNewCellState(currentCellState, neighbors)

      newState[i][j] = newCellState
    }
  }

  return newState
}

/**
 * Sets the dimensions used on the algorithms
 * @param {number} x The x coordinate
 * @param {number} y The y coordinate
 */
const setMapDimensions = (x, y) => {
  mapDimensions = [x, y]
  mapConstraints = [mapDimensions[0] - 1, mapDimensions[1] - 1]
}

/**
 * Creates a new board
 * @param {Array<Array<number>>} currentMapState The current map state
 * @param {boolean} random Whether to generate random values or not
 * @return {Array<Array<number>>} The new map state
 */
const createBoard = ({ dimensions: [x, y] = [], random = false }) => {
  let board = []

  for (let i = 0; i < x; i++) {
    board[i] = []
    for (let j = 0; j < y; j++) {
      const value = random ? Math.round(Math.random()) : 0
      board[i][j] = value
    }
  }

  return board
}

export {
  createBoard,
  getNeighbors,
  getNewState,
  getNewCellState,
  setMapDimensions,
}
