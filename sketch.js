// Web Midi Implementation Source: https://jsfiddle.net/KeithMcMillenInstruments/zma6pzt9

var midi, data;
var note, vel;

let canvasWidth = 900;
let canvasHeight = 900;

let x = 0;
let y = 0;
let d1 = 1;

let speed = 3;
let speed2 = 1;
let deg = 0;

// Knob Variables
let k0, k1, k2, k3, k4, k5, k6, k7, k8, k11, k12, k13, k14, k15, k16 = 0;
let k9,k10 = 50

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
      alert("No MIDI support in your browser. Try Chrome!");
  }
}

// midi functions
function onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    midi = midiAccess; // Raw MIDI data, inputs, outputs, and sysex status

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
    data = message.data; // [command/channel, note, velocity]
    console.log('MIDI data', data); // MIDI data [144, 63, 73]
    note = data[1];
    vel = data[2];

    // Switch function for knobs
    switch (data[1]) {
      case 7:
        k0 = data [2];
      case 10:
        k1 = data [2];
        break;
      case 74:
        k2 = data [2];
      case 71:
        k3 = data [2]; 
      case 76:
        k4 = data [2];
      case 77:
        k5 = data [2];
      case 93:
        k6 = data [2];
      case 73:
        k7 = data [2];
      case 75:
        k8 = data [2];
      case 114:
        k9 = data [2];
      case 18:
        k10 = data [2];
      case 19:
        k11 = data [2];
      case 16:
        k12 = data [2];
      case 17:
        k13 = data [2];
      case 91:
        k14 = data [2];
      case 79:
        k15 = data [2];
      case 72:
        k16 = data [2];
      default:
        note = data[1];
        vel = data[2];
        break;
    }

}


function draw() {

  let a = random(0,950);
  let b = random(0,950);
  let c = random(0,100);
  let d = random(0,100);
  let e = random(200,400);

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
    rect(x, 800, vel, vel*3)
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
    fill (150,150,250,5);
    push();
    translate(width/2, height/2);
    rotate(deg++);
    rect(0,vel,15,400);
    pop(); 
  }



  // Pads 9-12

  // Pad 9
  if (note == 36) {
    fill(vel*2, vel, 200, 10);
    ellipse(300, k9*6, 400, vel)
  }

  // Pad 10
  if (note == 37){
    fill(200,20,vel*2,5)
    rect(450, k10*7, 900, vel )

  }

  // Pad 11
  if (note == 38){
    
  }

  // Pad 12
  if (note == 39){
    
  }



  //  Pads 13-16

  // Pad 13: Generative Shapes: Squares
  if (note == 40) {
    fill(255, 255, 255, 5);
    rect(a,b,c,d);
  }

  // Pad 14: Generative Shapes: Ellipses
  if (note == 41) {
    fill(255,255,255, 5);
    ellipse(a, b, c, d);
  }

  // Pad 15: Reset Background
  if (note == 42) {
    fill(0);
    rect(450, 450, 900, 900);
  }

  // Pad 16: RGBA Background, Knobs 13-16
  if (note == 43) {
    fill(k13,k14,k15,k16);
    rect(450, 450, 900, 900);
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