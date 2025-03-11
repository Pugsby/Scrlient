var urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('q')) {
    fetch(`https://corsproxy.io/?url=https://api.scratch.mit.edu/search/projects?q=${urlParams.get('q')}`)
    .then(response => response.json())
    .then(data => {
        const projectList = document.getElementById('projectList');
        data.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.innerHTML = "<a href='project.html?id=" + project.id + "'>" + project.title.replace(/\n/g, '<br>') + "<br><img src='" + project.image + "' width='100' height='100'></a> ";
            projectList.appendChild(projectElement);
        });
    }
)
}
function search () {
    window.location.href = 'search.html?q=' + document.getElementById('search').value;
}
