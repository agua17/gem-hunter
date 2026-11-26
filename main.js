const boardCanvas = document.querySelector(".tablero")
const drawContext = boardCanvas.getContext("2d")

const TILE_SIZE = 100

let minerPositionX = 0
let minerPositionY = 0
let minerDirection = "right"
let currentFrame = 0

const rockImage = new Image()
rockImage.src = "assets/piedras.jpeg"

const minerImages = {
  up: [new Image(), new Image()],
  down: [new Image(), new Image()],
  left: [new Image(), new Image()],
  right: [new Image(), new Image()]
}

minerImages.up[0].src = "assets/miner-up-1.png"
minerImages.up[1].src = "assets/miner-up-2.png"
minerImages.down[0].src = "assets/miner-down-1.png"
minerImages.down[1].src = "assets/miner-down-2.png"
minerImages.left[0].src = "assets/miner-left-1.png"
minerImages.left[1].src = "assets/miner-left-2.png"
minerImages.right[0].src = "assets/miner-right-1.png"
minerImages.right[1].src = "assets/miner-right-2.png"

function initBoard() {
  for (let posY = 0; posY < boardCanvas.height; posY += TILE_SIZE) {
    for (let posX = 0; posX < boardCanvas.width; posX += TILE_SIZE) {
      drawContext.drawImage(rockImage, posX, posY, TILE_SIZE, TILE_SIZE)
    }
  }

  drawContext.clearRect(minerPositionX, minerPositionY, TILE_SIZE, TILE_SIZE)
  drawContext.drawImage(minerImages[minerDirection][currentFrame], minerPositionX, minerPositionY, TILE_SIZE, TILE_SIZE)
}

function moveMiner(event) {
  const pressedKey = event.key
  let hasMoved = false

  drawContext.clearRect(minerPositionX, minerPositionY, TILE_SIZE, TILE_SIZE)

  if (pressedKey === "ArrowRight" && minerPositionX + TILE_SIZE * 2 <= boardCanvas.width) {
    minerPositionX += TILE_SIZE
    minerDirection = "right"
    hasMoved = true
  }
  if (pressedKey === "ArrowLeft" && minerPositionX - TILE_SIZE >= 0) {
    minerPositionX -= TILE_SIZE
    minerDirection = "left"
    hasMoved = true
  }
  if (pressedKey === "ArrowDown" && minerPositionY + TILE_SIZE * 2 <= boardCanvas.height) {
    minerPositionY += TILE_SIZE
    minerDirection = "down"
    hasMoved = true
  }
  if (pressedKey === "ArrowUp" && minerPositionY - TILE_SIZE >= 0) {
    minerPositionY -= TILE_SIZE
    minerDirection = "up"
    hasMoved = true
  }

  if (hasMoved) {
    currentFrame = currentFrame === 0 ? 1 : 0
  }

  drawContext.clearRect(minerPositionX, minerPositionY, TILE_SIZE, TILE_SIZE)
  drawContext.drawImage(minerImages[minerDirection][currentFrame], minerPositionX, minerPositionY, TILE_SIZE, TILE_SIZE)
}

rockImage.onload = initBoard
document.addEventListener("keydown", moveMiner)