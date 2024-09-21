const gameBoard = document.getElementById('gameBoard');
let flippedCards = [];
let matchedPairs = 0;
const totalPairs = 16;

async function fetchPokemon() {
    const pokemonArray = [];
    const pokemonIds = Array.from({ length: 16 }, () => Math.floor(Math.random() * 800) + 1); // 8 IDs aleatorios de Pokémon
    for (let id of pokemonIds) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        pokemonArray.push(data.sprites.front_default);
    }
    return pokemonArray;
}

async function createGameBoard() {
    gameBoard.innerHTML = ''; 

    const pokemonImages = await fetchPokemon(); 
    const allCards = [...pokemonImages, ...pokemonImages,]; 

    console.log(pokemonImages);

    console.log(allCards);

    allCards.sort(() => 0.5 - Math.random());

    console.log(allCards);

    allCards.forEach(imageSrc => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${imageSrc}" alt="Pokemon">
            <div class="card-cover"></div>
        `;
        gameBoard.appendChild(card);

        card.addEventListener('click', () => flipCard(card));
    });
}

function flipCard(card) {

    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);


        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector('img').src;
    const img2 = card2.querySelector('img').src;

    if (img1 === img2) {

        flippedCards = [];
        matchedPairs++;
        if (matchedPairs === totalPairs) {
            setTimeout(() => alert('¡Ganaste! Has encontrado todos los pares.'), 500);
        }
    } else {

        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

const resetGameBtn = document.getElementById('resetGame');
resetGameBtn.addEventListener('click', () => {
    matchedPairs = 0;
    flippedCards = [];
    gameBoard.innerHTML = '';
    createGameBoard();
});

createGameBoard();
