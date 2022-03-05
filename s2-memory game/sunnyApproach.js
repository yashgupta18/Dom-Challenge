// Sunny memory game- https://jsfiddle.net/devkodeio/w9j7toy4/
// Other approaches
// https://jsfiddle.net/CKanishka/wL2pg90j/99/
// https://jsfiddle.net/dikshagoyal26/xujwhok8/22/
// https://jsfiddle.net/u8xg2vep/

function MemoryGame(el, startButton, setScoreCallback, setHighScoreCallback) {
  const size = 5;
  let animationDelay = 500;
  let level = 0;
  let highScore = window.localStorage.getItem("highscore") || 0;
  let canPlay = false;
  let randomList;

  init();

  function init() {
    setHighScoreCallback(highScore); // setting highscrore on initialize
    const fragmentEl = document.createDocumentFragment();

    const div = document.createElement("div");
    div.classList.add("tile");
    for (let i = 0; i < size; i++) {
      const node = div.cloneNode();
      node.dataset.value = i;
      fragmentEl.appendChild(node);
    }
    el.appendChild(fragmentEl);

    // Event delegation
    el.addEventListener("mousedown", onClickHandler);

    // Click listener to start
    startButton.addEventListener("click", start);
  }

  async function flash(el, classType) {
    el.classList.add(classType); // add active class
    await new Promise((resolve) => setTimeout(resolve, animationDelay)); // wait for 500ms
    el.classList.remove(classType); // remove active class
    await new Promise((resolve) => setTimeout(resolve, animationDelay)); // wait for 500ms // smooth UX
  }

  // show random values
  async function play() {
    canPlay = false;
    level += 1;
    randomList = [...new Array(level)].map(() =>
      Math.floor(Math.random() * size)
    );
    console.log(randomList);
    for (const value of randomList) {
      // [1, 2, 3, 4, 0]
      await flash(el.children[value], "active");
    }
    canPlay = true;
  }

  async function onClickHandler(e) {
    if (!canPlay) return;
    const clickedValue = e.target.dataset.value;
    [first, ...randomList] = randomList;
    if (clickedValue != first) {
      canPlay = false;
      e.target.classList.add("wrong");
      el.classList.add("shake");
      setTimeout(() => {
        e.target.classList.remove("wrong");
        el.classList.remove("shake");
        startButton.classList.remove("disable");
        setScore(0);
      }, animationDelay);
      console.log("Game Over");
      return;
    }

    if (randomList.length === 0) {
      canPlay = false;
      setScore(level);
      setTimeout(play, 1000);
    }
    await flash(e.target, "green");
  }

  function setScore(score) {
    setScoreCallback(score);
    if (highScore < score) {
      window.localStorage.setItem("highscore", Number(score));
      setHighScoreCallback(score);
    }
  }

  function start() {
    // level = 0; // to reset the score and level
    startButton.classList.add("disable"); // disable the start button
    // setScore(level); // set score in UI
    setTimeout(play, 500); // start after 500ms delay
  }
}

function setScore(score) {
  document.getElementById("score").innerText = `Score: ${score}`;
}

function setHighScore(highScore) {
  document.getElementById("high-score").innerText = `High Score: ${highScore}`;
}
MemoryGame(
  document.getElementById("box"),
  document.getElementById("startGame"),
  setScore,
  setHighScore
);
