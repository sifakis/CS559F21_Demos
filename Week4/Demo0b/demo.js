function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var m4 = twgl.m4;
  var slider1 = document.getElementById('slider1');
  slider1.value = -25;
  var slider2 = document.getElementById('slider2');
  slider2.value = 50;
  var slider3 = document.getElementById('slider3');
  slider3.value = -50;
  var slider4 = document.getElementById('slider4');
  slider4.value = 25;

  function draw() {
    canvas.width = canvas.width;
    // use the sliders to get the angles
    var theta1 = slider1.value*0.005*Math.PI;
    var phi1 = slider2.value*0.005*Math.PI;
    var phi2 = slider3.value*0.005*Math.PI;
    var theta2 = slider4.value*0.005*Math.PI;
    
    function moveToTx(x,y,Tx)
    {var pt_in=[x,y,0]; var pt_out=m4.transformPoint(Tx,pt_in); context.moveTo(pt_out[0],pt_out[1]);}

    function lineToTx(x,y,Tx)
    {var pt_in=[x,y,0]; var pt_out=m4.transformPoint(Tx,pt_in); context.lineTo(pt_out[0],pt_out[1]);}
    
    function linkage(color,Tx) {
      
      context.beginPath();
      context.fillStyle = color;
      moveToTx(0,0,Tx);
      lineToTx(10,5,Tx);
      lineToTx(90,5,Tx);
      lineToTx(100,0,Tx);
      lineToTx(90,-5,Tx);
      lineToTx(10,-5,Tx);
      context.closePath();
      context.fill();
      
      axes(color,Tx);
    }
    
    function axes(color,Tx) {
      context.strokeStyle=color;
      context.beginPath();
      // Axes
      moveToTx(120,0,Tx);lineToTx(0,0,Tx);lineToTx(0,120,Tx);
      // Arrowheads
      moveToTx(110,5,Tx);lineToTx(120,0,Tx);lineToTx(110,-5,Tx);
      moveToTx(5,110,Tx);lineToTx(0,120,Tx);lineToTx(-5,110,Tx);
      // X-label
      moveToTx(130,-5,Tx);lineToTx(140,5,Tx);
      moveToTx(130,5,Tx);lineToTx(140,-5,Tx);
      // Y-label
      moveToTx(-5,130,Tx);lineToTx(0,135,Tx);lineToTx(5,130,Tx);
      moveToTx(0,135,Tx);lineToTx(0,142,Tx);
      
      context.stroke();
     }
    
    // make sure you understand these    

    var Tblue_to_canvas = m4.translation([50,150,0]);    
    linkage("blue",Tblue_to_canvas);
    
    var Tgreen_to_blue = m4.multiply(m4.rotationZ(theta1),m4.translation([100,0,0]));
    var Tgreen_to_canvas = m4.multiply(Tgreen_to_blue,Tblue_to_canvas);
    linkage("green",Tgreen_to_canvas);


    var Tred_to_green = m4.multiply(m4.scaling([0.5,1,1]),
                                    m4.multiply(m4.rotationZ(phi1),
                                                m4.translation([100,0,0])));
    var Tred_to_canvas = m4.multiply(Tred_to_green,Tgreen_to_canvas);
    linkage("red",Tred_to_canvas);
    
    var Torange_to_green = m4.multiply(m4.scaling([0.5,1,1]),
                                    m4.multiply(m4.rotationZ(phi2),
                                                m4.translation([100,0,0])));
    var Torange_to_canvas = m4.multiply(Torange_to_green,Tgreen_to_canvas);
    linkage("orange",Torange_to_canvas);

    var Tbrown_to_blue = m4.multiply(m4.rotationZ(theta2),m4.translation([100,0,0]));
    var Tbrown_to_canvas = m4.multiply(Tbrown_to_blue,Tblue_to_canvas);
    linkage("brown",Tbrown_to_canvas);

  }
  slider1.addEventListener("input",draw);
  slider2.addEventListener("input",draw);
  slider3.addEventListener("input",draw);
  slider4.addEventListener("input",draw);
  draw();
}
window.onload = setup;
