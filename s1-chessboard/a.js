// JS FIDDLE - https://jsfiddle.net/yashgupta18/uzbj28nh/
const cleargrid = document.getElementById("clear-grid");
const grid = document.getElementById("grid");
const mySet = new Set();
generateGrid(8, 8);

var color = "red";
var mousedown = false;

function generateGrid(rows, cols) {
  var board = document.createDocumentFragment();

  for (let i = 0; i < rows; i++) {
    let divRow = document.createElement("div");
    divRow.classList.add("row");
    for (let j = 0; j < cols; j++) {
      let div = document.createElement("div");
      div.classList.add("box");
      div.dataset["rc"] = `${i}-${j}`;
      if ((i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0)) {
        div.classList.add("white");
      } else {
        div.classList.add("black");
      }
      divRow.append(div);
    }
    board.append(divRow);
  }
  document.getElementById("grid").append(board);
}

// function fillup(currPrevSib, tempr1, tempc1, tempr2, tempc2) {
//   while (currPrevSib) {
//     for (let i = 0; i < 8; i++) {
//       let currEle = currPrevSib.childNodes[i];
//       const r1 = parseInt(currEle.dataset.rc.split("-")[0]);
//       const c1 = parseInt(currEle.dataset.rc.split("-")[1]);
//       if (r1 === tempr1 && c1 === tempc1) {
//         currEle.style.backgroundColor = "red";
//         mySet.add(currEle);
//         tempr1--, tempc1--;
//       } else if (r1 === tempr2 && c1 === tempc2) {
//         mySet.add(currEle);
//         currEle.style.backgroundColor = "red";
//         tempr2--, tempc2++;
//       }
//     }
//     currPrevSib = currPrevSib.previousSibling;
//   }
// }

// function filldown(currNextSib, tempr1, tempc1, tempr2, tempc2) {
//   while (currNextSib) {
//     for (let i = 0; i < 8; i++) {
//       let currEle = currNextSib.childNodes[i];
//       const r1 = parseInt(currEle.dataset.rc.split("-")[0]);
//       const c1 = parseInt(currEle.dataset.rc.split("-")[1]);
//       if (r1 === tempr1 && c1 === tempc1) {
//         currEle.style.backgroundColor = "red";
//         mySet.add(currEle);
//         tempr1++, tempc1--;
//       } else if (r1 === tempr2 && c1 === tempc2) {
//         currEle.style.backgroundColor = "red";
//         mySet.add(currEle);
//         tempr2++, tempc2++;
//       }
//     }
//     currNextSib = currNextSib.nextSibling;
//   }
// }

function commonFill(currSib, r1, c1, r2, c2, up) {
  while (currSib) {
    for (let i = 0; i < 8; i++) {
      let currEle = currSib.childNodes[i];
      const datasetRow = parseInt(currEle.dataset.rc.split("-")[0]);
      const datesetCol = parseInt(currEle.dataset.rc.split("-")[1]);
      if (datasetRow === r1 && datesetCol === c1) {
        currEle.style.backgroundColor = "red";
        mySet.add(currEle);
        up ? r1-- : r1++, c1--;
      } else if (datasetRow === r2 && datesetCol === c2) {
        currEle.style.backgroundColor = "red";
        mySet.add(currEle);
        up ? r2-- : r2++, c2++;
      }
    }
    up ? (currSib = currSib.previousSibling) : (currSib = currSib.nextSibling);
  }
}

document.getElementById("grid").addEventListener("mousedown", (event) => {
  for (let item of mySet) {
    item.style.backgroundColor = "";
    item.delete;
  }

  const r = parseInt(event.target.dataset.rc.split("-")[0]);
  const c = parseInt(event.target.dataset.rc.split("-")[1]);
  mySet.add(event.target);
  let currParent = event.target.parentElement;
  let currPrevSib = currParent.previousSibling;
  let currNextSib = currParent.nextSibling;
  event.target.style.backgroundColor = "red";
  // let tempr1 = r - 1,
  //   tempc1 = c - 1,
  //   tempr2 = r - 1,
  //   tempc2 = c + 1;
  // fillup(currPrevSib, tempr1, tempc1, tempr2, tempc2);
  // (tempr1 = r + 1), (tempc1 = c - 1), (tempr2 = r + 1), (tempc2 = c + 1);
  // filldown(currNextSib, tempr1, tempc1, tempr2, tempc2);

  //fill upper diagnols
  commonFill(currPrevSib, r - 1, c - 1, r - 1, c + 1, 1);
  //fill lower diagnols
  commonFill(currNextSib, r + 1, c - 1, r + 1, c + 1, 0);
});
