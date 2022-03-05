// JS FIDDLE - https://jsfiddle.net/yashgupta18/uzbj28nh/
const cleargrid = document.getElementById("clear-grid");
const grid = document.getElementById("grid");
const scoreDiv = document.getElementById("score");

// const mySet = new Set();
let rows = 4,
  cols = 4;
let score = 0;

var color = "red";
var mousedown = false;
var correctAns;

const getRandomColors = function () {
  var ratio = 0.618033988749895;

  var hue = (Math.random() + ratio) % 1;
  var saturation = Math.round(Math.random() * 100) % 85;
  var lightness = Math.round(Math.random() * 100) % 85;

  var color =
    "hsl(" + Math.round(360 * hue) + "," + saturation + "%," + lightness + "%)";
  var oddColor =
    "hsl(" +
    Math.round(360 * hue) +
    "," +
    saturation +
    "%," +
    (lightness + 5) +
    "%)";

  return {
    color,
    oddColor,
  };
};

generateGrid(rows, cols);
function generateGrid(rows, cols) {
  const randomIndexX = Math.floor(Math.random() * (rows - 0) + 0);
  const randomIndexY = Math.floor(Math.random() * (cols - 0) + 0);
  var board = document.createDocumentFragment();
  var colors = getRandomColors();
  for (let i = 0; i < rows; i++) {
    let divRow = document.createElement("div");
    divRow.classList.add("row");
    for (let j = 0; j < cols; j++) {
      let div = document.createElement("div");
      div.classList.add("box");
      div.dataset["rc"] = `${i}-${j}`;
      console.log(randomIndexX, randomIndexY);
      if (i === randomIndexX && j === randomIndexY) {
        correctAns = `${i}${j}`;
        console.log(correctAns);
        div.style.backgroundColor = colors.oddcolor;
      } else {
        div.style.backgroundColor = colors.color;
      }
      divRow.append(div);
    }
    board.append(divRow);
  }
  document.getElementById("grid").append(board);
  scoreDiv.textContent = `Score: ${score}`;
}

document.getElementById("grid").addEventListener("mousedown", (event) => {
  const r = parseInt(event.target.dataset.rc.split("-")[0]);
  const c = parseInt(event.target.dataset.rc.split("-")[1]);
  if (`${r}${c}` === correctAns) {
    score++;
    scoreDiv.textContent = `Score: ${score}`;
    document.getElementById("grid").innerHTML = "";
    rows++, cols++;
    generateGrid(rows, cols);
  } else {
    scoreDiv.textContent = "Wrong Ans";
    let timerId = setInterval(() =>
      document.getElementById("grid").classList.add("shake")
    );
    setTimeout(() => {
      document.getElementById("grid").classList.remove("shake");
      clearInterval(timerId);
      document.getElementById("grid").innerHTML = "";
      score = 0;
      (rows = 4), (cols = 4);
      generateGrid(rows, cols);
    }, 800);
  }
});
