
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const keys = {};
const mouse = {};
const eel = {};

addEventListener('load', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

addEventListener('keydown', ({code}) => {
  keys[code] = true;
});

addEventListener('keyup', ({code}) => {
  keys[code] = false;
});

addEventListener('mousemove', ({x, y}) => {
  mouse.x = x;
  mouse.y = y;
});

addEventListener('mousedown', () => {
  mouse.down = true;
});

addEventListener('mouseup', () => {
  mouse.down = false;
});

const init = () => {

  // position
  eel.x = canvas.width / 2;
  eel.y = canvas.height / 2;

  // equation
  eel.dir = 0;
  eel.mag = 5;

  eel.dir = 0;
  eel.mag = 2.5;
  eel.color = 0;

  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  
  requestAnimationFrame(loop);
};

const input = () => {
  if (keys['ArrowLeft']) {
    eel.dir -= 0.1;
  }
  if (keys['ArrowRight']) {
    eel.dir += 0.1;
  }
  if (mouse.down) {
    const dx = mouse.x - eel.x;
    const dy = mouse.y - eel.y;
    eel.dir = Math.atan2(dy, dx);
  }
};

const move = () => {
  eel.x += eel.mag * Math.cos(eel.dir);
  eel.y += eel.mag * Math.sin(eel.dir);
  eel.color += 0.5;
};

const clear = () => {
  c.fillStyle = 'hsla(0, 100%, 0%, 0.01)';
  c.fillRect(0, 0, canvas.width, canvas.height);
};

const draw = () => {
  c.fillStyle = `hsl(${eel.color}, 100%, 50%)`;
  c.save();
  c.translate(eel.x, eel.y);
  c.beginPath();
  c.arc(0, 0, 5, 0, Math.PI * 2);
  c.closePath();
  c.fill();
  c.restore();
};

const loop = () => {
  input();
  move();
  draw();
  requestAnimationFrame(loop);
};