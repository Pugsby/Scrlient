document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('https://corsproxy.io/?url=https://pastebin.com/raw/1mGJMpez');
    const data = await response.json();
    
    const announcementsDiv = document.getElementById('announcements');
    
    data.forEach(item => {
        const childDiv = document.createElement('div');
        const content = item.announcement;
        childDiv.innerHTML = content.replace(/:sneaky:/g, '<img src="images/sneaky.png" class="emoji" width="12px" height="12px">');
        const br = document.createElement('br');
        childDiv.appendChild(br);
        if (item.image) {
            const img = document.createElement('img');
            img.src = item.image.image;
            img.style.width = item.image.width;
            img.style.height = item.image.height;
            childDiv.appendChild(img);
        }
        
        announcementsDiv.appendChild(childDiv);
    });
});