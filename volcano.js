document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const volcanoImage = document.getElementById('volcano-image');
    const bakingSodaImage = document.getElementById('bakingsoda-image');

    // Set the volcano animation and narration
      function startAnimationAndNarration() {
        // Start the baking soda animation
        bakingSodaImage.style.animationPlayState = 'running';  // Make sure the animation is running

        const narrationText = 'Watch as the volcano erupts! The pressure inside builds up, and soon the eruption happens. The lava flows out as we pour the baking soda into the volcano.';
        const utterance = new SpeechSynthesisUtterance(narrationText);
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
