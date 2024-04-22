const shuffleBtn = document.getElementById('shuffle-btn')
const drawBtn = document.getElementById('draw-btn')
const computerCard = document.getElementById('computer-card')
const myCard = document.getElementById('me-card')


let deckId

async function newDeck() {
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle')
    const data = await res.json()
    deckId = data.deck_id
    console.log(data)
    console.log(deckId)
}

async function newCards(deckId) {
    const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    console.log(data)
    computerCard.innerHTML = `
        <img src=${data.cards[0].image} />
    `
    myCard.innerHTML = `
        <img src=${data.cards[1].image} />
    `
}

shuffleBtn.addEventListener('click', () => {
    newDeck()
})

drawBtn.addEventListener('click', () => {
    if (deckId) {
        newCards(deckId)
    } else {
        alert('Please Shuffle Deck first')
    }
})


