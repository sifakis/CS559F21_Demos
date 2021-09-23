function setup() {

  var canvas = document.getElementById('myCanvas');
  var slider1 = document.getElementById('slider1');
  slider1.value = -25;
  var slider2 = document.getElementById('slider2');
  slider2.value = -25;
  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    // use the sliders to get the angles
    var theta1 = slider1.value*0.005*Math.PI;
    var phi1 = slider2.value*0.005*Math.PI;
    
    // note that this only changes the y
    // X just stays the same
    // the coordinate systems will move
    function linkage(color) {
      
      context.beginPath();
      context.fillStyle = color;
      context.moveTo(0,0);
      context.lineTo(10,5);
      context.lineTo(90,5);
      context.lineTo(100,0);
      context.lineTo(90,-5);
      context.lineTo(10,-5);
      context.closePath();
      context.fill();
      
      axes(color);
    }
    
    function axes(color) {
      context.strokeStyle=color;
      context.beginPath();
      // Axes
      context.moveTo(120,0);context.lineTo(0,0);context.lineTo(0,120);
      // Arrowheads
      context.moveTo(110,5);context.lineTo(120,0);context.lineTo(110,-5);
      context.moveTo(5,110);context.lineTo(0,120);context.lineTo(-5,110);
      // X-label
      context.moveTo(130,-5);context.lineTo(140,5);
      context.moveTo(130,5);context.lineTo(140,-5);
      // Y-label
      context.moveTo(-5,130);context.lineTo(0,135);context.lineTo(5,130);
      context.moveTo(0,135);context.lineTo(0,142);
      
      context.stroke();
    }
    
    // make sure you understand these
    axes("black");
    context.translate(50,150);
    linkage("blue");
    context.translate(100,0);
    context.rotate(theta1);
    linkage("green");
    context.translate(100,0);
    context.rotate(phi1);
    context.scale(0.5,1);
    linkage("red");
  }

  slider1.addEventListener("input",draw);
  slider2.addEventListener("input",draw);
  draw();
}
window.onload = setup;
