function arraymaker(fileloc) {
    return new Promise((resolve, reject) => {
        // Construct the static URL dynamically if needed for Django
        const staticFilePath = `/static/${fileloc}`;

        // Fetch the CSV file
        fetch(staticFilePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(csvData => {
                // Parse the CSV data using PapaParse
                Papa.parse(csvData, {
                    header: false, // Set to true if the CSV has headers
                    skipEmptyLines: true, // Ignore empty lines
                    complete: function(results) {
                        resolve(results.data);
                    }
                });
            })
            .catch(error => {
                console.error(`Error loading the CSV file from ${fileloc}:`, error);
                reject(error);
            });
    });
}
async function drawlinechart (file, element){
                const data = await arraymaker(file);
                const seriesData = data.map(row => {
                    const x = new Date(row[4]); 
                    const y = parseFloat(row[5]);
                    if (isNaN(y)) {
                        console.warn(`Invalid number in row: ${row}`);
                        return null;
                    }
                    return [x.getTime(), y]; // Highcharts expects timestamps for x values
                }).filter(point => point !== null);


                chart = new Highcharts.Chart(element, {
                rangeSelector: {
                    selected: 1
                },
                title: {
                    text: 'Bus Journeys 2010-2024'
                },
                xAxis: {
                    type: 'datetime', // Ensures proper date handling
                },
                series: [{
                    name: 'Bus Journeys / million',
                    data: seriesData,
                    tooltip: {
                        valueDecimals: 2
                    }
                }]
            });
                    }
        
        
        
  drawlinechart('London/data/tfl-journeys-type.csv', 'highchartscontainer')
