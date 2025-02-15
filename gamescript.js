document.addEventListener('DOMContentLoaded', () => {
const flashcard =[
{ question: "photo", answer: "Dragon" },
{ question: "photo", answer: "Fire" },
{ question: "photo", answer: "Water" },
{ question: "photo", answer: "Brave" },
{ question: "photo", answer: "Castle" },
{ question: "photo", answer: "Hero" },
{ question: "photo", answer: "Treasure" },
{ question: "photo", answer: "Cave" },
{ question: "photo", answer: "Magic" },
{ question: "photo", answer: "Quest" },
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

document.getElementById('flashcard').addEventListener('click', () => {
flashcardElement.classList.toggle('is-flipped');
});

document.getElementById('next-card').addEventListener('click', () => {
currentCard = (currentCard + 1) % flashcard.length;
displayCard();
});

displayCard();
});