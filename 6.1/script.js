// --- COUNTDOWN TIMER LOGIC ---
const anniversaryDate = "Aug 24, 2025 00:00:00";
const countdownDate = new Date(anniversaryDate).getTime();

const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;

    if (distance < 0) {
        clearInterval(interval);
        document.getElementById("countdown").innerHTML = "<h2>Happy Anniversary! ❤️</h2>";
        document.querySelector(".until-text").style.display = "none";
    }
}, 1000);


// --- NEW: FADE-IN ON SCROLL LOGIC ---
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0.25, // Element is 25% visible
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('is-visible');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});


// --- NEW: PHOTO LIGHTBOX LOGIC ---
const modal = document.getElementById('lightbox-modal');
const modalImg = document.getElementById('lightbox-image');
const photoItems = document.querySelectorAll('.photo-item');
const closeBtn = document.querySelector('.close-button');

photoItems.forEach(item => {
    item.addEventListener('click', () => {
        modal.style.display = "block";
        modalImg.src = item.querySelector('img').src;
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
});

// Close modal when clicking outside the image
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});


// --- NEW: FLOATING HEARTS LOGIC ---
function createHeart() {
    const heartsContainer = document.querySelector('.hearts-container');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤'; // You can use other symbols like '♥' or '♡'
    
    heart.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
    heart.style.animationDuration = Math.random() * 5 + 10 + 's'; // Random duration
    heart.style.fontSize = Math.random() * 10 + 10 + 'px'; // Random size
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation finishes to prevent clutter
    setTimeout(() => {
        heart.remove();
    }, 15000);
}

// Create a new heart every 500ms
setInterval(createHeart, 500);


// --- UPDATED: MUSIC LOGIC (WITH TOGGLE BUTTON) ---
const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
let isMusicPlaying = false;

function playMusic() {
    music.play();
    musicToggle.innerHTML = '<i class="fas fa-volume-high"></i>';
    isMusicPlaying = true;
}

function pauseMusic() {
    music.pause();
    musicToggle.innerHTML = '<i class="fas fa-volume-xmark"></i>';
    isMusicPlaying = false;
}

// Autoplay attempt on first interaction
window.addEventListener('click', () => {
    if (!isMusicPlaying) {
        playMusic();
    }
}, { once: true }); // 'once: true' ensures this only runs for the very first click

// Toggle button functionality
musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});