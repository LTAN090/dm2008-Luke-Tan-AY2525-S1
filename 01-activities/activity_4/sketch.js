//INSTRUCTIONS
//keys: a=rect s=rounded rect d=ellipse f=circle g=square 

let r = 255;
let g = 0;
let b = 0;
let i = 0;
let outline = 0;
let shape = 1;
let shapes = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0, 20);
  rectMode(CENTER);
  
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].show();
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

class Shape {
  constructor(shape, r, g, b){
    this.shape = shape;
    this.r = r;
    this.g = g;
    this.b = b;
  }
  show(){  
    fill(this.r, this.g, this.b);
    switch (this.shape){
      case 1: 
        rect(random(25, 375), random(100, 300), 50, 200);
        break;
      case 2:
        rect(random(25, 375), random(100, 300), 50, 200, 25);
        break;
      case 3:
        ellipse(random(25, 375), random(100, 300), 50, 200);
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
  }
}

//click to switch between outline and fill

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
  shapes.push(new Shape(shape, r, g, b));
  if(shapes.length >3){
    shapes.splice(0, 1);
  }
}
