// Code-Sicherung:
// XSS
function sanitizeInput(userInput) { // Funktion gegen XSS
    const div = document.createElement('div'); // Falls Eingabetext, dann <div></div> im html
    div.appendChild(document.createTextNode(userInput)); // Was immer Input ist, wird als text gesehen -> harmlos
    return div.innerHTML; // Gibt den text, der dann im div steht aus dem html wieder. -> Gefahr neutralisiert.
}

// Daten für erste Tabelle
function loadUnternehmenGridData() { // Funktion zum Laden der Daten für Unternehmensliste
    fetch('/data/dataunternehmen.json') // Ort
        .then(response => response.json()) // Konvertiert in JSON-Format (evtl. später noch anpassen, weil .json)
        .then(data => { // Datenverarbeitung
            console.log("Geladene Daten für Unternehmenstabelle:", data); // Datenprüfen in Konsole

            // Tabelle customizing
            const gridOptions = { // definiert das customizing
                rowData: data, // data (aus der Funktion loadUnternehmenGridData) = die Daten die in die zeilen soll
                columnDefs: [ // Spalten
                    { headerName: "Unternehmen", field: "unternehmen", sortable: true, filter: true }, // Spalte für Unternehmensnamen mit Sortier- und Filteroption
                    { headerName: "Hauptsitz", field: "hauptsitz", sortable: true, filter: true }, // Spalte für Hauptsitz des Unternehmens
                    { headerName: "Land", field: "land", sortable: true, filter: true }, // Spalte für das Land des Unternehmens
                    { headerName: "Branche", field: "branche", sortable: true, filter: true }, // Spalte für Branche des Unternehmens
                    { headerName: "CO2-Emissionen in Mt", field: "em", sortable: true, filter: true } // Spalte für die CO₂-Emissionen in Megatonnen (Mt)
                ],
                defaultColDef: { // Standardkonfiguration für alle Spalten
                    flex: 1, // Spalten füllen den verfügbaren Platz gleich aus
                    minWidth: 100, // Mindestbreite der Spalten
                },
            };

            // Erstes Grid init
            const eDiv = document.querySelector('#unGrid'); // div mit ID "unGrid" ist die Tabelle (bzw. das Ziel)
            new agGrid.Grid(eDiv, gridOptions); // Init mit dem customizing
        })
        .catch(error => console.error('Fehler beim Laden der Daten für Unternehmenstabelle:', error)); // Fehler in Konsole
}

// Daten für zweite Tabelle
function loadAggregierteEmissionenGridData() { // neue Funktion
    fetch('/data/dataunternehmen.json') // Wie oben 
        .then(response => response.json()) // Wie oben 
        .then(data => { // Wie oben 
            console.log("Geladene Daten für aggregierte Emissionen:", data); // Wie oben 

            // Daten zusammenführen, sodass man eine Summe auf Land bilden kann
            const emissionenProLand = data.reduce((acc, curr) => { // Methode: Von Array zu einem Wert (acc ist dabei accumolator (quasi speicherort))
                if (!acc[curr.land]) { // Wenn noch nicht summiert dann (bezogen auf Land)
                    acc[curr.land] = { land: curr.land, gesamtEmissionen: 0 }; // das Land hat einen anfangswert von 0
                }
                acc[curr.land].gesamtEmissionen += curr.em; // hier Addition
                return acc; // hier das Ergebnis
            }, {});

            // Daten in den Typ Array formen, damit die Tabelle es checkt.
            const aggregatedData = Object.values(emissionenProLand); // Wandelt das Ergebnis in ein Array um, da AG Grid mit Arrays arbeitet
            console.log("Aggregierte Daten:", aggregatedData); // Gibt die aggregierten Daten in der Konsole aus

            // Tabelle customizing
            const gridOptions = { //wie oben
                rowData: aggregatedData, // wie oben
                columnDefs: [ // wie oben
                    { headerName: "Land", field: "land", sortable: true, filter: true }, // wie oben
                    { headerName: "Gesamtemissionen in Mt", field: "gesamtEmissionen", sortable: true, filter: true } // wie oben
                ],
                defaultColDef: { // wie oben
                    flex: 1, // wie oben
                    minWidth: 100, // wie oben
                },
            };

            // Grid init
            const eDiv = document.querySelector('#landGrid'); // wie oben
            new agGrid.Grid(eDiv, gridOptions); // wie oben
        })
        .catch(error => console.error('Fehler beim Laden der Daten für aggregierte Emissionen:', error)); // wie oben
}

//Init für beide Tabellen
document.addEventListener('DOMContentLoaded', () => { // Wartet, bis das DOM vollständig geladen ist
    loadUnternehmenGridData(); // Lädt die Daten für die Unternehmenstabelle
    loadAggregierteEmissionenGridData(); // Lädt die Daten für die Tabelle der aggregierten Emissionen
});
