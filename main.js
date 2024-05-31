import "./style.css";

const canvas = document.querySelector("#gameCanvas");
const canvasContext = canvas.getContext("2d");
let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY = 5;

// human player
let paddle1Y = 250;
let paddle1X = 0;

// ai player
let paddle2Y = 0;
let paddle2X = 0;

const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;

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
    paddle1X = x;
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

function moveEverything() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX > canvas.width) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      // if the ball is inside of the paddle
      ballSpeedX = -ballSpeedX;
    } else ballReset();
  }

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
  // console.log({ ballX });
  // black canvas
  colorRect(0, 0, canvas.width, canvas.height, "#181825");

  drawBall(ballX, ballY, 10, "#f38ba8");

  // left paddle
  colorRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, "#cdd6f4");
}
