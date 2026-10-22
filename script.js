const player = document.querySelector('.player');
const video = document.querySelector('.flex');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const volumeSlider = document.querySelector('.volume');
const speedSlider = document.querySelector('.playbackSpeed');

const speed = document.querySelector('.speed');
const bar = document.querySelector('.speed-bar');
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleVolumeUpdate() {
  video.volume = this.value;
}

function handleSpeedSliderUpdate() {
  video.playbackRate = this.value;
  // Sync the vertical scrubber text if slider changes
  if (bar) bar.textContent = parseFloat(this.value).toFixed(1) + "×";
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleMove(e) {
  const y = e.pageY - this.offsetTop;
  const perc = y / this.offsetHeight;
  const min = 0.4;
  const max = 4.0;
  
  const height = Math.round(perc * 100) + "%";
  const playbackRate = perc * (max - min) + min;
  bar.style.height = height;
  bar.textContent = playbackRate.toFixed(1) + "×";
  video.playbackRate = playbackRate;
  if (speedSlider) speedSlider.value = playbackRate;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

if (volumeSlider) volumeSlider.addEventListener('input', handleVolumeUpdate);
if (speedSlider) speedSlider.addEventListener('input', handleSpeedSliderUpdate);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

if (speed) {
  speed.addEventListener('mousemove', handleMove);
}
	