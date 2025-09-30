let rotation = 45;
let scale = 300;
let toggle = true;
function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(220);
  translate(mouseX, mouseY);
  drawShape(scale, rotation);
  if (toggle){
    rotation++;
    scale++;
  }else{
    rotation--;
    scale--;
  }
}

function drawShape(s, r){
  push();
  rotate(radians(r));
  fill("#CA03FEF0");
  rect(0, 0, s);
  pop();
  
  push();
  rotate(radians(r+20));
  fill("#0B03FEF0");
  rect(0, 0, (0.78)*s);
  pop();
  
  push();
  rotate(radians(r+40));
  fill("#00F0FF");
  rect(0, 0, (0.78)*(0.78)*s);
  pop();
  
  push();
  rotate(radians(r+60));
  fill("#03FE19F0");
  rect(0, 0, (0.78)*(0.78)*(0.78)*s);
  pop();
  
  push();
  rotate(radians(r+80));
  fill("#FEFB03F0");
  rect(0, 0, (0.78)*(0.78)*(0.78)*(0.78)*s);
  pop();
  
  push();
  rotate(radians(r+100));
  fill("#FE9C03F0");
  rect(0, 0, (0.78)*(0.78)*(0.78)*(0.78)*(0.78)*s);
  pop();
  
  push();
  rotate(radians(r+120));
  fill("#FF2F00");
  rect(0, 0, (0.78)*(0.78)*(0.78)*(0.78)*(0.78)*(0.78)*s);
  pop();
}

function mousePressed(){
  toggle = !toggle;
}