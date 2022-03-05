// Chessboard - https://jsfiddle.net/yashgupta18/8uv4c2sx/
//kyle simson- https://codepen.io/yashgupta18/pen/VwWdpwV
function Grid(id, dim, color = "red") {
  this.grid = document.getElementById(id);
  this.rows = dim;
  this.cols = dim;
  this.color = color;
  this.init();
  this.bindEvents();
  this.mySet = new Set();
}

Grid.prototype.init = function () {
  var board = document.createDocumentFragment("div");
  for (let i = 0; i < this.rows; i++) {
    let divRow = document.createElement("div");
    divRow.classList.add("row");
    for (let j = 0; j < this.cols; j++) {
      let div = document.createElement("div");
      div.classList.add("box");
      div.dataset["rc"] = `${i}-${j}`;
      (i + j) % 2 === 0
        ? div.classList.add("white")
        : div.classList.add("black");
      divRow.appendChild(div);
    }
    board.appendChild(divRow);
  }
  this.grid.appendChild(board);
};

Grid.prototype.fill = function (cell, color) {
  cell.style.backgroundColor = this.color;
};

Grid.prototype.getDatasets = function (element) {
  const r = parseInt(element.dataset.rc.split("-")[0]);
  const c = parseInt(element.dataset.rc.split("-")[1]);
  return { r, c };
};
Grid.prototype.addToSet = function (element) {
  this.mySet.add(element);
};
Grid.prototype.commonFill = function (currSib, r1, c1, r2, c2, up) {
  while (currSib) {
    for (let i = 0; i < 8; i++) {
      let currEle = currSib.childNodes[i];
      const { r, c } = this.getDatasets(currEle);
      if (r === r1 && c === c1) {
        this.fill(currEle, this.color);
        this.addToSet(currEle);
        up ? r1-- : r1++, c1--;
      } else if (r === r2 && c === c2) {
        this.fill(currEle, this.color);
        this.addToSet(currEle);
        up ? r2-- : r2++, c2++;
      }
    }
    up ? (currSib = currSib.previousSibling) : (currSib = currSib.nextSibling);
  }
};

Grid.prototype.onMousedown = function (event) {
  if (!event.target.dataset.rc) return;
  for (let item of this.mySet) {
    item.style.backgroundColor = "";
    item.delete;
  }
  const { r, c } = this.getDatasets(event.target);
  this.addToSet(event.target);
  let currParent = event.target.parentElement;
  let currPrevSib = currParent.previousSibling;
  let currNextSib = currParent.nextSibling;
  //fill curr element
  this.fill(event.target, this.color);
  //fill upper diagnols(upper left and right diagnols)
  this.commonFill(currPrevSib, r - 1, c - 1, r - 1, c + 1, 1);
  //fill lower diagnols(lower left and right diagnols)
  this.commonFill(currNextSib, r + 1, c - 1, r + 1, c + 1, 0);
};

Grid.prototype.bindEvents = function () {
  this.grid.addEventListener("mousedown", this.onMousedown.bind(this));
};

new Grid("board", 8, "red");
