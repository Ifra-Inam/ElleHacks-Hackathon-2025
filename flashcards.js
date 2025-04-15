function goToLevel1Quiz() {
    window.location.href = "level1-quiz.html";
}
document.addEventListener('DOMContentLoaded', () => {
    const flashcards = [
        { question: '<img src="images/dragon.webp" alt="Dragon" style="width:300px; height:250px;">', answer: "Dragon" },
        { question: '<img src="images/fire.png" alt="Fire">', answer: "Fire" },
        { question: '<img src="images/water.jpg" alt="Water">', answer: "Water" },
        { question: '<img src="images/brave.jpg" alt="Brave">', answer: "Brave" },
        { question: '<img src="images/castle.png" alt="Castle">', answer: "Castle" },
        { question: '<img src="images/hero.jpg" alt="Hero">', answer: "Hero" },
        { question: '<img src="images/treasure.webp" alt="Treasure">', answer: "Treasure" },
        { question: '<img src="images/cave.png" alt="Cave">', answer: "Cave" },
        { question: '<img src="images/magic.jpg" alt="Magic">', answer: "Magic" },
        { question: '<img src="images/quest.webp" alt="Quest">', answer: "Quest" }
    ];
   
    let currentCard = 0;
   
    const flashcardElement = document.getElementById('flashcard');
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');
   
    function displayCard() {
        // Use innerHTML for question since it contains an image tag
        questionElement.innerHTML = flashcards[currentCard].question;
        // Display answer as text (or you could use innerHTML if needed)
        answerElement.textContent = flashcards[currentCard].answer;
        flashcardElement.classList.remove('is-flipped');
    }
   
    // Flip the flashcard when it's clicked
    flashcardElement.addEventListener('click', () => {
        flashcardElement.classList.toggle('is-flipped');
    });
   
    document.getElementById('next-card').addEventListener('click', () => {
        currentCard = (currentCard + 1) % flashcards.length;
        displayCard();
    });
   
    // Optionally, handle the record button here if needed


    const speakBtn = document.getElementById("speakAI");
    const recordBtn = document.getElementById("record-card");


    // Function to make AI speak using Speech Synthesis API
    function speakWord() {
        const msg = new SpeechSynthesisUtterance(flashcards[currentCard].answer);
        window.speechSynthesis.speak(msg);
        recordBtn.disabled = false;  // Enable the "Record" button after AI speaks
        speakBtn.disabled = false;  // Enable the "Record" button after AI speaks
       
    }


    // Function to record user's voice and compare it
    function recordWord() {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';


        recognition.start();
        recognition.onresult = function(event) {
            const spokenWord = event.results[0][0].transcript;
            console.log("You said: ", spokenWord);


            // Compare the spoken word with the displayed word
            if (spokenWord.toLowerCase().trim() === flashcards[currentCard].answer.toLowerCase().trim()) {
                alert("Hooray! You said it correctly.");
            } else {
                alert("Oops, try again! The word was: " + flashcards[currentCard].answer);
            }
        };


        recognition.onerror = function() {
            alert("Sorry, I couldn't recognize your speech. Try again.");
        };
    }


    // Event listeners
    speakBtn.addEventListener("click", speakWord);
    recordBtn.addEventListener("click", recordWord);
   
    displayCard();
});


