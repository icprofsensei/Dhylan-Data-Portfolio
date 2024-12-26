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
function drawlinechartwtrend (file, html, feature, loc, yIntercept, slope, v, bgdcol, lincol){
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
                trendGraph.name('Trend Line').stroke({ color: 'red', dash: '5 5' });

                chart.dataArea().background().fill(bgdcol); 
                chart.legend().enabled(true);
                chart.title(feature + " measured between 1908 - 2023" + " "+ loc);
                chart.container(html);
                chart.draw();
            } catch (error) {
                console.error("Error initializing the chart:", error);
            }
        });
    }
    function drawpcachartbasic(file, element, xIndex, yIndex) {
        anychart.onDocumentReady(async function () {
            try {
                // Fetch the CSV data using arraymaker
                const data = await arraymaker(file);
    
                // Validate and prepare data
                if (!data || data.length === 0) {
                    console.error("No data loaded from the CSV.");
                    return;
                }
    
                // Extract x, y, and category variables from the CSV
                const preparedData = data
                    .map(row => {
                        const x = parseFloat(row[xIndex]); // Extract x-value (e.g., column index xIndex)
                        const y = parseFloat(row[yIndex]); // Extract y-value (e.g., column index yIndex)
                        const category = row[3]; // Extract category from the 4th column
                        return { x, y, category };
                    })
                    .filter(point => !isNaN(point.x) && !isNaN(point.y)); // Filter out invalid points
    
                // Create a mapping of categories to unique colors
                const uniqueCategories = [...new Set(preparedData.map(point => point.category))];
                const colorPalette = anychart.palettes.distinctColors();
    
                // Map each category to a unique color using the palette
                const categoryToColor = uniqueCategories.reduce((map, category, index) => {
                    // Ensure the palette has enough colors
                    if (index < colorPalette.length) {
                        map[category] = colorPalette.itemAt(index); // Use itemAt to get the color for the category
                    } else {
                        map[category] = colorPalette.itemAt(index % colorPalette.length); // Use modulo for fallback
                    }
                    return map;
                }, {});
    
                // Prepare AnyChart data with colors for each category
                const chart = anychart.scatter();
                chart.xGrid().enabled(true).stroke("#EAE7E7");
                chart.yGrid().enabled(true).stroke("#EAE7E7");
    
                // Create a series for each category and add them to the chart
                uniqueCategories.forEach(category => {
                    const categoryData = preparedData.filter(point => point.category === category)
                        .map(point => ({
                            x: point.x,
                            value: point.y,
                            category: point.category
                        }));
    
                    // Create a new series for the category and assign the color
                    const series = chart.marker(categoryData);
                    series.name(category); // Set category as series name for legend
                    series.fill(categoryToColor[category]); // Assign the color for the category
                    series.tooltip().format("Category: {%category}\nX: {%x}\nY: {%value}");
                });
    
                // Customize chart
                chart.title("PCA plot of different crop growth conditions");
                chart.xAxis().title('Principal Component 1');
                chart.yAxis().title("Principal Component 2");
    
                // Show legend
                chart.legend(true);
    
                // Render the chart
                chart.container(element);
                chart.draw();
            } catch (error) {
                console.error("Error drawing the PCA chart:", error);
            }
        });
    }
    

drawlinechartwtrend('dtree/Bradford_grped.csv', 'maxtemp', 'Average maximum daily temperature', 'near Yorkshire',  -16.63728081064364, 0.014727307674833916, 3, '#fcfde2','#ff7d04' )
drawlinechartwtrend('dtree/Bradford_grped.csv', 'sun', 'Average maximum daily sunshine', 'near Yorkshire',  -66.15473450067257, 0.08648959840852047, 7, '#fcfde2', '#c3a600')
drawlinechartwtrend('dtree/Bradford_grped.csv', 'rain', 'Average monthly rainfall / cm', 'near Yorkshire',  35.668724400502825, 0.018926040967261092, 6, '#fcfde2', '#25d3ff')
drawpcachartbasic('dtree/Crop_PCA.csv', 'pca', 1, 2)