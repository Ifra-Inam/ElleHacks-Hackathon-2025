document.addEventListener("DOMContentLoaded", function () {
    const dropZone = document.getElementById("drop-zone");
    const shapes = document.querySelectorAll(".shape");
    const gateImage = document.getElementById("gate-image"); // The closed gate image
    let shapeList = ["circle", "square", "heart", "triangle", "star"];
    let currentShape = "";

    // Hide the drop zone and shapes initially
    dropZone.style.display = "none";
    shapes.forEach(shape => {
        shape.style.display = "none";
    });

    // Function to speak the shape
    function speak(text) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-US";
        speechSynthesis.speak(speech);
    }

    // Function to start the quiz
    function startQuiz() {
        if (shapeList.length === 0) {
            alert("Congratulations! You completed the level!");
            gateImage.src = 'images/opencastle.png'
            return;
        }

        // Show the drop zone and shapes after a delay
        setTimeout(() => {
            dropZone.style.display = "block";
            shapes.forEach(shape => {
                shape.style.display = "inline-block";
                shape.style.width = "120px";
                shape.style.height = "120px";
            });

            // Enlarge the gate image when the quiz starts
            gateImage.style.width = "600px";
            gateImage.style.height = "400px";

            // Pick a random shape and speak it
            currentShape = shapeList[Math.floor(Math.random() * shapeList.length)];
            speak("Find the "+currentShape);
        }, 2000); // Delay of 2 seconds
    }

    // Automatically start the quiz after a delay
    setTimeout(startQuiz, 3000);

    // Drag and Drop Logic
    shapes.forEach(shape => {
        shape.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text", event.target.id);
        });
    });

    dropZone.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    dropZone.addEventListener("drop", (event) => {
        event.preventDefault();
        const draggedShapeId = event.dataTransfer.getData("text");

        if (draggedShapeId === currentShape) {
            document.getElementById(draggedShapeId).remove();
            shapeList = shapeList.filter(shape => shape !== draggedShapeId);
            alert("Correct!");
            setTimeout(startQuiz, 1000);
        } else {
            alert("Try again!");
        }
    });
});
