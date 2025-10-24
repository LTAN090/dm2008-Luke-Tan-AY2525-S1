// DDM2008 — Activity 2b
// (Pattern Making, 40 min)
let size = 80;
let shape = 0;
let shapes = [0, 1, 2];
let colours = ["#FF2F00", "#FE9C03F0", "#D6FE03F0", "#00F0FF", "#9F03FEF0", "#FFFFFF", "#000000FF"];
let c = "#FFFFFF";
let d = "#000000FF";
function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(240);

  // Horizontal row of shapes
  for (let i = 0; i < width; i += size) {
    for (let j = 0; j < height; j += size) {
      // Alternate colors using % (modulo)
      if (i % (size*2) == 0) {
        if (j % (size*2) == 0) {
          fill(d);   // black
        } else {
          fill(c); // gray
        }
      } else {
        if (j % (size*2) == 0) {
          fill(c);   // black
        } else {
          fill(d); // gray
        }
      }
      switch (shape){
      case 0:
        ellipse(i + size/2, j + size/2, (4*size)/5);
        break;
      case 1:
        rect(i + size/2, j + size/2, (4*size)/5);
        break;
      case 2:
        triangle(i+size ,j+size, i, j+size, i + size/2, j)
        break;
      }
    }
    // TODO: change ellipse to rect, triangle, or something else
    // TODO: try varying size instead of color
  }

  // TODO: add one interaction (mouse or key) to change the rule
  // Example: if (mouseIsPressed) { fill(255, 0, 0); }
}
function keyPressed(){
  switch(key){
    case 'a':
      shape = 0;
      break;
    case 's':
      shape = 1;
      break;
    case 'd':
      shape = 2;
      break;
    case 'r':
      shape = random(shapes);
      c = random(colours);
      d = random(colours);
      break;
    default:
      break;
  }
}
function mousePressed(){
  c = random(colours);
  d = random(colours);
}