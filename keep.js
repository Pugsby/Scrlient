function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function loadMore() {
    const cookieValue = getCookie('keep');
    if (cookieValue) {
        const data = JSON.parse(cookieValue);
        const projectList = document.getElementById('projectList');
        data.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.innerHTML = "<a href='project.html?id=" + project.id + "'>" + project.title + "<br><img src='" + project.image + "' width='100' height='100'></a> ";
            projectList.appendChild(projectElement);
        });
        return true;
    } else {
        console.error('Cookie "keep" not found or empty');
        return false;
    }
}

const intervalId = setInterval(() => {
    if (loadMore()) {
        clearInterval(intervalId);
    }
}, 100);