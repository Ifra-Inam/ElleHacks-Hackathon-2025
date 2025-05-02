import { level, points } from './game.js'; // Only if using modules
document.addEventListener('DOMContentLoaded', () => {
    let curlevel = level;
    let curpoints = points;

    let gems = [document.createElement("img")];
    gems[0].src = "fadedpowerorb.png";  

    const levelEl = document.getElementById("level-el");
    const relicEl = document.getElementById("relic-el");

    // How points and level will increase
    if (curlevel === 1) {  
            levelEl.textContent = curlevel;
            gems.shift();  // Remove the first element (faded power orb)
            
            let newGem = document.createElement("img");
            newGem.src = "powerorb.png";
            gems.push(newGem);  // Add the new gem
            
            relicEl.textContent += gems[0].src;
    }
    document.addEventListener("DOMContentLoaded", function() {
        document.querySelector(".back-btn").addEventListener("click", map);
    });

    function map() {
        console.log('Back button clicked!');
        window.location.href = "map.html";
    }
});