import "./style.css";

const canvas = document.querySelector("#gameCanvas");
const canvasContext = canvas.getContext("2d");
let ballX = 50;
let ballY = 100;
let ballSpeedX = 10;
let ballSpeedY = 5;

window.onload = () => {
  console.log("Make sure to like and subscribe :)");
  console.log({ canvas });
  console.log({ canvasContext });
  const framesPerSecond = 60;
  setInterval(() => {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);
};

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function moveEverything() {
  ballX += ballSpeedX;
  ballSpeedX += 0.5; // added accelration
  if (ballX > canvas.width) {
    ballSpeedX = -ballSpeedX;
  } else if (ballX < 0) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  } else if (ballY < 0) {
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
  console.log({ ballX });
  // black canvas
  colorRect(0, 0, canvas.width, canvas.height, "#181825");

  drawBall(ballX, ballY, 10, "#cba6f7");

  const whiteBoxWidth = 10;
  const whiteBoxHeight = 100;

  const paddleYPosition = canvas.height / 2 - whiteBoxHeight / 2;

  // left paddle
  colorRect(0, paddleYPosition, whiteBoxWidth, whiteBoxHeight, "#cdd6f4");
}
