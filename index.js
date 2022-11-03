const audio = new Audio();

const trackCards = document.getElementsByClassName('track');

const player = document.querySelector('.player');
const playerTrackTitle = document.querySelector('.player .track-info__title');
const playerTrackArtist = document.querySelector('.player .track-info__artist');
const trackPlayIcon = document.querySelector('.track__wrapper::after');
const playerPauseBtn = document.querySelector('.player__icon-pause');
const playerStopBtn = document.querySelector('.player__icon-stop');


const playMusic = event => {
	const trackActive = event.currentTarget;
	const trackTitle = trackActive.querySelector('.track-info__title');
	const trackArtist = trackActive.querySelector('.track-info__artist');

	audio.src = trackActive.dataset.track;
	audio.play();
	playerPauseBtn.classList.remove('player__icon-play');
	player.classList.add('player_active');

	for (let i = 0; i < trackCards.length; i++) {
		trackCards[i].classList.remove('track_active');
	}

	trackActive.classList.add('track_active');
	playerPauseBtn.classList.add('player__icon-pause');

	playerTrackTitle.textContent = trackTitle.textContent;
	playerTrackArtist.textContent = trackArtist.textContent;

}

const stopMusic = () => {
	for (let i = 0; i < trackCards.length; i++) {
		trackCards[i].classList.remove('track_active');
	}
	audio.pause();
	player.classList.remove('player_active');
}



for (let i = 0; i < trackCards.length; i++) {
	trackCards[i].addEventListener('click', playMusic);
}

playerPauseBtn.addEventListener('click', () => {
	if (audio.paused) {
		playerPauseBtn.classList.remove('player__icon-play');
		playerPauseBtn.classList.add('player__icon-pause');
		audio.play();
	} else {
		playerPauseBtn.classList.remove('player__icon-pause');
		playerPauseBtn.classList.add('player__icon-play');
		audio.pause();
	}
})

playerStopBtn.addEventListener('click', stopMusic)