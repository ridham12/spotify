let currentSong = new Audio()
async function getSongs() {


    let a = await fetch("/songs/")
    let response = await a.text()
    // console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs

}

function formatSeconds(seconds) {
    // Ensure seconds is an integer
    seconds = parseInt(seconds);

    // Calculate minutes and remaining seconds
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    // Add leading zeros if necessary
    minutes = minutes < 10 ? '0' + minutes : minutes;
    remainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    // Return formatted time string
    return minutes + ':' + remainingSeconds;
}

// Example usage:
console.log(formatSeconds(72)); // Output: "01:12"


const playMusic = (track, pause = false) => {
    // if (!pause) {
    //     currentSong.play()
    // }
    currentSong.src = "/songs/" + track
    currentSong.play()
    play.src = "img/pause.svg"
    document.querySelector(".songinfo").innerHTML = track
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00"
}
async function main() {
    let songs = await getSongs()
    let audioElement = new Audio()
    playMusic(songs[0].replaceAll("%20", " "), pause = false)

    SongUl = document.querySelector(".songs").getElementsByTagName("ul")[0]

    for (const song of songs) {
        let SongUl = document.querySelector(".songs").getElementsByTagName("ul")[0]
        SongUl.innerHTML = SongUl.innerHTML + `
        
        <li class="flex">
                            <img class="invert" src="img/music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div>${"Ridham"}</div>
                                
                            </div>
                            <img class="invert" src="img/play.svg" alt="">
                        </li>
        
        `

        Array.from(document.querySelector(".songs").getElementsByTagName("li")).forEach(e => {
            e.addEventListener("click", element => {
                console.log(e.querySelector(".info").firstElementChild.innerHTML);
                playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
            })

        });

    }

    // audioElement.play();
    audioElement.addEventListener("ontimeupdate", () => {
        console.log(audioElement.duration, audioElement.currentSrc, audioElement.currentTime);

        // The duration variable now holds the duration (in seconds) of the audio clip
    });

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "img/pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "img/play.svg"
        }
    })


    currentSong.addEventListener("timeupdate", () => {
        console.log(Math.floor(currentSong.currentTime), formatSeconds(currentSong.duration));
        document.querySelector(".songTime").innerHTML = `${formatSeconds(currentSong.currentTime)} / ${formatSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    })

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = ((e.offsetX / e.target.getBoundingClientRect().width) * 100)
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100
    })

}


document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0px"
    document.querySelector(".left").style.zindex = 1
})
document.querySelector(".btn").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-100%"
    document.querySelector(".left").style.zindex = 1
})

main()

