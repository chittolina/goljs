/**
 *  Algorithms module. Contains algorithms used to implement the game created by John Horton Conway.
 * @module src/lib/algorithms
 */

/**
 * Gets the neighbors positions for the given x and y position
 * @param {number} x The x coordinate
 * @param {number} y The y coordinate
 * @return {Array<Array<number>>} An array with the found neighbors positions
 */
const getNeighbors = (x, y, map) => {
  const mapConstraints = [map[0].length - 1, map[1].length - 1]
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
 * @param {number} cellPosition The cell position
 * @param {Array<number>} currentMapState An array with the current map state
 * @return {number} The new cell state.
 */
const getNewCellState = ([x, y] = [], currentMapState) => {
  const neighbors = getNeighbors(x, y, currentMapState).map(
    ([i, j]) => currentMapState[i][j],
  )

  const nearbyLivingCells = neighbors.filter(neighbor => neighbor === 1).length
  let currentState = currentMapState[x][y]
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
  const newState = createBoard({
    dimensions: [currentMapState.length, currentMapState[0].length],
  })

  for (let i = 0; i < newState.length; i++) {
    for (let j = 0; j < newState[0].length; j++) {
      const newCellState = getNewCellState([i, j], currentMapState)

      newState[i][j] = newCellState
    }
  }

  return newState
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

export { createBoard, getNeighbors, getNewState, getNewCellState }
