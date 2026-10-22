const inputs = document.querySelectorAll('.controls input');
const speed = document.quertySelectorAll(".speed");
const video = document.querySelectorAll(".flex");
const bar = document.querySelectorAll(".speed-bar");

function handleMove(e) {
	const y = e.pageY - this.offsetTop;
	const perc = y/this.offsetHeight;
	const min = 0.4;
	const max = 4.0;
	const height = Math.round(perc*100)+"%";
	const playbackRate = perc*(max-min)+min;

	bar.style.height = height;
	bar.textContent = playbackRate.toFixed(1) + "x";

	video.playbackRate = playbackRate;
	
}

speed.addEventListener('mousemove',handleMove);





// function handleUpdate() {
//       const suffix = this.dataset.sizing || '';
//       document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
//     }

//     inputs.forEach(input => input.addEventListener('change', handleUpdate));
//     inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
