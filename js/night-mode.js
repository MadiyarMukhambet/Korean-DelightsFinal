function toggleMode() {
    const currentMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
}


function setMode(mode) {
    localStorage.setItem('selectedMode', mode);
    applyMode(mode);
}

function applyMode(mode) {
    if (mode === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('selectedMode') || 'light'; // По умолчанию светлый режим
    applyMode(savedMode);
});


document.getElementById('moon-light').addEventListener('click', toggleMode);