//Code-sicherung:
//XSS
function sanitizeInput(userInput) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(userInput));
    return div.innerHTML;
}
// Daten für erste Tabelle
function loadUnternehmenGridData() {
    fetch('/data/dataunternehmen.json')
        .then(response => response.json())
        .then(data => {
            console.log("Geladene Daten für Unternehmenstabelle:", data);

            // Tabelle customizing
            const gridOptions = {
                rowData: data,
                columnDefs: [
                    { headerName: "Unternehmen", field: "unternehmen", sortable: true, filter: true },
                    { headerName: "Hauptsitz", field: "hauptsitz", sortable: true, filter: true },
                    { headerName: "Land", field: "land", sortable: true, filter: true },
                    { headerName: "Branche", field: "branche", sortable: true, filter: true },
                    { headerName: "CO2-Emissionen in Mt", field: "em", sortable: true, filter: true }
                ],
                defaultColDef: {
                    flex: 1,
                    minWidth: 100,
                },
            };

            // Erstes Grid init
            const eDiv = document.querySelector('#unGrid');
            new agGrid.Grid(eDiv, gridOptions);
        })
        .catch(error => console.error('Fehler beim Laden der Daten für Unternehmenstabelle:', error));
}

// Daten für zweite Tabelle (Aggregierte Emissionen)
function loadAggregierteEmissionenGridData() {
    fetch('/data/dataunternehmen.json')
        .then(response => response.json())
        .then(data => {
            console.log("Geladene Daten für aggregierte Emissionen:", data);

            // Daten aggregieren, um die Summe der Emissionen pro Land zu berechnen
            const emissionenProLand = data.reduce((acc, curr) => {
                if (!acc[curr.land]) {
                    acc[curr.land] = { land: curr.land, gesamtEmissionen: 0 };
                }
                acc[curr.land].gesamtEmissionen += curr.em;
                return acc;
            }, {});

            // In ein Array umwandeln, das AG Grid als Datenquelle nutzen kann
            const aggregatedData = Object.values(emissionenProLand);
            console.log("Aggregierte Daten:", aggregatedData);

            // Tabelle customizing
            const gridOptions = {
                rowData: aggregatedData,
                columnDefs: [
                    { headerName: "Land", field: "land", sortable: true, filter: true },
                    { headerName: "Gesamtemissionen in Mt", field: "gesamtEmissionen", sortable: true, filter: true }
                ],
                defaultColDef: {
                    flex: 1,
                    minWidth: 100,
                },
            };

            // Zweites Grid init
            const eDiv = document.querySelector('#landGrid');
            new agGrid.Grid(eDiv, gridOptions);
        })
        .catch(error => console.error('Fehler beim Laden der Daten für aggregierte Emissionen:', error));
}

// Initialisierung für beide Tabellen beim Laden des Dokuments
document.addEventListener('DOMContentLoaded', () => {
    loadUnternehmenGridData();
    loadAggregierteEmissionenGridData();
});
