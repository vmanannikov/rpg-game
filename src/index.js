import './index.scss';
import mailHero from './assets/Male-1-Walk.png';

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const canvasW = canvas.width;
const canvasH = canvas.height;
const spriteW = 48;
const spriteH = 48;
const shots = 3;
let cycle = 0;
let bottomPressed = false;
let pY = canvasH / 2;
let pX = canvasW / 2;
let direction;
let dirShots = 0;

function keyUpHandler(e) {
  console.log(e.key);
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    bottomPressed = true;
    direction = 'Down';
  }
  if (e.key === 'Up' || e.key === 'ArrowUp') {
    bottomPressed = true;
    direction = 'Up';
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    bottomPressed = true;
    direction = 'Left';
  }
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    bottomPressed = true;
    direction = 'Right';
  }
}

function keyDownHandler(e) {
  console.log(e.key);
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    bottomPressed = false;
    direction = 'Down';
  }
  if (e.key === 'Up' || e.key === 'ArrowUp') {
    bottomPressed = false;
    direction = 'Up';
  }
  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    bottomPressed = false;
    direction = 'Left';
  }
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    bottomPressed = false;
    direction = 'Right';
  }
}

document.addEventListener('keydown', keyUpHandler);
document.addEventListener('keyup', keyDownHandler);

const img = document.createElement('img');
img.src = mailHero;

img.addEventListener('load', () => {
  setInterval(() => {
    if (bottomPressed && direction === 'Down') {
      console.log('#### canvasH:', canvasH);
      console.log('#### pY:', pY);
      console.log('#### spriteH', spriteH);
      pY = Math.max(pY, Math.min(canvasH - spriteH, pY + 10));
      cycle = (cycle + 1) % shots;
      dirShots = spriteH * 0;
      console.log(pY);
    }
    if (bottomPressed && direction === 'Up') {
      console.log(canvasH - pY);
      pY = Math.max(spriteH - spriteH, Math.min(canvasH - spriteH, pY - 10));
      console.log('#### UP:', pY);
      cycle = (cycle + 1) % shots;
      dirShots = spriteH * 3;
    }
    if (bottomPressed && direction === 'Left') {
      pX = Math.max(spriteW - spriteW, Math.min(canvasW - spriteW, pX - 10));
      console.log('#### left:', pX);
      cycle = (cycle + 1) % shots;
      dirShots = spriteH * 1;
      console.log(dirShots);
    }
    if (bottomPressed && direction === 'Right') {
      pX = Math.max(pX, Math.min(canvasW - spriteW, pX + 10));
      cycle = (cycle + 1) % shots;
      dirShots = spriteH * 2;
      console.log(dirShots);
    }
    context.clearRect(0, 0, 600, 600);
    context.drawImage(img, cycle * spriteW, dirShots, spriteW, spriteH, pX, pY, 48, 48);
  }, 120);
});
