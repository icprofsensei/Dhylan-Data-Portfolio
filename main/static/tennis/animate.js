const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
function setCanvasSize() {
    const dpr = window.devicePixelRatio || 1; // Account for high-DPI screens
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr); // Scale the context to ensure sharp rendering
    
}
function setobjectsgrass() {
    // Draw the net
    ctx.beginPath();
    ctx.rect(0, (2 * canvas.height / 5), 10, (2* canvas.height / 5)); 
    ctx.fillStyle = "grey"; 
    ctx.fill(); 

    // Draw the line
    ctx.beginPath(); 
    ctx.rect(0, (4 * canvas.height / 5), canvas.width, canvas.height / 200); 
    ctx.fillStyle = "white"; 
    ctx.fill(); 

    // Draw the ground
    ctx.beginPath(); 
    ctx.rect(0, (4 * canvas.height / 5) + canvas.height / 200, canvas.width, 80); 
    ctx.fillStyle = "#91E437"; 
    ctx.fill(); 

}
function setobjectsclay() {
    // Draw the net
    ctx.beginPath();
    ctx.rect(0, (2 * canvas.height / 5), 10, (2* canvas.height / 5)); 
    ctx.fillStyle = "grey"; 
    ctx.fill(); 

    // Draw the line
    ctx.beginPath(); 
    ctx.rect(0, (4 * canvas.height / 5), canvas.width, canvas.height / 200); 
    ctx.fillStyle = "white"; 
    ctx.fill(); 

    // Draw the ground
    ctx.beginPath(); 
    ctx.rect(0, (4 * canvas.height / 5) + canvas.height / 200, canvas.width, 80); 
    ctx.fillStyle = "#E2710E"; 
    ctx.fill(); 

}
function setobjectshard() {
    // Draw the net
    ctx.beginPath();
    ctx.rect(0, (2 * canvas.height / 5), 10, (2* canvas.height / 5)); 
    ctx.fillStyle = "grey"; 
    ctx.fill(); 

    // Draw the line
    ctx.beginPath(); 
    ctx.rect(0, (4 * canvas.height / 5), canvas.width, canvas.height / 200); 
    ctx.fillStyle = "white"; 
    ctx.fill(); 

    // Draw the ground
    ctx.beginPath(); 
    ctx.rect(0, (4 * canvas.height / 5) + canvas.height / 200, canvas.width, 80); 
    ctx.fillStyle = "#0EA9E2"; 
    ctx.fill(); 

}
function animatecircle(x, y, r) {
    // Clear a small area around the ball's current position
    ctx.clearRect(x - r - 6, y - r - 6, r * 2 + 12, r * 2 + 12);

    // Draw the ball
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
}

function markercircle(x, y, r) {

    // Draw the ball
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();
}
function playgrass() {
    setCanvasSize();
    setobjectsgrass();
    var v = canvas.width / 200;
    var x =0;
    var y = (canvas.height / 4);
    var targetX = canvas.width * 0.7;
    var targetY = 0.8 *  canvas.height;
    // Calculate the slope of the straight line
    var slope = (targetY - y) / (targetX - x);
    function rebound(timestamp) {
        x += v;
        y = y - ((2* slope/5) * v);
        animatecircle(x, y, 10); // Draw the ball
        markercircle(x - 20, y, 2); // Draw the marker
        if (x <= 2 * canvas.width) {
        requestAnimationFrame(rebound);
        }
        else{
            console.log('finished')
        } 
    }
    function step(timestamp){
        x += v;
        y = y + slope * v;
        animatecircle(x, y, 10);
        markercircle(x - 20, y, 2)
        if (y >= 0.755 * canvas.height){
            x == 0;
            requestAnimationFrame(rebound);
        }
        else{
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
    
}
function playclay() {
    setCanvasSize();
    setobjectsclay();
    var v = canvas.width / 200;
    var x =0;
    var y = (canvas.height / 4);
    var targetX = canvas.width * 0.7;
    var targetY = 0.8 *  canvas.height;
    // Calculate the slope of the straight line
    var slope = (targetY - y) / (targetX - x);
    function rebound(timestamp) {
        x += v;
        y = y - ((8* slope/7) * v);
        animatecircle(x, y, 10); // Draw the ball
        markercircle(x - 20, y, 2); // Draw the marker
        if (x <= 2 * canvas.width) {
            requestAnimationFrame(rebound);
            }
            else{
                console.log('finished')
            } 
    }
    function step(timestamp){
        x += v;
        y = y + slope * v;
        animatecircle(x, y, 10);
        markercircle(x - 20, y, 2)
        if (y >= 0.755 * canvas.height){
            x == 0;
            requestAnimationFrame(rebound);
        }
        else{
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
    
}
function playhard() {
    setCanvasSize();
    setobjectshard();
    var v = canvas.width / 200;
    var x =0;
    var y = (canvas.height / 4);
    var targetX = canvas.width * 0.7;
    var targetY = 0.8 *  canvas.height;
    // Calculate the slope of the straight line
    var slope = (targetY - y) / (targetX - x);
    function rebound(timestamp) {
        x += v;
        y = y - ((3* slope/4) * v);
        animatecircle(x, y, 10); // Draw the ball
        markercircle(x - 20, y, 2); // Draw the marker
        if (x <= 2 * canvas.width) {
            requestAnimationFrame(rebound);
            }
            else{
                console.log('finished')
            } 
    }
    function step(timestamp){
        x += v;
        y = y + slope * v;
        animatecircle(x, y, 10);
        markercircle(x - 20, y, 2)
        if (y >= 0.755 * canvas.height){
            x == 0;
            requestAnimationFrame(rebound);
        }
        else{
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
    
}