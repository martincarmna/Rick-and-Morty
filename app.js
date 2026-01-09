const url = 'https://rickandmortyapi.com/api/character';
const container = document.querySelector('.container')

const card = character => {
    const div = document.createElement('div')
    div.classList = 'card'
    const html = 
        `<div class="card">
        <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            
        </div>`

    div.innerHTML = html
    container.appendChild(div)
}

fetch(url)
 .then(Response => Response.json())
 .then(data => {
    data.results.forEach(character => {
        card(character) 

        
    });
 })