let player = document.querySelector('#player');
const prev = document.querySelector('.prev');
const play = document.querySelector('.play');
const next = document.querySelector('.next');
const progress = document.querySelector('.progress');
const progressTitle = document.querySelector('.progress-title');
const imageContainer = document.querySelector('.image-container');
const progressCurrent = document.querySelector('.progress-current');
const progressBar = document.querySelector('.progress-bar');

let songs = 1;

function prevSong(e) {
    if(songs === 1) {
        songs = 3;
    } else {
    songs--;
    }
    player.pause();
    playSong();
}

function nextSong(e) {
    if(songs === 3) {
        songs = 1;
    } else {
    songs++;
    }
    player.pause();
    playSong();
}

function progressUpdate(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 180;
    progressCurrent.style.width = `${progressPercent}px`;
}

function progressChange(e) {
    const width = this.clientWidth;
    const progressX = e.offsetX;
    const duration = player.duration;
    
    player.currentTime = (progressX / width) * duration;
    player.play();
}

function playSong(e) {
    if(player.paused) {
        if(songs === 1){
            progressTitle.textContent = 'ukulele';
            imageContainer.innerHTML = `<img src="images/ukulele.jpg" alt="image not found" class="play-spin" id="photo">`;
            player = new Audio("music/music-player_music_ukulele.mp3");
        } else if(songs === 2) {
            progressTitle.textContent = 'hey';
            imageContainer.innerHTML = `<img src="images/hey.jpg" alt="image not found" class="play-spin" id="photo">`;
            player = new Audio("music/music-player_music_hey.mp3");
        } else if(songs === 3) {
            progressTitle.textContent = 'summer';
            imageContainer.innerHTML = `<img src="images/summer.jpg" alt="image not found" class="play-spin" id="photo">`;
            player = new Audio("music/music-player_music_summer.mp3");
        }
        play.querySelector('i.fas').classList.remove('fa-play');
        play.querySelector('i.fas').classList.add('fa-stop');
        progress.classList.add('progress-show');
        player.play();
        progressBar.addEventListener('click', progressChange);
    } else {
        play.querySelector('i.fas').classList.remove('fa-stop');
        play.querySelector('i.fas').classList.add('fa-play');
        document.querySelector('#photo').classList.remove('play-spin');
        progress.classList.remove('progress-show');
        player.pause();
    }
    player.addEventListener('timeupdate', progressUpdate);
    player.addEventListener('ended', nextSong);
}



prev.addEventListener('click', prevSong);
play.addEventListener('click', playSong);
next.addEventListener('click', nextSong);
