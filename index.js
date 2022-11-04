const dataMusic = [{
		id: '1',
		artist: 'The weeknd',
		track: 'Save your tears',
		poster: 'img/1.jpg',
		mp3: 'audio/The Weeknd - Save Your Tears.mp3',
	},
	{
		id: '2',
		artist: 'Imagine Dragons',
		track: 'Follow You',
		poster: 'img/2.jpg',
		mp3: 'audio/Imagine Dragons - Follow You.mp3',
	},
	{
		id: '3',
		artist: 'Tove Lo',
		track: 'How Long',
		poster: 'img/3.jpg',
		mp3: 'audio/Tove Lo - How Long.mp3',
	},
	{
		id: '4',
		artist: 'Tom Odell',
		track: 'Another Love',
		poster: 'img/4.jpg',
		mp3: 'audio/Tom Odell - Another Love.mp3',
	},
	{
		id: '5',
		artist: 'Lana Del Rey',
		track: 'Born To Die',
		poster: 'img/5.jpg',
		mp3: 'audio/Lana Del Rey - Born To Die.mp3',
	},
	{
		id: '6',
		artist: 'Adele',
		track: 'Hello',
		poster: 'img/6.jpg',
		mp3: 'audio/Adele - Hello.mp3',
	},
	{
		id: '7',
		artist: 'Tom Odell',
		track: "Can't Pretend",
		poster: 'img/7.jpg',
		mp3: "audio/Tom Odell - Can't Pretend.mp3",
	},
	{
		id: '8',
		artist: 'Lana Del Rey',
		track: 'Young And Beautiful',
		poster: 'img/8.jpg',
		mp3: 'audio/Lana Del Rey - Young And Beautiful.mp3',
	},
	{
		id: '9',
		artist: 'Adele',
		track: 'Someone Like You',
		poster: 'img/9.jpg',
		mp3: 'audio/Adele - Someone Like You.mp3',
	},
	{
		id: '10',
		artist: 'Imagine Dragons',
		track: 'Natural',
		poster: 'img/10.jpg',
		mp3: 'audio/Imagine Dragons - Natural.mp3',
	},
	{
		id: '11',
		artist: 'Drake',
		track: 'Laugh Now Cry Later',
		poster: 'img/11.jpg',
		mp3: 'audio/Drake - Laugh Now Cry Later.mp3',
	},
	{
		id: '12',
		artist: 'Madonna',
		track: 'Frozen',
		poster: 'img/12.jpg',
		mp3: 'audio/Madonna - Frozen.mp3',
	},
];



const audio = new Audio();

const favoriteList = localStorage.getItem('favorite') ? JSON.parse(localStorage.getItem('favorite')) : [];

const headerLogo = document.querySelector('.header__logo');
const favoriteBtn = document.querySelector('.header__favorite');

let playlist = [];
const trackCards = document.getElementsByClassName('track');

const player = document.querySelector('.player');
const playerTrackTitle = document.querySelector('.player .track-info__title');
const playerTrackArtist = document.querySelector('.player .track-info__artist');
const trackPlayIcon = document.querySelector('.track__wrapper::after');
const playerPauseBtn = document.querySelector('.player__icon-pause');
const playerStopBtn = document.querySelector('.player__icon-stop');
const playerPrevBtn = document.querySelector('.player__icon-prev');
const playerNextBtn = document.querySelector('.player__icon-next');
const playerLikeBtn = document.querySelector('.player__icon-favorite');
const playerMuteBtn = document.querySelector('.player__icon-mute');

const catalogContainer = document.querySelector('.catalog__container');
const playerProgressInput = document.querySelector('.player__progress-input');
const playerVolumeInput = document.querySelector('.player__volume-input');

const trackTimePassed = document.querySelector('.player__time-passed');
const trackDuration = document.querySelector('.player__time-total');

const pausePlayer = () => {
	const trackActive = document.querySelector('.track_active');

	if (audio.paused) {
		playerPauseBtn.classList.remove('player__icon-play');
		playerPauseBtn.classList.add('player__icon-pause');
		trackActive.classList.remove('track_pause');
		audio.play();
	} else {
		playerPauseBtn.classList.remove('player__icon-pause');
		playerPauseBtn.classList.add('player__icon-play');
		trackActive.classList.add('track_pause');
		audio.pause();
	}
}

const playMusic = event => {
	event.preventDefault();

	let i = 0;
	const trackActive = event.currentTarget;
	const id = trackActive.dataset.idTrack;

	const track = playlist.find((item, index) => {
		i = index;
		return id === item.id
	});

	const index = favoriteList.indexOf(id);

	if (index !== -1) {
		playerLikeBtn.classList.add('player__icon-favorite_active');
	} else {
		playerLikeBtn.classList.remove('player__icon-favorite_active');
	}


	if (trackActive.classList.contains('track_active')) {
		pausePlayer();
		return;
	}

	audio.src = track.mp3;
	audio.play();
	playerPauseBtn.classList.remove('player__icon-play');
	player.classList.add('player_active');

	const prevTrack = i === 0 ? playlist.length - 1 : i - 1;
	const nextTrack = i + 1 === playlist.length ? 0 : i + 1;

	playerPrevBtn.dataset.idTrack = playlist[prevTrack].id;
	playerNextBtn.dataset.idTrack = playlist[nextTrack].id;

	for (let i = 0; i < trackCards.length; i++) {
		if (id === trackCards[i].dataset.idTrack) {
			trackCards[i].classList.add('track_active');
		} else {
			trackCards[i].classList.remove('track_active');
		}
	}

	playerPauseBtn.classList.add('player__icon-pause');

	playerTrackTitle.textContent = playlist[i].track;
	playerTrackArtist.textContent = playlist[i].artist;
	playerLikeBtn.dataset.idTrack = id;
}

