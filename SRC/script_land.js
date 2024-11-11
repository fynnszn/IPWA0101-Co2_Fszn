// Daten
function loadGridData() {
    fetch('./data/row_data_synth.json') //-> Lade .json
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Geladene Daten:", data); //-> Für Test - Zeigt Konsole

            // Tabelle customizing
            const gridOptions = {
                rowData: data,  // Setze die geladenen Daten hier
                columnDefs: [
                    { headerName: "Land", field: "land", sortable: true, filter: true },
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
        .catch(error => console.error('Fehler beim Laden der Daten:', error));
}

// Suchleiste
function onQuickFilterChanged() {
    const searchValue = document.getElementById('searchbox').value;
    if (gridOptions.api) {
        gridOptions.api.setQuickFilter(searchValue);
    }
}
document.addEventListener('DOMContentLoaded', loadGridData);
