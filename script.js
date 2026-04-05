// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Basic Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Add visible class styling via JS
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Simulator Logic
let isPlugged = true;
const sounds = {
    plug: new Audio('sounds/charge_in.wav'),
    unplug: new Audio('sounds/charge_out.wav'),
    battery: new Audio('sounds/bat_low.wav'),
    heat: new Audio('sounds/cpu_crit.wav')
};

const idleMessages = [
    "Click my stickers! 💋",
    "This is just the start... 😉",
    "There's so much more! ✨",
    "Wait until I'm installed! 💖"
];
let idleIndex = 0;
let idleInterval;

function startIdleRotation() {
    const bubble = document.getElementById('sim-bubble');
    if (!bubble) return;

    idleInterval = setInterval(() => {
        if (bubble.classList.contains('active-reaction')) return;
        idleIndex = (idleIndex + 1) % idleMessages.length;
        bubble.style.opacity = '0';
        setTimeout(() => {
            bubble.innerText = idleMessages[idleIndex];
            bubble.style.opacity = '1';
        }, 300);
    }, 2000);
}

function simulate(type) {
    const bubble = document.getElementById('sim-bubble');
    const mascotContainer = document.getElementById('hero-mascot-container');

    if (!bubble || !mascotContainer) return;

    bubble.classList.add('active-reaction');
    mascotContainer.classList.add('react');
    setTimeout(() => mascotContainer.classList.remove('react'), 500);

    if (type === 'plug') {
        isPlugged = !isPlugged;
        if (isPlugged) {
            sounds.plug.play();
            bubble.innerText = "Ah, thank you for the juice! 🔌";
        } else {
            sounds.unplug.play();
            bubble.innerText = "Hey! Come back with that! 🔌";
        }
    } else if (type === 'battery') {
        sounds.battery.play();
        bubble.innerText = "I'm feeling a bit... empty... 🔋";
    } else if (type === 'heat') {
        sounds.heat.play();
        bubble.innerText = "Ouch! It's getting hot in here! 🌡️";
    }

    // Reset bubble and rotation after 3.5 seconds
    setTimeout(() => {
        bubble.classList.remove('active-reaction');
        bubble.innerText = idleMessages[idleIndex];
    }, 3500);
}

// Start everything
document.addEventListener('DOMContentLoaded', startIdleRotation);

// Analytics Tracking
function trackDownload() {
    if (typeof gtag === 'function') {
        gtag('event', 'download', {
            'event_category': 'engagement',
            'event_label': 'Moanitor EXE'
        });
    }
}
