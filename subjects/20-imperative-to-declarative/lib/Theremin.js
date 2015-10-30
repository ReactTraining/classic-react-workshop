import './AudioContextMonkeyPatch'

function Theremin(audioContext) {

	// TODO make more things not use this.
	let oscillatorNode = audioContext.createOscillator();
	oscillatorNode.start(0);

	let gainNode = audioContext.createGain();
	this.pitchBase = 50;
	this.pitchBend = 0;
	this.pitchRange = 2000;
	this.volume = 0.5;
	this.maxVolume = 1;
	this.frequency = this.pitchBase;
  let hasConnected = false

	let frequency = this.pitchBase;

	this.play = function() {
    oscillatorNode.connect(gainNode);
    hasConnected = true
  };

  this.stop = function() {
    if (hasConnected)
      oscillatorNode.disconnect(gainNode);
	};

  this.setType = function(type) {
    oscillatorNode.type = type
  };

	this.setPitchBend = function(v) {
		this.pitchBend = v;
		frequency = this.pitchBase + this.pitchBend * this.pitchRange;
		oscillatorNode.frequency.value = frequency;
		this.frequency = frequency;
	};

	this.setVolume = function(v) {
		this.volume = this.maxVolume * v;
		gainNode.gain.value = this.volume;
	};

	this.connect = function(output) {
		gainNode.connect(output);
	};

	return this;
}

export default Theremin

export function createTheremin () {
  let audioContext = new AudioContext()
  let theremin = new Theremin(audioContext)
  theremin.connect(audioContext.destination)
  return theremin
}

