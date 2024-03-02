
// Sökfunktion

export function displaySearchResults(bodies, onBodyClick) {
    // Hämta container för sökresultaten
    const resultsContainer = document.getElementById('searchResults');
    // Rensa tidigare sökresultat
    resultsContainer.innerHTML = ''; 

// Gå igenom varje kropp (planet/sol etc.) i sökresultaten
    bodies.forEach(body => {
        // Skapa ett nytt div-element för varje sökresultat
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.textContent = body.name; 
        // Lägg till klickhändelse för att hantera klick på varje sökresultat
        resultItem.addEventListener('click', () => onBodyClick(body));
        // Lägg till det nya elementet i resultatscontainern
        resultsContainer.appendChild(resultItem);
    });
}




//Overlay-funktion

export function displayOverlay(body) {
    const overlay = document.getElementById('overlay');
    const overlayContent = document.getElementById('overlayContent');

    // Sätter innehållet i overlay med information om den valda himlakroppen
    overlayContainer.innerHTML = `
    <h2>${body.name}</h2>
    <h3>${body.latinName}</h3> 
    <p>Beskrivning: ${body.desc}</p>
    <ul>
    <li>
    <h4>Omkrets</h4>
    <p>${body.circumference} km</p> 
    </li>
    <li>
    <h4>Rotation</h4>
    <p>${body.rotation}</p> 
    </li>
    <li>
    <h4>Dag Temperatur</h4>
    <p>${body.temp.day}C</p> 
    </li>
    <li>
    <h4>Natt Temperatur</h4>
    <p>${body.temp.night}C</p> 
    </li>
    </ul>
`;

// Gör overlay synlig
    overlay.style.display = 'flex'; // Visa overlay
}

// Funktion för att stänga overlay
export function closeOverlay() {
    // Hämta overlay-elementet
    const overlay = document.getElementById('overlay');
    // Dölj overlay
    overlay.style.display = 'none'; 
}