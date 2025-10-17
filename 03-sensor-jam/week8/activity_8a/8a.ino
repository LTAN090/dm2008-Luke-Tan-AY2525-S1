int ledPin = 11;
int blinkPin = 13;
int brightness = 0;
int fadeAmount = 15;
int check = 0;
 
void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(blinkPin, OUTPUT);
}
 
void loop() {
  if (check == 0){
    digitalWrite(blinkPin, HIGH);  // turn the LED on (HIGH is the voltage level)
    check = 1;
  }else{
    digitalWrite(blinkPin, LOW);   // turn the LED off by making the voltage LOW
    check = 0;
  }
  analogWrite(ledPin, brightness); 
  brightness += fadeAmount;
 
  if (brightness <= 0 || brightness >= 255) {
    fadeAmount = -fadeAmount;
  }
  delay(150);
}