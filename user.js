const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('name');
offset = 0;
foffset = 0;
fetch(`https://trampoline.turbowarp.org/api/users/${id}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('name').innerHTML = data.username;
        document.getElementById('description').innerHTML = data.profile.bio;
        document.getElementById('workingon').innerHTML = data.profile.status;
        document.getElementById('icon').src = data.profile.images['90x90'];
        
    }
)
function loadMore() {
    fetch(`https://www.corsproxy.io?url=https://api.scratch.mit.edu/users/${id}/projects?offset=` + offset)
            .then(response => response.json())
            .then(data => {
                const projectList = document.getElementById('projectList');
                data.forEach(project => {
                    const projectElement = document.createElement('div');
                    projectElement.innerHTML = "<a href='project.html?id=" + project.id + "'>" + project.title.replace(/\n/g, '<br>') + "<br><img src='" + project.image + "' width='100' height='100'></a> ";
                    projectList.appendChild(projectElement);
                });
            });
}
loadMore()
function loadMoreFavorites() {
    fetch(`https://www.corsproxy.io?url=https://api.scratch.mit.edu/users/${id}/favorites?offset=` + foffset)
            .then(response => response.json())
            .then(data => {
                const projectList = document.getElementById('favoriteProjectList');
                data.forEach(project => {
                    const projectElement = document.createElement('div');
                    projectElement.innerHTML = "<a href='project.html?id=" + project.id + "'>" + project.title.replace(/\n/g, '<br>') + "<br><img src='" + project.image + "' width='100' height='100'></a> ";
                    projectList.appendChild(projectElement);
                });
            });
}
loadMoreFavorites()
