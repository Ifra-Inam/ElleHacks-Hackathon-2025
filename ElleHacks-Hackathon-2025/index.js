import { level, points } from './game.js';

let curlevel = level;
let curpoints = points;

let gems = [document.createElement("img"), document.createElement("img2")];
gems[0].src = "fadedpowerorb.png";  
gems[1].src = "fadedwingedglider.png";
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
    else if (curlevel == 2) {
        levelEl.textContent = curlevel;
        gems.splice(1,1)
        let newGem = document.createElement("img2");
        newGem.src = "wingedglider.png";
        gems.splice(1,0, newGem)
        relicEl.textContent += gems[1].src;
    }
