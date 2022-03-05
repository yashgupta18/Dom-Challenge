// // color spotter - https://jsfiddle.net/yashgupta18/qxLe0syc/
const data = [
  {
    startTime: "00:00",
    endTime: "01:30",
    color: "#f6be23",
    title: "#1",
  },
  {
    startTime: "3:30",
    endTime: "7:30",
    color: "#f6501e",
    title: "#2",
  },
  {
    startTime: "4:30",
    endTime: "8:30",
    color: "#f6501e",
    title: "#3",
  },
  {
    startTime: "6:30",
    endTime: "9:00",
    color: "#f6501e",
    title: "4",
  },
  {
    startTime: "11:00",
    endTime: "13:30",
    color: "#029be5",
    title: "#5",
  },
  {
    startTime: "12:00",
    endTime: "13:30",
    color: "#029be5",
    title: "#6",
  },
  {
    startTime: "9:30",
    endTime: "10:30",
    color: "#029be5",
    title: "#7",
  },
  {
    startTime: "16:00",
    endTime: "17:00",
    color: "#029be5",
    title: "#8",
  },
  {
    startTime: "15:00",
    endTime: "17:00",
    color: "#029be5",
    title: "#9",
  },
  {
    startTime: "18:00",
    endTime: "19:00",
    color: "#f6501e",
    title: "#10",
  },
  {
    startTime: "20:30",
    endTime: "22:30",
    color: "#029be5",
    title: "#11",
  },
  {
    startTime: "20:30",
    endTime: "22:30",
    color: "#029be5",
    title: "#12",
  },
];
console.log(parseInt(data[0].endTime.split(":")[1]));
var board = document.createDocumentFragment();
let timeDiv = document.getElementById("time");
for (let i = 0; i < 24; i++) {
  let divRow = document.createElement("div");
  divRow.classList.add("timeDiv");
  divRow.dataset["t"] = i;
  divRow.textContent = `${i}:00`;
  board.appendChild(divRow);
}
timeDiv.appendChild(board);

let eventDiv = document.getElementById("events");
let i = 0;
data.forEach((item) => {
  let st1 = parseInt(item.startTime.split(":")[0]);
  let st2 = parseInt(item.startTime.split(":")[1]);
  let et1 = parseInt(item.endTime.split(":")[0]);
  let et2 = parseInt(item.endTime.split(":")[1]);
  let h = 47.813 * (2 * (et1 - st1)) + 47.813 * ((et2 - et1) / 60);
  let topHeight = 47.813 * st1;
  let c = item.color;
  let t = item.title;
  console.log(h);
  let divRow = document.createElement("div");
  divRow.style.width = "80%";
  divRow.style.height = `${h}px`;
  divRow.style.top = `${topHeight}px`;
  divRow.style.backgroundColor = c;
  // divRow.style.position = "absolute";
  divRow.style.zIndex = `${i}`;
  divRow.textContent = t;
  divRow.style.border = "1px solid black";
  divRow.style.opacity = "0.75";
  i++;
  eventDiv.appendChild(divRow);
});
