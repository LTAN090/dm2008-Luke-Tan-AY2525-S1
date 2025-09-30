let colours = ["#FF2F00", "#FE9C03F0", "#FEFB03F0","#03FE19F0", "#00F0FF", "#0B03FEF0", "#CA03FEF0", "#FFFFFF", "#000000FF"];
let selection = ["#FFFFFF", "#000000FF"];
let shapes = [0, 1];
function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(220);
  const spacing = width/(selection.length + 1);
  for (let i = 0; i < selection.length; i++) {
    fill(selection[i]);
    const x = (i+1) * spacing;
    rect(x, height/2, 20, 300);
  }
}

function keyPressed(){
  switch(key){
    case 'a':
      selection.push(random(colours));
      break;
    
    case 'r':
      if(selection.length >0){
        selection.splice(selection.length - 1, 1);
      }  
      break;
      
    case 's':
      if(selection.length >0){
        selection.splice(0, 1);
      }
      break;
      
    default:
      break;
  }
}