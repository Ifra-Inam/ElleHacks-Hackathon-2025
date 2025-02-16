function playbutton() {
    window.location.href = "map.html";
}
function goToLevel1() {
    window.location.href = "level1-welcomepage.html";
}
function goToFlashcards() {
    window.location.href = "level1-flashcards.html";
}
// Level 1 Flashcards
document.addEventListener('DOMContentLoaded', () => {
    const flashcards = [
        { question: '<img src="images/dragon.webp" alt="Dragon">', answer: "Dragon" },
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
    const goToQuizButton = document.getElementById('go-To-Quiz');  // Correct reference to the button
    const nextCardButton = document.getElementById('next-card');  // Correct reference to the Next Card button
    
    // Initially hide the "Go to Quiz" button
    goToQuizButton.style.display = 'none';

    function displayCard() {
        // Display the current card's question and answer
        questionElement.innerHTML = flashcards[currentCard].question;
        answerElement.textContent = flashcards[currentCard].answer;
        flashcardElement.classList.remove('is-flipped');
    }
    
    // Flip the flashcard when it's clicked
    flashcardElement.addEventListener('click', () => {
        flashcardElement.classList.toggle('is-flipped');
    });
    
    // Next card button handler
    nextCardButton.addEventListener('click', () => {
        currentCard++;
        
        if (currentCard < flashcards.length) {
            displayCard();
        } else {
            // Disable the "Next" button once the last card is reached
            nextCardButton.disabled = true;
            
            // Show the "Go to Quiz" button after the last card
            goToQuizButton.style.display = 'block';
        }
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
    
    // Initial card display
    displayCard();
});

function goToLevel1Quiz() {
    window.location.href = "level1-quiz.html";
}

// Level 1 Quiz
document.addEventListener('DOMContentLoaded', () => {
    const flashcards = [
        { question: '<img src="images/dragon.webp" alt="Dragon">', answer: "Dragon" },
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

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    let selectedFlashcards = shuffle([...flashcards]).slice(0, 5);

    const imagesColumn = document.getElementById('imagesColumn');
    const wordsColumn = document.getElementById('wordsColumn');

    function setupGame() {
        imagesColumn.innerHTML = '';
        wordsColumn.innerHTML = '';

        selectedFlashcards.forEach(card => {
            const dropzone = document.createElement('div');
            dropzone.classList.add('dropzone');
            dropzone.setAttribute('data-word', card.answer);
            dropzone.innerHTML = card.question;
            imagesColumn.appendChild(dropzone);

            dropzone.addEventListener('dragover', event => {
                event.preventDefault();
                dropzone.classList.add('over');
            });

            dropzone.addEventListener('dragleave', () => {
                dropzone.classList.remove('over');
            });

            dropzone.addEventListener('drop', event => {
                event.preventDefault();
                dropzone.classList.remove('over');

                const draggedWord = event.dataTransfer.getData('text/plain');

                // Allow incorrect words to be placed
                dropzone.innerHTML = `<p>${draggedWord}</p>`;
                dropzone.setAttribute('data-placed-word', draggedWord);

                // Remove the word from the draggable list
                const matchedElement = document.querySelector(`.draggable[data-word="${draggedWord}"]`);
                if (matchedElement) {
                    matchedElement.remove();
                }

                checkCompletion();
            });
        });

        // Shuffle words for random order
        const words = shuffle(selectedFlashcards.map(card => card.answer));
        words.forEach(word => {
            const draggable = document.createElement('div');
            draggable.classList.add('draggable');
            draggable.textContent = word;
            draggable.setAttribute('draggable', 'true');
            draggable.setAttribute('data-word', word);
            wordsColumn.appendChild(draggable);

            draggable.addEventListener('dragstart', event => {
                draggable.classList.add('dragging');
                event.dataTransfer.setData('text/plain', word);
            });

            draggable.addEventListener('dragend', () => {
                draggable.classList.remove('dragging');
            });
        });
    }

    function checkCompletion() {
        const dropzones = document.querySelectorAll('.dropzone');
        if (document.querySelectorAll('.draggable').length > 0) return;

        let allCorrect = true;
        dropzones.forEach(dropzone => {
            const correctWord = dropzone.getAttribute('data-word');
            const placedWord = dropzone.getAttribute('data-placed-word');

            if (correctWord !== placedWord) {
                allCorrect = false;
            }
        });

        if (allCorrect) {
            alert("Great job! Moving to the next level.");
            window.location.href = "map.html";
        } else {
            alert("Oops! Some matches were incorrect. Try again.");
            setupGame(); // Reset with the same words
        }
    }

    setupGame();
});
