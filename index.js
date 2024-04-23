const shuffleBtn = document.getElementById('shuffle-btn')
const drawBtn = document.getElementById('draw-btn')
const computerCard = document.getElementById('computer-card')
const myCard = document.getElementById('me-card')
const remainCards = document.getElementById('remain-cards')
const computerScoreEle = document.getElementById('computer-score')
const myScoreEle = document.getElementById('my-score')
const resultText = document.getElementById('result-text')


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
    drawBtn.disabled = false;
    computerCard.innerHTML = ``
    myCard.innerHTML = ``
    resultText.textContent = 'Click "Draw" to start'
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

    if (compareCards(data.cards[0].code.slice(0, -1), data.cards[1].code.slice(0, -1)) === -1) {
        myScore++
    } else if (compareCards(data.cards[0].code.slice(0, -1), data.cards[1].code.slice(0, -1)) === 1) {
        computerScore++
    }

    computerScoreEle.textContent = `Computer: ${computerScore}`
    myScoreEle.textContent = `Me: ${myScore}`

    if (data.remaining > 0) {
        remainCards.textContent = `Remaining Cards: ${data.remaining}`
    } else {
        remainCards.textContent = `No cards remain, Please reshuffle.`
        drawBtn.disabled = true;
        if (myScore > computerScore) {
            resultText.textContent = 'You win the Game!'
        } else if (computerScore > myScore) {
            resultText.textContent = 'The computer win the Game!'
        } else {
            resultText.textContent = "It's a tie Game!"
        }
    }

}

function compareCards(cardA, cardB) {
    const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K", "A"]
    if (cards.indexOf(cardA) > cards.indexOf(cardB)) {
        resultText.textContent = 'Computer Win!'
        return 1
    } else if (cards.indexOf(cardA) === cards.indexOf(cardB)) {
        resultText.textContent = "It's a war!"
        return 0
    } else {
        resultText.textContent = 'You Win!'
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


