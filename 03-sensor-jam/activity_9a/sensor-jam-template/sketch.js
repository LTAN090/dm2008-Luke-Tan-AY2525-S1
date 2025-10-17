let port; // Serial Communication port
let connectBtn;
let colour=100;
let targetColour;
let sensorVal;
let circleSize = 50;
let targetSize = 50; // used for Option 2
let rotation = 0;
let targetRotation = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  port = createSerial(); // creates the Serial Port
  rectMode(CENTER);
  
  // Connection helpers
  connectBtn = createButton("Connect to Arduino");
  connectBtn.position(20, 20);
  connectBtn.mousePressed(connectBtnClick);
}

function draw() {
  background(100);
  fill(255, colour, 0);
  translate(width/2, height/2);
  rotate(radians(rotation));
  rect(0, 0, circleSize, circleSize, circleSize/4);

  // Receive data from Arduino
  if (port.opened()) {
    sensorVal = port.readUntil("\n");
    // Only log data that has information, not empty signals
    if (sensorVal[0]) {
      // Once you verify data is coming in,
      // disable logging to improve performance
      console.log(sensorVal);

      // OPTION 1:
      // Update circle's size with sensor's data directly
      // Reduce delay() value in Ardiuno to get smoother changes

      // use float() to convert from data from string to number
      // circleSize = float(sensorVal);

      // OPTION 2:
      // Update circle's size using lerp() to smoothly change values
      // This method even works with longer delay() values in Arduino
      targetRotation = sensorVal*360/500;
      targetColour = 255-int(sensorVal*255/500);
      targetSize = float(sensorVal);
      // last value in lerp() controls speed of change
      circleSize = lerp(circleSize, targetSize, 0.2);
      colour = lerp(colour, targetColour, 0.2);
      rotation = lerp(rotation, targetRotation, 0.1);
    }
  }
}

// DO NOT REMOVE THIS FUNCTION
function connectBtnClick(e) {
  // If port is not already open, open on click,
  // otherwise close the port
  if (!port.opened()) {
    port.open(9600); // opens port with Baud Rate of 9600
    e.target.innerHTML = "Disconnect Arduino";
    e.target.classList.add("connected");
  } else {
    port.close();
    e.target.innerHTML = "Connect to Arduino";
    e.target.classList.remove("connected");
  }
}
