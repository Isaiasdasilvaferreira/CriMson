document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.querySelector('.typing-text');
    const hackerLines = [
        'DOWNLOADING SYSTEM UPDATES...',
        'ANALYZING SECURITY PROTOCOLS...',
        'ESTABLISHING P2P CONNECTION...',
        'SYNCHRONIZING WITH CLOUD NETWORK...',
        'OPTIMIZING GAMEPAD PERFORMANCE...',
        'CALIBRATING NEURAL INTERFACE...',
        'RUNNING DIAGNOSTIC CHECKS...'
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    let isErasing = false;
    
    function typeHackerText() {
        const currentLine = hackerLines[lineIndex];
        
        if (!isErasing && charIndex <= currentLine.length) {
            typingText.textContent = currentLine.substring(0, charIndex);
            charIndex++;
            setTimeout(typeHackerText, 60);
        } else if (isErasing && charIndex >= 0) {
            typingText.textContent = currentLine.substring(0, charIndex);
            charIndex--;
            setTimeout(typeHackerText, 40);
        } else {
            isErasing = !isErasing;
            if (!isErasing) {
                lineIndex = (lineIndex + 1) % hackerLines.length;
            }
            setTimeout(typeHackerText, 800);
        }
    }
    
    setTimeout(typeHackerText, 6000);
});