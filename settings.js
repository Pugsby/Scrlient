document.getElementById('username').value = getCookie('user');
function saveUsername () {
    const username = document.getElementById('username').value;
    setCookie('user', username, 365);
}
