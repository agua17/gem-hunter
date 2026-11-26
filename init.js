
const canvas = document.getElementById("miCanvas")
const ctx = canvas.getContext("2d")

let animationId

const miner = {
    positionX: 700,
    positionY: 550,
    width: 50,
    height: 30,
    lives: 3,
    direction: "up"
}

// Fondo
const background = new Image()
background.src = "img/background.png"

// Imágenes del minero
const minerImages = {
    up: new Image(),
    down: new Image(),
    left: new Image(),
    right: new Image()
}

minerImages.up.src = "img/miner-up-1.png"
minerImages.down.src = "img/miner-down-1.png"
minerImages.left.src = "img/miner-left-1.png"
minerImages.right.src = "img/miner-right-1.png"

// Vidas
function drawLives() {
    ctx.font = "25px VT323"
    ctx.fillStyle = "#ffffff"
    ctx.fillText(`LIVES: ${miner.lives}`, canvas.width - 120, 25)
}

// Dibujar minero
function drawMiner() {
    const image = minerImages[miner.direction]

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

// Dibujar juego
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (background.complete && background.naturalWidth > 0) {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    }

    drawLives()
    drawMiner()

    animationId = requestAnimationFrame(drawGame)
}

// Movimiento del minero
document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowUp" && miner.positionY - 50 >= 0) {
        miner.positionY -= 50
        miner.direction = "up"
    }

    if (event.key === "ArrowDown" && miner.positionY + miner.height + 50 <= canvas.height) {
        miner.positionY += 50
        miner.direction = "down"
    }

    if (event.key === "ArrowRight" && miner.positionX + miner.width + 50 <= canvas.width) {
        miner.positionX += 50
        miner.direction = "right"
    }

    if (event.key === "ArrowLeft" && miner.positionX - 50 >= 0) {
        miner.positionX -= 50
        miner.direction = "left"
    }
})

// Iniciar juego
drawGame()
