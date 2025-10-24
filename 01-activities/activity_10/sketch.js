let rotation = 45;
let scale;
let layer = 7;
let toggle = true;
let bgcolor, button1, button2, button3, slider;
function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  button1 = createButton("Change Rotation");
  button1.mousePressed(changeRotate);
  button1.position(410, 10);
  button1.addClass('big-btn');
  button1.style('background-color', '#00AFFF');
  
  button2 = createButton("Add Layer");
  button2.mousePressed(addLayer);
  button2.position(410, 80);
  button2.addClass('big-btn');
  button2.style('background-color', '#02B512F0');
  
  button3 = createButton("Remove Layer");
  button3.mousePressed(subLayer);
  button3.position(410, 150);
  button3.style('background-color', '#C72500');
  button3.addClass('big-btn');
  
  slider = createSlider(0, 400, 50, 1);
  slider.position(410, 220);
  
}

function draw() {
  background(220);
  translate(width/2, height/2);
  scale = slider.value();
  drawShape(scale, rotation);
  if (toggle){
    rotation++;
  }else{
    rotation--;
  }
}

function drawShape(s, r){
  if(layer>=7){
  push();
  rotate(radians(r));
  fill("#CA03FEF0");
  rect(0, 0, s);
  pop();
  }
  if(layer>=6){
  push();
  rotate(radians(r+20));
  fill("#0B03FEF0");
  rect(0, 0, (0.78)*s);
  pop();
  }
  if(layer>=5){
  push();
  rotate(radians(r+40));
  fill("#00F0FF");
  rect(0, 0, (0.78)*(0.78)*s);
  pop();
  }
  if(layer>=4){
  push();
  rotate(radians(r+60));
  fill("#03FE19F0");
  rect(0, 0, (0.78)*(0.78)*(0.78)*s);
  pop();
  }
  if(layer>=3){
  push();
  rotate(radians(r+80));
  fill("#FEFB03F0");
  rect(0, 0, (0.78)*(0.78)*(0.78)*(0.78)*s);
  pop();
  }
  if(layer>=2){
  push();
  rotate(radians(r+100));
  fill("#FE9C03F0");
  rect(0, 0, (0.78)*(0.78)*(0.78)*(0.78)*(0.78)*s);
  pop();
  }
  if(layer>=1){
  push();
  rotate(radians(r+120));
  fill("#FF2F00");
  rect(0, 0, (0.78)*(0.78)*(0.78)*(0.78)*(0.78)*(0.78)*s);
  pop();
  }
}

function addLayer() {
  if(layer < 7){
    layer++;
  }
}

function subLayer() {
  if(layer > 1){
    layer--;
  }
}
  
function changeRotate() {
  toggle = !toggle;
}