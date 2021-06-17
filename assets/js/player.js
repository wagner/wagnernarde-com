const player = {
	init: function () {
		const outputContainer = document.getElementById('volume-output');
		const volumeSlider = document.getElementById('volume-slider');
		const audioPlayerContainer = document.getElementById('audio-player-container');
		const audio = document.querySelector('audio');
		const playIconContainer = document.getElementById('play-icon');
		const muteIconContainer = document.getElementById('mute-icon');
		const seekSlider = document.getElementById('seek-slider');
		const btnSlider = document.getElementById('btn-media');
		const durationContainer = document.getElementById('duration');
		const currentTimeContainer = document.getElementById('current-time');
		let playState = 'play';
		let muteState = 'unmute';
		let raf = null;

		const playAnimation = function (play) {
			if (play) {
				playIconContainer.src = './assets/player/stop.png'
				return
			}
			playIconContainer.src = './assets/player/audio_play.svg'
		}

		const muteAnimation = function (mute) {
			if (!mute) {
				muteIconContainer.src = './assets/player/audio_volume.svg'
				return
			}
			muteIconContainer.src = './assets/player/mute.png'
		}

		playIconContainer.addEventListener('click', () => {
			if (playState === 'play') {
				audio.play();
				playAnimation(true)
				requestAnimationFrame(whilePlaying);
				playState = 'pause';
			} else {
				audio.pause();
				playAnimation()
				cancelAnimationFrame(raf);
				playState = 'play';
			}
		});

		muteIconContainer.addEventListener('click', () => {
			if (muteState === 'unmute') {
				muteAnimation(true)
				audio.muted = true;
				muteState = 'mute';
			} else {
				muteAnimation()
				audio.muted = false;
				muteState = 'unmute';
			}
		});

		const showRangeProgress = (rangeInput) => {
			if (rangeInput === seekSlider) audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
			else audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
		}

		seekSlider.addEventListener('input', (e) => {
			showRangeProgress(e.target);
		});

		/* Implementation of the functionality of the audio player */

		const calculateTime = (secs) => {
			const minutes = Math.floor(secs / 60);
			const seconds = Math.floor(secs % 60);
			const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
			return `${minutes}:${returnedSeconds}`;
		}

		const displayDuration = () => {
			durationContainer.textContent = calculateTime(audio.duration);
		}

		const setSliderMax = () => {
			seekSlider.max = Math.floor(audio.duration);
		}

		const displayBufferedAmount = () => {
			const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
			audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
		}

		const whilePlaying = () => {
			seekSlider.value = Math.floor(audio.currentTime);
			currentTimeContainer.textContent = calculateTime(seekSlider.value);
			audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
			btnSlider.style.setProperty('left', `${seekSlider.value / seekSlider.max * 100}%`);
			raf = requestAnimationFrame(whilePlaying);
		}

		if (audio.readyState > 0) {
			displayDuration();
			setSliderMax();
			displayBufferedAmount();
		} else {
			audio.addEventListener('loadedmetadata', () => {
				displayDuration();
				setSliderMax();
				displayBufferedAmount();
			});
		}

		audio.addEventListener('progress', displayBufferedAmount);

		seekSlider.addEventListener('input', () => {
			currentTimeContainer.textContent = calculateTime(seekSlider.value);
			if (!audio.paused) {
				cancelAnimationFrame(raf);
			}
		});

		seekSlider.addEventListener('change', () => {
			audio.currentTime = seekSlider.value;
			if (!audio.paused) {
				requestAnimationFrame(whilePlaying);
			}
		});

		//volumeSlider.addEventListener('input', (e) => {
		//showRangeProgress(e.target);
		//});

		//volumeSlider.addEventListener('input', (e) => {
		//const value = e.target.value;

		//outputContainer.textContent = value;
		//audio.volume = value / 100;
		//});
		/* Implementation of the Media Session API */
	}
}

export default player


