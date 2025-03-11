const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('name');
fetch(`https://trampoline.turbowarp.org/api/users/${id}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('name').innerHTML = data.username;
        document.getElementById('description').innerHTML = data.profile.bio;
        document.getElementById('workingon').innerHTML = data.profile.status;
        
    }
)
