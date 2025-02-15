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
                  header: true, // Set to true if the CSV has headers
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

function drawwordcloud(file, element) {
  anychart.onDocumentReady(async function () {
      try {
          const data = await arraymaker(file);
          if (!data || data.length === 0) {
              console.error("No data loaded from CSV.");
              return;
          }
          newls = []
          for (let i=0; i < data.length; i++){
            newls.push({x: data[i]['word'], value: data[i]['Frequency']})
          }
          chart = anychart.tagCloud(newls);

          // set the container id
          chart.container(element);

          // initiate drawing the chart
          chart.draw();
          
      } catch (error) {
          console.error("Error initializing the chart:", error);
      }
  });
}

function drawheatmap(file, element, title) { 
  anychart.onDocumentReady(async function () {
      try {
          const rawData = await arraymaker(file);
          
          if (!rawData || rawData.length === 0) {
              console.error("No data loaded from CSV.");
              return;
          }
          const headers = Object.keys(rawData[0]);
          const h2 = headers.slice(1);
          const rows = rawData
          const newrows = []
          rows.forEach((row) =>{
            newrows.push(Object.values(row))
          })
          // Transform raw data into the format required by AnyChart heatMap
          const data = [];
          for (let i = 0; i < newrows.length; i++) {
              const rowLabel = newrows[i][0]; // First element in each row is the label
              for (let j = 1; j < newrows[i].length; j++) { // Skip the row label
                  data.push({
                      x: h2[j - 1], // Column label
                      y: rowLabel, // Row label
                      heat: parseFloat(newrows[i][j]) || 0 // Ensure values are numeric
                  });
              }
          }
          // Create the heatmap chart
          const chart = anychart.heatMap(data);
          chart.xAxis().title("Columns");
          chart.yAxis().title("Rows");
          // Set heatmap title and color scale (optional)
          const viridisColors = [
            "#440154", "#482878", "#3E4A89", "#31688E", 
            "#26828E", "#1F9E89", "#35B779", "#6DCD59", 
            "#B4DE2C", "#FDE725"
          ];

          
          chart.colorScale(anychart.scales.linearColor(viridisColors));
          
          chart.title(title);
          // Set the container id
          chart.container(element);
          chart.title().fontSize(25);
          
          // Draw the chart
          chart.draw();
      } catch (error) {
          console.error("Error initializing the chart:", error);
      }
  });
}

drawheatmap('text/data/matrix.csv', "heatmapwords", "Heatmap of search semantic similarity" );


drawwordcloud('text/data/Business.csv', 'business');
drawwordcloud('text/data/Technology.csv', 'technology');
drawwordcloud('text/data/War.csv', 'war');
drawwordcloud('text/data/Sport.csv', 'sport');
drawwordcloud('text/data/Science.csv', 'science');
drawwordcloud('text/data/Health.csv', 'health');
drawwordcloud('text/data/Politics.csv', 'politics');
drawwordcloud('text/data/Climate.csv', 'climate');