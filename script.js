const radioPlayer = document.getElementById('radioPlayer');
const autoplayOnButton = document.getElementById('autoplayOn');
const autoplayOffButton = document.getElementById('autoplayOff');
const themeSelector = document.getElementById('themeSelector');

// Initialize autoplay state from localStorage
const autoplayState = localStorage.getItem('autoplay') || 'off';
updateAutoplayButtons(autoplayState);

// Update autoplay buttons based on state
function updateAutoplayButtons(state) {
    if (state === 'on') {
        radioPlayer.autoplay = true;
        radioPlayer.play();
        autoplayOnButton.classList.add('d-none');
        autoplayOffButton.classList.remove('d-none');
    } else {
        radioPlayer.autoplay = false;
        autoplayOnButton.classList.remove('d-none');
        autoplayOffButton.classList.add('d-none');
    }
}

// Event listeners for autoplay buttons
autoplayOnButton.addEventListener('click', () => {
    localStorage.setItem('autoplay', 'on');
    updateAutoplayButtons('on');
});

autoplayOffButton.addEventListener('click', () => {
    localStorage.setItem('autoplay', 'off');
    updateAutoplayButtons('off');
});

// Initialize theme state from localStorage
const theme = localStorage.getItem('theme') || 'system';
applyTheme(theme);
themeSelector.value = theme;

// Apply theme based on selection
function applyTheme(theme) {
    document.body.classList.remove('bg-dark', 'bg-light', 'text-light', 'text-dark');
    if (theme === 'dark') {
        document.body.classList.add('bg-dark', 'text-light');
    } else if (theme === 'light') {
        document.body.classList.add('bg-light', 'text-dark');
    } else {
        // System theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.body.classList.add('bg-dark', 'text-light');
        } else {
            document.body.classList.add('bg-light', 'text-dark');
        }
    }
}

// Event listener for theme selector
themeSelector.addEventListener('change', (event) => {
    const selectedTheme = event.target.value;
    localStorage.setItem('theme', selectedTheme);
    applyTheme(selectedTheme);
});