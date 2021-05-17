import { Songs } from './Song.js'
console.log(Songs);

const Content = document.querySelector('.container');
const audio = document.querySelector('#song');
const playBtn = document.querySelector('.playBtn');
const playImg = document.querySelector('#play-img');
const musicCont = document.querySelector('.musicContainer');
const PrevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');
const ProgressCon = document.querySelector('.ProgressContainer');
const Progress = document.querySelector('.progress');
const App = document.querySelector('.APP');

let songIndex = 0;

function loadContent(Song) {
    Content.innerHTML = `
    <img src="${Song.image}" width="100%" height="280px">
    <h3>${Song.name}</h3>`;
    App.style.background = Song.color;
    document.body.style.background = Song.color;

    audio.src = Songs[songIndex].song;
}loadContent(Songs[songIndex]);

function updateProgress(el) {
    const {duration,currentTime} = el.srcElement;
    const ProgressPer = (currentTime/duration) * 100;
    Progress.style.width = `${ProgressPer}%`;
}

function follow(e) {
    const width = this.clientWidth;
    const ClickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (ClickX/width) * duration;
}

function playSong() {
    musicCont.classList.add('play');
    playImg.src = './image/pausebtn.png';
    audio.play();
    ProgressCon.classList.add('show-progress');
}

function pauseSong() {
    musicCont.classList.remove('play');
    playImg.src = './image/playBtn.png';
    audio.pause();
    ProgressCon.classList.remove('show-progress');
}

playBtn.addEventListener('click',() => {
    const isOn = musicCont.classList.contains('play');

    if(isOn) {
        pauseSong();
    }else {
        playSong();
    }
});

function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex = Songs.length - 1;
    }

    loadContent(Songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;

    if(songIndex > Songs.length - 1) {
        songIndex = 0;
    }

    loadContent(Songs[songIndex]);

    playSong();
}

PrevBtn.addEventListener('click',() => {
    prevSong();
});

nextBtn.addEventListener('click',() => {
    nextSong();
});

audio.addEventListener('timeupdate',updateProgress);
ProgressCon.addEventListener('click',follow);
audio.addEventListener('ended',nextSong);