document.addEventListener('DOMContentLoaded', () => {
console.log("JavaScript file loaded");
const flashcard =[
{ question: "photo1", answer: "Dragon" },
{ question: "photo2", answer: "Fire" },
{ question: "photo3", answer: "Water" },
{ question: "photo4", answer: "Brave" },
{ question: "photo5", answer: "Castle" },
{ question: "photo6", answer: "Hero" },
{ question: "photo7", answer: "Treasure" },
{ question: "photo8", answer: "Cave" },
{ question: "photo9", answer: "Magic" },
{ question: "photo10", answer: "Quest" },
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
//once they reach to the last card, redirect to the quiz page
if (currentCard === 0){
window.location.href = 'quiz.html'; //redirect to the quiz page
} else{
displayCard();
}
});

//audio setup
let mediaRecorder;
let audioChunks = [];
let isRecording = false;

const audioElement = document.querySelector('.playback');

document.getElementById('record-card').addEventListener('click', async () => {
if (!navigator.mediaDevices || !window.MediaRecorder){
alert('It does not support required APIs');
return;
}
try{
console.log('Start');
const micStream = await navigator.mediaDevices.getUserMedia({audio:true});

mediaRecorder = new MediaRecorder(micStream);

mediaRecorder.ondataavailable = event => {
console.log('Audio data available');
audioChunks.push(event.data);
};

mediaRecorder.onstop = () => {
const audioBlob = new Blob(audioChunks, {type: 'audio/wav'});
const audioUrl = URL.createObjectURL(audioBlob);
const audio = new Audio(audioUrl);

audioElement.src = audioUrl;
audioElement.play();
audioChunks = [];
};

if (isRecording) {
mediaRecorder.stop();
isRecording = false;
document.getElementById('record-card').innerText = 'Record';
} else{
mediaRecorder.start();
isRecording = true;
document.getElementById('record-card').innerText = 'Stop';
}
} catch (error){
alert('Please ensure your device has a microphone');
}
});

displayCard();
});