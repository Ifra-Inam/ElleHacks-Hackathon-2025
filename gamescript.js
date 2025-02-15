document.addEventListener('DOMContentLoaded', () -> {
const flashcard =[
{ question: "Dragon", answer: "display photo here" },
{ question: "Fire", answer: "display photo here" },
{ question: "Water", answer: "display photo here" },
{ question: "Brave", answer: "display photo here" },
{ question: "Castle", answer: "display photo here" },
{ question: "Hero", answer: "display photo here" },
{ question: "Treasure", answer: "display photo here" },
{ question: "Cave", answer: "display photo here" },
{ question: "Magic", answer: "display photo here" },
{ question: "Quest", answer: "display photo here" },
];

let currentCard = 0;

const flashcardElement = document.getElementById('flashcard');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');

function displayCard() {
questionElement.textContent = flashcard[currentCard].question;
answerElement.textContent = flashcard[currentCard].answer;
flashcardElement.classList.remove('is-flipped');
}

document.getElementById('flip-card').addEventListener('click', () -> {
flashcardElement.classList.toggle('is-flipped');
});

document.getElementById('next card').addEventListener('click', () -> {
currentCard = (currentCard + 1) % flashcard.length;
displayCard();
});

displayCard();
});