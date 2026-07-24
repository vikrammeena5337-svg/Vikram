/**
 * K.S BHAI - Premium VIP Landing Page Controller
 * Vanilla JS Performance Stack + Android/Apple Adaptive OS Detection
 */

document.addEventListener("DOMContentLoaded", () => {
    initParticleEngine();
    initCountdownTimer();
    initDeviceAdapter();
    initRippleTrackingSystem();
});

/**
 * Modern Ambient Particle Background System
 */
function initParticleEngine() {
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");
    
    let resizeTimeout;
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 150);
    });
    resizeCanvas();

    const particles = [];
    const particleCount = window.innerWidth < 576 ? 30 : 65; 
    
    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 20;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedY = Math.random() * 0.6 + 0.2;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            this.opacity += (Math.random() - 0.5) * 0.05;
            if (this.opacity > 0.6) this.opacity = 0.6;
            if (this.opacity < 0.1) this.opacity = 0.1;

            if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
                this.reset();
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(243, 229, 171, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * Dynamic Perpetual Real-time Countdown Engine
 */
function initCountdownTimer() {
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    function updateTargetTime() {
        const now = new Date();
        let target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 3, 0, 0);
        localStorage.setItem("vip_target_time", target.getTime());
        return target.getTime();
    }

    let targetTime = localStorage.getItem("vip_target_time");
    if (!targetTime || parseInt(targetTime) <= Date.now()) {
        targetTime = updateTargetTime();
    } else {
        targetTime = parseInt(targetTime);
    }

    function renderCountdown() {
        const now = Date.now();
        let difference = targetTime - now;

        if (difference <= 0) {
            targetTime = updateTargetTime();
            difference = targetTime - now;
        }

        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        hoursEl.textContent = hours.toString().padStart(2, "0");
        minutesEl.textContent = minutes.toString().padStart(2, "0");
        secondsEl.textContent = seconds.toString().padStart(2, "0");
    }

    renderCountdown();
    setInterval(renderCountdown, 1000);
}

/**
 * Android and Apple Device Adaptive Configuration Engine
 */
function initDeviceAdapter() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const btnText = document.getElementById("tgBtnText");
    const tgIcon = document.getElementById("tgIcon");

    // Detect Apple iOS (iPhone/iPad/Mac)
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        btnText.textContent = "🚀 JOIN APPLE VIP CHANNEL";
        tgIcon.className = "fa-brands fa-telegram";
    } 
    // Detect Android OS
    else if (/android/i.test(userAgent)) {
        btnText.textContent = "🚀 JOIN TELEGRAM CHANNEL";
        tgIcon.className = "fa-brands fa-telegram";
    }
}

/**
 * Premium Button Architecture: Core UI Ripple Engine + Meta Pixel Dispatch
 */
function initRippleTrackingSystem() {
    const telegramBtn = document.getElementById("telegramBtn");

    telegramBtn.addEventListener("click", function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        const size = Math.max(rect.width, rect.height);
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Meta Pixel Analytical Conversion Dispatch
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Subscribe', {
                value: 5,
                currency: 'INR'
            });
        }
    });
}