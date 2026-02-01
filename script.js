const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const result = document.getElementById('result');
const message = document.getElementById('message');
const celebrationImg = document.getElementById('celebrationImg');

// Handle Yes button click
yesBtn.addEventListener('click', () => {
    // Trigger MASSIVE confetti explosion!
    const duration = 5 * 1000; // Longer duration
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 9999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Initial big burst from center
    confetti({
        particleCount: 150,
        spread: 180,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500']
    });

    // Continuous confetti rain
    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 100 * (timeLeft / duration);

        // Left side
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#ff69b4', '#ff1493', '#ff6347', '#ffd700']
        });
        // Center
        confetti({
            ...defaults,
            particleCount,
            origin: { x: 0.5, y: randomInRange(0, 0.5) },
            colors: ['#00ff00', '#32cd32', '#7fff00', '#adff2f']
        });
        // Right side
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#1e90ff', '#00bfff', '#87ceeb', '#4169e1']
        });
        // Bottom bursts
        if (Math.random() > 0.7) {
            confetti({
                particleCount: 50,
                angle: 90,
                spread: 100,
                origin: { x: Math.random(), y: 1.2 },
                colors: ['#ff00ff', '#ff1493', '#da70d6']
            });
        }
    }, 150);

    // Show result message
    message.innerHTML = 'waiting for u to love me<br>when will u???';
    result.classList.remove('hidden');
    
    // Show the celebration image
    celebrationImg.src = 'hi.jpg';
    celebrationImg.classList.remove('hidden');
});

// Handle No button - make it move away
noBtn.addEventListener('mouseenter', moveButton);
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveButton();
});

function moveButton() {
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();
    
    // Get button dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    let randomX, randomY;
    let attempts = 0;
    const maxAttempts = 20;
    
    // Keep trying until we find a position that doesn't overlap with Yes button
    do {
        // Generate random position (move in larger range)
        randomX = (Math.random() - 0.5) * 200; // Move left or right up to 200px
        randomY = (Math.random() - 0.5) * 150; // Move up or down up to 150px
        
        // Calculate the new position of No button
        const noRect = noBtn.getBoundingClientRect();
        const newLeft = noRect.left + randomX;
        const newRight = newLeft + btnWidth;
        const newTop = noRect.top + randomY;
        const newBottom = newTop + btnHeight;
        
        // Check if it overlaps with Yes button (add padding of 20px)
        const overlaps = !(newRight + 20 < yesRect.left || 
                          newLeft - 20 > yesRect.right || 
                          newBottom + 20 < yesRect.top || 
                          newTop - 20 > yesRect.bottom);
        
        if (!overlaps) break;
        attempts++;
    } while (attempts < maxAttempts);
    
    // Apply the new position
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Optional: Reset button position after a few seconds of no interaction
let resetTimeout;
noBtn.addEventListener('mouseleave', () => {
    resetTimeout = setTimeout(() => {
        noBtn.style.transform = 'translate(0, 0)';
    }, 3000);
});

noBtn.addEventListener('mouseenter', () => {
    clearTimeout(resetTimeout);
});
