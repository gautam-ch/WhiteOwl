document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/api/startups')
        .then(response => response.json())
        .then(data => {
            const startupsDiv = document.getElementById('startups');
            startupsDiv.innerHTML = '<h2>Startups</h2>';
            data.forEach(startup => {
                startupsDiv.innerHTML += `<p>${startup.name} - Progress: ${startup.progress}</p>`;
            });
        });
});
