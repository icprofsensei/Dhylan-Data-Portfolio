var slider = document.getElementById("myRange");
var output = document.getElementById("year");
output.innerHTML = slider.value;
var Premier_League = {
    '2014': [ 99., 110.,  94.,  55.,  16.,   6.,   0.] ,
    '2015': [110., 110.,  81.,  58.,  17.,   3.,   1. ] ,
    '2016': [109., 109.,  73.,  61.,  18.,   6.,   1.  ] ,
    '2017': [104.,  95.,  76.,  66.,  41.,  19.,  0.], 
    '2018': [83., 89., 87., 49., 39., 17.,  7.,],
    '2019': [ 86., 100.,  76.,  54.,  46.,  14.,   2.] , 
    '2020': [84., 85., 53., 60., 41., 13.,  0.] , 
    '2021': [ 97.,  94., 100.,  68.,  30.,  14.,   3.]
};

function drawten(){
        document.getElementById("movinghistoprem").innerHTML = "";
        slider.value = 2014;
        output.innerHTML = 2014;
        var data = [];
        for (var i = 0; i < Premier_League['2014'].length; i++) {
            xintervalupper = 10 * (i + 1);
            xintervallower = xintervalupper - 10;
            obj = {'x': String(xintervallower) + '-' + String(xintervalupper), 'y': Premier_League['2014'][i]};
            data.push(obj);
        }

        var chart = anychart.column();
        chart.title('Possession Difference per match in the Premier League');
        chart.title().fontSize(30);
        chart.xAxis().title("Possession Difference");
        chart.yAxis().title("Frequency");
        chart.yScale().maximum(120);
        var series = chart.column(data);
        series.fill('#4797ff');
        chart.container("movinghistoprem");
        chart.barGroupsPadding(0);
        chart.draw();

        // Update the chart dynamically on slider input
        slider.oninput = function() {
            var year = this.value;
            output.innerHTML = slider.value;
            var newData = [];
            for (var i = 0; i < Premier_League[year].length; i++) {
                xintervalupper = 10 * (i + 1);
                xintervallower = xintervalupper - 10;
                obj = {'x': String(xintervallower) + '-' + String(xintervalupper), 'y': Premier_League[year][i]};
                newData.push(obj);
            }
            series.data(newData); // Update the data for the existing series
        };
}
var Premier_League2 = {
    '2014': [47., 52., 71., 39., 60., 34., 30., 25.,  8.,  8.,  6.,  0.],
    '2015': [60., 50., 71., 39., 52., 29., 37., 21., 11.,  6.,  2.,  1.],
    '2016': [49., 60., 70., 39., 52., 21., 48., 13., 15.,  3.,  4.,  3.],
    '2017': [56., 48., 61., 34., 48., 28., 40., 26., 30., 11.,  8., 11.], 
    '2018': [51., 32., 51., 38., 56., 31., 32., 17., 26., 13., 12.,  7.],
    '2019': [43., 43., 61., 39., 45., 31., 30., 24., 32., 14., 12.,  3.], 
    '2020': [44., 40., 48., 37., 30., 23., 41., 19., 29., 12., 11.,  2.], 
    '2021': [51., 46., 54., 40., 53., 47., 46., 22., 25.,  5., 11.,  4.]
};

function drawfive(){
        document.getElementById("movinghistoprem").innerHTML = "";
        slider.value = 2014;
        output.innerHTML = 2014;
        var data = [];
        for (var i = 0; i < Premier_League2['2014'].length; i++) {
            xintervalupper = 5 * (i + 1);
            xintervallower = xintervalupper - 5;
            obj = {'x': String(xintervallower) + '-' + String(xintervalupper), 'y': Premier_League2['2014'][i]};
            data.push(obj);
        }

        var chart = anychart.column();
        chart.title('Possession Difference');
        chart.title().fontSize(30);
        chart.xAxis().title("Possession Difference");
        chart.yAxis().title("Frequency");
        chart.yScale().maximum(75); // Set the y-axis maximum to 100
        var series = chart.column(data);
        series.fill('#4797ff');
        chart.container("movinghistoprem");
        chart.barGroupsPadding(0);
        chart.draw();

        // Update the chart dynamically on slider input
        slider.oninput = function() {
            var year = this.value;
            output.innerHTML = slider.value;
            var newData = [];
            for (var i = 0; i < Premier_League2[year].length; i++) {
                xintervalupper = 5 * (i + 1);
                xintervallower = xintervalupper - 5;
                obj = {'x': String(xintervallower) + '-' + String(xintervalupper), 'y': Premier_League2[year][i]};
                newData.push(obj);
            }
            series.data(newData); // Update the data for the existing series
        };
}

