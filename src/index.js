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
let pY = canvasH/2;
let pX = canvasW/2;
let direction;
let dirShots = 0;
// context.strokeStyle = 'green';
// context.lineWidth = 9;
// context.strokeRect(20, 20, 200, 100);

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
      pY += 10;
      cycle = (cycle + 1) % shots;
      dirShots = spriteH*0;
      console.log(dirShots);
    }
    if (bottomPressed && direction === 'Up') {
      pY -= 10;
      cycle = (cycle + 1) % shots;
      dirShots = spriteH*3;
      console.log(dirShots);
    }
    if (bottomPressed && direction === 'Left') {
      pX -= 10;
      cycle = (cycle + 1) % shots;
      dirShots = spriteH*1;
      console.log(dirShots);
    }
    if (bottomPressed && direction === 'Right') {
      pX += 10;
      cycle = (cycle + 1) % shots;
      dirShots = spriteH*2;
      console.log(dirShots);
    }
    context.clearRect(0, 0, 600, 600);
    context.drawImage(img, cycle * spriteW, dirShots, spriteW, spriteH, pX, pY, 48, 48);
  }, 120);
});
