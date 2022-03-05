function Board(el, rows = 8, cols = 8, color = "red") {
  this.el = document.querySelector(el);
  this.rows = rows;
  this.cols = cols;
  this.color = color;
  this.activeCell = "";
  this.generateBoard();
  this.bindEvents();
}

Board.prototype.generateBoard = function () {
  const fragment = document.createDocumentFragment("div");
  for (var i = 0; i < this.rows; i++) {
    var row = document.createElement("div");
    row.classList.add("row");
    for (var j = 0; j < this.cols; j++) {
      var col = document.createElement("div");
      col.classList.add("col");
      col.dataset["cell"] = i + ":" + j;
      (i + j) % 2 == 0
        ? col.classList.add("white")
        : col.classList.add("black");
      row.appendChild(col);
    }
    fragment.appendChild(row);
  }
  this.el.appendChild(fragment);
};

Board.prototype.bindEvents = function () {
  this.el.addEventListener("click", (e) => {
    this.activeCell && this.diagonals(this.activeCell, null);
    var cell = e.target.dataset["cell"];
    this.activeCell = cell;
    cell && this.diagonals(cell, this.color);
    e.stopPropagation();
  });
  document.addEventListener("click", (e) => {
    this.activeCell && this.diagonals(this.activeCell, null);
  });
};

Board.prototype.diagonals = function (cell, color) {
  var [row, col] = cell.split(":");
  let left = col;
  let right = col;
  this.fill(cell, color);
  for (let i = row - 1; i >= 0; i--) {
    --left;
    ++right;
    if (left >= 0) {
      this.fill(i + ":" + left, color);
    }
    if (right < this.cols) {
      this.fill(i + ":" + right, color);
    }
  }
  left = col;
  right = col;
  for (let i = +row + 1; i < this.rows; i++) {
    --left;
    ++right;
    if (left >= 0) {
      this.fill(i + ":" + left, color);
    }
    if (right < this.cols) {
      this.fill(i + ":" + right, color);
    }
  }
};

Board.prototype.fill = function (cell, color) {
  document.querySelector(`div[data-cell='${cell}']`).style.background = color;
};

new Board("#board", 8, 8);
