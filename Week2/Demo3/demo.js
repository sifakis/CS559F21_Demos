// function draw() {
window.onload = function() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    context.beginPath();
    context.rect(25,25,50,50);
    context.fill();

    context.beginPath();
    context.rect(125,25,50,50);
    context.fillStyle = "#800";
    context.fill();

    context.beginPath();
    context.rect(25,125,50,50);
    context.strokeStyle = "#800";
    context.lineWidth = 4;
    context.stroke();
    
    context.beginPath();
    context.moveTo(150,125);
    context.lineTo(125,175);
    context.lineTo(175,175);
    context.closePath();
    context.fillStyle="#EE0";
    context.fill();
    context.stroke();
};
// window.onload = draw;

