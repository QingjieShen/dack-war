const shuffleBtn = document.getElementById('shuffle-btn')
const drawBtn = document.getElementById('draw-btn')
const computerCard = document.getElementById('computer-card')
const myCard = document.getElementById('me-card')
const remainCards = document.getElementById('remain-cards')
const computerScoreEle = document.getElementById('computer-score')
const myScoreEle = document.getElementById('my-score')


let deckId
let computerScore = 0
let myScore = 0

async function newDeck() {
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle')
    const data = await res.json()
    deckId = data.deck_id
    console.log(data)
    console.log(deckId)
    remainCards.textContent = `Remaining Cards: ${data.remaining}`
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
    
    remainCards.textContent = data.remaining > 0 ? `Remaining Cards: ${data.remaining}` : `No cards remain, Please reshuffle.`
    console.log(compareCards(data.cards[0].code.slice(0, -1), data.cards[1].code.slice(0, -1)))
    if (compareCards(data.cards[0].code.slice(0, -1), data.cards[1].code.slice(0, -1)) === -1) {
        myScore++
    } else if (compareCards(data.cards[0].code.slice(0, -1), data.cards[1].code.slice(0, -1)) === 1) {
        computerScore++
    }

    computerScoreEle.textContent = `Computer: ${computerScore}`
    myScoreEle.textContent = `Me: ${myScore}`

}

function compareCards(cardA, cardB) {
    const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K", "A"]
    if (cards.indexOf(cardA) > cards.indexOf(cardB)) {
        return 1
    } else if (cards.indexOf(cardA) === cards.indexOf(cardB)) {
        return 0
    } else {
        return -1
    }
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


