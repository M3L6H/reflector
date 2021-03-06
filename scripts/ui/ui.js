import RadialMenu from './radial_menu.js';
import Vector from '../physics/vector.js';
import Ray from "../physics/ray.js";
import debouncer from '../util/debouncer.js';
import * as Constants from '../util/constants.js';
import * as Storage from '../util/storage.js';

class UI {
  constructor(canvas, unit, money) {
    this.zIndex = 0;
    this.layers = [];
    this.canvas = canvas;
    this.unit = unit;
    this.money = money;
    this.towerMenu = new RadialMenu([], unit, 1, this.money);
    this.hovering = null;
    this.paused = false;

    this.canvas.addEventListener("click", this.handleClick.bind(this));
    this.canvas.addEventListener("contextmenu", this.handleClick.bind(this));
    this.canvas.addEventListener("mousemove", debouncer(this.hover.bind(this), 100));
    document.addEventListener("TowerMenu", this.handleTowerMenu.bind(this));
    document.addEventListener("PlaceTower", () => this.zIndex = 2);
    this.mouseRay = new Ray(new Vector(0, 0), new Vector(1, 0));
  }

  hover(e) {
    if (this.paused) return;
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    this.mouseRay.updatePos(new Vector(mouseX, mouseY));
    this.mouseRay.updateLayer(`ui-${ this.zIndex }`);
    this.mouseRay.cast();

    let numCollisions = new Map();
    for (let i = 0; i < this.mouseRay.numCollisions; ++i) {
      const rayhit = this.mouseRay.collisions[i];
      numCollisions.set(rayhit.colliderHit, (numCollisions.get(rayhit.colliderHit) || 0) + 1);
    }

    let hovered = false;

    for (let [button, numCol] of numCollisions) {
      if (numCol % 2 === 1) {
        hovered = true;
      }
    }

    if (!hovered) {
      this.canvas.classList.remove("pointer");
    } else {
      this.canvas.classList.add("pointer");
    }
  }

  handleClick(e) {
    e.preventDefault();
    if (this.paused) return;
    this.tutorial = parseInt(Storage.getItem("tutorial"));
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    this.mouseRay.updatePos(new Vector(mouseX, mouseY));
    this.mouseRay.updateLayer(`ui-${ this.zIndex }`);
    this.mouseRay.cast();

    let numCollisions = new Map();
    for (let i = 0; i < this.mouseRay.numCollisions; ++i) {
      const rayhit = this.mouseRay.collisions[i];
      numCollisions.set(rayhit.colliderHit, (numCollisions.get(rayhit.colliderHit) || 0) + 1);
    }

    let clicked = false;
    
    for (let [button, numCol] of numCollisions) {
      if (numCol % 2 === 1) {
        button.onClick();
        clicked = true;
      }
    }

    // We treat all additional ui elements like modals, so if we click outside
    // of them, we just revert back to our base layer 
    if (!clicked) {
      this.zIndex = 0;
    }
  }

  handleTowerMenu({ detail: { pos } }) {
    this.zIndex = 1;
    this.towerMenu.updatePos(pos);
  }

  update({ paused, ctx, unit }, money) {
    this.paused = paused;
    if (paused) return;
    
    this.money = money;
    switch(this.zIndex) {
      case 1:
        this.towerMenu.update(...arguments, this.money);
      case 2:
        if (this.tutorial <= Constants.TUTORIAL_END) break;
        ctx.save();
        ctx.font = `${ unit / 2 }px sans-serif`;
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#000000";
        ctx.fillText("Right click to cancel", unit, unit);
        ctx.strokeText("Right click to cancel", unit, unit);
        ctx.restore();
        break;
    }
  }
}

export default UI;
export { default as Tower } from './tower.js';