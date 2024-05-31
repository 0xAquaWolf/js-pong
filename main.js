import "./style.css";

const canvas = document.querySelector("#gameCanvas");
const canvasContext = canvas.getContext("2d");
let ballX = 50;
let ballY = 50;

window.onload = () => {
  console.log("Make sure to like and subscribe :)");
  console.log({ canvas });
  console.log({ canvasContext });
  const framesPerSecond = 30;
  setInterval(() => {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);
};

function moveEverything() {
  ballX += 10;
}

function drawEverything() {
  console.log({ ballX });
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  canvasContext.fillStyle = "purple";
  canvasContext.fillRect(ballX, ballY, 20, 20);

  canvasContext.fillStyle = "white";

  const whiteBoxWidth = 10;
  const whiteBoxHeight = 100;

  console.log(canvas.height);

  const paddleYPosition = canvas.height / 2 - whiteBoxHeight / 2;

  canvasContext.fillRect(0, paddleYPosition, whiteBoxWidth, whiteBoxHeight);
}
