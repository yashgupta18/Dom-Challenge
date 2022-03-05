function Grid(el, dim) {
  this.element = document.querySelector(el);
  this.dim = dim;
  this.init();
  this.bindEvents();
  this.getRandomColor();
  this.mousedown = false;
  this.color = "#000";
}

Grid.prototype.init = function () {
  var board = document.createDocumentFragment();

  for (let i = 0; i < this.dim; i++) {
    let divRow = document.createElement("div");
    divRow.classList.add("row");
    for (let j = 0; j < this.dim; j++) {
      let div = document.createElement("div");
      div.classList.add("box");
      divRow.append(div);
    }
    board.append(divRow);
  }

  let divRow = document.createElement("div");
  for (let j = 0; j < this.dim; j++) {
    let div = document.createElement("div");
    div.classList.add("box");
    div.classList.add("color-picker");
    div.style.backgroundColor = this.getRandomColor();
    divRow.append(div);
  }
  board.append(divRow);

  this.element.append(board);
};
// var color = "#000";

Grid.prototype.getRandomColor = function () {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

Grid.prototype.onMousedown = function (event) {
  if (event.target.classList.contains("color-picker"))
    this.color = event.target.style.backgroundColor;
  else if (event.target.classList.contains("box")) {
    event.target.style.backgroundColor = this.color;
    this.mousedown = true;
  }
};

Grid.prototype.onMouseup = function () {
  this.mousedown = false;
};

Grid.prototype.onMouseOver = function (event) {
  if (
    this.mousedown &&
    !event.target.classList.contains("color-picker") &&
    event.target.classList.contains("box")
  )
    event.target.style.backgroundColor = this.color;
};

Grid.prototype.bindEvents = function () {
  this.element.addEventListener("mousedown", this.onMousedown.bind(this));
  this.element.addEventListener("mouseup", this.onMouseup.bind(this));
  this.element.addEventListener("mouseover", this.onMouseOver.bind(this));
};

new Grid("#grid", 8);

// https://zellwk.com/blog/dom-traversals/
