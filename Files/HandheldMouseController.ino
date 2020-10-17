/*
Handheld Mouse Controller

Written by Matthew Gunn.

Utilizing Mouse.h and 32U4MEGA chip on MICRO PRO board with leonardo bootloader.

V3.2 - fixed button issues - finalized code.

Feel free to use this code for personal use! 
*/

//includes and such
#include <Mouse.h>

//MOUSE_LEFT maps to middle button for some reason
//- use defaults for leftclick.
#define RBUTTON "MOUSE_RIGHT"

//function declaration
int digchange(int state, int oldstate);
int joymap(int rawmouse, char axis);


//pinout declaration
int left = 4;
int right = 5;
int accel = 6; //accel will be used in later upgrades.
int x = A8; //analog pin
int y = A9; //analog pin

 //declare old states
int oldxmouse = 0; //check to see if these are actually needed
int oldymouse = 0;
int oldleftclick = LOW;
int oldrightclick = LOW;



void setup() {

  //begin console for output
  Serial.begin(9600);
  
  Mouse.begin();

}

void loop() {
  
  //take all values to check for input
  int rawxmouse = analogRead(x); 
  int rawymouse = analogRead(y);
  int leftclick = digitalRead(left);
  int rightclick = digitalRead(right);


  //convert rawmouse to mouse

  int xmouse = joymap(rawxmouse,'x');
  int ymouse = joymap(rawymouse,'y');
  


  //push to mouse

  //leftclick mouse push

  if(digchange(leftclick,oldleftclick) == 1){
    if(leftclick == HIGH){
      Mouse.press();
      Serial.println("LeftClick");
    }
    if(leftclick == LOW){
      Mouse.release();
      Serial.println("UnLeftClick");
    }
  }
  
  //rightclick mouse push

  if(digchange(rightclick,oldrightclick) == 1){
    if(rightclick == HIGH){
      Mouse.press(RBUTTON);
      Serial.println("RightClick");
    }
    if(rightclick == LOW){
      Mouse.release(RBUTTON);
      Serial.println("UnRightClick");
    }
  }



  //joycontrol mouse push

    Mouse.move(xmouse,ymouse,0);
    
    Serial.print("Mouse Xval = ");
    Serial.println(xmouse);
    Serial.print("Mouse Yval = ");
    Serial.println(ymouse);
  

  // move all values to oldvalues

  oldxmouse = xmouse;
  oldymouse = ymouse;
  oldleftclick = leftclick;
  oldrightclick = rightclick;


  //wait a moment, then loop to find new values and implement changes  
  delay(50);

}


int digchange(int state, int oldstate){
  //Digital change function. Returns 0 if no change, 1 if change. Call before pressing/unpressing button.

  if(state == oldstate){
    return 0;
  }
  else return 1;
}


int joymap(int rawmouse, char axis){
  //converts the 0-1023 data from a joystick to up to (-127)-127 data processable by Mouse.move functionality. 
  //uses accel value to determine relative mouse velocity - will add in later upgrades  
  int normalize = map(rawmouse, 0, 1023, -512, 512); // change this based on data
  int correct;
  if (axis == 'x'){
    correct = normalize + 13; //value of joystick x-error
  }
  else if (axis == 'y'){
    correct = normalize + 4; //value of joystick y-error
  }

  //note that power function is no longer cubic - label is kept for legacy reasons.
  int cubic = correct*.01 * correct*.01 * correct*.01* correct*.01 * correct*.01;
  int analogmouse = map(cubic, -3700, 3700,-25,25);
  return analogmouse;
}
