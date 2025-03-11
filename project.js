const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
var author = "unknown"
fetch(`https://trampoline.turbowarp.org/api/projects/${id}`)
    .then(response => response.json())
    .then(data => {
        author = data.author.username
        document.getElementById('author').innerHTML = "<a href='user.html?name=" + author + "'>" + author.replace(/\n/g, '<br>') + "</a>";
        document.getElementById('instructions').innerHTML = data.instructions.replace(/\n/g, '<br>');
        document.getElementById('description').innerHTML = data.description.replace(/\n/g, '<br>');
        document.getElementById('title').innerHTML = data.title.replace(/\n/g, '<br>');
        document.getElementById('views').innerHTML = data.stats.views;
        document.getElementById('loves').innerHTML = data.stats.loves;
        document.getElementById('favorites').innerHTML = data.stats.favorites;
        document.getElementById('remixes').innerHTML = data.stats.remixes;
        

        const iframe = document.getElementById('project');
        iframe.src = iframe.src.replace('{{id}}', id);

        fetch(`https://corsproxy.io/?url=https://api.scratch.mit.edu/users/` + author + `/projects/1004783617/comments`)
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
        })
        .catch(error => console.error('Error fetching data:', error));
    })
    .catch(error => console.error('Error fetching data:', error));

    fetch(`https://jeffalo.net/api/nfe/?project=${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('rating').innerHTML = data.status.replace(/\n/g, '<br>');
        })
        .catch(error => console.error('unknown', error));