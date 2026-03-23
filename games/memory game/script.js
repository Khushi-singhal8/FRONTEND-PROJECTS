const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-game');
const resetBtn = document.getElementById('restart');
const message = document.getElementById('message');

let cards = [];
let flippedCards = [];
let score = 0;
let timeLeft = 60; // 60 seconds to finish
let timerInterval;

// Emojis / icons
const cardValues = ['🍎','🍌','🍇','🍉','🍒','🥝','🍍','🥥'];

function shuffle(array) {
    for (let i=array.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initGame() {
    board.innerHTML = '';
    flippedCards = [];
    score = 0;
    timeLeft = 60;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    message.textContent = '';
    clearInterval(timerInterval);

    // Duplicate & shuffle cards
    cards = [...cardValues, ...cardValues];
    shuffle(cards);

    cards.forEach(value=>{
        const card = document.createElement('div');
        card.classList.add('card');

        const inner = document.createElement('div');
        inner.classList.add('card-inner');

        const front = document.createElement('div');
        front.classList.add('card-front');
        front.textContent = '';

        const back = document.createElement('div');
        back.classList.add('card-back');
        back.textContent = value;

        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);
        card.addEventListener('click', flipCard);

        board.appendChild(card);
    });

    // Timer countdown
    timerInterval = setInterval(()=>{
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        if(timeLeft <= 0){
            clearInterval(timerInterval);
            message.textContent = "⏰ Time's Up! Restarting Game...";
            setTimeout(initGame, 2000);
        }
    }, 1000);
}

function flipCard(){
    if(this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if(flippedCards.length === 2) checkMatch();
}

function checkMatch(){
    const [card1, card2] = flippedCards;

    if(card1.querySelector('.card-back').textContent === card2.querySelector('.card-back').textContent){
        card1.classList.add('matched');
        card2.classList.add('matched');
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        flippedCards = [];

        if(score === cardValues.length){
            message.textContent = `🎉 You Won in ${60 - timeLeft}s!`;
            clearInterval(timerInterval);
        }
    } else {
        setTimeout(()=>{
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

startBtn.addEventListener('click', initGame);
resetBtn.addEventListener('click', initGame);
