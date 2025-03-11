var user = getCookie('user');
const urlParams = new URLSearchParams(window.location.search);
var offset = 0;
if (urlParams.get('user') != null) {
    user = urlParams.get('user');
}
function loadMore() {
    fetch(`https://corsproxy.io/?url=https://api.scratch.mit.edu/users/${user}/favorites?offset=` + offset)
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
document.getElementById("more").addEventListener('click', () => {
    offset += 20;
    loadMore()
});