//INSTRUCTIONS
//click to add balls, they can explode after a while
let r = 255;
let g = 0;
let b = 0;
let i = 0;
let balls = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  rectMode(CENTER);
  
  for (let i = 0; i < balls.length; i++) {
    balls[i].show();
    balls[i].move();
    balls[i].checkCollision(balls);
  }
  for (let i = 0; i < balls.length; i++) {
    if(balls[i].life <= 0){
      balls.splice(i, 1);
    }
  }
  
  //RGB function
  switch(true){
    case i>=0 && i<51:
      g+=5;
      i+=1;
      break;
    case i>=51 && i<102:
      r-=5;
      i+=1;
      break;
    case i>=102 && i<153:
      b+=5;
      i+=1;
      break;
    case i>=153 && i<204:
      g-=5;
      i+=1;
      break;
    case i>=204 && i<255:
      r+=5;
      i+=1;
      break;
    case i>=255 && i<306:
      b-=5;
      i+=1;
      break;
    default:
      i = 0;
  }
  
  //console.log(r, g, b, i);
}

class Ball {
  constructor(r, g, b){
    //this.spdX = random(-3, 3);
    //this.spdY = random(-3, 3);
    this.vel = createVector(random(-3, 3), random(-3, 3));
    this.life = random(1000, 5000);
    this.pos = createVector(mouseX, mouseY);
    //this.x = mouseX;
    //this.y = mouseY;
    this.size = random(25, 75);
    this.r = r;
    this.g = g;
    this.b = b;
  }
  show(){  
    fill(this.r, this.g, this.b);
    ellipse(this.pos.x, this.pos.y, this.size);  
  }
  move(){
    this.pos.add(this.vel);
    if(this.pos.x <= 0 || this.pos.x >= width){
      this.vel.x *= (-1);
    }
    if(this.pos.y <= 0 || this.pos.y >= height){
      this.vel.y *= (-1);
    }
    if(this.life <= 5){
      this.size *= 1.5;
    }
    this.life -= 1;
  }
  checkCollision(others) {
    for (let i = 0; i < others.length; i++) {
       if (others[i] !== this) {
        let other = others[i];
        let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (d < this.size/2 + other.size/2) {
          push();
          stroke(other.r, other.g, other.b);
          strokeWeight(4);
          noFill();
          ellipse(this.pos.x, this.pos.y, this.size);
          pop();
        }
       }
    }
  }
}

//click to switch between outline and fill

//change the shape with asdfg keys
function mousePressed(){
  balls.push(new Ball(r, g, b));
}
