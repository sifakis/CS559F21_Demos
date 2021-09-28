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
	
	function moveToTx(x,y,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,[x,y],Tx); context.moveTo(res[0],res[1]);}

	function lineToTx(x,y,Tx)
	{var res=vec2.create(); vec2.transformMat3(res,[x,y],Tx); context.lineTo(res[0],res[1]);}
	
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

	var Tblue_to_canvas = mat3.create();
	mat3.fromTranslation(Tblue_to_canvas,[50,150]);
	linkage("blue",Tblue_to_canvas);
	
	var Tgreen_to_blue = mat3.create();
	mat3.fromTranslation(Tgreen_to_blue,[100,0]);
	mat3.rotate(Tgreen_to_blue,Tgreen_to_blue,theta1);
	var Tgreen_to_canvas = mat3.create();
	mat3.multiply(Tgreen_to_canvas, Tblue_to_canvas, Tgreen_to_blue);
	linkage("green",Tgreen_to_canvas);

	var Tred_to_green = mat3.create();
	mat3.fromTranslation(Tred_to_green,[100,0]);
	mat3.rotate(Tred_to_green,Tred_to_green,phi1);
	mat3.scale(Tred_to_green,Tred_to_green,[0.5,1]);
	var Tred_to_canvas = mat3.create();
	mat3.multiply(Tred_to_canvas,Tgreen_to_canvas,Tred_to_green);
	linkage("red",Tred_to_canvas);

	var Torange_to_green = mat3.create();
	mat3.fromTranslation(Torange_to_green,[100,0]);
	mat3.rotate(Torange_to_green,Torange_to_green,phi2);
	mat3.scale(Torange_to_green,Torange_to_green,[0.5,1]);
	var Torange_to_canvas = mat3.create();
	mat3.multiply(Torange_to_canvas,Tgreen_to_canvas,Torange_to_green);
	linkage("orange",Torange_to_canvas);

	var Tbrown_to_blue = mat3.create();
	mat3.fromTranslation(Tbrown_to_blue,[100,0]);
	mat3.rotate(Tbrown_to_blue,Tbrown_to_blue,theta2);
	var Tbrown_to_canvas = mat3.create();
	mat3.multiply(Tbrown_to_canvas, Tblue_to_canvas, Tbrown_to_blue);
	linkage("brown",Tbrown_to_canvas);
    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    slider3.addEventListener("input",draw);
    slider4.addEventListener("input",draw);
    draw();
}
window.onload = setup;
