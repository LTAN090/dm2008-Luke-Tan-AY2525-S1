// DDM2008
// Activity 1a

// Run the sketch, then click on the preview to enable keyboard
// Use the 'Option' ('Alt' on Windows) key to view or hide the grid
// Use the 'Shift' key to change overlays between black & white
// Write the code for your creature in the space provided

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(240);
  fill("#FF2F00");
  strokeWeight(0);
  // YOUR CODE HERE
  rect(100, 50, 50);
  triangle(150, 50, 150, 100, 200, 100);
  triangle(125, 50, 150, 50, 150, 25);
  rect(150, 100, 50, 150);
  triangle(150, 250, 200, 250, 200, 300);
  rect(200, 250, 50, 50);
  triangle(250, 250, 300, 250, 250, 300);
  rect(250, 200, 50);
  triangle(250, 200, 350, 200, 300, 150);
  rect(200, 300, 10, 50);
  rect(240, 300, 10, 50);
  rect(100, 150, 50, 10);
 
  fill("#FDDE71")
  ellipse(135, 65, 10);
  rect(100, 80, 30, 5);
  ellipse(175, 125, 30);
  ellipse(175, 175, 30);
  ellipse(175, 225, 30);
  // YOUR CODE HERE
  
  
}
