//INSTRUCTIONS
//keys: a=rect s=rounded rect d=ellipse f=circle g=square
//mouse: click swaps between fill and outline, 
//position changes shape orientation

let r = 255;
let g = 0;
let b = 0;
let i = 0;
let outline = 0;
let shape = 1;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0, 10);
  rectMode(CENTER);
  
  //check whether fill or outline
  if (outline == 1){
    strokeWeight(4);
    stroke(r, g, b);
    noFill();
  }else{
    strokeWeight(0);
    fill(r, g, b);
  }
  
  //shape defined by keys asdfg, orientation by mouse position if applicable
  switch (shape){
    case 1:
      if (mouseX>mouseY){
        rect(random(25, 375), random(100, 300), 50, 200);
      }else{
        rect(random(100, 300), random(25, 375), 200, 50);
      }
      break;
    case 2:
      if (mouseX>mouseY){
        rect(random(25, 375), random(100, 300), 50, 200, 25);
      }else{
        rect(random(100, 300), random(25, 375), 200, 50, 25);
      }
      break;
    case 3:
      if (mouseX>mouseY){
        ellipse(random(25, 375), random(100, 300), 50, 200);
      }else{
        ellipse(random(100, 300), random(25, 375), 200, 50);
      }
      break;
    case 4: 
      ellipse(random(25, 375), random(25, 375), 50);  
      break;
    case 5: 
      rect(random(25, 375), random(25, 375), 50);  
      break;
    default:
      shape = 1;
  }
  
  
  //RGB function
  switch(true){
    case i>=0 && i<255:
      g+=1;
      i+=1;
      break;
    case i>=255 && i<510:
      r-=1;
      i+=1;
      break;
    case i>=510 && i<765:
      b+=1;
      i+=1;
      break;
    case i>=765 && i<1020:
      g-=1;
      i+=1;
      break;
    case i>=1020 && i<1275:
      r+=1;
      i+=1;
      break;
    case i>=1275 && i<1530:
      b-=1;
      i+=1;
      break;
    default:
      i = 0;
  }
  
  //console.log(r, g, b, i);
}

//click to switch between outline and fill
function mousePressed(){
  if(outline==0){
    outline = 1;
  }else{
    outline = 0;
  }
}

//change the shape with asdfg keys
function keyPressed(){
  switch(key){
    case 'a':
      shape = 1;
      break;
    case 's':
      shape = 2;
      break;
    case 'd':
      shape = 3;
      break;
    case 'f':
      shape = 4;
      break;
    case 'g':
      shape = 5;
      break;
    default:
      break;
  }
}
