// Grid-Optionen definieren
const gridOptions = {
    rowData: [
        { land: "China", em: 10000 },
        { land: "USA", em: 50000 },
        { land: "Indien", em: 2750 },
        { land: "Russland", em: 1800 },
        { land: "Japan", em: 1250 },
        { land: "Deutschland", em: 1100 },
        { land: "Australien", em: 1000 },
        { land: "Schottland", em: 300 },
    ],
    columnDefs: [
        { headerName: "Land", field: "land", sortable: true, filter: true },
        { headerName: "CO2-Emissionen in Mt", field: "em", sortable: true, filter: true },
    ],
    defaultColDef: {
        flex: 1,
        minWidth: 100,
    },
};

// Initialisierung des Grids
document.addEventListener('DOMContentLoaded', () => {
    const eDiv = document.querySelector('#landGrid');
    new agGrid.Grid(eDiv, gridOptions);
});

// Funktion für die Quick-Suche
function onQuickFilterChanged() {
    const searchValue = document.getElementById('searchbox').value;
    gridOptions.api.setQuickFilter(searchValue);
}
