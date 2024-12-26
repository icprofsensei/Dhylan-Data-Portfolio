function tablepop(table, fileloc) {
    // Construct the static URL dynamically if needed for Django
    const staticFilePath = `/static/${fileloc}`;

    // Fetch the CSV file
    fetch(staticFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(csvData => {
            // Parse the CSV data using PapaParse
            Papa.parse(csvData, {
                header: false, // Set to true if the CSV has headers
                skipEmptyLines: true, // Ignore empty lines
                complete: function(results) {
                    populateTable(table, results.data);
                }
            });
        })
        .catch(error => {
            console.error(`Error loading the CSV file from ${fileloc}:`, error);
        });
}

// Helper function to populate the table
function populateTable(table, data) {
    // Clear the existing rows, if any
    table.innerHTML = '';

    // Populate the table with rows and columns
    data.forEach(row => {
        let tr = document.createElement("tr");
        row.forEach(col => {
            let td = document.createElement("td");
            td.textContent = col;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
}

const cropTableBody = document.getElementById("cropTable").querySelector("tbody");
tablepop(cropTableBody, 'dtree/cropsample.csv');
const wetTableBody = document.getElementById("wetTable").querySelector("tbody");
tablepop(wetTableBody, 'dtree/brad_wet_sample.csv');