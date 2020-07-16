import Tile from './tile.js';
import Vector from '../physics/vector.js';
import Ray from '../physics/ray.js';

import debouncer from '../util/debouncer.js';

class Tower extends Tile {
  constructor(x, y, unit, color) {
    super(x, y, unit);
    this.aimed = false;
    this.ray = new Ray(new Vector(x + unit / 2, y + unit / 2), new Vector(0, 0), "lasers");
    this.colorLight = "#A2B3B9";
    this.color = "#97ABB1";
    this.colorDark = "#8BA1A7";

    this.baseColor = "#2B2D42";
    this.baseDark = "#020202";

    switch(color) {
      case "blue":
        this.laserWidth = unit / 6;
        this.orbColor = "#08A4BD";
        this.orbBorder = "#446DF6";
        break;
      case "red":
        this.laserWidth = unit / 8;
        this.orbColor = "#FF3F00";
        this.orbBorder = "#FF7F11";
        break;
      case "green":
        this.laserWidth = unit / 8;
        this.orbColor = "#86CD82";
        this.orbBorder = "#57A773";
        break;
      case "yellow":
        this.laserWidth = unit / 4;
        this.orbColor = "#F2DC5D";
        this.orbBorder = "#ED9B40";
        break;
    }

    this.calculateBounce = debouncer(this.calculateBounce.bind(this), 17);
  }

  calculateBounce() {
    this.ray.bounceCast("reflectors");
  }

  update({ ctx, unit })  {
    Tile.prototype.update.apply(this, arguments);

    ctx.save();
    ctx.translate(this.x + unit / 2, this.y + unit / 2);
    
    // Base
    ctx.fillStyle = this.baseColor;
    ctx.strokeStyle = this.baseDark;
    ctx.beginPath();
    ctx.moveTo(-unit / 8, unit / 2);
    ctx.lineTo(unit / 8, unit / 2);
    ctx.lineTo(unit / 2, unit / 8);
    ctx.lineTo(unit / 2, -unit / 8);
    ctx.lineTo(unit / 8, -unit / 2);
    ctx.lineTo(-unit / 8, -unit / 2);
    ctx.lineTo(-unit / 2, -unit / 8);
    ctx.lineTo(-unit / 2, unit / 8);
    ctx.lineTo(-unit / 8, unit / 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  drawLaser({ ctx, unit, mouseX, mouseY, width, height }) {
    if (!this.aimed) {
      const dir = new Vector(mouseX - this.x - unit / 2, mouseY - this.y - unit / 2);
      this.ray.updateDir(dir);
    }
    
    this.calculateBounce();

    ctx.save();
    ctx.translate(this.x + unit / 2, this.y + unit / 2);
    // Draw laser
    ctx.strokeStyle = this.orbColor;
    ctx.lineWidth = this.laserWidth;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.translate(-this.x - unit / 2, -this.y - unit / 2);
    for (let i = 0; i < this.ray.numCollisions; ++i) {
      const rayHit = this.ray.collisions[i];
      ctx.lineTo(rayHit.hitPoint.x, rayHit.hitPoint.y);
    }
    ctx.stroke();

    ctx.translate(this.x + unit / 2, this.y + unit / 2);

    // Orb
    ctx.fillStyle = this.orbColor;
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.orbBorder;
    ctx.beginPath();
    ctx.arc(0, 0, unit / 3, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    // Highlight
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = unit / 8;
    ctx.beginPath();
    ctx.arc(0, 0, unit / 5, Math.PI * 13 / 8, Math.PI * 15 / 8);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, unit / 5, Math.PI * 4 / 6 - 0.2, Math.PI * 5 / 6 + 0.2);
    ctx.stroke();
    ctx.restore();
  }
}

export default Tower;