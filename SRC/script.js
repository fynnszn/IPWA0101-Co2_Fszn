// Automatische Erkennung der Sprache und Einstellung des dir-Attributs
(function() {
    const rtlLanguages = ["ar", "he", "fa", "ur"]; // Liste der Sprachen mit rechts-nach-links-Richtung

    // Prüfen, ob die Sprache in der RTL-Liste enthalten ist
    const userLang = navigator.language || navigator.userLanguage; // Browser-Sprache
    const isRtl = rtlLanguages.some(lang => userLang.startsWith(lang));

    // Setzen des dir-Attributs auf der Wurzelebene des Dokuments
    document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
})();


// Daten
function loadGridData() {
    fetch('/data/dataunternehmen.json') //-> Lade .json
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("Geladene Daten:", data); //-> Für Test - Zeigt Konsole

            // Tabelle customizing
            const gridOptions = {
                rowData: data,  // Setze die geladenen Daten hier
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

            // Grid init
            const eDiv = document.querySelector('#landGrid');
            new agGrid.Grid(eDiv, gridOptions);
        })
        .catch(error => console.error('Fehler beim Laden der Daten:', error)); //Fehler Nachricht
}
document.addEventListener('DOMContentLoaded', loadGridData);
