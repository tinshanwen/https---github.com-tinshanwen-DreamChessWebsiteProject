//Javascript for video slider, is about clicking on the button
const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".video-slide");
const contents = document.querySelectorAll(".contentv");

var sliderNav = function(manual){
    btns.forEach((btn) => {
        btn.classList.remove("active")
    });

    slides.forEach((slide) => {
        slide.classList.remove("active")
    });

    contents.forEach((content) => {
        content.classList.remove("active")
    });

    btns[manual].classList.add("active");
    slides[manual].classList.add("active");
    contents[manual].classList.add("active");
}

btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        sliderNav(i);
        video1.muted = true; // Mute Others
        video2.muted = true; // Mute Others
        video3.muted = true; // Mute Others
        muteButton1.textContent = 'Unmute'; // Change button text
        muteButton2.textContent = 'Unmute'; // Change button text
        muteButton3.textContent = 'Unmute'; // Change button text
    })
});

// For Mute button
const video1 = document.getElementById('video1');
const muteButton1 = document.getElementById('muteButton1');
const video2 = document.getElementById('video2');
const muteButton2 = document.getElementById('muteButton2');
const video3 = document.getElementById('video3');
const muteButton3 = document.getElementById('muteButton3');

muteButton1.onclick = function() {
    video1.muted = !video1.muted; // Toggle mute
    muteButton1.textContent = video1.muted ? 'Unmute' : 'Mute'; // Change button text
};

muteButton2.onclick = function () {
    video2.muted = !video2.muted; // Toggle mute
    muteButton2.textContent = video2.muted ? 'Unmute' : 'Mute'; // Change button text
};

muteButton3.onclick = function () {
    video3.muted = !video3.muted; // Toggle mute
    muteButton3.textContent = video3.muted ? 'Unmute' : 'Mute'; // Change button text
};