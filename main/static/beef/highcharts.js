async function drawlinechart(file, element, titletxt, shuffle) {
    // Function to load and parse CSV data
    function arrayMaker(fileLoc) {
        return new Promise((resolve, reject) => {
            const staticFilePath = `/static/${fileLoc}`;
            fetch(staticFilePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(csvData => {
                    Papa.parse(csvData, {
                        header: true,
                        skipEmptyLines: true,
                        complete: function(results) {
                            resolve(results.data);
                        }
                    });
                })
                .catch(error => {
                    console.error(`Error loading the CSV file from ${fileLoc}:`, error);
                    reject(error);
                });
        });
    }
    const data = await arrayMaker(file);
    if (data.length === 0) {
        console.warn("No data found in the CSV file.");
        return;
    }
    const columns = Object.keys(data[0]);
    const filteredColumns = columns.filter(col => col.toLowerCase() !== "year" && col !== "");
    const years = data.map(row => {
        const yearValue = row.Year || row.year; 
        return yearValue ? new Date(yearValue).getTime() : null;
    }).filter(year => year !== null);
    if (years.length === 0) {
        console.warn("No valid 'Year' column found.");
        return;
    }
    // Create series for each data column excluding the "Year" column
    const seriesData = filteredColumns.map(columnName => {
        const seriesPoints = data.map(row => {
            const yValue = parseFloat(row[columnName]);
            return !isNaN(yValue) ? [new Date(row.Year || row.year).getTime(), yValue] : null;
        }).filter(point => point !== null);
        return {
            name: columnName,
            data: seriesPoints,
            tooltip: {
                valueDecimals: 2
            }
        };
    });
    // Render the chart
    if (shuffle == "YES") {
        let colors=  ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572','#FF9655', '#FFF263', '#6AF9C4']
        let colarray = colors.sort(() => Math.random() - 0.5)
        Highcharts.setOptions({
            colors:colarray
        })
    }
    else {
        Highcharts.setOptions({
            colors:[
                '#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
            '#FF9655', '#FFF263', '#6AF9C4'
            ]
        })
    }
    
    new Highcharts.Chart(element, {
        chart: {type: 'line'},title: {text: titletxt},xAxis: {type: 'datetime'},yAxis: {title: {text: seriesData.name}},series: seriesData});}

        
        

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