import { createBoard, getNewState } from './lib/algorithms'

export default class GameOfLife {
  /**
   * Creates a new board of GameOfLife
   * @param {Object} params Parameters object
   * @param {Array<Array>} params.dimensions The map dimensions
   * @param {number} params.interval The interval between generations
   * @param {string} params.element The query selector of the element to use as a container for the board
   */
  constructor({ dimensions, interval, element }) {
    this.dimensions = dimensions
    this.interval = interval
    this.timer = null

    this.running = false
    this.currentState = createBoard({
      dimensions: [dimensions[0], dimensions[1]],
    })
    this.currentGeneration = 0

    this.container = document.querySelector(element)
    this.canvas = document.createElement('canvas')
    this.container.appendChild(this.canvas)
    this.canvasWidth = 1000
    this.canvasHeight = 1000

    // Factors used to scale the given dimensions to the canvas size
    this.xFactor = this.canvasWidth / dimensions[0]
    this.yFactor = this.canvasHeight / dimensions[1]

    this.canvas.width = this.canvasWidth
    this.canvas.height = this.canvasHeight

    this.canvas.addEventListener('click', this.onCellClick)

    this.random()
    this.updateBoard()
  }

  /**
   * Starts the game
   */
  start = () => {
    if (!this.timer) {
      this.timer = setInterval(this.tick, this.interval)
      this.running = true
    }
  }

  /**
   * Pauses the game
   */
  pause = () => {
    clearInterval(this.timer)
    this.timer = null
    this.running = false
  }

  /**
   * Pauses the game and clears the map
   */
  clear = () => {
    this.pause()
    this.currentState = createBoard({
      dimensions: [this.dimensions[0], this.dimensions[1]],
    })
    this.currentGeneration = 0
    this.updateBoard()
  }

  /**
   * Changes the current tick interval
   * @param {Event} event The input event received by the slider
   */
  changeInterval = event => {
    const {
      target: { value: interval },
    } = event
    this.interval = interval

    this.pause()
    this.start()
  }

  /**
   * Generates a random pattern on the map
   */
  random = () => {
    this.clear()
    this.currentState = createBoard({
      dimensions: [this.dimensions[0], this.dimensions[1]],
      random: true,
    })
    this.currentGeneration = 0
    this.updateBoard()
  }

  /**
   * Ticks the game (gets the next generation and updates the map)
   */
  tick = () => {
    const newState = getNewState(this.currentState)
    this.currentState = newState
    this.currentGeneration++

    this.updateBoard()
  }

  /**
   * Updates the board accordingly to the current state
   */
  updateBoard = () => {
    const ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    const { currentState, currentGeneration, xFactor, yFactor } = this
    for (let i = 0; i < currentState.length; i++) {
      for (let j = 0; j < currentState[0].length; j++) {
        if (currentState[i][j] === 1) {
          // If cell is alive
          ctx.fillStyle = '#581845'
          ctx.fillRect(i * xFactor, j * yFactor, xFactor, yFactor)
        } else {
          // If cell is dead
          ctx.fillStyle = '#900C3F'
          ctx.fillRect(i * xFactor, j * yFactor, xFactor, yFactor)
        }
      }
    }

    document.getElementById('generation-count').innerHTML = currentGeneration
  }

  /**
   * Callback called to update the board after clicking on a cell.
   * If the game is currently running this method has no effect.
   * @param event The click event
   */
  onCellClick = event => {
    if (this.running) {
      return
    }

    const rect = this.canvas.getBoundingClientRect()

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Map the received values to our original map size
    const scaledX = Math.floor(x / this.xFactor)
    const scaledY = Math.floor(y / this.yFactor)

    const newState = [...this.currentState]
    newState[scaledX][scaledY] = 1 - newState[scaledX][scaledY]

    this.currentState = newState
    this.updateBoard()
  }
}
