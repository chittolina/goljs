import GameOfLife from './GameOfLife'

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start')
  const pauseButton = document.getElementById('pause')
  const stopButton = document.getElementById('stop')
  const randomButton = document.getElementById('random')

  const gameOfLife = new GameOfLife({
    dimensions: [50, 50],
    interval: 1000,
    element: 'board',
  })

  startButton.addEventListener('click', gameOfLife.start)
  pauseButton.addEventListener('click', gameOfLife.pause)
  stopButton.addEventListener('click', gameOfLife.stop)
  randomButton.addEventListener('click', gameOfLife.random)
})
