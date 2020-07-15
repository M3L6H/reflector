import RadialMenu from './radial_menu.js';
import Vector from '../physics/vector.js';
import Ray from "../physics/ray.js";

class UI {
  constructor(canvas, unit) {
    this.zIndex = 0;
    this.layers = [];
    this.canvas = canvas;
    this.unit = unit;
    this.towerMenu = new RadialMenu([], new Vector(100, 100));

    this.canvas.addEventListener("click", this.handleClick.bind(this));
    document.addEventListener("TowerMenu", this.handleTowerMenu.bind(this));
    this.mouseRay = new Ray(new Vector(0, 0), new Vector(1, 0));
  }

  handleClick(e) {
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
    this.towerMenu.setPos(pos.add(new Vector(this.unit / 2, this.unit / 2)));
  }

  update({ unit }) {
    switch(this.zIndex) {
      case 1:
        this.towerMenu.update(...arguments);
    }
  }
}

export default UI;