// color spotter - https://jsfiddle.net/yashgupta18/qxLe0syc/

getRandomColors = function () {
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

function Grid(id) {
  this.rows = 4;
  this.cols = 4;
  this.element = document.getElementById(id);
  this.scoreDiv = document.getElementById("score");
  this.score = 0;
  this.bindEvents();
  // this.colors = "red";
  this.init(this.rows, this.cols);
}

Grid.prototype.init = function (rows, cols) {
  this.colors = getRandomColors();
  const randomIndexX = Math.floor(Math.random() * (rows - 0) + 0);
  const randomIndexY = Math.floor(Math.random() * (cols - 0) + 0);
  var board = document.createDocumentFragment();
  for (let i = 0; i < rows; i++) {
    let divRow = document.createElement("div");
    divRow.classList.add("row");
    for (let j = 0; j < cols; j++) {
      let div = document.createElement("div");
      div.classList.add("box");
      div.dataset["rc"] = `${i}-${j}`;
      if (i === randomIndexX && j === randomIndexY) {
        correctAns = `${i}${j}`;
        div.style.backgroundColor = this.colors.oddColor;
      } else {
        div.style.backgroundColor = this.colors.color;
      }
      divRow.append(div);
    }
    board.append(divRow);
  }
  this.element.append(board);
  this.scoreDiv.textContent = "Score:" + this.score;
};

Grid.prototype.onMousedown = function (event) {
  const r = parseInt(event.target.dataset.rc.split("-")[0]);
  const c = parseInt(event.target.dataset.rc.split("-")[1]);
  if (`${r}${c}` === correctAns) {
    this.score++;
    this.scoreDiv.textContent = `Score: ${this.score}`;
    this.element.innerHTML = "";
    this.rows++, this.cols++;

    this.init(this.rows, this.cols);
  } else {
    this.scoreDiv.textContent = "Wrong Ans";
    let timerId = setInterval(() => this.element.classList.add("shake"));
    setTimeout(() => {
      this.element.classList.remove("shake");
      clearInterval(timerId);
      this.element.innerHTML = "";
      this.score = 0;
      (this.rows = 4), (this.cols = 4);
      this.init(this.rows, this.cols);
    }, 800);
  }
};

Grid.prototype.bindEvents = function () {
  this.element.addEventListener("mousedown", this.onMousedown.bind(this));
};

new Grid("grid");
