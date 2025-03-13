document.addEventListener('DOMContentLoaded', function() {
    const theme = getCookie('theme');
    if (theme) {
        document.body.classList.add(theme);
    } else {
        document.body.classList.add('darkMode');
    }

    fetch('global.html')
        .then(response => response.text())
        .then(data => {
            const div = document.createElement('div');
            div.innerHTML = data;
            document.body.appendChild(div);
        })
        .catch(error => console.error('Error loading global.html:', error))
        .then(() => {
            const themeButton = document.getElementById('theme');
            //if (themeButton) {
            //    themeButton.addEventListener('click', function() {
            //        document.body.classList.toggle('darkMode');
            //        document.body.classList.toggle('lightMode');
            //        const currentTheme = document.body.classList.contains('darkMode') ? 'darkMode' : 'lightMode';
            //        setCookie('theme', currentTheme, 365);
            //    });
            //}
        });
});

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function setTheme(name) {
    document.body.className = name;
    setCookie('theme', name, 365);
}