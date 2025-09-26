let myPlayer;
let count = 0;
let frequency = 100;
let obstacles = [];
const PIPE_SPEED = -2.5;
let PIPE_GAP = 220; // gap height (try 100–160)
const PIPE_W = 50;
let active = false;
let score = 0;
let jump, start, end;

function setup() {
  createCanvas(600, 550);
  myPlayer = new Player();
  textSize(32);
}

function preload() {
  jump = loadSound("sfx/Jump1.ogg");
  start = loadSound("sfx/Load1.ogg");
  end = loadSound("sfx/Buzzer1.ogg");
}

function draw() {
  if (active) {
    background("#B1FFF6");
    fill("#05B247");
    rect(0, 500, width, 50);
    fill("#B7AB9C");
    triangle(50, 500, 250, 500, 150, 450);
    triangle(330, 500, 530, 500, 430, 450);
    fill("#FFFEAC");
    ellipse(100, 200, 70);
    myPlayer.show();
    myPlayer.move();
    myPlayer.checkCollision(obstacles);
    if (count == frequency) {
      obstacles.push(new Obstacle());
      count = 0;
    } //spawn obstacles at fixed intervals
    count++;
    for (let i = 0; i < obstacles.length; i++) {
      obstacles[i].show();
      obstacles[i].move();
    } //control obstacle movement
    for (let i = 0; i < obstacles.length; i++) {
      if (obstacles[i].x <= -100) {
        obstacles.splice(i, 1);
      }
    } //delete obstacles offscreen
    fill("#000000");
    text("SCORE:", 50, 50); //score display
    text(score, 180, 50);
    if (score > 48) {
      PIPE_GAP = 180;
    } //reduce gap size, at 48 score the reduced size applies on pipes 51+
  } else {
    //gameover or start screen
    background(255, 150, 0);
    text("FLAPPY PIG", 200, 150);
    text("SCORE:", 220, 400);
    text(score, 350, 400); //display previous score
    text("CLICK TO START", 170, 450);
    fill(220);
    rect(120, 470, 120, 50);
    push();
    fill("#000000");
    text("SPACE", 125, 505);
    pop();
    text("TO JUMP", 255, 505);
    triangle(
      width / 2,
      height / 2,
      width / 2 - 40,
      height / 2,
      width / 2 - 15,
      height / 2 - 25
    );
    triangle(
      width / 2,
      height / 2,
      width / 2 + 35,
      height / 2,
      width / 2 + 10,
      height / 2 - 25
    );
    ellipse(width / 2, height / 2, 40);
    ellipse(width / 2 + 8, height / 2 + 5, 17, 12);
    ellipse(width / 2 + 6, height / 2 + 5, 2, 6);
    ellipse(width / 2 + 11, height / 2 + 5, 2, 6);
    ellipse(width / 2 + 1, height / 2 - 5, 4);
    ellipse(width / 2 + 13, height / 2 - 5, 4);
  }
}

class Player {
  constructor() {
    this.spdY = 0;
    this.x = width / 2;
    this.y = height / 2;
    this.size = 40;
  }
  show() {
    fill("#FFFFFF");
    triangle(this.x, this.y, this.x - 40, this.y, this.x - 15, this.y - 25);
    triangle(this.x, this.y, this.x + 35, this.y, this.x + 10, this.y - 25);
    fill("#FFB9F6");
    ellipse(this.x, this.y, this.size);
    ellipse(this.x + 8, this.y + 5, 17, 12);
    fill("#000000");
    ellipse(this.x + 6, this.y + 5, 2, 6);
    ellipse(this.x + 11, this.y + 5, 2, 6);
    ellipse(this.x + 1, this.y - 5, 4);
    ellipse(this.x + 13, this.y - 5, 4);
  }
  move() {
    this.y += this.spdY;
    if (this.y < height) {
      if (this.spdY < 10) {
        //terminal velocity
        this.spdY += 0.4; //gravity acceleration
      }
    } else {
      this.spdY = 0;
    }
    if (this.y <= 0 || this.y >= height) {
      active = !active; //gameover from ceiling or floor
      end.play();
    }
  }
  jump() {
    this.spdY = -8;
  }
  checkCollision(obs) {
    for (let i = 0; i < obs.length; i++) {
      let ob = obs[i];
      let dx = dist(this.x, 0, ob.x + PIPE_W / 2, 0);
      let dy = dist(0, this.y, 0, ob.mid);
      if (dx < 30) {
        if (dy > PIPE_GAP / 2 - this.size / 2) {
          active = !active;
          end.play();
        }
      }
    }
  }
  reset() {
    this.spdY = 0;
    this.x = width / 2;
    this.y = height / 2;
  }
}

class Obstacle {
  constructor() {
    this.spdX = PIPE_SPEED;
    this.x = width + 100;
    this.w = PIPE_W;
    const margin = 40;
    const gapY = random(margin, height - margin - PIPE_GAP);
    this.top = gapY; // bottom of top pipe
    this.bottom = gapY + PIPE_GAP;
    this.mid = gapY + PIPE_GAP / 2;
    this.passed = false;
  }
  show() {
    fill("#FF7B00");
    rect(this.x, 0, this.w, this.top); // top pipe
    rect(this.x, this.bottom, this.w, height - this.bottom);
  }
  move() {
    this.x += this.spdX;
    if (this.passed == false && this.x < width / 2 - 20 - PIPE_W) {
      //increment score
      score++;
      this.passed = true; //prevent looping
    }
  }
}
function mousePressed() {
  if (active == false) {
    //reset all variables
    myPlayer.reset();
    obstacles = [];
    score = 0;
    PIPE_GAP = 220;
    active = true;
    start.play();
  }
}
function keyPressed() {
  if (active && key === " ") {
    myPlayer.jump();
    jump.play();
  }
}
