https://jsfiddle.net/yashgupta18/5n1r0exa/18/

function Grid(id, rows, cols) {
  this.rows = rows;
  this.cols = cols;
  this.element = document.getElementById(id);
  this.scoreDiv = document.getElementById("score");
  this.highScoreDiv = document.getElementById("highscore");
  this.startBtn = document.getElementById("btn");
  this.highscore = localStorage.getItem("highScore");
  this.score = 0;
  this.localScore = 0;
  this.start = true;
  this.bindEvents();
  this.color = "blue";
  this.init(this.rows, this.cols);
  this.arr = document.querySelectorAll(".box");
  this.blinked = [];
}

Grid.prototype.init = function (rows, cols) {
  //persist over refresh
  if (!localStorage.getItem("highScore")) {
    localStorage.setItem("highScore", 0);
  }
  var board = document.createDocumentFragment();
  for (let i = 0; i < rows; i++) {
    let divRow = document.createElement("div");
    divRow.classList.add("row");
    for (let j = 0; j < cols; j++) {
      let div = document.createElement("div");
      div.classList.add("box");
      div.dataset["rc"] = j;
      divRow.append(div);
    }
    board.append(divRow);
  }
  this.element.append(board);
  this.scoreDiv.textContent = "Score:" + this.score;
  this.highScoreDiv.textContent = "High Score:" + this.highscore;
};

Grid.prototype.onMousedown = function (event) {
  let currEle = this.blinked[this.localScore];
  if (currEle === event.target) {
    this.localScore++;
    if (this.localScore == this.blinked.length) {
      this.score++;
      this.scoreDiv.textContent = "Score:" + this.score;
      this.localScore = 0;
      this.blinked = [];
      this.blinkColor();
    }
  } else {
    if (this.score > this.highscore) {
      localStorage.setItem("highScore", this.score);
    }
    this.highscore = localStorage.getItem("highScore");
    this.score = 0;
    this.start = true;
    this.blinked = [];
    this.startBtn.classList.remove("hide");
    let timerId = setInterval(() => {
      event.target.classList.add("red");
      this.element.classList.add("shake");
    });

    setTimeout(() => {
      event.target.classList.remove("red");
      this.element.classList.remove("shake");
      clearInterval(timerId);
      this.scoreDiv.textContent = "Score:" + this.score;
      this.highScoreDiv.textContent = "High Score:" + this.highscore;
    }, 800);
  }
};

function animate(elementBlink, callback) {
  setTimeout(() => {
    elementBlink.classList.toggle("blue");
    setTimeout(() => {
      elementBlink.classList.toggle("blue");
      if (callback) callback();
    }, 200);
  }, 500);
}

Grid.prototype.blinkColor = function () {
  for (let i = 0; i <= this.score; i++) {
    let randomitem = [Math.floor(Math.random() * this.arr.length)];
    this.blinked.push(this.arr[randomitem]);
  }
  const scheduleAnimation = (i) => {
    const elementBlink = this.blinked[i];
    if (elementBlink && this.color) {
      animate(elementBlink, scheduleAnimation.bind(this, ++i));
    } else {
      return;
    }
  };
  scheduleAnimation(0);
};

Grid.prototype.startGame = function () {
  this.start = false;
  this.startBtn.disabled;
  this.startBtn.classList.add("hide");
  this.blinkColor();
};

Grid.prototype.bindEvents = function () {
  this.startBtn.addEventListener("click", (e) => {
    this.start && this.startGame();
  });
  this.element.addEventListener("mousedown", this.onMousedown.bind(this));
};

new Grid("grid", 1, 5);
