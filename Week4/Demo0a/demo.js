function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
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
	
	function setCanvasTransform(Tx) {
	    context.setTransform(Tx[0],Tx[1],Tx[3],Tx[4],Tx[6],Tx[7]);
	}

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

	var Tblue_to_canvas = mat3.create();
	mat3.fromTranslation(Tblue_to_canvas,[50,150]);
	setCanvasTransform(Tblue_to_canvas);
	linkage("blue");
	
	var Tgreen_to_blue = mat3.create();
	mat3.fromTranslation(Tgreen_to_blue,[100,0]);
	mat3.rotate(Tgreen_to_blue,Tgreen_to_blue,theta1);
	var Tgreen_to_canvas = mat3.create();
	mat3.multiply(Tgreen_to_canvas, Tblue_to_canvas, Tgreen_to_blue);
	setCanvasTransform(Tgreen_to_canvas);
	linkage("green");

	var Tred_to_green = mat3.create();
	mat3.fromTranslation(Tred_to_green,[100,0]);
	mat3.rotate(Tred_to_green,Tred_to_green,phi1);
	mat3.scale(Tred_to_green,Tred_to_green,[0.5,1]);
	var Tred_to_canvas = mat3.create();
	mat3.multiply(Tred_to_canvas,Tgreen_to_canvas,Tred_to_green);
	setCanvasTransform(Tred_to_canvas);
	linkage("red");

	var Torange_to_green = mat3.create();
	mat3.fromTranslation(Torange_to_green,[100,0]);
	mat3.rotate(Torange_to_green,Torange_to_green,phi2);
	mat3.scale(Torange_to_green,Torange_to_green,[0.5,1]);
	var Torange_to_canvas = mat3.create();
	mat3.multiply(Torange_to_canvas,Tgreen_to_canvas,Torange_to_green);
	setCanvasTransform(Torange_to_canvas);
	linkage("orange");

	var Tbrown_to_blue = mat3.create();
	mat3.fromTranslation(Tbrown_to_blue,[100,0]);
	mat3.rotate(Tbrown_to_blue,Tbrown_to_blue,theta2);
	var Tbrown_to_canvas = mat3.create();
	mat3.multiply(Tbrown_to_canvas, Tblue_to_canvas, Tbrown_to_blue);
	setCanvasTransform(Tbrown_to_canvas);
	linkage("brown");
    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    slider3.addEventListener("input",draw);
    slider4.addEventListener("input",draw);
    draw();
}
window.onload = setup;
