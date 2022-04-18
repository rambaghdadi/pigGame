'use strict';

let score0Element = document.querySelector("#score--0")
let score1Element = document.getElementById("score--1")
let score0Current = document.querySelector("#current--0")
let score1Current = document.querySelector("#current--1")
let player0Section = document.querySelector(".player--0")
let player1Section = document.querySelector(".player--1")

let buttonImage = document.querySelector(".dice")
let rollDiceBtn = document.querySelector(".btn--roll")
let holdDiceBtn = document.querySelector(".btn--hold")
let newGameBtn = document.querySelector(".btn--new")

// starting conditions

let scores, currentScore, activePlayer, playing;

function init() {
    scores = [0, 0]
    currentScore = 0
    activePlayer = 0
    playing = true
    score0Element.textContent = 0
    score1Element.textContent = 0
    buttonImage.classList.add("hidden")
    player0Section.classList.add("player--active")
    player1Section.classList.remove("player--active")
    document.querySelector(`.player--0`).classList.remove(`player--winner`)
    document.querySelector(`.player--1`).classList.remove(`player--winner`)
    document.getElementById(`current--0`).textContent = currentScore
    document.getElementById(`current--1`).textContent = currentScore
    holdDiceBtn.classList.remove("hidden")
    rollDiceBtn.classList.remove("hidden")
}

init()

function switchPlayer() {
    currentScore = 0
    document.getElementById(`current--${activePlayer}`).textContent = currentScore
    activePlayer = activePlayer === 0 ? 1 : 0
    player0Section.classList.toggle("player--active")
    player1Section.classList.toggle("player--active")
}

// roll dice functionality
rollDiceBtn.addEventListener("click", function () {
    if (playing) {
        let randomDice = Math.floor(Math.random() * 6) + 1
        buttonImage.classList.remove("hidden")
        buttonImage.src = `dice-${randomDice}.png`

        if (randomDice !== 1) {
            currentScore += randomDice
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        } else {
            switchPlayer()
        }
    }
})

// hold dice functionality
holdDiceBtn.addEventListener("click", function() {
    if (playing) {
        scores[activePlayer] += currentScore
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer]
        if (scores[activePlayer] >= 100) {
            playing = false
            document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`)
            document.querySelector(`.player--${activePlayer}`).classList.remove(`player--active`)
            holdDiceBtn.classList.add("hidden")
            rollDiceBtn.classList.add("hidden")
            buttonImage.classList.add("hidden")
        } else {
            switchPlayer()
        }
    }
})

newGameBtn.addEventListener("click", init)
