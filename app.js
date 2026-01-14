const url = 'https://rickandmortyapi.com/api/character';
const container = document.querySelector(".container");
const details = document.querySelector(".details");

// Variable para guardar el personaje actual
let currentCharacter = null;

const card = character => {
    const div = document.createElement('div');
    div.className = 'card';
    const html = `
        <img src="${character.image}" alt="">
        <h2>${character.name}</h2>
        <p>Species: ${character.species}</p>
        <p>Status: ${character.status}</p>
        <button class="btn" data-id="${character.id}">Ver detalles</button>
    `;
    div.innerHTML = html;
    return div;
};

const switchDiv = () => {
    container.classList.toggle('invisible');
    details.classList.toggle('invisible');
};

const showDetails = (character) => {
    currentCharacter = character; // Guardamos el personaje actual
    details.innerHTML = `
        <div class="detail-card">
            <img src="${character.image}" alt="">
            <h2>${character.name}</h2>
            <p>Species: ${character.species}</p>
            <p>Status: ${character.status}</p>
            <button id="backBtn">Regresar</button>
        </div>
    `;
    switchDiv();
};

const getId = (e) => {
    if (e.target.classList.contains('btn')) {
        const id = e.target.getAttribute('data-id');
        fetch(url + '/' + id)
            .then((response) => response.json())
            .then(character => {
                showDetails(character);
            });
    }
};

// Evento para regresar
details.addEventListener('click', (e) => {
    if (e.target.id === 'backBtn') {
        switchDiv(); // Cambiamos de nuevo a la vista de cards
    }
});

const page = Math.ceil(Math.random() * 42);
fetch(url + '?page=' + page)
    .then((response) => response.json())
    .then(data => {
        data.results.forEach(character => {
            const characterCard = card(character);
            container.appendChild(characterCard);
        });
    });

container.addEventListener('click', getId);