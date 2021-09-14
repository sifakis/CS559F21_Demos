var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

// a thick red line
context.lineWidth = 5;
context.strokeStyle = "red";

// the actual line
context.beginPath();
context.moveTo(50,50);
context.lineTo(100,100);
context.stroke();
