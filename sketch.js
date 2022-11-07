// Source: https://jsfiddle.net/KeithMcMillenInstruments/zma6pzt9
var midi, data;
var note, vel;
let canvasWidth = 900;
let canvasHeight = 900;
let x = 0;
let speed = 3;
let speed2 = 1;
let y = 0;
let deg = 0;
let d1 = 1;
let xx = x *= -1;
let hasMIDIDevices = false;
let cc74value = 0;

function setup() {
  createCanvas(canvasWidth,canvasHeight);
  background(0);
  stroke(200);

  ellipseMode(CENTER);
  rectMode(CENTER);
  angleMode(DEGREES);

  // request MIDI access
  if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
          sysex: false
      }).then(onMIDISuccess, onMIDIFailure);
  } else {
      alert("No MIDI support in your browser.");
  }
}

// midi functions
function onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

    var inputs = midi.inputs.values();
    if (inputs.value != undefined) hasMIDIDevices = true;
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }
}

function onMIDIFailure(error) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

function onMIDIMessage(message) {
    data = message.data; // this gives us our [command/channel, note, velocity] data.
    console.log('MIDI data', data); // MIDI data [144, 63, 73]
    // note = data[1];
    // vel = data[2];
    // if (data[1] == 74) cc74value = data[2];

    switch (data[1]) {
      case 74:
        cc74value = data[2];
        break;
      case 75:
        cc75value = data[2];
      default:
        note = data[1];
        vel = data[2];
        break;
    }

}


function draw() {
  // Test for using knob as background selector
  // if (note == 10) {
  //   fill(vel*2);
  //   rect(450, 450, 900, 900);
  // }
  fill("white");
  if (! hasMIDIDevices) { 
    console.log("No MIDI Devices");
    text("No MIDI Devices",34,50);
    noLoop();
  }

// Pads 1-4, velocity sensative rectangles

  if (y > height || y < 0) {
    speed2 *= -1;
  }


  // Pad 1
  if (note == 44) {
    fill(150, vel*4, vel*2, 5);
    x += speed;
    rect(x, 100, vel, vel*3);
  }

  // Pad 2
  if (note == 45) {
    fill(vel*4, 255, vel, 8);
    x += speed;
    rect(x, 400, vel, vel*3);
  }

  // Pad 3
  if (note == 46) {
    fill(226, vel, 30, 8);
    x += speed;
    rect(x, 600, vel, vel*3);
  }

  // Pad 4
  if (note == 47) {
    fill(160, 32, 226, 6)
    x += speed; 
    rect(x, cc74value, vel, vel*3)
  }

  if (x > width || x < 0) {
    speed *= -1;
  }



  // Pads 5-8, Spinning Rectangle

  // Pad 5
  if (note == 48) {
    fill (0,0,0,1);
    push();
    translate(width/2, height/2);
    rotate(deg--);
    rect(vel,0,15,400);
    pop();
  }

  // Pad 6
  if (note == 49) {
    fill (100, 10, 222, 5);
    push();
    translate(width/2, height/2);
    rotate(deg++);
    rect(0,vel*2,15,400);
    pop();
  }

  // Pad 7
  if (note == 50) {
    fill (150, 20, 200,20);
    push();
    translate(width/2, height/2);
    rotate(deg--);
    rect(vel/2,50,15,400);
    pop(); 
  }

  // Pad 8
  if (note == 51) {
    fill (200);
    push();
    translate(width/2, height/2);
    rotate(deg++);
    rect(0,vel,15,400);
    pop(); 
  }



  // Pads 9-12,

  // Pad 9
  if (note == 36) {
    fill(vel*2, vel, 200, 25);
    y += speed2;
    ellipse(200, y, 100, vel)
  }

  // Pad 10
  if (note == 37){
    fill(255);
    rect(x++, vel*6, 15, 200);

  }

  // Pad 11
  if (note == 38){
    fill(250,100,10, 50);
    rect(x++, vel *6, 15,200)
  }

  // Pad 12
  if (note == 39){

  }



  //  Pads 13-16

  // Pad 13
  if (note == 40) {

  }

  // Pad 14
  if (note == 41) {

  }

  // Pad 15
  if (note == 42) {

  }

  // Pad 16
  if (note == 43) {

  }

}

// Knob Note Values ( 0 - 127 )
// 1 = 10, 2 = 74, 3 = 71, 4 = 76
// 5 = 77, 6 = 93, 7 = 73, 8 = 75
// 9 = 114, 10 = 18, 11 = 19, 12 = 16
// 13 = 17, 14 = 91, 15 = 79, 16 = 72

// Pad Note Values ( 0 - 127 )
// 1 = 44   2 = 45   3 = 46   4 = 47
// 5 = 48   6 = 49   7 = 50   8 = 51 
// 9 = 36   10 = 37   11 = 38   12 = 39
// 13 = 40   14 = 41   15 = 42   16 = 43


// Need to work on this
// function knobvelocity1() {
//     if (note == 10){
//         return vel;
//     }
//     else 
// }

// function testfunct () {
//   if (note == 43){
//     fill(vel*2, vel, 200,)
//     ellipse(200, 200, 50, vel)
//     }
//   else {}
// }

