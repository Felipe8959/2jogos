const cards = document.querySelectorAll('.card');
let flippedCards = [];
let matchedCards = [];

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            const [card1, card2] = flippedCards;

            if (card1.querySelector('.card-front img').src === card2.querySelector('.card-front img').src) {
                matchedCards.push(card1, card2);
                flippedCards = [];

                if (matchedCards.length === cards.length) {
                    setTimeout(() => {
                        alert('Parabéns');
                    }, 500);
                }
            } else {
                setTimeout(() => {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    flippedCards = [];
                }, 1000);
            }
        }
    }
}


function shuffleCards() {
    cards.forEach(card => {
        const randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
}

shuffleCards();

cards.forEach(card => card.addEventListener('click', flipCard));