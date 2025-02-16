document.addEventListener('DOMContentLoaded', () => {
    const volcanoImage = document.getElementById('volcano-image');
    const bakingSodaImage = document.getElementById('bakingsoda-image');
    const narrationText = "Watch as the volcano erupts! The pressure inside builds up, and soon the eruption happens. The lava flows out as we pour the baking soda into the volcano.";

    // Check if SpeechSynthesis API is available
    if (!('speechSynthesis' in window)) {
        alert('Speech synthesis is not supported in your browser.');
        return;
    }

    // Wait for voices to load
    const synth = window.speechSynthesis;
    let voices = [];

    // This function will load voices once they are available
    function loadVoices() {
        voices = synth.getVoices();
    }

    // Load voices immediately after page load
    loadVoices();

    // Also load voices when they are changed (browser event)
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Function to start the animation and narration
    function startAnimationAndNarration() {
        // Start the baking soda animation
        bakingSodaImage.style.animationPlayState = 'running';  // Ensure animation is running

        // Create a new SpeechSynthesisUtterance for the narration
        const utterance = new SpeechSynthesisUtterance(narrationText);

        // Ensure that we select a voice (this may need adjustment depending on available voices)
        if (voices.length > 0) {
            utterance.voice = voices[0];  // Use the first available voice
        } else {
            console.error('No voices available for speech synthesis');
        }

        // Optional: Set the pitch and rate of speech
        utterance.pitch = 1;  // Normal pitch
        utterance.rate = 1;   // Normal rate

        // Debugging: Check if the narration is being triggered
        console.log('Starting narration...');

        // Start narration
        speechSynthesis.speak(utterance);

        // When narration finishes, move to the next page
        utterance.onend = () => {
            alert("The eruption is complete!");
            window.location.href = 'nextPage.html';  // Redirect to the next page
        };
    }

    // Wait a few seconds before starting the animation and narration
    setTimeout(startAnimationAndNarration, 2000);  // Start 2 seconds after page loads
});
