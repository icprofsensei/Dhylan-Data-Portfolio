var prem = [18.810526315789474,18.042105263157893,18.29708222811671,21.453865336658353,22.506738544474395,21.8994708994709,21.797619047619047,21.467980295566502,21.84536082474227]
var laliga = [18.43360433604336,16.58974358974359,17.897297297297296,17.462532299741603,18.6,16.644501278772378,20.779661016949152,19.786069651741293,18.92929292929293]
var bundesliga = [12.876623376623376,15.344155844155845,16.846153846153847,15.74763406940063,16.493506493506494,19.7012987012987,16.28676470588235,15.546511627906977,13.69032258064516]
var seriea = [15.252032520325203,15.44987146529563,18.412371134020617,18.005141388174806,17.24607329842932,14.26183844011142,13.570200573065902,14.839907192575406,16.36649214659686]
var ligue1 = [12.094986807387862,13.32283464566929,14.640211640211641,17.35248041775457,17.731182795698924,16.680306905370845,17.53076923076923,18.3142144638404,17.416666666666668]
var manchestercity = [58.842105,59.052632,60.421053,68.425000,70.000000,66.026316,67.187500,65.255814,69.222222]
var bigsix = [56.22105263157895, 57.54210526315789, 57.86728307254623, 58.89695121951219, 59.49302987197724, 58.379231863442385, 56.445413801884385, 56.96705976949879, 57.90238930659983]
var citywins = [['2014 (C)', 71.05263157894737], ['2015', 57.89473684210526], ['2016',52.63157894736842], ['2017',75.0], ['2018 (C)',75.67567567567568], ['2019 (C)',78.94736842105263], ['2020',62.5], ['2021 (C)',81.3953488372093], ['2022 (C)',72.22222222222223]]
var AVD = [['2014', 111], ['2015', 108], ['2016',107], ['2017',154], ['2018',143], ['2019',147], ['2020',137], ['2021',162]]

function drawmultilinechart(element){
        function parsedata(arrayitem, startyear, col, name){
            data = []
            for (var i = startyear; i < 2023; i++) {
                obj = [String(i), arrayitem[i-2014]];
                data.push(obj);
                            }
                var series = chart.line(data)
                series.name(name).stroke({color: col, thickness: 3})
                        }
        var chart = anychart.line();
        chart.background().fill('#e6e6e6');
        chart.dataArea().background().fill('#e6e6e6');
        chart.title("Possession Difference across Europe's Top 5 Leagues");
        chart.title().fontSize(25);
        chart.xAxis().title("Year");
        chart.xAxis().labels().fontSize(25);
        chart.xAxis().title().fontSize(20);
        chart.yAxis().title("Average Possession Difference");
        chart.yAxis().title().fontSize(20);
        chart.yAxis().labels().fontSize(25);
        parsedata(prem, 2014,'#4797ff', 'Premier League');
        parsedata(laliga, 2014,'#ff93c2', 'La Liga' );
        parsedata(bundesliga, 2014, '#eb1a1a', 'Bundesliga');
        parsedata(seriea, 2015, '#10e511', 'Serie A');
        parsedata(ligue1, 2015, '#7454a0', 'Ligue 1' );
        chart.container(element);
        chart.legend().enabled(true);
        chart.legend().fontSize(20);
        chart.barGroupsPadding(0);
        chart.draw();
}


function drawsinglelinechart(element, data, name, col, title, yaxis){
    
    
    var chart = anychart.line();
    var series = chart.line(data)
    series.name(name).stroke({color: col, thickness: 3})
    chart.background().fill('#e6e6e6');
    chart.dataArea().background().fill('#e6e6e6');
    chart.title(title);
    chart.title().fontSize(25);
    chart.xAxis().title("Year");
    chart.xAxis().labels().fontSize(25);
    chart.xAxis().title().fontSize(20);
    chart.yAxis().title(yaxis);
    chart.yAxis().title().fontSize(20);
    chart.yAxis().labels().fontSize(25);
    
    chart.container(element);
    chart.legend().enabled(true);
    chart.legend().fontSize(25);
    chart.barGroupsPadding(0);
    chart.draw();
}

function drawcompchart(element){
    function parsedata(arrayitem, startyear, col, name){
        data = []
        for (var i = startyear; i < 2023; i++) {
            obj = [String(i), arrayitem[i-2014]];
            data.push(obj);
                        }
            var series = chart.line(data)
            series.name(name).stroke({color: col, thickness: 3})
                    }
    var chart = anychart.line();
    chart.background().fill('#e6e6e6');
    chart.dataArea().background().fill('#e6e6e6');
    chart.title("Average possession per match");
    chart.title().fontSize(25);
    chart.xAxis().title("Year");
    chart.xAxis().labels().fontSize(25);
    chart.xAxis().title().fontSize(20);
    chart.yAxis().title("Average Possession");
    chart.yAxis().title().fontSize(20);
    chart.yAxis().labels().fontSize(25);
    parsedata(manchestercity, 2014,'#0ac4f2', 'Manchester City');
    parsedata(bigsix, 2014,'#eb1a1a', 'The Big Six');
    chart.container(element);
    chart.legend().enabled(true);
    chart.legend().fontSize(25);
    chart.barGroupsPadding(0);
    chart.draw();
}
drawmultilinechart('linechartpossessiondiff');
drawcompchart('cityvsrest');
drawsinglelinechart('citywins',citywins,'Manchester City','#0ac4f2',"Average win % per season","Average win percentage" );
drawsinglelinechart('AVD',AVD,'Attack vs Defence Drill Matches','#af47ff', "Total number of 'Attack vs Defence Drill' type matches per year","Number of matches");