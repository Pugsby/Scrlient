const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const turbowarpEnabled = urlParams.get('turbowarp');
var author = "unknown";
let blacklisted = false;
let blacklist
let image
let title

fetch(`https://corsproxy.io/?url=https://pastebin.com/raw/U0nRPz8J`)
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the entire response
        blacklist = data.blacklist; // Access the blacklist array
        if (blacklist && blacklist.includes(parseInt(id))) {
            blacklisted = true;
        }
    })
    .catch(error => console.error('Error fetching blacklist:', error));

fetch(`https://trampoline.turbowarp.org/api/projects/${id}`)
    .then(response => response.json())
    .then(data => {
        author = data.author.username;
        document.getElementById('author').innerHTML = "<a href='user.html?name=" + author + "'>" + author.replace(/\n/g, '<br>') + "</a>";
        document.getElementById('instructions').innerHTML = data.instructions.replace(/\n/g, '<br>');
        document.getElementById('description').innerHTML = data.description.replace(/\n/g, '<br>');
        document.getElementById('title').innerHTML = data.title.replace(/\n/g, '<br>');
        document.getElementById('views').innerHTML = data.stats.views;
        document.getElementById('loves').innerHTML = data.stats.loves;
        document.getElementById('favorites').innerHTML = data.stats.favorites;
        document.getElementById('remixes').innerHTML = data.stats.remixes;
        image = data.image;
        title = data.title;
        const iframe = document.getElementById('project');
        iframe.src = iframe.src.replace('{{id}}', id);

        fetch(`https://corsproxy.io/?url=https://api.scratch.mit.edu/users/${author}/projects/${id}/comments`)
        .then(response => response.json())
        .then(data => {
            const commentsContainer = document.getElementById('comments');
            commentsContainer.innerHTML = '';
            data.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.innerHTML = "<b><a href='user.html?name=" + comment.author.username +"'>" + comment.author.username.replace(/\n/g, '<br>') + "</a></b>: " + comment.content.replace(/\n/g, '<br>');
            commentsContainer.appendChild(commentElement);
            });

            const iframe = document.getElementById('project');
            iframe.src = iframe.src.replace('{{id}}', id);
            const waitForBlacklist = new Promise((resolve) => {
            const interval = setInterval(() => {
                if (blacklist.length > 0) {
                clearInterval(interval);
                resolve();
                }
            }, 100);
            });

            waitForBlacklist.then(() => {
            if (turbowarpEnabled == true || (turbowarpEnabled != 'false' && blacklisted == true)) {
                iframe.src = `https://turbowarp.org/${id}/embed`;
                console.log("Switched to TurboWarp.");
            }
            });
            if (["Pugsbyy", "RobloxMaster671", "prodforer"].includes(author)) {
                document.getElementById('authorcontainer').classList.add('glowText');
                document.getElementById('author').classList.add('glowText');
                document.getElementById('title').classList.add('glowText');
            }
            // Add event listener for the checkbox
            const turbowarpCheckbox = document.getElementById('Turbowarp');
            turbowarpCheckbox.addEventListener('change', function() {
                const iframe = document.getElementById('project');
                if (this.checked) {
                    iframe.src = `https://turbowarp.org/${id}/embed`;
                } else {
                    iframe.src = `https://forkphorus.github.io/embed.html?id=${id}&auto-start=false&light-content=true`;
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
    })
    .catch(error => console.error('Error fetching data:', error));

fetch(`https://corsproxy.io/?url=https://jeffalo.net/api/nfe/?project=${id}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('rating').innerHTML = data.status.replace(/\n/g, '<br>');
    })
    .catch(error => console.error('unknown', error));

function keep() {
    const cookieValue = getCookie('keep');
    if (cookieValue) {
        const data = JSON.parse(cookieValue);
        console.log('Title:', title);
        console.log('Image:', image);
        if (data.find(project => project.id === id)) {
            const index = data.findIndex(project => project.id === id);
            if (index !== -1) {
                data.splice(index, 1);
                document.cookie = `keep=${JSON.stringify(data)}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
                alert('Project removed from saved list');
                return;
            }
            return;
        }
        data.push({ id, title, image });
        document.cookie = `keep=${JSON.stringify(data)}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    } else {
        document.cookie = `keep=${JSON.stringify([{ id, title, image }])}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }
    alert('Project saved');
}

function love(token, token2) {
    fetch(`https://api.scratch.mit.edu/proxy/projects/${id}/loves/user/pugsbyy`, {
        method: 'POST',
        headers: {
            'X-Token': token,
            'X-CSRFToken': token2,
        },
        // mode: 'no-cors'
    })
    .then(response => response.json())
    .then(data => {
        alert('Project liked');
    })
    .catch(error => console.error('Error liking project:', error));
}