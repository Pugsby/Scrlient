var id = 28715018
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('id') != null) {
    id = urlParams.get('id');
}
fetch(`https://trampoline.turbowarp.org/api/studios/${id}/projects?offset=0`)
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