const stopMusic = () => {
	for (let i = 0; i < trackCards.length; i++) {
		trackCards[i].classList.remove('track_active');
	}
	audio.pause();
	player.classList.remove('player_active');
}


const addTrackHandler = () => {
	for (let i = 0; i < trackCards.length; i++) {
		trackCards[i].addEventListener('click', playMusic);
	}
}


playerPauseBtn.addEventListener('click', pausePlayer);

playerStopBtn.addEventListener('click', stopMusic);

const createCard = (data) => {
	const card = document.createElement('a');
	card.className = 'catalog__item track';
	card.href = "#";
	card.dataset.idTrack = data.id;
	card.innerHTML = `
		<div class = "track__wrapper" >
			<img class = "track__poster"
				src = "${data.poster}"
				alt = "${data.artist} - ${data.track}"
				width = "180"
				height = "180" 
			>
		</div> 
		<div class = "track__info track-info">
			<p class = "track-info__title"> ${data.track} </p> 
			<p class = "track-info__artist"> ${data.artist} </p> 
		</div>
	`;

	return card;
}


const AllBtn = document.createElement('button');

AllBtn.className = 'catalog__btn-all';
AllBtn.innerHTML = `
	<span>Увидеть все</span> 
	<svg 
		width = "24" 
		height = "24"
		viewBox = "0 0 24 24"
		fill = "currentColor"
		xmlns = "http://www.w3.org/2000/svg"
	>
		<path d = "M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" />
	</svg>
`;


const renderCatalog = (dataList) => {
	playlist = [...dataList];
	catalogContainer.textContent = '';
	const cards = dataList.map(createCard);
	catalogContainer.append(...cards);

	addTrackHandler();
}

const checkCount = (i = 1) => {
	trackCards[0];
	if (catalogContainer.clientHeight >= trackCards[0].clientHeight * 3) {
		trackCards[trackCards.length - i].style.display = 'none';
		checkCount(i + 1);
	} else if (i !== 1) {
		catalogContainer.append(AllBtn);
	}
}

const updateTime = () => {
	const duration = audio.duration;
	const currentTime = audio.currentTime;
	const progress = (currentTime / duration) * playerProgressInput.max;
	const minutesPassed = Math.floor(currentTime / 60) || '0';
	const secondsPassed = Math.floor(currentTime % 60) || '0';

	const minutesDuration = Math.floor(duration / 60) || '0';
	const secondsDuration = Math.floor(duration % 60) || '0';

	playerProgressInput.value = progress ? progress : 0;

	trackTimePassed.textContent = `${minutesPassed}:${secondsPassed < 10 ? '0' + secondsPassed : secondsPassed}`;
	trackDuration.textContent = `${minutesDuration}:${secondsDuration < 10 ? '0' + secondsDuration : secondsDuration}`;
}


const init = () => {
	renderCatalog(dataMusic);
	checkCount();

	audio.volume = localStorage.getItem('volume') || 0.5;
	playerVolumeInput.value = audio.volume * 100;

	AllBtn.addEventListener('click', () => {
		[...trackCards].forEach((card) => {
			card.style.display = '';
			AllBtn.remove();
		});
	});

	playerPrevBtn.addEventListener('click', playMusic);
	playerNextBtn.addEventListener('click', playMusic);

	audio.addEventListener('ended', () => {
		playerNextBtn.dispatchEvent(new Event('click', {
			bubble: true
		}));
	});

	audio.addEventListener('timeupdate', updateTime);
	playerProgressInput.addEventListener('change', () => {
		const progress = playerProgressInput.value;
		audio.currentTime = (progress / playerProgressInput.max) * audio.duration;
	});

	favoriteBtn.addEventListener('click', () => {
		const data = dataMusic.filter(item => favoriteList.includes(item.id));
		renderCatalog(data);
		checkCount();
	});

	headerLogo.addEventListener('click', () => {
		renderCatalog(dataMusic);
		checkCount();
	});

	playerLikeBtn.addEventListener('click', () => {
		const index = favoriteList.indexOf(playerLikeBtn.dataset.idTrack);

		if (index === -1) {
			favoriteList.push(playerLikeBtn.dataset.idTrack);
			playerLikeBtn.classList.add('player__icon-favorite_active');
		} else {
			favoriteList.splice(index, 1);
			playerLikeBtn.classList.remove('player__icon-favorite_active');
		}

		localStorage.setItem('favorite', JSON.stringify(favoriteList));
	});


	playerVolumeInput.addEventListener('input', () => {
		const value = playerVolumeInput.value;
		audio.volume = value / 100;
	});

	playerMuteBtn.addEventListener('click', () => {
		if (audio.volume) {
			localStorage.setItem('volume', audio.volume)
			audio.volume = 0;
			playerVolumeInput.value = 0;
			playerMuteBtn.classList.add('player__icon-mute_off');
		} else {
			audio.volume = localStorage.getItem('volume');
			playerVolumeInput.value = audio.volume * 100;
			playerMuteBtn.classList.remove('player__icon-mute_off');
		}
	});
}

init();