document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const loginContainer = document.getElementById("login-container");
    const cpfInput = document.getElementById("cpf");
    const phoneInput = document.getElementById("phone");
    const dddSelect = document.getElementById("ddd");

    if (themeToggle && loginContainer) {
        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            loginContainer.classList.toggle("dark-mode");
            // Adicione outras classes conforme necessário para alternar outros elementos
        });
    }

    if (cpfInput) {
        const cpfMask = IMask(cpfInput, {
            mask: '000.000.000-00'
        });
    }

    if (phoneInput && dddSelect) {
        const phoneMask = IMask(phoneInput, {
            mask: '(00) 00000-0000'
        });

        dddSelect.addEventListener("change", function () {
            phoneMask.updateOptions({
                mask: `(${dddSelect.value}) 00000-0000`
            });
        });
    }
});

