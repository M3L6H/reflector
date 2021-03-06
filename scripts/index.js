import Renderer from './renderer.js';
import * as Constants from './util/constants.js';
import * as Storage from './util/storage.js';

const createErrorMsg = (body) => {
  const msg = document.createElement("p");
  msg.classList.add("error");
  msg.appendChild(document.createTextNode(`Sorry, ${ body }`));
  return msg;
}

let canvas, ctx, width, height, unit, mouseX, mouseY, renderer, pauseBtn;
let debug = false;
let paused = false;

// Initialization
const initialize = () => {
  // Set up tutorial
  const tut = Storage.getItem("tutorial");
  if (!tut || parseInt(tut) < Constants.TUTORIAL_END) {
    Storage.setItem("tutorial", 0);
  }
  
  setUpLevelSelect();
  
  const root = document.getElementById("canvas");
  
  const winWidth = window.innerWidth, winHeight = window.innerHeight;
  
  if (winWidth < 800) {
    root.appendChild(createErrorMsg("your screen is not wide enough to play this game!"));
    return;
  } else {
    unit = Math.min(Math.floor(winWidth / 20), Math.floor(winHeight / 16));
    const usableWidth = unit * 20;
    const targetHeight = unit * 12;
  
    if (winHeight < targetHeight) {
      root.appendChild(createErrorMsg("your screen is not tall enough to play this game!"));
      return;
    }

    canvas = document.createElement("canvas");
    canvas.width = usableWidth;
    canvas.height = targetHeight;
    canvas.classList.add("canvas");

    ctx = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;

    canvas.addEventListener("mousemove", e => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });
    
    root.appendChild(canvas);
  }

  // Set up tutorial button
  const tutorialBtn = document.getElementById("tutorial-btn");
  tutorialBtn.addEventListener("click", () => {
    Storage.setItem('tutorial', 0);
    Storage.setItem('level', 0);
    location.reload();
  });

  // Set up reset button
  const resetBtn = document.getElementById("reset-btn");
  resetBtn.addEventListener("click", () => {
    if (confirm(Constants.RESET_WARNING)) {
      Storage.clear();
      location.reload();
    }
  });

  // Set up pause button
  pauseBtn = document.getElementById("pause-btn");
  pauseBtn.addEventListener("click", () => togglePause());
  window.addEventListener("blur", () => togglePause(true));

  // Set up help button
  const helpBtn = document.getElementById("help-btn");
  helpBtn.addEventListener("click", () => {
    togglePause(true);
    location.hash = "#instructions";
  });
  
  // Let all the elements of the game know we have finished initialization
  const init = new CustomEvent("Init", { detail: { unit, width, height, canvas } });
  document.dispatchEvent(init);
  window.requestAnimationFrame(render);
};

const togglePause = (opt) => {
  paused = opt === undefined ? !paused : opt;

  if (paused) {
    pauseBtn.children[0].classList.remove("fa-pause");
    pauseBtn.children[0].classList.add("fa-play");
  } else {
    location.hash = "";
    pauseBtn.children[0].classList.add("fa-pause");
    pauseBtn.children[0].classList.remove("fa-play");
  }
};

const numLevels = 3;
const setUpLevelSelect = () => {
  const levels = document.getElementById("levels");
  levels.innerHTML = "";

  let lastNumStars = 3;

  for (let i = 0; i < numLevels; ++i) {
    const level = document.createElement('div');
    level.classList.add("level");

    if (lastNumStars !== 0) {
      level.addEventListener("click", () => {
        renderer.changeLevel(i);
      });
    } else {
      level.classList.add("locked");
    }

    const label = document.createElement("div");
    label.classList.add("label");
    label.innerHTML = `Level ${ i + 1 }`;

    level.appendChild(label);

    const image = document.createElement("img");
    image.classList.add("level-thumb");
    image.src = `./maps/${ (i + 1).toString().padStart(2, "0") }.png`;

    level.appendChild(image);

    const stars = document.createElement("div");
    stars.classList.add("stars");

    const numStars = Storage.getItem(`level-${ i + 1 }`) || 0;
    lastNumStars = numStars;

    for (let i = 0; i < numStars; ++i) {
      const star = document.createElement("img");
      star.classList.add("star");
      star.src = "./images/star.svg";
      stars.appendChild(star);
    }

    level.appendChild(stars);
    
    levels.appendChild(level);
  }
}

// Render loop
let start = 0;
let justPaused = true;
const render = (time) => {
  const delta = (!start && 0) + (start && (time - start));
  start = time;

  if (!paused) {
    justPaused = true;
    ctx.fillStyle = "#D3D0CB";
    ctx.fillRect(0, 0, width, height);
  } else if (justPaused) {
    justPaused = false;
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 0, width, height);
    ctx.save();
    ctx.font = "24px sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.translate(width / 2, height / 2);
    ctx.fillText("Paused", 0, 0);
    ctx.restore();
  }
    
  const update = new CustomEvent("Update", { detail: { canvas, delta, ctx, width, height, unit, mouseX, mouseY, debug, paused } });
  document.dispatchEvent(update);
  window.requestAnimationFrame(render);
};

document.addEventListener("DOMContentLoaded", () => {
  initialize();
});

document.addEventListener("Init", ({ detail: { unit, canvas, width, height } }) => {
  renderer = new Renderer(unit, canvas, width, height, setUpLevelSelect, togglePause);
});