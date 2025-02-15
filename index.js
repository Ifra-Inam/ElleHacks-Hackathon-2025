curlevel = 0
curpoints = []
let gems = [document.createElement("img")];
gems[0].src = "fadedpwerorb.png";

const relicEl = document.getElementById("relic-el")

// how points and level will increase

// for (let i=0; i<gems.lenth; i++) {
    if (true) { // Replace with your actual condition to check if the relic is unlocked
        gems.shift();  // Remove the first element (faded power orb)
        
        let newGem = document.createElement("img");
        newGem.src = "powerorb.png";
        gems.push(newGem);  // Add the new gem
        
        relicEl.textContent += gems[0].src;  
    }
//}
