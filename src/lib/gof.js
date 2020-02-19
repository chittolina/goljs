/**
 *  Game of Life module. Contains the algorithms from the game created by John Horton Conway.
 * @module src/lib/gof
 */

/** @const {Array<number>} */
const MAP_DIMENSIONS = [10, 10]

/** @const {Array<number>} */
const MAP_CONSTRAINTS = [MAP_DIMENSIONS[0] - 1, MAP_DIMENSIONS[1] - 1]

/**
 * Gets the neighbors for the given x and y position
 * @param {Array} [coordinates=[]] The coordinates array. First element represents "x", second element represents "y"
 * @return {Array<Array<number>>} An array with the found neighbors positions
 */
const getNeighbors = ([x, y] = []) => {
  // Handle corner cases
  if (x == 0 && y == 0) {
    return [
      [0, 1],
      [1, 1],
      [1, 0],
    ]
  }
  if (x == 0 && y == MAP_CONSTRAINTS[1]) {
    return [
      [0, MAP_CONSTRAINTS[1] - 1],
      [1, MAP_CONSTRAINTS[1] - 1],
      [1, MAP_CONSTRAINTS[1]],
    ]
  }
  if (x == MAP_CONSTRAINTS[0] && y == 0) {
    return [
      [MAP_CONSTRAINTS[0] - 1, 0],
      [MAP_CONSTRAINTS[0] - 1, 1],
      [MAP_CONSTRAINTS[0], 1],
    ]
  }
  if (x == MAP_CONSTRAINTS[0] && y == MAP_CONSTRAINTS[1]) {
    return [
      [MAP_CONSTRAINTS[0] - 1, MAP_CONSTRAINTS[1]],
      [MAP_CONSTRAINTS[0] - 1, MAP_CONSTRAINTS[1] - 1],
      [MAP_CONSTRAINTS[0], MAP_CONSTRAINTS[1] - 1],
    ]
  }

  // Handle extreme left, right, top and bottom cells
  // Left
  if (x == 0) {
    return [
      [x, y - 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
      [x, y + 1],
    ]
  }
  // Right
  if (x == MAP_CONSTRAINTS[0]) {
    return [
      [x, y - 1],
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x, y + 1],
    ]
  }
  // Top
  if (y == MAP_CONSTRAINTS[1]) {
    return [
      [x + 1, y],
      [x + 1, y - 1],
      [x, y - 1],
      [x - 1, y - 1],
      [x - 1, y],
    ]
  }
  // Bottom
  if (y == 0) {
    return [
      [x - 1, 0],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
      [x + 1, y],
    ]
  }

  // Generic case
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
  const livingCells = neighbors.filter(neighbor => neighbor === 1).length

  let newState = currentState

  if (currentState == 0 && livingCells === 3) {
    newState = 1
  }
  if (currentState === 1) {
    if (livingCells === 2 || livingCells === 3) {
      newState = 1
    }
    if (livingCells < 2 || livingCells > 3) {
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
  const newState = Array(MAP_DIMENSIONS[0])
    .fill()
    .map(() => Array(MAP_DIMENSIONS[1]).fill(0))

  for (let i = 0; i < newState.length; i++) {
    for (let j = 0; j < newState[0].length; j++) {
      const neighbors = getNeighbors([i, j]).map(
        ([x, y]) => currentMapState[x][y],
      )
      const currentCellState = currentMapState[i][j]
      const newCellState = getNewCellState(currentCellState, neighbors)

      newState[i][j] = newCellState
    }
  }

  return newState
}

export { getNeighbors, getNewState, getNewCellState, MAP_DIMENSIONS }
