document.addEventListener('DOMContentLoaded', function() {

    function updateTime() {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.querySelector('.time-value').textContent = time;
    }
    
    setInterval(updateTime, 1000);
    updateTime();
    
    const metrics = document.querySelectorAll('.metric-value');
    const graphs = document.querySelectorAll('.graph-fill');
    const processes = document.querySelectorAll('.process-fill');
    
    function animateSystem() {

        metrics.forEach((metric, index) => {
            if (index === 0) { // CPU
                const newVal = Math.floor(Math.random() * 40 + 30);
                metric.textContent = newVal + '%';
                graphs[index].style.width = newVal + '%';
            } else if (index === 1) { // GPU
                const newVal = Math.floor(Math.random() * 40 + 40);
                metric.textContent = newVal + '%';
                graphs[index].style.width = newVal + '%';
            } else if (index === 2) { // FPS
                const newVal = Math.floor(Math.random() * 60 + 100);
                metric.textContent = newVal;
            } else if (index === 3) { // RAM
                const used = Math.floor(Math.random() * 4 + 11);
                const percent = Math.round((used / 32) * 100);
                metric.textContent = used + '/32';
                graphs[index].style.width = percent + '%';
            }
        });
        
        processes.forEach(process => {
            const current = parseInt(process.style.width);
            const change = Math.floor(Math.random() * 20 - 10);
            const newWidth = Math.max(5, Math.min(95, current + change));
            process.style.width = newWidth + '%';
            process.parentElement.nextElementSibling.textContent = newWidth + '%';
        });
    }
    
    setInterval(animateSystem, 3000);
    animateSystem();
    
    const logMessages = [
        "Input buffer optimized",
        "Audio stream synchronized",
        "Network latency improved",
        "Render queue processed",
        "Memory allocation complete",
        "Shader compilation finished",
        "Texture streaming active",
        "Physics engine loaded",
        "AI subsystem online",
        "Game state saved"
    ];
    
    const logContainer = document.querySelector('.log-entries');
    
    function addLogEntry() {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const message = logMessages[Math.floor(Math.random() * logMessages.length)];
        
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `
            <span class="log-time">${time}</span>
            <span class="log-message">${message}</span>
        `;
        
        entry.style.animation = 'fadeInLog 0.5s ease-out';
        
        logContainer.insertBefore(entry, logContainer.firstChild);
        
        if (logContainer.children.length > 5) {
            logContainer.removeChild(logContainer.lastChild);
        }
    }
    
    setInterval(addLogEntry, 4000);
});