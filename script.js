async function buscarRepos() {
    const lenguaje = document.getElementById('language').value;
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = "<p>Cargando...</p>";
    try {
        const res = await fetch(`https://api.github.com/search/repositories?q=language:${lenguaje}&sort=stars&order=desc&per_page=12`);
        const data = await res.json();
        resultado.innerHTML = "";
        if (!data.items || data.items.length === 0) {
            resultado.innerHTML = "<p>No se encontraron repositorios.</p>";
            return;
        }
        data.items.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'repo-card';
            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'Sin descripción disponible'}</p>
                <p>⭐ ${repo.stargazers_count}</p>
                <p>🍴 ${repo.forks_count}</p>
                <p>🐛 ${repo.open_issues_count}</p>
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">Ver repositorio</a>
            `;
            resultado.appendChild(card);
        });
    } catch (error) {
        resultado.innerHTML = "<p>Error al buscar repositorios.</p>";
    }
}
