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

function setup() {
  createCanvas(canvasWidth,canvasHeight);
  background(0)

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
    note = data[1];
    vel = data[2];

}


function draw() {

// Pads 1-4, velocity sensative rectangles

  if (note == 36) {
    fill(vel*2, vel, 200, 2);
    y += speed2;
    ellipse(200, y, frameCount/3, vel)
  }

  if (y > height || y < 0) {
    speed2 *= -1;
  }

  if (note == 44) {
    fill(150, vel*4, vel*2, 5);
    x += speed;
    rect(x, 100, vel, vel*3);
  }

  if (note == 45) {
    fill(vel*4, 255, vel, 8);
    x += speed;
    rect(x, 400, vel, vel*3);
  }

  if (note == 46) {
    fill(226, vel, 30, 8);
    x += speed;
    rect(x, 600, vel, vel*3);
  }

  if (note == 47) {
    fill(160, 32, 226, 6)
    x += speed; 
    rect(x, 800, vel, vel*3)
  }

  if (x > width || x < 0) {
    speed *= -1;
  }



  // Pads 5-8, Spinning Rectangle

  if (note == 48) {
    fill (200, 50, 25);
    push();
    translate(width/2, height/2);
    rotate(deg++);
    rect(0,0,15,400);
    pop();
  }

  if (note == 49) {
    fill (25, 50, 200);
    push();
    translate(width/2, height/2);
    rotate(deg++);
    rect(0,0,15,400);
    pop();
  }

  if (note == 50) {
    fill ( 255, 255, 255);
    push();
    translate(width/2, height/2);
    rotate(deg++);
    rect(0,0,15,400);
    pop(); 
  }

  if (note == 51) {
    fill (25, 200, 25);
    push();
    translate(width/2, height/2);
    rotate(deg++);
    rect(0,0,15,400);
    pop(); 
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

