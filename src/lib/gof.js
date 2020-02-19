const MAP_DIMENSIONS = [99, 99]

const getNeighbors = ([x, y] = []) => {
  // Handle corner cases
  if (x == 0 && y == 0) {
    return [
      [0, 1],
      [1, 1],
      [1, 0],
    ]
  }
  if (x == 0 && y == MAP_DIMENSIONS[1]) {
    return [
      [0, MAP_DIMENSIONS[1] - 1],
      [1, MAP_DIMENSIONS[1] - 1],
      [1, MAP_DIMENSIONS[1]],
    ]
  }
  if (x == MAP_DIMENSIONS[0] && y == 0) {
    return [
      [MAP_DIMENSIONS[0] - 1, 0],
      [MAP_DIMENSIONS[0] - 1, 1],
      [MAP_DIMENSIONS[0], 1],
    ]
  }
  if (x == MAP_DIMENSIONS[0] && y == MAP_DIMENSIONS[1]) {
    return [
      [MAP_DIMENSIONS[0] - 1, MAP_DIMENSIONS[1]],
      [MAP_DIMENSIONS[0] - 1, MAP_DIMENSIONS[1] - 1],
      [MAP_DIMENSIONS[0], MAP_DIMENSIONS[1] - 1],
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
  if (x == MAP_DIMENSIONS[0]) {
    return [
      [x, y - 1],
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x, y + 1],
    ]
  }
  // Top
  if (y == MAP_DIMENSIONS[1]) {
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
  return []
}

export { getNeighbors, MAP_DIMENSIONS }
