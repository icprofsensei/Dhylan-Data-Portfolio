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


drawwordcloud('text/data/Business.csv', 'business');
drawwordcloud('text/data/Technology.csv', 'technology');
drawwordcloud('text/data/War.csv', 'war');
drawwordcloud('text/data/Sport.csv', 'sport');
drawwordcloud('text/data/Science.csv', 'science');
drawwordcloud('text/data/Health.csv', 'health');
drawwordcloud('text/data/Politics.csv', 'politics');
drawwordcloud('text/data/Climate.csv', 'climate');