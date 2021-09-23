function setup() { 
  var canvas = document.getElementById('myCanvas');
  var slider1 = document.getElementById('slider1');
  slider1.value = -25;
  var slider2 = document.getElementById('slider2');
  slider2.value = 50;
  var slider3 = document.getElementById('slider3');
  slider3.value = -50;
  var slider4 = document.getElementById('slider4');
  slider4.value = 25;
  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    // use the sliders to get the angles
    var theta1 = slider1.value*0.005*Math.PI;
    var phi1 = slider2.value*0.005*Math.PI;
    var phi2 = slider3.value*0.005*Math.PI;
    var theta2 = slider4.value*0.005*Math.PI;
    
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

    context.translate(50,150);  // Transform from Canvas coordinate system -> Blue coordinate system
                                // Stack is now : Blue -> Canvas (top)
    linkage("blue");
    context.save();             // Stack is now : Blue -> Canvas (top)
                                //                Blue -> Canvas
    context.translate(100,0);
    context.rotate(theta1);     // Transform Green -> Blue is prefixed to top of stack
                                // Stack is now : Green -> Blue -> Canvas (top)
                                //                Blue -> Canvas
    
    linkage("green");
    context.save();             // Stack is now : Green -> Blue -> Canvas (top)
                                //                Green -> Blue -> Canvas
                                //                Blue -> Canvas
    context.translate(100,0);
    context.rotate(phi1);
    context.scale(0.5,1);       // Transform Red -> Green is prefixed to top of stack
                                // Stack is now : Red -> Green -> Blue -> Canvas (top)
                                //                Green -> Blue -> Canvas
                                //                Blue -> Canvas
    linkage("red");
    context.restore();          // We "pop" the Red transform (top of stack)
                                // Stack is now : Green -> Blue -> Canvas
                                //                Blue -> Canvas
    
    context.save();             // Stack is now : Green -> Blue -> Canvas (top)
                                //                Green -> Blue -> Canvas
                                //                Blue -> Canvas
    context.translate(100,0);
    context.rotate(phi2);
    context.scale(0.5,1);       // Transform Orange -> Green is prefixed to top of stack
                                // Stack is now : Orange -> Green -> Blue -> Canvas (top)
                                //                Green -> Blue -> Canvas
                                //                Blue -> Canvas
    linkage("orange");
    context.restore();          // Pop Stack twice -- essentially undo the Orange -> Green -> Blue transforms
    context.restore();          // Stack is now : Blue -> Canvas (top)
    
    context.save();             // Stack is now : Blue -> Canvas (top)
                                //                Blue -> Canvas
    context.translate(100,0);
    context.rotate(theta2);     // Transform Brown -> Blue is prefixed to top of stack
                                // Stack is now : Brown -> Blue -> Canvas (top)
                                //                Blue -> Canvas    
    linkage("brown");
    context.restore();          // Stack is now : Blue -> Canvas (top)
  }
                  
  slider1.addEventListener("input",draw);
  slider2.addEventListener("input",draw);
  slider3.addEventListener("input",draw);
  slider4.addEventListener("input",draw);
  draw();
}
window.onload = setup;

