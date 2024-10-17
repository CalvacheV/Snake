const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let snakeDirection = { x: 0, y: 0 };
let apple = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
let score = 0;
let highScore = 0;

function gameLoop() {
    update();
    draw();
}

function update() {
    const newHead = { x: snake[0].x + snakeDirection.x, y: snake[0].y + snakeDirection.y };
    
    if (newHead.x === apple.x && newHead.y === apple.y) {
        score++;
        apple = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
    } else {
        snake.pop();
    }

    if (newHead.x < 0 || newHead.x >= tileCount || newHead.y < 0 || newHead.y >= tileCount || snakeCollision(newHead)) {
        resetGame();
        return;
    }

    snake.unshift(newHead);

    document.querySelector('.score').textContent = score;

    if (score > highScore) {
        highScore = score;
        document.querySelector('.high-score').textContent = highScore;
    }
}

function snakeCollision(head) {
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    snakeDirection = { x: 0, y: 0 };
    score = 0;
    document.querySelector('.score').textContent = score;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar serpiente
    ctx.fillStyle = '#2b8a3e';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // Dibujar manzana
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);
}

function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (snakeDirection.y === 0) {
                snakeDirection = { x: 0, y: -1 };
            }
            break;
        case 'ArrowDown':
            if (snakeDirection.y === 0) {
                snakeDirection = { x: 0, y: 1 };
            }
            break;
        case 'ArrowLeft':
            if (snakeDirection.x === 0) {
                snakeDirection = { x: -1, y: 0 };
            }
            break;
        case 'ArrowRight':
            if (snakeDirection.x === 0) {
                snakeDirection = { x: 1, y: 0 };
            }
            break;
    }
}

document.addEventListener('keydown', handleKeyPress);
setInterval(gameLoop, 100);
