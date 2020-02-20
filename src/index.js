import GameOfLife from './GameOfLife'

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start')
  const pauseButton = document.getElementById('pause')
  const clearButton = document.getElementById('clear')
  const randomButton = document.getElementById('random')

  const gameOfLife = new GameOfLife({
    dimensions: [100, 100],
    interval: 10,
    element: '#board',
  })

  startButton.addEventListener('click', gameOfLife.start)
  pauseButton.addEventListener('click', gameOfLife.pause)
  clearButton.addEventListener('click', gameOfLife.clear)
  randomButton.addEventListener('click', gameOfLife.random)
})
