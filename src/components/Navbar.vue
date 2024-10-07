<script setup>
import { ref, onMounted } from 'vue';


const audio = ref(null);
const playBtn = ref(null);
const pauseBtn = ref(null);
const volumeBar = ref(null);
const muteBtn = ref(null);
const timeDisplay = ref(null);
const durationDisplay = ref(null);


onMounted(() => {
    const audioEl = audio.value;


    playBtn.value.addEventListener('click', () => {
        audioEl.play();
    });

    pauseBtn.value.addEventListener('click', () => {
        audioEl.pause();
    });


    volumeBar.value.addEventListener('input', (e) => {
        audioEl.volume = e.target.value;
    });


    muteBtn.value.addEventListener('click', () => {
        audioEl.muted = !audioEl.muted;
    });


    audioEl.addEventListener('timeupdate', () => {
        const currentTime = formatTime(audioEl.currentTime);
        const duration = formatTime(audioEl.duration);
        timeDisplay.value.innerText = currentTime;
        durationDisplay.value.innerText = duration;
        seekBar.value.value = (audioEl.currentTime / audioEl.duration) * 100;
    });



    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }
});
</script>


<template>
    <nav class="navbar navbar-expand-lg border border-3 border-mlilla m-2">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/">Whimsical Pixel Decor</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/Decor">Start decorating</RouterLink>
                    </li>
                </ul>
            </div>


            <div class="audio-player">
                <button ref="playBtn" class="play-btn"><img width="20" height="26" src="https://img.icons8.com/forma-bold-filled/24/FFFFFF/play.png" alt="play"/></button>
                <button ref="pauseBtn" class="pause-btn"><img width="26" height="26" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/pause--v1.png" alt="pause--v1"/></button>
                <button ref="muteBtn" class="mute-btn"><img width="22" height="22" src="https://img.icons8.com/metro/26/FFFFFF/no-audio.png" alt="no-audio"/></button>
                <input ref="volumeBar" type="range" class="volume-bar" min="0" max="1" step="0.01" value="1">
                <span ref="timeDisplay" class="time">0:00</span> /
                <span ref="durationDisplay" class="duration">0:00</span>
            </div>

            <audio hidden="hidden" ref="audio" class="music">
                <source src="/public/music/song.wav" type="audio/wav">
                Your browser does not support the audio element.
            </audio>

        </div>
    </nav>

</template>


<style scoped>

.navbar{
    font-size: x-large;
}

text{
    color: #493652;
    text-decoration-color: #493652;
}

.audio-player {
    display: flex;
    align-items: center;
    gap: 10px;
}

.play-btn, .pause-btn, .mute-btn {
    background-color: #493652;
    color: white;
    border: none;
    padding: 8px;
    border-radius: 5px;
    cursor: pointer;
    padding-top: 4px;
    padding-bottom: 5px;

}

.volume-bar {
    width: 50px;
}

.time, .duration {
    font-size: 15px;
    color: #493652;
}

</style>
