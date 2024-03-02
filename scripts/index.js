import { getPlanets } from './api.js';
import { displayOverlay, closeOverlay } from './ui.js';

// Funktion för att hantera klick på varje planet och visa relevant information i en overlay.
function setupPlanetClicks() {
    // Väljer alla element med klassen 'planet' och lägger till en klickhändelse till varje
    document.querySelectorAll('.planet').forEach(planet => {
        planet.addEventListener('click', async () => {
            // Hämtar planetens namn från 'data-name' attribut och gör om det till små bokstäver
            const planetName = planet.getAttribute('data-name').toLowerCase();
            // Anropar getPlanets för att hämta alla planeter
            const bodies = await getPlanets();
            // Hittar den specifika planeten baserat på namnet
            const foundBody = bodies.find(body => body.name.toLowerCase() === planetName);
            if (foundBody) {
                // Om planeten hittas, visa overlay med information om planeten
                displayOverlay(foundBody);
            } else {
                // Om ingen information hittades, logga ett felmeddelande
                console.error("Information not found for:", planetName);
            }
        });
    }); 
}

// Funktion för att sätta upp sökfunktionaliteten
function setupSearch() {
    // Hämtar sökfältet och sökknappen
    const searchBox = document.getElementById('searchBox');
    const searchButton = document.querySelector('.search__submit');

    // Funktion som körs när användaren söker
    async function handleSearch() {
        // Hämtar och normaliserar söksträngen
        const query = searchBox.value.trim().toLowerCase();
        if (query) {
            // Hämtar alla planeter
            const bodies = await getPlanets();
            // Försöker hitta en planet som matchar söksträngen
            const foundBody = bodies.find(body => body.name.toLowerCase() === query);
            if (foundBody) {
                // Om planeten hittas, visa informationen i en overlay
                displayOverlay(foundBody);
            } else {
                // Om planeten inte hittas, visa ett meddelande
                alert("Planet not found");
            }
        }
    }

    // Lägger till händelsehanterare för sökknappen och Enter-tangenten
    searchButton.addEventListener('click', handleSearch);
    searchBox.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Förhindrar formulärets standardbeteende
            handleSearch(); // Utför sökningen
        }
    });
}

// Funktion för att stänga overlayen
function setupCloseOverlay() {
    // Hämtar stängknappen och lägger till en klickhändelse
    const closeButton = document.getElementById('closeOverlay');
    closeButton.addEventListener('click', closeOverlay);
}

// Initialiserar alla funktioner när sidan laddas
function init() {
    setupSearch();
    setupCloseOverlay();
    setupPlanetClicks();
}

// Kör init när sidan är helt laddad
document.addEventListener('DOMContentLoaded', init);