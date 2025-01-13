var data_2018 = [
    {'x': 42.78, 'y': 0.945, 'name': 'Burnley'},
    {'x': 45.73, 'y': 1.189, 'name': 'Crystal Palace'},
    {'x': 47.19, 'y': 0.622, 'name': 'Huddersfield'},
    {'x': 60.86, 'y': 2.378, 'name': 'Liverpool'},
    {'x': 56.16, 'y': 1.946, 'name': 'Manchester Utd'},
    {'x': 40.57, 'y': 1.162, 'name': 'Newcastle'},
    {'x': 46.81, 'y': 0.838, 'name': 'Southampton'},
    {'x': 42.59, 'y': 1.0, 'name': 'Swansea'},
    {'x': 59.79, 'y': 2.237, 'name': 'Tottenham'},
    {'x': 45.66, 'y': 1.342, 'name': 'West Ham'},
    {'x': 70.0, 'y': 2.378, 'name': 'Manchester City'},
    {'x': 60.43, 'y': 1.838, 'name': 'Chelsea'},
    {'x': 50.92, 'y': 1.297, 'name': 'Leicester'},
    {'x': 60.22, 'y': 1.703, 'name': 'Arsenal'},
    {'x': 49.05, 'y': 1.324, 'name': 'Everton'},
    {'x': 47.78, 'y': 1.351, 'name': 'Bournemouth'},
    {'x': 47.76, 'y': 1.189, 'name': 'Watford'},
    {'x': 40.94, 'y': 0.882, 'name': 'West Brom'},
    {'x': 40.35, 'y': 0.765, 'name': 'Stoke'},
    {'x': 41.32, 'y': 1.162, 'name': 'Brighton'},
    {'x': 47.35, 'y': 0.7, 'name': 'Fulham'},
    {'x': 36.15, 'y': 0.9, 'name': 'Cardiff'},
    {'x': 45.8, 'y': 1.45, 'name': 'Wolves'}
];

var data_2021 = [
    {x: 53.39, y: 1.854, name: 'Arsenal'},
    {x: 46.05, y: 1.214, name: 'Aston Villa'},
    {x: 51.22, y: 0.739, name: 'Fulham'},
    {x: 55.18, y: 1.3, name: 'Leeds'},
    {x: 52.4, y: 1.55, name: 'Leicester'},
    {x: 62.07, y: 1.878, name: 'Liverpool'},
    {x: 65.26, y: 2.488, name: 'Manchester City'},
    {x: 42.59, y: 0.955, name: 'Sheffield Utd'},
    {x: 45.93, y: 1.7, name: 'West Ham'},
    {x: 49.79, y: 1.256, name: 'Wolves'},
    {x: 41.36, y: 0.897, name: 'Burnley'},
    {x: 36.68, y: 0.818, name: 'West Brom'},
    {x: 44.85, y: 1.171, name: 'Crystal Palace'},
    {x: 42.35, y: 1.225, name: 'Everton'},
    {x: 38.24, y: 0.881, name: 'Newcastle'},
    {x: 52.23, y: 1.692, name: 'Tottenham'},
    {x: 61.21, y: 1.976, name: 'Chelsea'},
    {x: 52.65, y: 1.3, name: 'Brighton'},
    {x: 55.93, y: 1.829, name: 'Manchester Utd'},
    {x: 48.32, y: 0.927, name: 'Southampton'},
    {x: 45.78, y: 1.111, name: 'Brentford'},
    {x: 40.53, y: 0.765, name: 'Watford'},
    {x: 45.74, y: 0.526, name: 'Norwich'}
];


function reg(data, x1, y1, x2, y2, year, element, col) {
// create a chart
var chart = anychart.scatter();

// create a marker series and set the data
var series1 = chart.marker(data);
series1.fill(col);
series1.name('Club').stroke({color: col, thickness: 3});
// configure series labels
series1.labels().enabled(true).format("{%name}");

// configure tooltips
series1.tooltip().format("Club: {%name}\nPossession: {%x}%\nPoints per game: {%y}");

var series2= chart.line([{'x': x1, 'y': y1}, {'x': x2, 'y':y2}])

// set the container id
chart.container(element);
chart.background().fill('#e6e6e6');
chart.dataArea().background().fill('#e6e6e6');
// add axis titles
chart.title('Scatter plot of possession per game and points per game in ' + year);
chart.title().fontSize(25);
chart.xAxis().title("Possession per Game (%)");
chart.xAxis().labels().fontSize(15);
chart.xAxis().title().fontSize(20);
chart.yAxis().title("Points per Game");
chart.yAxis().title().fontSize(20);
chart.yAxis().labels().fontSize(15);
// initiate drawing the chart
chart.draw();
}

reg(data_2018, 32, 0.429, 74, 2.659, '2018', "scatter2018", '#af47ff')
reg(data_2021, 32, 0.420, 74, 2.559, '2021',"scatter2021", '#4ad0a1')


/*
var controller = chart.annotations();
var rectangle = controller.rectangle({
    xAnchor: 53,
    valueAnchor: 1.5,
    secondXAnchor: 72,
    secondValueAnchor: 2.45,
    fill: {opacity: 0},
    stroke: "2 red"
  });
  2014
Slope: [[0.06353923]]
Intercept: [-1.81751078]
R2 score:  0.6342423218957217
2015
Slope: [[0.03395886]]
Intercept: [-0.34926839]
R2 score:  0.26726552644655965
2016
Slope: [[0.04961861]]
Intercept: [-1.13929874]
R2 score:  0.5028985780871222
2017
Slope: [[0.05656678]]
Intercept: [-1.47708683]
R2 score:  0.7193819324338719
2018
Slope: [[0.05310643]]
Intercept: [-1.26997475]
R2 score:  0.7367104900159431
2019
Slope: [[0.04185977]]
Intercept: [-0.74373263]
R2 score:  0.4038704463073922
2020
Slope: [[0.04204055]]
Intercept: [-0.77838556]
R2 score:  0.5276659626274282
2021
Slope: [[0.05177967]]
Intercept: [-1.23668905]
R2 score:  0.6472879824394268
*/