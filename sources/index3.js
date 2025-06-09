document.addEventListener('DOMContentLoaded', function() {
    const switchEl = document.querySelector('md-switch');
    const body = document.body;
    // Check localStorage for dark mode preference
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        body.classList.add('dark-mode');
        if (switchEl) switchEl.selected = true;
    }
    if (switchEl) {
        switchEl.addEventListener('input', function() {
            if (switchEl.selected) {
                body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'true');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'false');
            }
        });
    }
});