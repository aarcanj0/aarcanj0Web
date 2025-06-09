document.addEventListener('DOMContentLoaded', function() {
    // Animação do nome e da idade
    const textField = document.querySelector('md-outlined-text-field');
    const nameElement = document.querySelector('#name');
    const fullName = "Guilherme Araújo de Morais";
    const slider = document.querySelector('.ageBar md-slider');

    if (textField && nameElement) {
        textField.value = fullName;
        nameElement.textContent = "Olá, sou ";

        async function runAnimations() {
            await Promise.all([
                animateTyping(),
                animateSlider()
            ]);
            textField.addEventListener('input', updateName);
        }

        function updateName() {
            nameElement.textContent = `Olá, sou ${textField.value}`;
        }

        async function animateTyping() {
            return new Promise(resolve => {
                let i = 0;
                function typeWriter() {
                    if (i < fullName.length) {
                        nameElement.textContent += fullName.charAt(i);
                        i++;
                        setTimeout(typeWriter, 100);
                    } else {
                        resolve();
                    }
                }
                typeWriter();
            });
        }

        async function animateSlider() {
            return new Promise(resolve => {
                if (!slider) {
                    resolve();
                    return;
                }

                let currentValue = 22;
                const interval = setInterval(() => {
                    if (currentValue < 100) {
                        currentValue++;
                        slider.value = currentValue;
                        document.getElementById('ageValue').textContent = currentValue;
                    } else {
                        clearInterval(interval);
                        setTimeout(() => {
                            const reverseInterval = setInterval(() => {
                                if (currentValue > 22) {
                                    currentValue--;
                                    slider.value = currentValue;
                                    document.getElementById('ageValue').textContent = currentValue;
                                } else {
                                    clearInterval(reverseInterval);
                                    resolve();
                                }
                            }, 15);
                        }, 500);
                    }
                }, 15);
            });
        }

        runAnimations();
    }

    const ageSlider = document.querySelector('.ageBar md-slider');
    const ageText = document.querySelector('.ageBar h3');

    if (ageSlider && ageText) {
        ageText.innerHTML = `Tenho <span id="ageValue">${ageSlider.value}</span> anos`;
        ageSlider.addEventListener('input', function() {
            document.getElementById('ageValue').textContent = this.value;
        });
    }

    const reorganizeBtn = document.querySelector('md-filled-button');
    if (reorganizeBtn) {
        reorganizeBtn.addEventListener('click', function() {
            if (textField && nameElement) {
                textField.value = fullName;
                nameElement.textContent = "Olá, sou " + fullName;
            }

            if (slider) {
                slider.value = 22;
                document.getElementById('ageValue').textContent = 22;
            }

            const chips = document.querySelectorAll('md-filter-chip:not(#madero)');
            chips.forEach(chip => {
                chip.selected = true;
            });
        });
    }

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

// **ALTERAÇÃO AQUI**: Função para selecionar chips aleatoriamente, exceto o #madero
async function selectChipsRandomly() {
    const chips = Array.from(document.querySelectorAll('md-filter-chip:not(#madero)'));
    const unselected = new Set(chips);
    while (unselected.size > 0) {
        const arr = Array.from(unselected);
        const idx = Math.floor(Math.random() * arr.length);
        const chip = arr[idx];
        chip.selected = true;
        unselected.delete(chip);
        await new Promise(resolve => setTimeout(resolve, 250));
    }
}

// Inicia a seleção aleatória após o carregamento da página
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(selectChipsRandomly, 1000);
});