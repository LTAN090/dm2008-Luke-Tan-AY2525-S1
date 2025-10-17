const int lightPin = A0;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);  
}

void loop() {
  // put your main code here, to run repeatedly:
  int luxVal = analogRead(lightPin); // 0..1023, higher = brighter
  Serial.println(luxVal);
  delay(100);  
}
