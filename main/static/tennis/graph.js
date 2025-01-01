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
function drawlinechartwtrend (file, html, feature, yIntercept, slope, v, bgdcol, lincol, title){
    anychart.onDocumentReady(async function () {
            try {
                const data = await arraymaker(file);
                if (!data || data.length === 0) {
                    console.error("No data loaded from CSV.");
                    return;
                }

                
                const filteredData = data.filter(row => row[v] !== null && row[v] !== undefined && row[v] !== "");
                // Add the trendline to the chart
                const trendLineData = filteredData.map(row => {
                    const xValue = row[0]; // Assuming the x-values are in the first column
                    const yValue = yIntercept + (slope * xValue);
                    return [xValue, yValue];
                });
                const dataSet = anychart.data.set(filteredData);
                const main = dataSet.mapAs({ x: 0, value: v });


                const trendDataSet = anychart.data.set(trendLineData);
                const trendLine = trendDataSet.mapAs({ x: 0, value: 1 });


                const chart = anychart.line();
                const linegraph = chart.line(main);
                linegraph.name(feature).stroke(lincol);
                const trendGraph = chart.line(trendLine);
                trendGraph.name('Linear Model').stroke({ color: '#b5f700', dash: '5 5', thickness: 3  });
                
                chart.background().fill(bgdcol);
                chart.dataArea().background().fill(bgdcol); 
                chart.legend().enabled(true);
                chart.legend().fontColor(lincol)
                chart.legend().fontSize(20)
                chart.title(title);
                chart.title().fontSize(35); 
                chart.title().fontColor(lincol);
                chart.xAxis().labels().fontColor(lincol);
                chart.yAxis().labels().fontColor(lincol);
                chart.container(html);
                chart.draw();
            } catch (error) {
                console.error("Error initializing the chart:", error);
            }
        });
    }
    function drawmultilinechart(file, html, featurearray, bgdcol, gencol, title) {
        anychart.onDocumentReady(async function () {
            try {
                const data = await arraymaker(file);
                if (!data || data.length === 0) {
                    console.error("No data loaded from CSV.");
                    return;
                }
    
                const dataSet = anychart.data.set(data);
                const chart = anychart.line();
    
                // Parse the featurearray to create lines dynamically
                featurearray.forEach(parsefunc);
                function parsefunc(value, index, array){
                    const data = dataSet.mapAs({ x: 0, value: value.v });
                    const linegraph = chart.line(data);
                    linegraph.name(value.feature).stroke({color: value.col, thickness: 3});
                }
    
                // Set chart properties
                chart.background().fill(bgdcol);
                chart.dataArea().background().fill(bgdcol);
                chart.legend().enabled(true);
                chart.legend().fontColor(gencol);
                chart.legend().fontSize(20);
                chart.title(title);
                chart.title().fontSize(35);
                chart.title().fontColor(gencol);
                chart.xAxis().labels().fontColor(gencol);
                chart.yAxis().labels().fontColor(gencol);
                chart.container(html);
                chart.draw();
            } catch (error) {
                console.error("Error initializing the chart:", error);
            }
        });
    }
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
    
drawlinechartwtrend('tennis/data/performancelinechart.csv', 'first_serve_temp','% First Serve In', -150.868,  0.10533539839509813, 3, '#000000', '#ffffff', 'First serve in %');
drawlinechartwtrend('tennis/data/performancelinechart.csv', 'first_serve_temp_w','% First Serve Points Won', -148.31943682423145,  0.09533670231198815, 2, '#000000', '#ffffff', 'First serve points won %');
drawmultilinechart('tennis/data/surface1stservewin.csv', 'first_serve_surface' ,[{'col':'#8bc935','feature':'Grass', 'v': 1},{'col':'#45abec','feature':'Hard',  'v':2},{'col':'#d99a12','feature':'Clay','v': 3}],'#000000', '#ffffff', '% First serve points won depending on surface');
drawmultilinechart('tennis/data/logregfeatures.csv', 'first_second_serve', [{'col':'#8bc935', 'feature':'First serve win %','v': 1},{ 'col':'#6B24A2', 'feature':'Second serve win %', 'v':3}], '#000000', '#ffffff', 'Log odds increase in win %');
drawmultilinechart('tennis/data/logregfeatures.csv', 'double_faults', [{'col':'red', 'feature':'Double Fault %','v': 5}], '#000000', '#ffffff', 'Log odds increase in win %');
const ogTennisTableBody = document.getElementById("ogtennisTable").querySelector("tbody");
tablepop(ogTennisTableBody, 'tennis/data/rawtennis.csv');

