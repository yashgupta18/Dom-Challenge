const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const cleargrid = document.getElementById("clear-grid");

generateGrid(12, 12);

var color = "#000";
var mousedown = false;

function generateGrid(rows = 10, cols = 10) {
  var board = document.createDocumentFragment();

  for (let i = 0; i < rows; i++) {
    let divRow = document.createElement("div");
    divRow.classList.add("row");
    for (let j = 0; j < cols; j++) {
      let div = document.createElement("div");
      div.classList.add("box");
      divRow.append(div);
    }
    board.append(divRow);
  }

  let divRow = document.createElement("div");
  for (let j = 0; j < cols; j++) {
    let div = document.createElement("div");
    div.classList.add("box");
    div.classList.add("color-picker");
    div.style.backgroundColor = getRandomColor();
    divRow.append(div);
  }
  board.append(divRow);

  document.getElementById("grid").append(board);
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

document.getElementById("grid").addEventListener("mousedown", (event) => {
  if (event.target.classList.contains("color-picker"))
    color = event.target.style.backgroundColor;
  else if (event.target.classList.contains("box")) {
    event.target.style.backgroundColor = color;
    mousedown = true;
  }
});

document.body.addEventListener("mouseup", () => {
  mousedown = false;
});

document.getElementById("grid").addEventListener("mouseover", (event) => {
  if (
    mousedown &&
    !event.target.classList.contains("color-picker") &&
    event.target.classList.contains("box")
  )
    event.target.style.backgroundColor = color;
});

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const rows = loginForm.rows.value;
  const cols = loginForm.cols.value;
  generateGrid(rows, cols);
  loginForm.rows.value = "";
  loginForm.cols.value = "";
  console.log({ rows, cols });
});

cleargrid.addEventListener("click", (e) => {
  e.preventDefault();
  let div = document.getElementById("grid");
  div.forEach((row) => {
    // row.forEach((col) => {
    //   col.backgroundColor = "white";
    // });
  });
});
// https://zellwk.com/blog/dom-traversals/