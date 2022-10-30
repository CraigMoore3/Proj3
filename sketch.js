// Source: https://jsfiddle.net/KeithMcMillenInstruments/zma6pzt9
var midi, data;
var note, vel;

function setup() {
  createCanvas(1600,900);
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
  if (note == 44, 10) {
    fill(vel*2, vel, 200,)
    ellipse(200, 200, vel, 200)
  }
  if (note == 38) {
  fill(note, vel*2, vel*3,)
  rect(40,0,vel*5,vel*5);
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