// requestAnimationFrame Approach - https://jsfiddle.net/u1b3s72q/
// width prototype swapnadeep approach - https://jsfiddle.net/qedf1v97/13/
// sunny puri approach(code below and js fiddle) - https://jsfiddle.net/devkodeio/3mckL4y9/

function ProgressBar(el, duration, countEl) {
  let count = 0;
  let width = 0;
  let startTime = null;
  let isLoading = false;

  const bar = document.createElement("div");
  bar.style.background = "red";
  bar.style.width = "0";
  bar.style.height = "100%";

  el.appendChild(bar);

  function load() {
    count++; // 1
    countEl.innerText = count; // 1

    if (!isLoading) {
      isLoading = true;
      //   bar.style.width = 0;
      fill();
    }
  }

  function fill() {
    if (startTime === null) {
      startTime = Date.now();
    }
    const elaspsedTime = Date.now() - startTime;
    const width = Math.min((elaspsedTime / duration) * 100, 100);
    bar.style.width = `${width}%`;

    if (elaspsedTime >= duration) {
      count--;
      bar.style.width = 0;
      startTime = null;
      countEl.innerText = count;
      if (count <= 0) {
        countEl.innerText = "";
        isLoading = false;
        return;
      }
    }

    setTimeout(fill, 1000 / 60); // 60FPS
  }

  return {
    load,
  };
}
