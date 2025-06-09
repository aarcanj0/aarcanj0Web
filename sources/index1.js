document.addEventListener('DOMContentLoaded', function() {
    const switchEl = document.querySelector('md-switch');
    const body = document.body;
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


function typeWriter(element, text, i = 0) {
    if (i < text.length) {
        element.innerHTML = text.substring(0, i + 1) + '<span class="blinking-cursor">|</span>';
        setTimeout(() => typeWriter(element, text, i + 1), 100);
    } else {
        setInterval(() => {
            const cursor = document.querySelector('.blinking-cursor');
            cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }, 500);
    }
}

const title = document.querySelector('.material-design');
if (title) {
    const text = title.textContent.replace('|', '');
    title.textContent = '';
    typeWriter(title, text);
}
