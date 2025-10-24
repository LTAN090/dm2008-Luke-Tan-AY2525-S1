// DM2008
// Activity 1b (Georg Nees)

let x;
let y;
let w;
let i;

function setup() {
  createCanvas(800, 800)
  background(240);
}

function draw() {
  
  x = random(width);
  y = random(height);
  w = random(10, 80);
  
  // background(240,40);
  
  stroke(mouseX/3.14, mouseY/3.14, random(0, 255));
  strokeWeight(random(0.5, 2));
  noFill();
  i = random (-1, 1);
  if(i > 0){
    rect(x, y, w, w);
  }else{
    ellipse(x, y, w, w);
  }
  
}

function keyPressed() {
    saveCanvas("activity1b-image", "jpg");
}