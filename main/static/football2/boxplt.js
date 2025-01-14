let slideIndex = 1;
showSlides(slideIndex, "mySlides");
showSlides(slideIndex, "mySlides2");
var Goals = [
    {x:"Attacking Goals", low: 0.0, q1: 1.0, median: 1.0, q3: 3.0, high: 6.0, outliers: [7, 7, 9, 8, 9, 7, 7]},
    {x:"Defending Goals", low:0.0, q1:0.0, median:1.0, q3:2.0, high:5.0, outliers:[6,7]}    
]
var Shots = [
    {x:"Attacking Shots", low: 3, q1: 13, median: 17, q3: 21, high: 33, outliers: [38, 43, 37, 36, 37, 34, 35, 36]},
    {x: "Defending Shots", low: 0, q1: 6, median: 8, q3: 11, high: 18, outliers: [19, 20, 19, 20, 20, 19]}
]
var On_Target = [
    {x:"Attacking Shots On Target", low: 0, q1: 4, median: 6, q3: 7, high: 11, outliers: [12, 13, 16, 12, 13, 12, 12, 12, 14, 12, 13, 12, 14, 15, 12, 14, 12, 12, 12, 12, 16, 12, 14, 12, 12, 12, 12, 14, 12, 12, 12, 13, 15, 14, 14, 12, 14, 15, 13, 15, 13]},
    {x: "Defending Shots On Target", low: 0, q1: 2, median: 3, q3: 4, high: 7, outliers: [8, 9, 11, 10, 10, 9, 8, 8, 8, 9, 8, 8, 8, 8, 8, 8, 8, 9, 9, 10, 9, 9, 8, 8, 8, 8, 8, 10, 11, 8, 8, 8, 8]}
] 
var Fouls = [
    {x:"Attacking Fouls", low: 0, q1: 7, median: 9, q3: 12, high: 19, outliers: [20, 20, 20]},
    {x:"Defending Fouls", low: 2, q1: 8, median: 10, q3: 13, high: 20, outliers: [21, 23, 26, 21, 21, 21, 22]}
] 

var Offside = [
    {x:"Attacking Offsides", low: 0, q1: 1, median: 1, q3: 3, high: 6, outliers: [9, 7, 7, 10, 7, 8, 10, 7, 7, 7, 7, 7] },
    {x:"Defending Offsides", low: 0, q1: 1, median: 2, q3: 3, high: 6, outliers: [7, 8, 7, 7, 7, 8, 8, 8, 7, 9, 8, 7, 10, 7, 7, 8, 7, 8, 7]}
] 

var balGoals = [
    {x:"Attacking Goals", low: 0.0, q1: 0.0, median: 1.0, q3: 2.0, high: 5.0, outliers: [6, 6, 8, 6, 6, 6, 6, 6, 7]},
    {x:"Defending Goals", low:0.0, q1:0.0, median:1.0, q3:2.0, high:5.0, outliers:[6, 6, 6, 6, 6, 6] }    
]
var balShots = [
    {x:"Attacking Shots", low: 3, q1: 10, median: 13, q3: 17, high: 27, outliers: [31, 29, 28, 28, 32, 34, 30, 28, 28, 28, 29, 29, 29, 29, 30, 31, 30, 28, 30, 30]},
    {x: "Defending Shots", low: 1, q1: 8, median: 11, q3: 14, high: 23, outliers: [24, 25, 24, 24, 32, 26, 24, 24, 25, 28, 25, 24, 26]}
]
var balOn_Target = [
    {x:"Attacking Shots On Target", low: 0, q1: 3, median: 4, q3: 6, high: 10, outliers: [11, 15, 11, 11, 11, 11, 11, 11, 11, 12, 11, 14, 12, 11, 11, 12, 11, 11, 11, 15, 17, 11, 11, 12, 11, 12, 12, 11, 12, 11, 11, 11, 11, 11, 13, 12, 13, 13, 11, 14, 13]},
    {x: "Defending Shots On Target", low: 0, q1: 2, median: 4, q3: 5, high: 9, outliers: [12, 10, 11, 10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10, 11, 12, 12, 10, 10, 10, 14, 10, 11, 10, 12, 10, 11]}
] 
var balFouls = [
    {x:"Attacking Fouls", low: 3, q1: 9, median: 11, q3: 13, high: 19, outliers: [2, 1, 2, 21, 20, 20, 21, 21, 20, 20, 20, 24, 20, 21, 21, 24, 20, 23, 20, 22, 20, 25, 23]},
    {x:"Defending Fouls", low: 3, q1: 9, median: 11, q3: 13, high: 19, outliers: [2, 1, 2, 2, 20, 22, 22, 20, 22, 23, 20, 20, 21, 22, 22, 21, 20, 21, 24, 20, 20, 21, 20, 20, 21, 20, 21, 23, 20, 21, 23, 21, 21, 23, 21, 20, 22, 20, 20]}
] 

var balOffside = [
    {x:"Attacking Offsides", low: 0, q1: 1, median: 2, q3: 3, high: 5, outliers: [6, 6, 6, 6, 6, 6] },
    {x:"Defending Offsides", low: 0, q1: 1, median: 2, q3: 3, high: 6, outliers: [8, 8, 8, 7, 7, 9, 8, 7, 7, 9, 7, 9, 8, 9, 10, 7, 10, 8, 8, 7, 8, 7, 7, 7, 7, 7, 7]}
] 


function drawboxplt(data, container, col, val){
    chart = anychart.box();
    series = chart.box(data);
    series.fill(col)
    chart.container(container);
    chart.background().fill('#e6e6e6');
    chart.dataArea().background().fill('#e6e6e6');
    if (window.innerWidth <= 900) {
        chart.xAxis().labels()
            .fontSize(12)          // Decrease font size
            .width(100)           // Enable text wrapping (width in pixels)
            .wordWrap("normal")
            .width(80) // Wrap words properly
            .padding(0, 0, 20, 0); // Add more space below x-axis labels
    } else {
        chart.xAxis().labels()
            .fontSize(25)          // Default font size
            .width(null)           // Disable wrapping
            .padding(0, 0, 10, 0); // Default padding
    }
    chart.yScale().maximum(val);
    chart.draw();
}
drawboxplt(Goals, goalsboxplt, '#ff7d04', 10)
drawboxplt(Shots, shotsboxplt, '#25d3ff', 50)
drawboxplt(On_Target, otboxplt, '#17c314', 20)
drawboxplt(Fouls, foulboxplt, '#ff4797', 30)
drawboxplt(Offside, offsideboxplt, '#97ff47', 12)
drawboxplt(balGoals, balgoalsboxplt, '#ff7d04', 10)
drawboxplt(balShots, balshotsboxplt, '#25d3ff', 50)
drawboxplt(balOn_Target, balotboxplt, '#17c314', 20)
drawboxplt(balFouls, balfoulboxplt, '#ff4797', 30)
drawboxplt(balOffside, baloffsideboxplt, '#97ff47', 12)


// Next/previous controls for both galleries
function plusSlides(n) {
  slideIndex += n;
  showSlides(slideIndex, "mySlides");
  showSlides(slideIndex, "mySlides2");
}

// Thumbnail image controls for both galleries
function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex, "mySlides");
  showSlides(slideIndex, "mySlides2");
}

function showSlides(n, classname) {
  let i;
  let slides = document.getElementsByClassName(classname);
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

