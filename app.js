const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time_list')
const timeElem = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0
let score = 0
const colors = ['#fff','#9fcfd8','#e94837','#8931a1','#d10100','#facb05','#a26229','#ac0060']

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
  if(event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', (event) => {
  if(event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createPandomCircle()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createPandomCircle()
  setTime(time)
}

function decreaseTime() {
  if(time === 0) {
    finishGame()
  } else {
    let currentTime = --time
    if(currentTime < 10) {
      currentTime = `0${currentTime}`
    }
    setTime(currentTime)
  }
}

function setTime(value) {
  timeElem.innerHTML = `00:${value}`
}

function finishGame() {
  timeElem.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Your score: <span class="primary">${score}</span></h1>`
}

function createPandomCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 60)
  const color = getRandomColor()
  const {height, width} = board.getBoundingClientRect()
  const xPos = getRandomNumber(0, width - size)
  const yPos = getRandomNumber(0, height - size)

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${yPos}px`
  circle.style.left = `${xPos}px`
  circle.style.background = color
  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max-min) + min)
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}