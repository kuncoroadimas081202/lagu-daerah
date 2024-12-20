const image = document.getElementById("cover"),
    title = document.querySelector(".song-title"), // Update untuk elemen judul lagu di UI
    artist = document.querySelector(".song-artist"), // Update untuk elemen artis di UI
    currentTimeEl = document.getElementById("current-time"),
    durationEl = document.getElementById("duration"),
    progress = document.getElementById("progress"),
    playerProgress = document.getElementById("player-progress"),
    prevBtn = document.getElementById("prev"),
    nextBtn = document.getElementById("next"),
    playBtn = document.getElementById("play"),
    recentlyPlayedList = document.getElementById("recently-played-list");

const music = new Audio();

const songs = [
    {
        path: "1.mp3",
        displayName: "Ya Saman,Sumatra Selatan",
        cover: "1.jpg",
        artist: "Kamsul A Harla",
    },
    {
        path: "2.mp3",
        displayName: "Rambadia,Sumatra Utara",
        cover: "2.jpg",
        artist: "Ismail Hutajulu",
    },
    {
        path: "3.mp3",
        displayName: "Suwe Ora Jamu,yogyakarta",
        cover: "3.jpg",
        artist: "R.C. Hardjosubroto",
    },
    {
        path: "4.mp3",
        displayName: "Sajojo,Papua",
        cover: "4.jpg",
        artist: "David Rumagesan",
    },
    {
        path: "5.mp3",
        displayName: "Cangget Agung,Lampung",
        cover: "5.jpg",
        artist: "Syaiful Anwar",
    },
    {
        path: "6.mp3",
        displayName: "Kicir-Kicir,Jakarta",
        cover: "6.jpg",
        artist: "Slamet",
    },
    {
        path: "7.mp3",
        displayName: "Rek ayo Rek,Jawa Timur",
        cover: "7.jpg",
        artist: "Haryanto",
    },
    {
        path: "8.mp3",
        displayName: "Soleram,Riau",
        cover: "8.jpg",
        artist: "Muhammad Arief",
    },
    {
        path: "9.mp3",
        displayName: "Ampar-Ampar Pisang,Kalimantan Selatan",
        cover: "9.jpeg",
        artist: " Hamiedan AC",
    },
    {
        path: "10.mp3",
        displayName: "Burung Kakak Tua,Maluku",
        cover: "10.jpg",
        artist: "Pak Kasur",
    },
];

let musicIndex = 0;
let isPlaying = false;
let recentlyPlayed = [];

// Fungsi untuk memperbarui daftar Recently Played
function updateRecentlyPlayed(song) {
    // Tambahkan lagu ke daftar
    recentlyPlayed.unshift(song);

    // Batasi jumlah lagu dalam daftar Recently Played menjadi 10
    if (recentlyPlayed.length > 10) {
        recentlyPlayed.pop();
    }

    // Perbarui tampilan Recently Played
    recentlyPlayedList.innerHTML = "";
    recentlyPlayed.forEach((songItem) => {
        const songElement = document.createElement("div");
        songElement.classList.add("recently-played-item");
        songElement.innerHTML = `
            <img src="${songItem.cover}" alt="${songItem.displayName}" class="recently-played-cover">
            <span class="recently-played-title">${songItem.displayName}</span>
        `;
        recentlyPlayedList.appendChild(songElement);
    });
}


// Fungsi toggle untuk Play/Pause
function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

// Fungsi untuk memulai musik
function playMusic() {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
}

// Fungsi untuk pause musik
function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
}

// Fungsi untuk memuat lagu dan memperbarui informasi
function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;  // Memperbarui judul lagu di UI
    artist.textContent = song.artist;      // Memperbarui artis di UI
    image.src = song.cover;                // Memperbarui gambar cover

    // Perbarui Recently Played setelah lagu dimuat
    updateRecentlyPlayed(song);
}

// Fungsi untuk mengganti lagu
function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;

    // Resets time to 0 when changing song
    music.currentTime = 0;

    loadMusic(songs[musicIndex]);

    // Langsung memulai lagu baru ketika next atau prev ditekan
    playMusic();
}

// Fungsi untuk memperbarui progress bar
function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
    if (duration) {
        durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    }
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

// Fungsi untuk mengatur progress bar saat diklik
function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

// Event Listener untuk tombol play/pause dan perubahan musik
playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

// Muat musik pertama saat halaman dimulai
loadMusic(songs[musicIndex]);
