function toggleMode() {
    document.body.classList.toggle('light-mode'); // Переключаем светлый режим
    const mode = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('selectedMode', mode); // Сохраняем выбранный режим
}

document.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem('selectedMode') || 'dark'; // По умолчанию темный режим
    if (savedMode === 'light') {
        document.body.classList.add('light-mode');
    }
});

document.getElementById('moon-light').addEventListener('click', toggleMode);