// Second slider and container


var slider2 = document.getElementById("myRange2");
var output2 = document.getElementById("year2");
output2.innerHTML = slider2.value;


function drawten2(){
    var City = {
        '2014': [7., 6., 5., 8., 5., 0., 0.],
        '2015': [6., 7., 5., 7., 5., 1. ,0.],
        '2016': [9., 7., 8., 6., 4., 2., 0.],
        '2017': [1.,  5.,  4., 12. , 7., 11. , 0.], 
        '2018': [4., 1. ,2., 8. ,9. ,9. ,4.],
        '2019': [2., 6., 7., 4. ,7. ,9. ,1.], 
        '2020': [ 2.,  2.,  0. ,11., 11.,  4.,  0.], 
        '2021': [3., 4.,6., 9. ,9. ,6. ,2.] 
    };
    
    document.getElementById("movinghistocity").innerHTML = "";
    slider2.value = 2014;
    output2.innerHTML = 2014;
    var data = [];
    for (var i = 0; i < City['2014'].length; i++) {
        xintervalupper = 10 * (i + 1);
        xintervallower = xintervalupper - 10;
        obj = {'x': String(xintervallower) + '-' + String(xintervalupper), 'y': City['2014'][i]};
        data.push(obj);
    }

    var chart = anychart.column();
    chart.title('Possession Difference per match for Manchester City');
    chart.title().fontSize(30);
    chart.xAxis().title("Possession Difference");
    chart.yAxis().title("Frequency");
    chart.yScale().maximum(15);
    var series = chart.column(data);
    series.fill('#4797ff');
    chart.container("movinghistocity");
    chart.barGroupsPadding(0);
    chart.draw();

    // Update the chart dynamically on slider input
    slider2.oninput = function() {
        var year2 = this.value;
        output2.innerHTML = slider2.value;
        var newData = [];
        for (var i = 0; i < City[year2].length; i++) {
            xintervalupper = 10 * (i + 1);
            xintervallower = xintervalupper - 10;
            obj = {'x': String(xintervallower) + '-' + String(xintervalupper), 'y': City[year2][i]};
            newData.push(obj);
        }
        series.data(newData); // Update the data for the existing series
    };
}



function drawfive2(){
    var City2 = {
        '2014': [4., 3., 3., 3., 4. ,1. ,3. ,5. ,2. ,3. ,0. ,0. ,0. ,0.],
        '2015': [1., 5., 4., 3. ,4. ,1. ,4. ,3. ,4. ,1., 0., 1., 0., 0.],
        '2016': [4., 5., 5., 2., 6., 2., 6., 0., 3., 1., 1., 1., 0., 0.],
        '2017':[0., 1., 3., 2., 4. ,0. ,7., 5., 6., 1., 3., 8., 0., 0.], 
        '2018': [3., 1., 0., 1., 1., 1., 6., 2., 6., 3., 5., 4., 3., 1.] ,
        '2019': [1., 1., 4., 2., 3., 4., 1., 3., 5., 2., 8., 1., 1., 0.], 
        '2020': [1., 1., 1., 1., 0., 0., 8., 3., 7., 4., 3., 1., 0., 0.], 
        '2021': [2., 1., 2., 2., 2., 4., 5., 4., 8., 1., 5., 1., 2., 0.] 
    };
    
    document.getElementById("movinghistocity").innerHTML = "";
    slider2.value = 2014;
    output2.innerHTML = 2014;
    var data = [];
    for (var i = 0; i < City2['2014'].length; i++) {
        xintervalupper = 10 * (i + 1);
        xintervallower = xintervalupper - 10;
        obj = {'x': String(xintervallower) + '-' + String(xintervalupper), 'y': City2['2014'][i]};
        data.push(obj);
    }

    var chart = anychart.column();
    chart.title('Possession Difference per match for Manchester City');
    chart.title().fontSize(30);
    chart.xAxis().title("Possession Difference");
    chart.yAxis().title("Frequency");
    chart.yScale().maximum(10);
    var series = chart.column(data);
    series.fill('#4797ff');
    chart.container("movinghistocity");
    chart.barGroupsPadding(0);
    chart.draw();

    // Update the chart dynamically on slider input
    slider2.oninput = function() {
        var year2 = this.value;
        output2.innerHTML = slider2.value;
        var newData = [];
        for (var i = 0; i < City2[year2].length; i++) {
            xintervalupper = 10 * (i + 1);
            xintervallower = xintervalupper - 10;
            obj = {'x': String(xintervallower) + '-' + String(xintervalupper), 'y': City2[year2][i]};
            newData.push(obj);
        }
        series.data(newData); // Update the data for the existing series
    };
}
