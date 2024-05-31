import "./style.css";

const canvas = document.querySelector("#gameCanvas");
const canvasContext = canvas.getContext("2d");
let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY = 5;

let player1Score = 0;
let player2Score = 0;

// human player
let paddle1Y = 250;
let paddle1X = 0;

const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;

// ai player
let paddle2Y = canvas.height / 2 - PADDLE_HEIGHT / 2;
let paddle2X = canvas.width - PADDLE_WIDTH;

window.onload = () => {
  console.log("Make sure to like and subscribe :)");
  console.log({ canvas });
  console.log({ canvasContext });
  const framesPerSecond = 60;
  setInterval(() => {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);

  canvas.addEventListener("mousemove", (e) => {
    let { x, y } = calculateMousePosition(e);
    console.log({ x, y });
    paddle1Y = y - PADDLE_HEIGHT / 2;
    // paddle1X = x;
  });
};

function calculateMousePosition(e) {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = e.clientX - rect.left - root.scrollLeft;
  let mouseY = e.clientY - rect.top - root.scrollTop;

  let mouseCords = {
    x: mouseX,
    y: mouseY,
  };

  // console.log({ mouseCords });

  return mouseCords;
}

function ballReset() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function computerMovement() {
  let paddle2YCenter = paddle2Y + PADDLE_HEIGHT / 2;
  if (paddle2YCenter < ballY - 35) {
    paddle2Y += 6;
  } else if (paddle2YCenter > ballY + 35) {
    paddle2Y -= 6;
  }
}

function moveEverything() {
  computerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // x axis collisions

  if (ballX < 0) {
    // left side
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      // if the ball is inside of the paddle
      ballSpeedX = -ballSpeedX;
    } else {
      player2Score++;
      ballReset();
    }
  }

  if (ballX > canvas.width) {
    // right side of canvas
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      // if the ball is inside of the paddle
      ballSpeedX = -ballSpeedX;
    } else {
      player1Score++;
      ballReset();
    }
  }

  // y axis collisions
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
}

function drawBall(centerX, centerY, radius, drawColor) {
  // game ball
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true); // 6.283185307179586
  canvasContext.fill();
}

function drawEverything() {
  // black canvas
  colorRect(0, 0, canvas.width, canvas.height, "#181825");

  drawBall(ballX, ballY, 10, "#f5e0dc");

  // left paddle
  colorRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, "#89b4fa");

  // right paddle
  colorRect(paddle2X, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, "#f38ba8");

  // draw the score
  canvasContext.fillStyle = "#cdd6f4";
  canvasContext.fillText(`Player 1: ${player1Score}`, 20, 20); // player 1 score
  canvasContext.fillText(`Player 2: ${player2Score}`, canvas.width - 80, 20); // player 2 score
}
