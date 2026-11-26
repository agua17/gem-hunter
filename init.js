
const canvas = document.getElementById("miCanvas")
const ctx = canvas.getContext("2d")
const livesElement = document.getElementById("lives")
const timerElement = document.getElementById("timer")

// Tiempo del juego
let timeLeft = 180
let timerInterval
let animationId

// Tamaño del tablero
const tileSize = 102
const rows = 14
const columns = 14

// Dibujar vidas
function drawLives() {
    livesElement.textContent = `VIDAS: ${miner.lives}`
}
// Minero
const miner = {
    positionX: 15,
    positionY: 5,
    width: 70,
    height: 90,
    direction: "right",
    currentFrame: 0,
    lives: 3,
    movement: null
}

// Imágenes del minero
const minerImages = {
    up: [new Image(), new Image()],
    down: [new Image(), new Image()],
    left: [new Image(), new Image()],
    right: [new Image(), new Image()]
}

// Cargar sprites
minerImages.up[0].src = "img/miner-up-1.png"
minerImages.up[1].src = "img/miner-up-2.png"

minerImages.down[0].src = "img/miner-down-1.png"
minerImages.down[1].src = "img/miner-down-2.png"

minerImages.left[0].src = "img/miner-left-1.png"
minerImages.left[1].src = "img/miner-left-2.png"

minerImages.right[0].src = "img/miner-right-1.png"
minerImages.right[1].src = "img/miner-right-2.png"

// Fondo de arena
function drawBackground() {
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            const x = column * tileSize
            const y = row * tileSize

            ctx.fillStyle = (row + column) % 2 === 0
                ? "#e9c58f"
                : "#c49866"

            ctx.fillRect(x, y, tileSize, tileSize)
        }
    }
}

// Dibujar minero
function drawMiner() {
    const image = minerImages[miner.direction][miner.currentFrame]

    if (image.complete && image.naturalWidth > 0) {
        ctx.drawImage(
            image,
            miner.positionX,
            miner.positionY,
            miner.width,
            miner.height
        )
    }
}



// Movimiento del minero
function updateMinerMovement(timestamp) {
    if (!miner.movement) return

    const progress = Math.min(
        (timestamp - miner.movement.startedAt) / miner.movement.duration,
        1
    )

    miner.positionX = miner.movement.startX
        + (miner.movement.targetX - miner.movement.startX) * progress

    miner.positionY = miner.movement.startY
        + (miner.movement.targetY - miner.movement.startY) * progress

    if (progress === 1) {
        miner.positionX = miner.movement.targetX
        miner.positionY = miner.movement.targetY
        miner.movement = null
        miner.currentFrame = 0
    }
}

function moveMiner(direction) {
    if (miner.movement) return

    let targetX = miner.positionX
    let targetY = miner.positionY

    if (direction === "up" && miner.positionY - tileSize >= 5) {
        targetY -= tileSize
    } else if (direction === "down" && miner.positionY + tileSize + miner.height <= canvas.height - 5) {
        targetY += tileSize
    } else if (direction === "right" && miner.positionX + tileSize + miner.width <= canvas.width - 15) {
        targetX += tileSize
    } else if (direction === "left" && miner.positionX - tileSize >= 15) {
        targetX -= tileSize
    }

    if (targetX === miner.positionX && targetY === miner.positionY) return

    miner.direction = direction
    miner.currentFrame = 1

    miner.movement = {
        startX: miner.positionX,
        startY: miner.positionY,
        targetX,
        targetY,
        startedAt: performance.now(),
        duration: 200
    }
}

// Cronómetro
function drawTimer() {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`
}

function startTimer() {
    timerInterval = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--
        } else {
            clearInterval(timerInterval)
        }
    }, 1000)
}

// Dibujar juego
function drawGame(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    updateMinerMovement(timestamp)
    drawBackground()
    drawLives()
    drawTimer()
    drawMiner()

    animationId = requestAnimationFrame(drawGame)
}

// Controles del minero
document.addEventListener("keydown", function (event) {
    if (event.repeat) return

    const directions = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right"
    }

    const direction = directions[event.key]

    if (direction) moveMiner(direction)
})

// Iniciar juego
startTimer()
drawGame()
