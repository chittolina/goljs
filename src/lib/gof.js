const MAP_DIMENSIONS = [99, 99]

const getNeighbors = ([x, y] = []) => {
  // Handle corner cases
  if (x == 0 || x == MAP_DIMENSIONS[0] || y == 0 || y == MAP_DIMENSIONS[1]) {
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
  }

  return []
}

export { getNeighbors, MAP_DIMENSIONS }
