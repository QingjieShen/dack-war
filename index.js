const shuffleBtn = document.getElementById('shuffle-btn')
const drawBtn = document.getElementById('draw-btn')

let deckId

async function newDeck() {
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle')
    const data = await res.json()
    deckId = data.deck_id
    console.log(data)
    console.log(deckId)
}

async function newCards(deckId) {
    newDeck()
    const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    console.log(data)
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


