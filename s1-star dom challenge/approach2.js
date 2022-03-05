/*
 * Creates star rating functionality
 * @param el DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */
function Star(el, count, callback) {
  this.el = el;
  this.count = count;
  this.callback = callback;
  this.active = -1;
}

Star.prototype.makeStar = function makeStar() {
  const element = document.querySelector(el);
  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= count; i++) {
    const iElem = document.createElement("i");
    iElem.classList.add("fa");
    iElem.classList.add("fa-star-o");
    iElem.dataset["ratingVal"] = i;
    fragment.appendChild(iElem);
  }
  element.appendChild(fragment);

  element.addEventListener("click", onClick);
  element.addEventListener("mouseover", onMouseOver);
  element.addEventListener("mouseleave", onMouseLeave);
};

Star.prototype.onMouseOver = function onMouseOver(e) {
  const ratingVal = e.target.dataset["ratingVal"];
  fill(ratingVal);
  console.log(ratingVal);
};

Star.prototype.fill = function fill(ratingVal) {
  for (i = 0; i < count; i++) {
    // e.target.classList
    if (i < ratingVal) {
      element.children[i].classList.add("fa-star");
    } else {
      element.children[i].classList.remove("fa-star");
    }
  }
};

Star.prototype.onMouseLeave = function onMouseLeave(e) {
  fill(active);
  console.log(e.target.dataset);
};

Star.prototype.onClick = function onClick(e) {
  Eactive = e.target.dataset["ratingVal"];
  fill(Eactive);
};

Star.prototype.binde;
