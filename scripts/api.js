// Bas-URL för att hämta API-nyckeln
const keyURL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys";
// Bas-URL för att hämta information om himlakroppar
const baseURL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies";
// Objekt för att lagra hämtad data om himlakroppar
let planetsData = {};


 // Hämtar en API-nyckel från servern.

async function getApiKey() {
    // Skickar en POST-begäran till keyURL för att få en API-nyckel
    let resp = await fetch(keyURL, {
        method: "POST",
    });

    // Kontrollerar om serverns svar är framgångsrikt (statuskod 200-299)
    if (!resp.ok) {
        // Loggar felmeddelande om något gick fel
        console.error("Something went wrong: ", resp.status);
        return;
    }
    // Omvandlar serverns svar till JSON-format
    let data = await resp.json();
    // Returnerar API-nyckeln från svaret
    return data.key;
}

// Hämtar information om alla stora himlakroppar i solsystemet.

async function getPlanets() {
    try {
        // Anropar getApiKey för att hämta en giltig API-nyckel
        const apiKey = await getApiKey();

        // Skickar en GET-begäran till baseURL
        const response = await fetch(baseURL, {
            method: "GET",
            headers: { "x-zocom": apiKey },
        });

        
        if (!response.ok) {
            throw new Error("Something went wrong: " + response.status);
        }
        // Omvandlar serverns svar till JSON-format
        let data = await response.json();
        // Lagrar den hämtade datan om himlakropparna i planetsData-variabeln
        planetsData = data.bodies;
    } catch (error) {
        // Loggar eventuella fel som uppstår under processen
        console.error(error.message);
    }
    // Loggar den hämtade datan om himlakropparna för felsökning
    console.log("Planets array", planetsData);
    // Returnerar den hämtade datan om himlakropparna
    return planetsData;
}

// Gör getPlanets funktionen tillgänglig för andra moduler genom att exportera den
export { getPlanets };