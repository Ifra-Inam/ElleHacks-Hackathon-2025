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
let level = 0;
let points = 0;
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
                    points += 10;
                }
                else {
                    points -= 10;
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
            level += 1;
            window.location.href = "map.html";
        } else {
            alert("Oops! Some matches were incorrect. Try again.");
            setupGame(); // Reset with the same words
        }
    }
    module.exports = {level, points};
    setupGame();
});
