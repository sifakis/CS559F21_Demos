function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var slider1 = document.getElementById('slider1');
  slider1.value = 0;
  var slider2 = document.getElementById('slider2');
  slider2.value = 0;
  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    // use the sliders to get various parameters
    var dx = slider1.value;
    var dy = slider2.value;
    
    function DrawLshape(color) {
      context.beginPath();
      context.fillStyle = color;
      context.moveTo(50,25);
      context.lineTo(150,25);
      context.lineTo(150,75);
      context.lineTo(100,75);
      context.lineTo(100,175);
      context.lineTo(50,175);
      context.closePath();
      context.fill();      
    }
    
    function DrawAxes(color) {
      context.strokeStyle=color;
      context.beginPath();
      // Axes
      context.moveTo(120,0);context.lineTo(0,0);context.lineTo(0,120);
      // Arrowheads
      context.moveTo(110,5);context.lineTo(120,0);context.lineTo(110,-5);
      context.moveTo(5,110);context.lineTo(0,120);context.lineTo(-5,110);
      // X-label
      context.moveTo(130,0);context.lineTo(140,10);
      context.moveTo(130,10);context.lineTo(140,0);
      // Y-label
      context.moveTo(0,130);context.lineTo(5,135);context.lineTo(10,130);
      context.moveTo(5,135);context.lineTo(5,142);
      
      context.stroke();
     }
    
    // make sure you understand these
 
    DrawAxes("black");
    context.save();
    context.translate(dx,dy);
    DrawAxes("green");
    DrawLshape("green");
    context.restore();
    
  }
  slider1.addEventListener("input",draw);
  slider2.addEventListener("input",draw);
  draw();
}
window.onload = setup;


